import React from "react";
import UserProfile from "../components/UserProfile";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <UserProfile />
      </div>
    </div>
  );
};

export default ProfilePage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProfilePage = () => {
//   const [user, setUser] = useState({ name: "", email: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   // Handle profile update submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(
//         `/api/users/${user._id}`, // Adjust user ID as needed
//         { name: user.name, email: user.email },
//         {
//           // If using auth, pass the token in the headers (or use another method for auth)
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
//           },
//         }
//       );
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   // Handle navigation to routes page (or any other page)
//   const handleNavigateToRoutes = () => {
//     navigate("/routes");
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block font-medium">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block font-medium">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div className="flex items-center space-x-4">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//           >
//             Save Changes
//           </button>
//           <button
//             type="button"
//             onClick={handleNavigateToRoutes}
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
//           >
//             Back to Routes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import jwtDecode from "jwt-decode"; // Import JWT decoding library

// const ProfilePage = () => {
//   const [user, setUser] = useState({ _id: "", name: "", email: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Fetch user details from the token
//   useEffect(() => {
//     const token = sessionStorage.getItem("authToken");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token); // Decode the token
//         const { id, name, email } = decoded;

//         if (id) {
//           setUser({ _id: id, name: name || "", email: email || "" });
//         } else {
//           handleLogout("User ID is missing. Please log in again.");
//         }
//       } catch (err) {
//         console.error("Failed to decode token:", err);
//         handleLogout("Invalid token. Please log in again.");
//       }
//     } else {
//       handleLogout("Token not found. Please log in again.");
//     }
//   }, [navigate]);

//   // Logout handler
//   const handleLogout = (message) => {
//     setError(message);
//     sessionStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   // Handle profile update submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user._id) {
//       setError("User ID is missing. Unable to update profile.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `/api/users/${user._id}`,
//         { name: user.name, email: user.email },
//         {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
//           },
//         }
//       );
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   // Handle navigation to other pages
//   const handleNavigateToRoutes = () => {
//     navigate("/routes");
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block font-medium">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block font-medium">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div className="flex items-center space-x-4">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//           >
//             Save Changes
//           </button>
//           <button
//             type="button"
//             onClick={handleNavigateToRoutes}
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
//           >
//             Back to Routes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Navigation for React Router v6+
// import jwt_decode from "jwt-decode";
// import axios from "axios";

// const ProfilePage = () => {
//   const [user, setUser] = useState({ name: "", email: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem("authToken");
//     if (token) {
//       try {
//         const decoded = jwt_decode(token);
//         setUser(decoded.user);
//       } catch (err) {
//         console.error("Failed to decode token:", err);
//         setError("Invalid token. Please log in again.");
//         sessionStorage.removeItem("authToken");
//         navigate("/login");
//       }
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/api/users/${user._id}`, user, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
//         },
//       });
//       alert("Profile updated successfully!");
//     } catch (err) {
//       setError("Failed to update profile. Please try again.");
//     }
//   };

//   const handleNavigateToRoutes = () => {
//     navigate("/routes");
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Profile</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="name" className="block font-medium">
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={user.name || ""}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <div>
//           <label htmlFor="email" className="block font-medium">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={user.email || ""}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
//         >
//           Save Changes
//         </button>
//         <button
//           type="button"
//           onClick={handleNavigateToRoutes}
//           className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
//         >
//           Back to Routes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;
