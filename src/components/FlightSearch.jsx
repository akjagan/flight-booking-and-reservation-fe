import React, { useState, useCallback, useRef, useEffect } from "react"; // Added useRef and useEffect
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { apiCall } from "../utils/api";

const FlightSearch = ({ onSearch }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(""); // Track which input is active
  const [error, setError] = useState("");

  // Refs for detecting clicks outside
  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fromDropdownRef.current &&
        !fromDropdownRef.current.contains(event.target)
      ) {
        if (activeInput === "from") setActiveInput("");
      }
      if (
        toDropdownRef.current &&
        !toDropdownRef.current.contains(event.target)
      ) {
        if (activeInput === "to") setActiveInput("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeInput]);

  const debouncedFetchCities = useCallback(
    debounce(async (value) => {
      if (value.length < 2) {
        setCitySuggestions([]);
        return;
      }
      try {
        const data = await apiCall(
          "https://test.api.amadeus.com/v1/reference-data/locations",
          {
            keyword: value,
            subType: "CITY",
          }
        );
        setCitySuggestions(data.data || []);
      } catch (error) {
        console.error("Error fetching cities:", error.response?.data || error);
        setError("Failed to fetch city suggestions. Try again later.");
      }
    }, 500),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (name === "from" || name === "to") {
      setActiveInput(name); // Set active input
      debouncedFetchCities(value);
    }
  };

  const handleCitySelect = (name, cityName, iataCode) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: `${cityName} (${iataCode})`,
    }));
    setActiveInput(""); // Clear active input
    setCitySuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.from && form.to) {
      setError("");
      try {
        // Extract IATA codes
        const fromMatch = form.from.match(/\(([^)]+)\)/);
        const toMatch = form.to.match(/\(([^)]+)\)/);

        if (!fromMatch || !toMatch) {
          setError("Please select cities from the suggestions.");
          return;
        }

        const searchData = {
          from: form.from,
          to: form.to,
          date: form.date,
          passengers: parseInt(form.passengers),
        };

        if (typeof onSearch === "function") {
          await onSearch(searchData);
        }

        navigate("/search-results", { state: { searchData } });
      } catch (error) {
        console.error("Error during search:", error);
        setError("An error occurred during search. Please try again.");
      }
    } else {
      setError("Both departure and destination cities are required.");
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Search Flights
        </h2>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="mb-4 relative" ref={fromDropdownRef}>
          <label className="block text-gray-700 mb-1">From:</label>
          <input
            type="text"
            name="from"
            value={form.from}
            onChange={handleChange}
            onFocus={() => setActiveInput("from")}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter departure city"
            required
          />
          {form.from &&
            citySuggestions.length > 0 &&
            activeInput === "from" && (
              <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-y-auto z-10">
                {citySuggestions.map((city) => (
                  <li
                    key={city.id}
                    onClick={() =>
                      handleCitySelect(
                        "from",
                        city.address.cityName,
                        city.iataCode
                      )
                    }
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {city.address.cityName} ({city.iataCode})
                  </li>
                ))}
              </ul>
            )}
        </div>
        <div className="mb-4 relative" ref={toDropdownRef}>
          <label className="block text-gray-700 mb-1">To:</label>
          <input
            type="text"
            name="to"
            value={form.to}
            onChange={handleChange}
            onFocus={() => setActiveInput("to")}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter destination city"
            required
          />
          {form.to && citySuggestions.length > 0 && activeInput === "to" && (
            <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-y-auto z-10">
              {citySuggestions.map((city) => (
                <li
                  key={city.id}
                  onClick={() =>
                    handleCitySelect("to", city.address.cityName, city.iataCode)
                  }
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {city.address.cityName} ({city.iataCode})
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Date:</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            min={new Date().toISOString().split("T")[0]} // Set minimum date to today
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Passengers:</label>
          <input
            type="number"
            name="passengers"
            value={form.passengers}
            onChange={handleChange}
            min="1"
            max="9" // Added maximum limit
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          {form.passengers > 9 && (
            <p className="text-red-500 text-sm mt-1">
              Maximum 9 passengers allowed
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={form.passengers > 9} // Disable if passengers exceed limit
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default FlightSearch;

// import React, { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import debounce from "lodash.debounce";
// import { apiCall } from "../utils/api";

// const FlightSearch = ({ onSearch }) => {
//   const navigate = useNavigate(); // Initialize navigate hook
//   const [form, setForm] = useState({
//     from: "",
//     to: "",
//     date: "",
//     passengers: 1,
//   });
//   const [citySuggestions, setCitySuggestions] = useState([]);
//   const [error, setError] = useState("");

//   const debouncedFetchCities = useCallback(
//     debounce(async (value) => {
//       if (value.length < 2) {
//         setCitySuggestions([]);
//         return;
//       }
//       try {
//         const data = await apiCall(
//           "https://test.api.amadeus.com/v1/reference-data/locations",
//           {
//             keyword: value,
//             subType: "CITY",
//           }
//         );
//         setCitySuggestions(data.data || []);
//       } catch (error) {
//         console.error("Error fetching cities:", error.response?.data || error);
//         setError("Failed to fetch city suggestions. Try again later.");
//       }
//     }, 500),
//     []
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prevForm) => ({ ...prevForm, [name]: value }));
//     if (name === "from" || name === "to") {
//       debouncedFetchCities(value);
//     }
//   };

//   const handleCitySelect = (name, cityName, iataCode) => {
//     setForm((prevForm) => ({
//       ...prevForm,
//       [name]: `${cityName} (${iataCode})`,
//     }));
//     setCitySuggestions([]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (form.from && form.to) {
//       setError(""); // Clear error on valid submission
//       onSearch(form); // Correctly invoke the onSearch function
//       navigate("/search-results"); // Navigate to the search results page
//     } else {
//       setError("Both departure and destination cities are required.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Search Flights
//         </h2>
//         <div className="mb-4 relative">
//           <label className="block text-gray-700 mb-1">From:</label>
//           <input
//             type="text"
//             name="from"
//             value={form.from}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded"
//             placeholder="Enter departure city"
//             required
//           />
//           {form.from && citySuggestions.length > 0 && (
//             <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-y-auto z-10">
//               {citySuggestions.map((city) => (
//                 <li
//                   key={city.id}
//                   onClick={() =>
//                     handleCitySelect(
//                       "from",
//                       city.address.cityName,
//                       city.iataCode
//                     )
//                   }
//                   className="p-2 cursor-pointer hover:bg-gray-100"
//                 >
//                   {city.address.cityName} ({city.iataCode})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <div className="mb-4 relative">
//           <label className="block text-gray-700 mb-1">To:</label>
//           <input
//             type="text"
//             name="to"
//             value={form.to}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded"
//             placeholder="Enter destination city"
//             required
//           />
//           {form.to && citySuggestions.length > 0 && (
//             <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-y-auto z-10">
//               {citySuggestions.map((city) => (
//                 <li
//                   key={city.id}
//                   onClick={() =>
//                     handleCitySelect("to", city.address.cityName, city.iataCode)
//                   }
//                   className="p-2 cursor-pointer hover:bg-gray-100"
//                 >
//                   {city.address.cityName} ({city.iataCode})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Passengers:</label>
//           <input
//             type="number"
//             name="passengers"
//             value={form.passengers}
//             min="1"
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };
// export default FlightSearch;
