// src/components/FlightDetails.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const FlightDetails = () => {
  const { state } = useLocation(); // Get the passed data from SearchResultsPage
  const { flightName } = state || {};

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Flight Details</h2>
      <div className="border-2 border-gray-300 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-700">{flightName}</h3>
        <p className="text-lg text-gray-700">
          Detailed flight information will be shown here.
        </p>
        {/* Add more details as required */}
      </div>
    </div>
  );
};

export default FlightDetails;
