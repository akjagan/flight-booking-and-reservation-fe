import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(savedBookings);
  }, []);

  const handleCancelBooking = (bookingReference) => {
    const updatedBookings = bookings.map((booking) =>
      booking.bookingReference === bookingReference
        ? { ...booking, bookingStatus: "CANCELLED" }
        : booking
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
  };

  const handlePrintBooking = (booking) => {
    const printContent = `
      FLIGHT BOOKING CONFIRMATION
      --------------------------
      Booking Reference: ${booking.bookingReference}
      Booking Date: ${new Date(booking.bookingDate).toLocaleDateString()}
      Status: ${booking.bookingStatus}

      PASSENGER DETAILS
      ----------------
      Name: ${booking.passengerDetails.firstName} ${
      booking.passengerDetails.lastName
    }
      Email: ${booking.passengerDetails.email}
      Phone: ${booking.passengerDetails.phone || "N/A"}
      
      FLIGHT DETAILS
      -------------
      From: ${
        booking.flightDetails.itineraries[0].segments[0].departure.iataCode
      }
      To: ${
        booking.flightDetails.itineraries[0].segments[
          booking.flightDetails.itineraries[0].segments.length - 1
        ].arrival.iataCode
      }
      Departure: ${new Date(
        booking.flightDetails.itineraries[0].segments[0].departure.at
      ).toLocaleString()}
      Arrival: ${new Date(
        booking.flightDetails.itineraries[0].segments[
          booking.flightDetails.itineraries[0].segments.length - 1
        ].arrival.at
      ).toLocaleString()}
      
      PAYMENT DETAILS
      --------------
      Total Amount: ₹${parseFloat(
        booking.flightDetails.price.total
      ).toLocaleString("en-IN")}
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Booking Confirmation - ${booking.bookingReference}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <pre>${printContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p>No bookings found</p>
            <button
              onClick={() => navigate("/search-results")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Book a Flight
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.bookingReference}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700">
                      Booking Reference: {booking.bookingReference}
                    </h3>
                    <p className="text-gray-600">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">
                      ₹
                      {parseFloat(
                        booking.flightDetails.price.total
                      ).toLocaleString("en-IN")}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        booking.bookingStatus === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600">Passenger</p>
                      <p className="font-semibold">
                        {booking.passengerDetails.firstName}{" "}
                        {booking.passengerDetails.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Contact</p>
                      <p className="font-semibold">
                        {booking.passengerDetails.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handlePrintBooking(booking)}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200"
                    >
                      Print/Download
                    </button>
                    {booking.bookingStatus !== "CANCELLED" && (
                      <button
                        onClick={() =>
                          handleCancelBooking(booking.bookingReference)
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;

// import React, { useState, useEffect } from "react";

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     // Fetch bookings from localStorage (replace with API call in production)
//     const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
//     setBookings(savedBookings);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
//           My Bookings
//         </h2>

//         {bookings.length === 0 ? (
//           <div className="text-center text-gray-600 py-12">
//             No bookings found
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {bookings.map((booking, index) => (
//               <div
//                 key={booking.bookingReference}
//                 className="bg-white rounded-lg shadow-md p-6"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-semibold text-blue-700">
//                       Booking Reference: {booking.bookingReference}
//                     </h3>
//                     <p className="text-gray-600">
//                       {new Date(booking.bookingDate).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-lg font-semibold text-green-600">
//                       ₹
//                       {parseFloat(
//                         booking.flightDetails.price.total
//                       ).toLocaleString("en-IN")}
//                     </p>
//                     <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                       {booking.bookingStatus}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="border-t pt-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-gray-600">Passenger</p>
//                       <p className="font-semibold">
//                         {booking.passengerDetails.firstName}{" "}
//                         {booking.passengerDetails.lastName}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-gray-600">Contact</p>
//                       <p className="font-semibold">
//                         {booking.passengerDetails.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Bookings;
