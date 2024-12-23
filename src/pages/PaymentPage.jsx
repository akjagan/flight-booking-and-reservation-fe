import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    navigate("/search-results");
    return null;
  }

  // Convert INR to USD (using approximate conversion)
  const amount = (
    parseFloat(bookingDetails.flightDetails.price.total) / 75
  ).toFixed(2);

  const initiatePayPalPayment = async () => {
    setLoading(true);
    setError("");

    try {
      // First, get the access token
      const tokenResponse = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `${import.meta.env.VITE_PAYPAL_CLIENT_ID}:${
                import.meta.env.VITE_PAYPAL_SECRET
              }`
            )}`,
          },
          body: "grant_type=client_credentials",
        }
      );

      if (!tokenResponse.ok) {
        throw new Error("Failed to get PayPal access token");
      }

      const tokenData = await tokenResponse.json();

      // Create order
      const orderResponse = await fetch(
        "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.access_token}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
                description: `Flight Booking - ${bookingDetails.bookingReference}`,
              },
            ],
            application_context: {
              return_url: `${window.location.origin}/payment-success`,
              cancel_url: `${window.location.origin}/payment-cancel`,
              brand_name: "Flight Booking System",
              landing_page: "LOGIN",
              user_action: "PAY_NOW",
              shipping_preference: "NO_SHIPPING",
            },
          }),
        }
      );

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message || "Failed to create PayPal order");
      }

      const orderData = await orderResponse.json();

      // Find the approve link
      const approveUrl = orderData.links.find(
        (link) => link.rel === "approve"
      )?.href;

      if (approveUrl) {
        // Store order details
        localStorage.setItem("paypal_order_id", orderData.id);
        localStorage.setItem(
          "booking_reference",
          bookingDetails.bookingReference
        );

        // Redirect to PayPal
        window.location.href = approveUrl;
      } else {
        throw new Error("PayPal approval URL not found");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(
        error.message || "Payment initialization failed. Please try again."
      );
      setError("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Secure Payment
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Booking Summary */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Booking Summary</h3>
            <p className="text-gray-600">
              Reference: {bookingDetails.bookingReference}
            </p>

            <div className="mt-4 bg-gray-50 p-4 rounded">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600">From</p>
                  <p className="font-semibold">
                    {
                      bookingDetails.flightDetails.itineraries[0].segments[0]
                        .departure.iataCode
                    }
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">To</p>
                  <p className="font-semibold">
                    {
                      bookingDetails.flightDetails.itineraries[0].segments[
                        bookingDetails.flightDetails.itineraries[0].segments
                          .length - 1
                      ].arrival.iataCode
                    }
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount (INR)</span>
                  <span className="text-green-600">
                    ₹
                    {parseFloat(
                      bookingDetails.flightDetails.price.total
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Amount in USD</span>
                  <span>${amount}</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            onClick={initiatePayPalPayment}
            disabled={loading}
            className={`w-full py-3 px-4 rounded text-white font-semibold ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transition-colors"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Pay with PayPal"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

// import { useState } from "react";

// const PaymentPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState("");

//   const handlePayment = () => {
//     // Implement payment functionality
//     console.log("Payment method:", paymentMethod);
//   };

//   return (
//     <div className="container mx-auto text-center py-16 px-4">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">Payment</h2>
//       <p className="text-lg text-gray-700 mb-4">Choose your payment method:</p>
//       <select
//         value={paymentMethod}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//         className="border-2 border-gray-300 px-4 py-2 rounded-lg mb-4"
//       >
//         <option value="">Select Method</option>
//         <option value="creditCard">Credit Card</option>
//         <option value="paypal">PayPal</option>
//       </select>
//       <div>
//         <button
//           onClick={handlePayment}
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300"
//         >
//           Complete Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
