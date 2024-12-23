import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  // Function to handle all input changes dynamically
  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Validation function for email and mobile
  const validateForm = () => {
    const { email, mobile } = newUser;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!mobileRegex.test(mobile)) {
      setError("Mobile number must be 10 digits.");
      return false;
    }
    return true;
  };

  // Function to handle sign-up submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    if (!validateForm()) return;

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/register/`;
      const response = await axios.post(apiUrl, newUser, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("User registered successfully:", response.data);
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto text-center py-16 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Sign Up</h2>

      {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}

      <form onSubmit={handleSignUp} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleChangeEvent}
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChangeEvent}
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={newUser.mobile}
          onChange={handleChangeEvent}
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg"
          required
        />

        <div className="flex justify-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChangeEvent}
              className="mr-2"
              required
            />
            Male
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChangeEvent}
              className="mr-2"
              required
            />
            Female
          </label>
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChangeEvent}
          className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg"
          required
          minLength="6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-gray-600 text-sm">
        Already a User?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignUpPage = () => {
//   const [newUser, setNewUser] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     gender: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   // Function to handle input field changes dynamically
//   const handleChangeEvent = (e, field) => {
//     const { value } = e.target;
//     setNewUser({ ...newUser, [field]: value });
//   };

//   // Function to handle sign-up submission
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       const apiUrl = `${import.meta.env.VITE_API_URL}/register/`;
//       const response = await axios.post(apiUrl, newUser, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("User registered successfully:", response.data);
//       navigate("/login");
//     } catch (error) {
//       console.error("Registration failed:", error.response?.data || error);
//     }
//   };

//   return (
//     <div className="container mx-auto text-center py-16 px-4">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">Sign Up</h2>
//       <form onSubmit={handleSignUp} className="space-y-4 max-w-md mx-auto">
//         <input
//           type="text"
//           placeholder="Name"
//           value={newUser.name}
//           onChange={(e) => handleChangeEvent(e, "name")}
//           className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) => handleChangeEvent(e, "email")}
//           className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Mobile"
//           value={newUser.mobile}
//           onChange={(e) => handleChangeEvent(e, "mobile")}
//           className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg"
//           required
//         />
//         <div className="flex justify-center space-x-4">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="gender"
//               value="Male"
//               onChange={(e) => handleChangeEvent(e, "gender")}
//               className="mr-2"
//               required
//             />
//             Male
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="gender"
//               value="Female"
//               onChange={(e) => handleChangeEvent(e, "gender")}
//               className="mr-2"
//               required
//             />
//             Female
//           </label>
//         </div>
//         <input
//           type="password"
//           placeholder="Password"
//           value={newUser.password}
//           onChange={(e) => handleChangeEvent(e, "password")}
//           className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300"
//         >
//           Sign Up
//         </button>
//       </form>
//       <div className="mt-4 text-gray-600 text-sm">
//         Already a User?{" "}
//         <button
//           onClick={() => navigate("/login")}
//           className="text-blue-600 font-semibold hover:underline"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
