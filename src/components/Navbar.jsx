import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isManageBookingOpen, setIsManageBookingOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const manageBookingRef = useRef(null);
  const analyticsRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("authToken") ? true : false
  );

  useEffect(() => {
    const checkAuth = () => {
      const authToken = sessionStorage.getItem("authToken");
      setIsAuthenticated(!!authToken);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("login-success", checkAuth);

    const handleClickOutside = (event) => {
      if (
        manageBookingRef.current &&
        !manageBookingRef.current.contains(event.target)
      ) {
        setIsManageBookingOpen(false);
      }
      if (
        analyticsRef.current &&
        !analyticsRef.current.contains(event.target)
      ) {
        setIsAnalyticsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("login-success", checkAuth);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-6">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img
              src="/flight logo.png"
              alt="Passengers Airline Logo"
              className="h-10 w-10"
            />
            <h1 className="text-xl font-bold">
              <Link to="/">Passengers Flight Booking</Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/flights"
                  className="hover:text-gray-300 transition-colors"
                >
                  Flights
                </Link>
              </li>

              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/bookings"
                      className="hover:text-gray-300 transition-colors"
                    >
                      My Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/flight-details"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Flight Details
                    </Link>
                  </li>

                  {/* Manage Booking Dropdown */}
                  <li className="relative" ref={manageBookingRef}>
                    <button
                      onClick={() => {
                        setIsManageBookingOpen(!isManageBookingOpen);
                        setIsAnalyticsOpen(false);
                      }}
                      className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
                    >
                      <span>Manage Booking</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isManageBookingOpen ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isManageBookingOpen && (
                      <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <li>
                          <Link
                            to="/payment"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Make Payment
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/payment-cancel"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Cancel Booking
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/booking-details"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Booking Details
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* Analytics Dropdown */}
                  <li className="relative" ref={analyticsRef}>
                    <button
                      onClick={() => {
                        setIsAnalyticsOpen(!isAnalyticsOpen);
                        setIsManageBookingOpen(false);
                      }}
                      className="flex items-center space-x-1 hover:text-gray-300 transition-colors"
                    >
                      <span>Analytics</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isAnalyticsOpen ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isAnalyticsOpen && (
                      <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <li>
                          <Link
                            to="/reports"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Reports
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/booking-confirmation"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Booking Status
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <Link
                      to="/user-profile"
                      className="hover:text-gray-300 transition-colors"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}

              {!isAuthenticated && (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden pb-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="hover:bg-blue-700 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/flights"
              className="hover:bg-blue-700 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Flights
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/bookings"
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <Link
                  to="/flight-details"
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Flight Details
                </Link>
                <Link
                  to="/payment"
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Make Payment
                </Link>
                <Link
                  to="/payment-cancel"
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cancel Booking
                </Link>
                <Link
                  to="/reports"
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reports
                </Link>
                <Link
                  to="/booking-confirmation"
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Booking Status
                </Link>
                <Link
                  to="/user-profile"
                  className="hover:bg-blue-700 px-3 py-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="text-left hover:bg-red-600 bg-red-500 px-3 py-2 rounded"
                >
                  Sign Out
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isManageBookingOpen, setIsManageBookingOpen] = useState(false);
//   const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
//   const manageBookingRef = useRef(null);
//   const analyticsRef = useRef(null);

//   // Initialize authentication state from sessionStorage
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return sessionStorage.getItem("authToken") ? true : false;
//   });

//   // Update auth status when sessionStorage changes
//   useEffect(() => {
//     const checkAuth = () => {
//       const authToken = sessionStorage.getItem("authToken");
//       setIsAuthenticated(!!authToken);
//     };

//     // Check auth status initially and add event listener
//     checkAuth();
//     window.addEventListener("storage", checkAuth);

//     // Cleanup event listener
//     return () => {
//       window.removeEventListener("storage", checkAuth);
//     };
//   }, []);

//   const handleSignOut = () => {
//     sessionStorage.removeItem("authToken");
//     sessionStorage.removeItem("userEmail");
//     setIsAuthenticated(false);
//     setIsMenuOpen(false);
//     navigate("/");
//   };

//   return (
//     <nav className="bg-blue-600 text-white shadow-md">
//       <div className="container mx-auto">
//         <div className="flex items-center justify-between py-4 px-6">
//           {/* Logo and Title */}
//           <div className="flex items-center space-x-3">
//             <img
//               src="/flight logo.png"
//               alt="Passengers Airline Logo"
//               className="h-10 w-10"
//             />
//             <h1 className="text-xl font-bold">
//               <Link to="/">Passengers Flight Booking</Link>
//             </h1>
//           </div>

//           {/* Main Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <ul className="flex space-x-6">
//               <li>
//                 <Link to="/" className="hover:text-gray-300 transition-colors">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/flights"
//                   className="hover:text-gray-300 transition-colors"
//                 >
//                   Flights
//                 </Link>
//               </li>
//               {isAuthenticated && (
//                 <>
//                   <li>
//                     <Link
//                       to="/bookings"
//                       className="hover:text-gray-300 transition-colors"
//                     >
//                       My Bookings
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/flight-details"
//                       className="hover:text-gray-300 transition-colors"
//                     >
//                       Flight Details
//                     </Link>
//                   </li>

//                   {/* Manage Booking Dropdown */}
//                   <li className="relative" ref={manageBookingRef}>
//                     <button
//                       onClick={() =>
//                         setIsManageBookingOpen(!isManageBookingOpen)
//                       }
//                       className="hover:text-gray-300 transition-colors flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-blue-700"
//                       aria-expanded={isManageBookingOpen}
//                     >
//                       <span>Manage Booking</span>
//                       <svg
//                         className={`w-4 h-4 transition-transform duration-200 ${
//                           isManageBookingOpen ? "transform rotate-180" : ""
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </button>
//                     {isManageBookingOpen && (
//                       <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
//                         <li>
//                           <Link
//                             to="/payment"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Make Payment
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to="/payment-cancel"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Cancel Booking
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to="/booking-details"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Booking Details
//                           </Link>
//                         </li>
//                       </ul>
//                     )}
//                   </li>

//                   {/* Analytics Dropdown */}
//                   <li className="relative" ref={analyticsRef}>
//                     <button
//                       onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
//                       className="hover:text-gray-300 transition-colors flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-blue-700"
//                       aria-expanded={isAnalyticsOpen}
//                     >
//                       <span>Analytics</span>
//                       <svg
//                         className={`w-4 h-4 transition-transform duration-200 ${
//                           isAnalyticsOpen ? "transform rotate-180" : ""
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </button>
//                     {isAnalyticsOpen && (
//                       <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
//                         <li>
//                           <Link
//                             to="/reports"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Reports
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to="/booking-confirmation"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Booking Status
//                           </Link>
//                         </li>
//                       </ul>
//                     )}
//                   </li>
//                 </>
//               )}
//             </ul>

//             {/* Auth Buttons */}
//             <div className="flex items-center space-x-4">
//               {!isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/login"
//                     className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
//                   >
//                     Log In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               ) : (
//                 <div className="flex items-center space-x-4">
//                   <Link
//                     to="/user-profile"
//                     className="flex items-center space-x-2 hover:text-gray-300"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     <span>Profile</span>
//                   </Link>
//                   <button
//                     onClick={handleSignOut}
//                     className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
//                   >
//                     Sign Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 px-6">
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   to="/"
//                   className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/flights"
//                   className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Flights
//                 </Link>
//               </li>
//               {isAuthenticated && (
//                 <>
//                   <li>
//                     <Link
//                       to="/bookings"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       My Bookings
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/flight-details"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Flight Details
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/payment"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Make Payment
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/payment-cancel"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Cancel Booking
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/reports"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Reports
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/booking-confirmation"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Booking Status
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/user-profile"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>

//             {/* Mobile Auth Buttons */}
//             {!isAuthenticated ? (
//               <div className="mt-4 space-y-2">
//                 <Link
//                   to="/login"
//                   className="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="block bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-center transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             ) : (
//               <button
//                 onClick={handleSignOut}
//                 className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
//               >
//                 Sign Out
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isManageBookingOpen, setIsManageBookingOpen] = useState(false);
//   const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
//   const manageBookingRef = useRef(null);
//   const analyticsRef = useRef(null);

//   const [isAuthenticated, setIsAuthenticated] = useState(
//     sessionStorage.getItem("authToken") ? true : false
//   );

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         manageBookingRef.current &&
//         !manageBookingRef.current.contains(event.target)
//       ) {
//         setIsManageBookingOpen(false);
//       }
//       if (
//         analyticsRef.current &&
//         !analyticsRef.current.contains(event.target)
//       ) {
//         setIsAnalyticsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSignOut = () => {
//     sessionStorage.removeItem("authToken");
//     sessionStorage.removeItem("userEmail");
//     setIsAuthenticated(false);
//     setIsMenuOpen(false);
//     navigate("/");
//   };

//   return (
//     <nav className="bg-blue-600 text-white shadow-md">
//       <div className="container mx-auto">
//         <div className="flex items-center justify-between py-4 px-6">
//           {/* Logo and Title */}
//           <div className="flex items-center space-x-3">
//             <img
//               src="/flight logo.png"
//               alt="Passengers Airline Logo"
//               className="h-10 w-12"
//             />
//             <h1 className="text-xl font-bold">
//               <Link to="/">Passengers Flight Booking</Link>
//             </h1>
//           </div>

//           {/* Main Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//             <ul className="flex space-x-6">
//               <li>
//                 <Link to="/" className="hover:text-gray-300 transition-colors">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/flights"
//                   className="hover:text-gray-300 transition-colors"
//                 >
//                   Flights
//                 </Link>
//               </li>
//               {isAuthenticated && (
//                 <>
//                   <li>
//                     <Link
//                       to="/bookings"
//                       className="hover:text-gray-300 transition-colors"
//                     >
//                       My Bookings
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/flight-details"
//                       className="hover:text-gray-300 transition-colors"
//                     >
//                       Flight Details
//                     </Link>
//                   </li>

//                   {/* Manage Booking Dropdown */}
//                   <li className="relative" ref={manageBookingRef}>
//                     <button
//                       onClick={() =>
//                         setIsManageBookingOpen(!isManageBookingOpen)
//                       }
//                       className="hover:text-gray-300 transition-colors flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-blue-700"
//                       aria-expanded={isManageBookingOpen}
//                     >
//                       <span>Manage Booking</span>
//                       <svg
//                         className={`w-4 h-4 transition-transform duration-200 ${
//                           isManageBookingOpen ? "transform rotate-180" : ""
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </button>
//                     {isManageBookingOpen && (
//                       <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
//                         <li>
//                           <Link
//                             to="/payment"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Make Payment
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to="/payment-cancel"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Cancel Booking
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to="/booking-details"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Booking Details
//                           </Link>
//                         </li>
//                       </ul>
//                     )}
//                   </li>

//                   {/* Analytics Dropdown */}
//                   <li className="relative" ref={analyticsRef}>
//                     <button
//                       onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
//                       className="hover:text-gray-300 transition-colors flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-blue-700"
//                       aria-expanded={isAnalyticsOpen}
//                     >
//                       <span>Analytics</span>
//                       <svg
//                         className={`w-4 h-4 transition-transform duration-200 ${
//                           isAnalyticsOpen ? "transform rotate-180" : ""
//                         }`}
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </button>
//                     {isAnalyticsOpen && (
//                       <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 z-50">
//                         <li>
//                           <Link
//                             to="/reports"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Reports
//                           </Link>
//                         </li>
//                         <li>
//                           <Link
//                             to="/booking-confirmation"
//                             className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
//                           >
//                             Booking Status
//                           </Link>
//                         </li>
//                       </ul>
//                     )}
//                   </li>
//                 </>
//               )}
//             </ul>

//             {/* Auth Buttons */}
//             <div className="flex items-center space-x-4">
//               {!isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/login"
//                     className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
//                   >
//                     Log In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               ) : (
//                 <div className="flex items-center space-x-4">
//                   <Link
//                     to="/user-profile"
//                     className="flex items-center space-x-2 hover:text-gray-300"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     <span>Profile</span>
//                   </Link>
//                   <button
//                     onClick={handleSignOut}
//                     className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
//                   >
//                     Sign Out
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 px-6">
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   to="/"
//                   className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/flights"
//                   className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Flights
//                 </Link>
//               </li>
//               {isAuthenticated && (
//                 <>
//                   <li>
//                     <Link
//                       to="/bookings"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       My Bookings
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/flight-details"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Flight Details
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/payment"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Make Payment
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/payment-cancel"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Cancel Booking
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/reports"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Reports
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/booking-confirmation"
//                       className="block hover:bg-blue-700 px-3 py-2 rounded-md"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Booking Status
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>

//             {/* Mobile Auth Buttons */}
//             {!isAuthenticated ? (
//               <div className="mt-4 space-y-2">
//                 <Link
//                   to="/login"
//                   className="block bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="block bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded text-center transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             ) : (
//               <button
//                 onClick={handleSignOut}
//                 className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
//               >
//                 Sign Out
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
