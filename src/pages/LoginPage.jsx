import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      navigate("/flights");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredentials = {
        email,
        password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        userCredentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;

      // Save auth data
      try {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("userEmail", email);
        window.dispatchEvent(new Event("login-success")); 
        navigate("/flights");
        // Optional: Save user role if your backend provides it
        if (response.data.role) {
          sessionStorage.setItem("userRole", response.data.role);
        }
      } catch (storageError) {
        console.error("Failed to save auth data:", storageError);
        setError("Failed to save authentication data. Please try again.");
        return;
      }

      // Clear form
      setEmail("");
      setPassword("");

      // Redirect to flights page
      navigate("/flights");
    } catch (err) {
      console.error("Login failed:", err);

      // Improved error handling
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.response?.status === 429) {
        setError("Too many login attempts. Please try again later.");
      } else if (!navigator.onLine) {
        setError("No internet connection. Please check your network.");
      } else {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto text-center py-16 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Login</h2>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border-2 border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full rounded-lg text-lg font-semibold px-6 py-3 text-white
            transition duration-300
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Logging in...
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="mt-6">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default LoginPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // State to track errors
//   const [loading, setLoading] = useState(false); // State for loading
//   const navigate = useNavigate();

//   // Handle the form submission for login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset any previous errors
//     setLoading(true); // Start loading state

//     try {
//       // Prepare the login credentials
//       const userCredentials = {
//         email,
//         password,
//       };

//       // Debug state values
//       console.log("Email:", email);
//       console.log("Password:", password);

//       // Debug API URL
//       console.log("API URL:", `${import.meta.env.VITE_API_URL}/login`);

//       // Send POST request to the backend for login
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/login`,
//         userCredentials,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Handle successful login
//       console.log("Response data:", response.data); // Debug response
//       const { token } = response.data;

//       // Securely save JWT token
//       try {
//         sessionStorage.setItem("authToken", token);
//         console.log("Auth Token saved:", token);
//       } catch (storageError) {
//         console.error("Failed to save token:", storageError);
//       }

//       // Redirect to the flight search page after login (bypassing profile)
//       navigate("/flights");
//     } catch (err) {
//       // Handle errors, e.g., invalid credentials
//       console.error("Login failed:", err.response?.data || err.message);
//       setError(
//         err.response?.data?.message || "Failed to log in. Please try again."
//       );
//     } finally {
//       setLoading(false); // Stop loading state
//     }
//   };

//   return (
//     <div className="container mx-auto text-center py-16 px-4">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">Login</h2>

//       {/* Display error message if there's any */}
//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="border-2 border-gray-300 px-4 py-2 rounded-lg mb-4 w-full"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="border-2 border-gray-300 px-4 py-2 rounded-lg mb-4 w-full"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
//           } text-white px-6 py-3 rounded-lg text-lg font-semibold w-full hover:bg-blue-500 transition duration-300`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p className="mt-4">
//         Don't have an account?{" "}
//         <span
//           onClick={() => navigate("/register")}
//           className="text-blue-600 cursor-pointer hover:underline"
//         >
//           Sign up
//         </span>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // State to track errors
//   const [loading, setLoading] = useState(false); // State for loading
//   const navigate = useNavigate();

//   // Handle the form submission for login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset any previous errors
//     setLoading(true); // Start loading state

//     try {
//       // Prepare the login credentials
//       const userCredentials = {
//         email,
//         password,
//       };

//       // Debug state values
//       console.log("Email:", email);
//       console.log("Password:", password);

//       // Debug API URL
//       console.log("API URL:", `${import.meta.env.VITE_API_URL}/login`);

//       // Send POST request to the backend for login
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/login`,
//         userCredentials,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Handle successful login
//       console.log("Response data:", response.data); // Debug response
//       const { token } = response.data;

//       // Securely save JWT token
//       try {
//         sessionStorage.setItem("authToken", token);
//         console.log("Auth Token saved:", token);
//       } catch (storageError) {
//         console.error("Failed to save token:", storageError);
//       }

//       // Redirect to profile page after login
//       navigate("/profile");
//     } catch (err) {
//       // Handle errors, e.g., invalid credentials
//       console.error("Login failed:", err.response?.data || err.message);
//       setError(
//         err.response?.data?.message || "Failed to log in. Please try again."
//       );
//     } finally {
//       setLoading(false); // Stop loading state
//     }
//   };

//   return (
//     <div className="container mx-auto text-center py-16 px-4">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">Login</h2>

//       {/* Display error message if there's any */}
//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="border-2 border-gray-300 px-4 py-2 rounded-lg mb-4 w-full"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="border-2 border-gray-300 px-4 py-2 rounded-lg mb-4 w-full"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
//           } text-white px-6 py-3 rounded-lg text-lg font-semibold w-full hover:bg-blue-500 transition duration-300`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p className="mt-4">
//         Don't have an account?{" "}
//         <span
//           onClick={() => navigate("/register")}
//           className="text-blue-600 cursor-pointer hover:underline"
//         >
//           Sign up
//         </span>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // State to track errors
//   const [loading, setLoading] = useState(false); // State for loading
//   const navigate = useNavigate();

//   // Handle the form submission for login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Reset any previous errors
//     setLoading(true); // Start loading state

//     try {
//       // Prepare the login credentials
//       const userCredentials = {
//         email,
//         password,
//       };

//       // Send POST request to the backend for login
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/login`,
//         userCredentials,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Handle successful login
//       const { token } = response.data;
//       sessionStorage.setItem("authToken", token); // Save JWT token in sessionStorage
//       navigate("/profile"); // Redirect to profile page after login
//     } catch (err) {
//       // Handle errors, e.g., invalid credentials
//       console.error("Login failed:", err.response?.data || err.message);
//       setError(
//         err.response?.data?.message || "Failed to log in. Please try again."
//       );
//     } finally {
//       setLoading(false); // Stop loading state
//     }
//   };

//   return (
//     <div className="container mx-auto text-center py-16 px-4">
//       <h2 className="text-3xl font-bold text-blue-700 mb-6">Login</h2>

//       {/* Display error message if there's any */}
//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="border-2 border-gray-300 px-4 py-2 rounded-lg mb-4"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="border-2 border-gray-300 px-4 py-2 rounded-lg mb-4"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`${
//             loading ? "bg-gray-400" : "bg-blue-600"
//           } text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 transition duration-300`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p className="mt-4">
//         Don't have an account?{" "}
//         <span
//           onClick={() => navigate("/register")}
//           className="text-blue-600 cursor-pointer hover:underline"
//         >
//           Sign up
//         </span>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;
