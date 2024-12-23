// pages/ReportsAnalytics.jsx
import React from "react";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

const ReportsAnalytics = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Reports & Analytics
        </h1>
        <AnalyticsDashboard />
      </div>
    </div>
  );
};

export default ReportsAnalytics;
