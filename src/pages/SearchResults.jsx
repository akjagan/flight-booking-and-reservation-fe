import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import FlightSearch from "../components/FlightSearch";
import { apiCall } from "../utils/api";

const SearchResults = () => {
  const navigate = useNavigate(); // Add this hook
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (searchData) => {
    setLoading(true);
    setError("");
    setSearchPerformed(true);

    try {
      const { from, to, date, passengers } = searchData;

      const fromMatch = from.match(/\(([^)]+)\)/);
      const toMatch = to.match(/\(([^)]+)\)/);
      const fromIATA = fromMatch ? fromMatch[1] : "";
      const toIATA = toMatch ? toMatch[1] : "";

      if (!fromIATA || !toIATA) {
        setError(
          "Invalid city selection. Please select cities from the suggestions."
        );
        return;
      }

      const data = await apiCall(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        {
          originLocationCode: fromIATA,
          destinationLocationCode: toIATA,
          departureDate: date,
          adults: parseInt(passengers),
          currencyCode: "INR",
          max: 20,
        },
        "GET"
      );

      if (!data.data || data.data.length === 0) {
        setError("No flights available for the selected route and date.");
        setResults([]);
        return;
      }

      setResults(data.data);
      setError("");
    } catch (error) {
      console.error(
        "Error fetching flight offers:",
        error.response?.data || error
      );
      setError(
        error.response?.data?.detail ||
          "Failed to fetch flight offers. Please try again."
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Add handleFlightSelection function
  // In SearchResults.jsx, update the handleFlightSelection function:

  const handleFlightSelection = (flight) => {
    try {
      const flightData = {
        flight: flight,
        searchDetails: {
          from: flight.itineraries[0].segments[0].departure,
          to: flight.itineraries[0].segments[
            flight.itineraries[0].segments.length - 1
          ].arrival,
          price: flight.price,
          duration: flight.itineraries[0].duration,
          departureTime: flight.itineraries[0].segments[0].departure.at,
          arrivalTime:
            flight.itineraries[0].segments[
              flight.itineraries[0].segments.length - 1
            ].arrival.at,
          airline: flight.itineraries[0].segments[0].carrierCode,
          flightNumber: flight.itineraries[0].segments[0].number,
        },
      };

      // Store in localStorage as backup
      localStorage.setItem("selectedFlightData", JSON.stringify(flightData));

      // Navigate with state
      navigate("/booking-details", {
        state: flightData,
      });
    } catch (error) {
      console.error("Error handling flight selection:", error);
      setError("Unable to process flight selection. Please try again.");
    }
  };

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString();
  };

  const formatDuration = (duration) => {
    return duration.replace("PT", "").toLowerCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FlightSearch onSearch={handleSearch} />

      {error && (
        <div className="max-w-4xl mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="container mx-auto py-8 px-4">
        {searchPerformed && (
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Flight Search Results
          </h2>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {results.map((flight, index) => {
              const itinerary = flight.itineraries[0];
              const firstSegment = itinerary.segments[0];
              const lastSegment =
                itinerary.segments[itinerary.segments.length - 1];

              return (
                <div
                  key={flight.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-700">
                        {firstSegment.departure.iataCode} →{" "}
                        {lastSegment.arrival.iataCode}
                      </h3>
                      <p className="text-gray-600">
                        {formatDateTime(firstSegment.departure.at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ₹
                        {parseFloat(flight.price.total).toLocaleString("en-IN")}{" "}
                        {flight.price.currency}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duration: {formatDuration(itinerary.duration)}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-gray-700">
                      Stops: {itinerary.segments.length - 1}
                    </p>
                    <p className="text-gray-700">
                      Airline: {firstSegment.carrierCode}
                    </p>
                    <p className="text-sm text-gray-500">
                      Flight Number: {firstSegment.number}
                    </p>
                  </div>

                  <button
                    onClick={() => handleFlightSelection(flight)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Select Flight
                  </button>
                </div>
              );
            })}
          </div>
        ) : searchPerformed && !loading ? (
          <div className="text-center text-gray-600 py-12">
            No flights found for your search criteria
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchResults;

// import React, { useState } from "react";
// import FlightSearch from "../components/FlightSearch";
// import { apiCall } from "../utils/api";

// const SearchResults = () => {
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [searchPerformed, setSearchPerformed] = useState(false);

//   const handleSearch = async (searchData) => {
//     setLoading(true);
//     setError("");
//     setSearchPerformed(true);

//     try {
//       const { from, to, date, passengers } = searchData;

//       const fromMatch = from.match(/\(([^)]+)\)/);
//       const toMatch = to.match(/\(([^)]+)\)/);
//       const fromIATA = fromMatch ? fromMatch[1] : "";
//       const toIATA = toMatch ? toMatch[1] : "";

//       if (!fromIATA || !toIATA) {
//         setError(
//           "Invalid city selection. Please select cities from the suggestions."
//         );
//         return;
//       }

//       const data = await apiCall(
//         "https://test.api.amadeus.com/v2/shopping/flight-offers",
//         {
//           originLocationCode: fromIATA,
//           destinationLocationCode: toIATA,
//           departureDate: date,
//           adults: parseInt(passengers),
//           currencyCode: "INR",
//           max: 20,
//         },
//         "GET"
//       );

//       if (!data.data || data.data.length === 0) {
//         setError("No flights available for the selected route and date.");
//         setResults([]);
//         return;
//       }

//       setResults(data.data);
//       setError("");
//     } catch (error) {
//       console.error(
//         "Error fetching flight offers:",
//         error.response?.data || error
//       );
//       setError(
//         error.response?.data?.detail ||
//           "Failed to fetch flight offers. Please try again."
//       );
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDateTime = (dateTimeString) => {
//     return new Date(dateTimeString).toLocaleString();
//   };

//   const formatDuration = (duration) => {
//     return duration.replace("PT", "").toLowerCase();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <FlightSearch onSearch={handleSearch} />

//       {error && (
//         <div className="max-w-4xl mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       <div className="container mx-auto py-8 px-4">
//         {searchPerformed && (
//           <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
//             Flight Search Results
//           </h2>
//         )}

//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
//           </div>
//         ) : results.length > 0 ? (
//           <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
//             {results.map((flight, index) => {
//               const itinerary = flight.itineraries[0];
//               const firstSegment = itinerary.segments[0];
//               const lastSegment =
//                 itinerary.segments[itinerary.segments.length - 1];

//               return (
//                 <div
//                   key={flight.id}
//                   className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//                 >
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="text-xl font-semibold text-blue-700">
//                         {firstSegment.departure.iataCode} →{" "}
//                         {lastSegment.arrival.iataCode}
//                       </h3>
//                       <p className="text-gray-600">
//                         {formatDateTime(firstSegment.departure.at)}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-2xl font-bold text-green-600">
//                         {flight.price.total} {flight.price.currency}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Duration: {formatDuration(itinerary.duration)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="border-t pt-4">
//                     <p className="text-gray-700">
//                       Stops: {itinerary.segments.length - 1}
//                     </p>
//                     <p className="text-gray-700">
//                       Airline: {firstSegment.carrierCode}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Flight Number: {firstSegment.number}
//                     </p>
//                   </div>

//                   <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
//                     Select Flight
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         ) : searchPerformed && !loading ? (
//           <div className="text-center text-gray-600 py-12">
//             No flights found for your search criteria
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;

// import React, { useState } from "react";
// import FlightSearch from "../components/FlightSearch";
// import { apiCall } from "../utils/api";

// const SearchResults = () => {
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (searchData) => {
//     setLoading(true);
//     try {
//       const { from, to, date, passengers } = searchData;

//       const fromMatch = from.match(/\(([^)]+)\)/);
//       const toMatch = to.match(/\(([^)]+)\)/);
//       const fromIATA = fromMatch ? fromMatch[1] : "";
//       const toIATA = toMatch ? toMatch[1] : "";

//       if (!fromIATA || !toIATA) {
//         setError(
//           "Invalid city selection. Please select cities from the suggestions."
//         );
//         setLoading(false);
//         return;
//       }

//       const data = await apiCall(
//         "https://test.api.amadeus.com/v2/shopping/flight-offers",
//         {
//           originLocationCode: fromIATA,
//           destinationLocationCode: toIATA,
//           departureDate: date,
//           adults: passengers,
//         },
//         "GET"
//       );

//       setResults(data.data || []);
//       setError("");
//     } catch (error) {
//       console.error(
//         "Error fetching flight offers:",
//         error.response?.data || error
//       );
//       setError("Failed to fetch flight offers. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Pass the handleSearch function as a prop */}
//       <FlightSearch onSearch={handleSearch} />
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <div className="container mx-auto text-center py-16 px-4">
//         <h2 className="text-3xl font-bold text-blue-700 mb-6">
//           Search Results
//         </h2>
//         {loading ? (
//           <p>Loading...</p>
//         ) : results.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {results.map((flight, index) => (
//               <div
//                 key={index}
//                 className="border-2 border-gray-300 p-4 rounded-lg"
//               >
//                 <h3 className="text-xl font-semibold text-blue-700">
//                   Flight ID: {flight.id}
//                 </h3>
//                 <p className="text-lg text-gray-700">
//                   Price: {flight.price.total} {flight.price.currency}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No flights found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;

// // src/pages/SearchResultsPage.jsx
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const SearchResultsPage = ({ searchParams }) => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (searchParams) {
//       const { from, to, date, passengers } = searchParams;
//       fetchFlights(from, to, date, passengers);
//     }
//   }, [searchParams]);

//   const fetchFlights = async (from, to, date, passengers) => {
//     try {
//       const accessToken = localStorage.getItem("access_token");
//       const response = await axios.get(
//         "https://test.api.amadeus.com/v2/shopping/flight-offers",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//           params: {
//             originLocationCode: from,
//             destinationLocationCode: to,
//             departureDate: date,
//             adults: passengers,
//           },
//         }
//       );
//       setResults(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching flights:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto text-center py-16 px-4">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">Search Results</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {results.map((flight, index) => (
//             <div
//               key={index}
//               className="border-2 border-gray-300 p-4 rounded-lg"
//             >
//               <h3 className="text-xl font-semibold text-blue-700">
//                 {flight.flightName}
//               </h3>
//               <p className="text-lg text-gray-700">{flight.price}</p>
//               <Link
//                 to="/flight-details"
//                 state={{ flightName: flight.flightName }}
//                 className="block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300"
//               >
//                 View Details
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchResultsPage;
