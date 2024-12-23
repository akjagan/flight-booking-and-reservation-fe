// components/AnalyticsDashboard.jsx
import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [dateRange, setDateRange] = useState("month");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    averageBookingValue: 0,
    cancellationRate: 0,
  });

  useEffect(() => {
    fetchBookingData();
  }, [dateRange]);

  const fetchBookingData = () => {
    try {
      // For demo purposes, getting data from localStorage
      const bookingsData = JSON.parse(localStorage.getItem("bookings") || "[]");
      setBookings(bookingsData);
      calculateMetrics(bookingsData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch booking data");
      setLoading(false);
    }
  };

  const calculateMetrics = (bookingsData) => {
    const totalBookings = bookingsData.length;
    const totalRevenue = bookingsData.reduce(
      (sum, booking) => sum + parseFloat(booking.totalAmount || 0),
      0
    );
    const cancelledBookings = bookingsData.filter(
      (booking) => booking.status === "CANCELLED"
    ).length;

    setMetrics({
      totalBookings,
      totalRevenue,
      averageBookingValue: totalBookings ? totalRevenue / totalBookings : 0,
      cancellationRate: totalBookings
        ? (cancelledBookings / totalBookings) * 100
        : 0,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Date Range Selector */}
      <div className="p-6 border-b">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last 12 Months</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">
            Total Bookings
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {metrics.totalBookings}
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-green-600">
            ₹{metrics.totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800">
            Average Booking Value
          </h3>
          <p className="text-3xl font-bold text-yellow-600">
            ₹{metrics.averageBookingValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800">
            Cancellation Rate
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {metrics.cancellationRate.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Booking Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Booking Trends</h3>
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Number of Bookings",
                  data: [12, 19, 3, 5, 2, 3],
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
          />
        </div>

        {/* Popular Routes Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Popular Routes</h3>
          <Bar
            data={{
              labels: ["Route 1", "Route 2", "Route 3", "Route 4", "Route 5"],
              datasets: [
                {
                  label: "Number of Bookings",
                  data: [65, 59, 80, 81, 56],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.bookingId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`${booking.from} to ${booking.to}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ₹{booking.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "CANCELLED"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
