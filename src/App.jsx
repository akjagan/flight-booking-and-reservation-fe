import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import FlightSearch from "./components/FlightSearch";
import SearchResults from "./pages/SearchResults";
import Bookings from "./components/Bookings";
import UserProfile from "./components/UserProfile";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BookingDetailsPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import ProfilePage from "./pages/ProfilePage";
import FlightDetails from "./components/FlightDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import ProtectedRoute from "./components/ProtectedRoute"; // Add this import
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DateSelector from "./components/DateSelector";
import "./index.css";

const App = () => {
  const paypalOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "INR",
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="flex flex-col min-h-screen">
        <Router>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Protected Routes */}
              <Route
                path="/flights"
                element={
                  <ProtectedRoute>
                    <FlightSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search-results"
                element={
                  <ProtectedRoute>
                    <SearchResults />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <Bookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking-details"
                element={
                  <ProtectedRoute>
                    <BookingDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-success"
                element={
                  <ProtectedRoute>
                    <PaymentSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-cancel"
                element={
                  <ProtectedRoute>
                    <PaymentCancel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/flight-details"
                element={
                  <ProtectedRoute>
                    <FlightDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/date-selector"
                element={
                  <ProtectedRoute>
                    <DateSelector />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/booking-confirmation"
                element={
                  <ProtectedRoute>
                    <BookingConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <ReportsAnalytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <ReportsAnalytics />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
        <ToastContainer />
      </div>
    </PayPalScriptProvider>
  );
};

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";
// import FlightSearch from "./components/FlightSearch";
// import SearchResults from "./pages/SearchResults";
// import Bookings from "./components/Bookings";
// import UserProfile from "./components/UserProfile";
// import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";
// import BookingDetailsPage from "./pages/BookingPage";
// import PaymentPage from "./pages/PaymentPage";
// import PaymentSuccess from "./pages/PaymentSuccess";
// import PaymentCancel from "./pages/PaymentCancel";
// import ProfilePage from "./pages/ProfilePage";

// import FlightDetails from "./components/FlightDetails";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// // import "react-datepicker/dist/react-datepicker.css";
// import DateSelector from "./components/DateSelector"
// import "./index.css";

// const App = () => {
//   return (
//     <PayPalScriptProvider
//       options={{
//         "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
//       }}
//     >
//       <div className="flex flex-col min-h-screen">
//         <Router>
//           <Navbar />
//           <main className="flex-grow">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/flights" element={<FlightSearch />} />
//               <Route path="/search-results" element={<SearchResults />} />
//               <Route path="/home" element={<HomePage />} />
//               <Route path="/bookings" element={<Bookings />} />
//               <Route path="/profile" element={<ProfilePage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/signup" element={<SignUpPage />} />
//               <Route path="/booking-details" element={<BookingDetailsPage />} />
//               <Route path="/payment" element={<PaymentPage />} />
//               <Route path="/payment-success" element={<PaymentSuccess />} />
//               <Route path="/payment-cancel" element={<PaymentCancel />} />
//               <Route path="/user-profile" element={<UserProfile />} />
//               <Route path="/flight-details" element={<FlightDetails />} />
//               <Route path="/date-selector" element={<DateSelector />} />
//               {/* <Route path="/profile/:userId" component={ProfilePage} /> */}
//             </Routes>
//           </main>
//           <Footer />
//         </Router>
//         <ToastContainer />
//       </div>
//     </PayPalScriptProvider>
//   );
// };

// export default App;
