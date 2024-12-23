import React, { useState } from "react";

const UserProfile = () => {
  // Dummy initial user data
  const [user, setUser] = useState({
    name: "Ganishwar Arun",
    email: "ganishwararunIndian.com", 
    mobile: "9789909345",
    gender: "male",
    dob: "1994-12-19",
  });

  // Dummy initial booking data
  const [bookings] = useState([
    {
      _id: "1",
      bookingId: "BK001",
      from: "New York",
      to: "Chennai",
      date: "2024-01-15",
      status: "confirmed",
      price: "$500",
    },
    {
      _id: "2",
      bookingId: "BK002",
      from: "Chennai",
      to: "Tokyo",
      date: "2024-02-20",
      status: "cancelled",
      price: "$750",
    },
    {
      _id: "3",
      bookingId: "BK003",
      from: "Dubai",
      to: "Singapore",
      date: "2024-03-10",
      status: "pending",
      price: "$600",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent email modification
    if (name === "email") return;
    // Only allow digits for mobile
    if (name === "mobile" && !/^\d*$/.test(value)) return;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", user);
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Email 
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    // disabled={true}
                    className="w-full px-4 py-2 border rounded bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={user.mobile}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Additional Information
                </h2>
                <div>
                  <label className="block text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={user.dob}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {/* Booking History */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Booking History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
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
                        {`${booking.from} → ${booking.to}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {booking.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "cancelled"
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
      </div>
    </div>
  );
};

export default UserProfile;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     gender: "",
//     dob: "",
//   });
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     const token = sessionStorage.getItem("authToken");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://flight-booking-and-reservation.onrender.com/api/user/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data && response.data.user) {
//         const userData = response.data.user;
//         setUser({
//           ...userData,
//           dob: userData.dob
//             ? new Date(userData.dob).toISOString().split("T")[0]
//             : "",
//         });
//         fetchBookings(token);
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       toast.error("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchBookings = async (token) => {
//     try {
//       const response = await axios.get(
//         "https://flight-booking-and-reservation.onrender.com/api/bookings/user",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setBookings(response.data || []);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//       toast.error("Failed to load booking history");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "mobile" && !/^\d*$/.test(value)) return; // Only allow digits
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = sessionStorage.getItem("authToken");
//     if (!token) return;

//     try {
//       await axios.put(
//         "https://flight-booking-and-reservation.onrender.com/api/user/profile",
//         user,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Profile updated successfully!");
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       toast.error("Failed to update profile");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         {/* Header */}
//         <div className="bg-blue-600 text-white px-6 py-4">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-bold">My Profile</h1>
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100"
//             >
//               {isEditing ? "Cancel" : "Edit Profile"}
//             </button>
//           </div>
//         </div>

//         {/* Profile Form */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Personal Information */}
//               <div className="space-y-4">
//                 <h2 className="text-xl font-semibold">Personal Information</h2>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={user.name}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                     className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={user.email}
//                     disabled={true}
//                     className="w-full px-4 py-2 border rounded bg-gray-50"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Mobile</label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     value={user.mobile}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                     className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//                   />
//                 </div>
//               </div>

//               {/* Additional Information */}
//               <div className="space-y-4">
//                 <h2 className="text-xl font-semibold">
//                   Additional Information
//                 </h2>
//                 <div>
//                   <label className="block text-gray-700 mb-2">Gender</label>
//                   <select
//                     name="gender"
//                     value={user.gender}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                     className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-2">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={user.dob}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                     className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Save Button */}
//             {isEditing && (
//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </form>

//           {/* Booking History */}
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold mb-4">Booking History</h2>
//             {bookings.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Booking ID
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Flight
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Date
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                         Status
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {bookings.map((booking) => (
//                       <tr key={booking._id}>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {booking.bookingId}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {`${booking.from} to ${booking.to}`}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           {new Date(booking.date).toLocaleDateString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span
//                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                               ${
//                                 booking.status === "confirmed"
//                                   ? "bg-green-100 text-green-800"
//                                   : booking.status === "cancelled"
//                                   ? "bg-red-100 text-red-800"
//                                   : "bg-yellow-100 text-yellow-800"
//                               }`}
//                           >
//                             {booking.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-gray-500">No booking history available.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const UserProfile = () => {
//   const [user, setUser] = useState({});
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = sessionStorage.getItem("authToken");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await axios.get("/api/user/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Format date for input field
//         const userData = response.data.user;
//         if (userData.dob) {
//           userData.dob = new Date(userData.dob).toISOString().split("T")[0];
//         }

//         setUser(userData);
//         fetchBookings(token);
//       } catch (err) {
//         setError("Failed to fetch user data");
//         toast.error("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const fetchBookings = async (token) => {
//     try {
//       const response = await axios.get("/api/bookings/user", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBookings(response.data);
//     } catch (err) {
//       console.error("Failed to fetch bookings:", err);
//       toast.error("Failed to load booking history");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "mobile" && !/^\d*$/.test(value)) {
//       return; // Only allow digits
//     }
//     setUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = sessionStorage.getItem("authToken");
//     setIsUpdating(true);

//     try {
//       await axios.put("/api/user/profile", user, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Profile updated successfully!");
//       setIsEditing(false);
//     } catch (err) {
//       setError("Failed to update profile");
//       toast.error("Failed to update profile");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       {/* Profile Header */}
//       <div className="bg-blue-600 text-white px-6 py-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">My Profile</h1>
//           <button
//             onClick={() => setIsEditing(!isEditing)}
//             className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors"
//           >
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </button>
//         </div>
//       </div>

//       {error && <div className="bg-red-100 text-red-600 p-4">{error}</div>}

//       <div className="p-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Personal Information */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Personal Information</h2>

//               <div>
//                 <label className="block text-gray-700 mb-2">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={user.name}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={user.email}
//                   onChange={handleChange}
//                   disabled={true} // Email should not be editable
//                   className="w-full px-4 py-2 border rounded bg-gray-50"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-2">Mobile</label>
//                 <input
//                   type="tel"
//                   name="mobile"
//                   value={user.mobile}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Additional Information */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Additional Information</h2>

//               <div>
//                 <label className="block text-gray-700 mb-2">Gender</label>
//                 <select
//                   name="gender"
//                   value={user.gender}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//                   required
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-2">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   name="dob"
//                   value={user.dob || ""}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           {isEditing && (
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="submit"
//                 disabled={isUpdating}
//                 className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-green-300"
//               >
//                 {isUpdating ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           )}
//         </form>

//         {/* Booking History */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4">Booking History</h2>
//           {bookings.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Booking ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Flight
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {bookings.map((booking) => (
//                     <tr key={booking._id}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {booking.bookingId}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {`${booking.from} to ${booking.to}`}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {new Date(booking.date).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span
//                           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
//                             ${
//                               booking.status === "confirmed"
//                                 ? "bg-green-100 text-green-800"
//                                 : booking.status === "cancelled"
//                                 ? "bg-red-100 text-red-800"
//                                 : "bg-yellow-100 text-yellow-800"
//                             }`}
//                         >
//                           {booking.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-gray-500">No booking history available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
