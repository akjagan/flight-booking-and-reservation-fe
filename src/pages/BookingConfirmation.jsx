import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingConfirmation = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get booking details from localStorage (since this is for study purposes)
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const latestBooking = bookings[bookings.length - 1];

    if (!latestBooking) {
      toast.error("No booking found");
      navigate("/");
      return;
    }

    setBookingDetails(latestBooking);
  }, [navigate]);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Success Header */}
          <div className="bg-green-500 text-white px-6 py-8 text-center">
            <div className="mb-4">
              <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
            <p className="mt-2">Your flight has been successfully booked</p>
          </div>

          {/* Booking Information */}
          <div className="p-6">
            {/* Booking Reference */}
            <div className="mb-8 text-center">
              <p className="text-gray-600">Booking Reference</p>
              <p className="text-2xl font-bold text-blue-600">
                {bookingDetails.bookingReference}
              </p>
            </div>

            {/* Flight Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
                Flight Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-gray-600">From</p>
                    <p className="font-semibold text-lg">
                      {bookingDetails.departureCity}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Departure</p>
                    <p className="font-semibold">
                      {new Date(
                        bookingDetails.departureDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="font-semibold">
                      {bookingDetails.departureTime}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <p className="text-gray-600">To</p>
                    <p className="font-semibold text-lg">
                      {bookingDetails.arrivalCity}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Arrival</p>
                    <p className="font-semibold">
                      {new Date(
                        bookingDetails.arrivalDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="font-semibold">
                      {bookingDetails.arrivalTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
                Passenger Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-semibold">
                    {bookingDetails.passengerName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold">{bookingDetails.email}</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
                Payment Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600">Amount Paid</p>
                  <p className="font-semibold text-lg">
                    ₹{bookingDetails.totalAmount}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Status</p>
                  <p className="font-semibold text-green-600">
                    {bookingDetails.paymentStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-blue-50 p-4 rounded-lg mb-8">
              <h3 className="font-semibold text-blue-800 mb-2">
                Important Information
              </h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Please arrive at the airport 2 hours before departure</li>
                <li>• Carry a valid photo ID for verification</li>
                <li>• Check-in closes 45 minutes before departure</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                  />
                </svg>
                Print Ticket
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
