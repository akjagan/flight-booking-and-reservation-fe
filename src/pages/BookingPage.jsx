import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Try to get flight data from location state first
    if (location.state?.flight && location.state?.searchDetails) {
      setFlightData(location.state);
    } else {
      // If not in state, try localStorage
      const savedFlightData = localStorage.getItem("selectedFlightData");
      if (savedFlightData) {
        setFlightData(JSON.parse(savedFlightData));
      } else {
        // If no flight data is found, redirect to search
        navigate("/search-results");
      }
    }
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (
      !passengerDetails.firstName ||
      !passengerDetails.lastName ||
      !passengerDetails.email
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const bookingDetails = {
        flightDetails: flightData.flight,
        passengerDetails,
        bookingDate: new Date().toISOString(),
        bookingStatus: "PENDING", // Changed from CONFIRMED to PENDING
        bookingReference: Math.random()
          .toString(36)
          .substring(2, 10)
          .toUpperCase(),
      };

      // Store booking
      const existingBookings = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );
      localStorage.setItem(
        "bookings",
        JSON.stringify([...existingBookings, bookingDetails])
      );

      // Clear selected flight data
      localStorage.removeItem("selectedFlightData");

      // Navigate to payment page instead of bookings
      navigate("/payment", { state: { bookingDetails } });
    } catch (error) {
      setError("Failed to process booking. Please try again.");
    }
  };


  const confirmBooking = (e) => {
    e.preventDefault();

    if (
      !passengerDetails.firstName ||
      !passengerDetails.lastName ||
      !passengerDetails.email
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (
      window.confirm(
        "Please confirm your booking details before proceeding. Do you want to continue?"
      )
    ) {
      handleBooking(e);
    }
  };

  if (!flightData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Complete Your Booking
        </h2>

        {/* Flight Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Flight Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">From - To</p>
              <p className="font-semibold">
                {flightData.searchDetails.from.iataCode} →{" "}
                {flightData.searchDetails.to.iataCode}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Price</p>
              <p className="font-semibold text-green-600">
                ₹
                {parseFloat(
                  flightData.searchDetails.price.total
                ).toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Departure</p>
              <p className="font-semibold">
                {new Date(
                  flightData.searchDetails.departureTime
                ).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Arrival</p>
              <p className="font-semibold">
                {new Date(
                  flightData.searchDetails.arrivalTime
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Passenger Details Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Passenger Details</h3>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={confirmBooking} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={passengerDetails.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={passengerDetails.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={passengerDetails.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={passengerDetails.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={passengerDetails.dateOfBirth}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;

// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const BookingDetailsPage = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [passengerDetails, setPassengerDetails] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     dateOfBirth: "",
//   });
//   const [error, setError] = useState("");

//   // Redirect if no flight is selected
//   if (!state?.flight) {
//     navigate("/search-results");
//     return null;
//   }

//   const { flight, searchDetails } = state;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPassengerDetails((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleBooking = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (
//       !passengerDetails.firstName ||
//       !passengerDetails.lastName ||
//       !passengerDetails.email
//     ) {
//       setError("Please fill in all required fields");
//       return;
//     }

//     // Store booking details
//     const bookingDetails = {
//       flightDetails: flight,
//       passengerDetails,
//       bookingDate: new Date().toISOString(),
//       bookingStatus: "CONFIRMED",
//       bookingReference: Math.random()
//         .toString(36)
//         .substring(2, 10)
//         .toUpperCase(),
//     };

//     // Store in localStorage (you can replace this with your backend API call)
//     const existingBookings = JSON.parse(
//       localStorage.getItem("bookings") || "[]"
//     );
//     localStorage.setItem(
//       "bookings",
//       JSON.stringify([...existingBookings, bookingDetails])
//     );

//     // Navigate to booking confirmation
//     navigate("/booking-confirmation", { state: { bookingDetails } });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
//           Complete Your Booking
//         </h2>

//         {/* Flight Summary */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <h3 className="text-xl font-semibold mb-4">Flight Summary</h3>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-gray-600">From - To</p>
//               <p className="font-semibold">
//                 {searchDetails.from.iataCode} → {searchDetails.to.iataCode}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600">Price</p>
//               <p className="font-semibold text-green-600">
//                 ₹{parseFloat(searchDetails.price.total).toLocaleString("en-IN")}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Passenger Details Form */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-xl font-semibold mb-4">Passenger Details</h3>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleBooking} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={passengerDetails.firstName}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-2">Last Name *</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={passengerDetails.lastName}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 rounded px-3 py-2"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2">Email *</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={passengerDetails.email}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2">Phone Number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={passengerDetails.phone}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-2">Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={passengerDetails.dateOfBirth}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded px-3 py-2"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition-colors"
//             >
//               Confirm Booking
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsPage;

// import { useState } from "react";
// import { useLocation } from "react-router-dom";

// const BookingDetailsPage = () => {
//   const { state } = useLocation(); // To receive flight details from search
//   const [passengerName, setPassengerName] = useState("");

//   const handleBooking = () => {
//     // Handle the booking logic here
//     console.log(`Booking flight for: ${passengerName}`);
//   };

//   return (
//     <div className="container mx-auto text-center py-16 px-4">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">Booking Details</h2>
//       <p className="text-lg text-gray-700 mb-4">
//         Flight Details: {state?.flightName || "No flight details available"}
//       </p>
//       <input
//         type="text"
//         placeholder="Enter Passenger Name"
//         value={passengerName}
//         onChange={(e) => setPassengerName(e.target.value)}
//         className="border-2 border-gray-300 px-4 py-2 rounded-lg mb-4"
//       />
//       <button
//         onClick={handleBooking}
//         className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300"
//       >
//         Confirm Booking
//       </button>
//     </div>
//   );
// };

// export default BookingDetailsPage;
