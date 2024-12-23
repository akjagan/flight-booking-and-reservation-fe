// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const paymentId = localStorage.getItem("pending_payment_id");
      const bookingReference = localStorage.getItem(
        "pending_booking_reference"
      );

      if (!paymentId || !bookingReference) {
        setError("Payment verification failed");
        return;
      }

      try {
        // Update booking status
        const existingBookings = JSON.parse(
          localStorage.getItem("bookings") || "[]"
        );
        const updatedBookings = existingBookings.map((booking) => {
          if (booking.bookingReference === bookingReference) {
            return {
              ...booking,
              paymentStatus: "PAID",
              paymentMethod: "PayPal",
              paymentDate: new Date().toISOString(),
              paymentId,
            };
          }
          return booking;
        });

        localStorage.setItem("bookings", JSON.stringify(updatedBookings));

        // Clear pending payment data
        localStorage.removeItem("pending_payment_id");
        localStorage.removeItem("pending_booking_reference");

        // Navigate to booking confirmation
        navigate("/booking-confirmation");
      } catch (error) {
        setError("Failed to verify payment");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => navigate("/payment")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;
