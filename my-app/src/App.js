import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import FoodList from "./components/FoodList";
import OrderPage from "./components/OrderPage";
import PaymentPage from "./components/PaymentPage";
import OrderConfirmation from "./components/OrderConfirmation";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles.css";

function App() {
  // Check if user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Booking System Routes */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <>
                  <h1>Booking System</h1>
                  <BookingForm />
                  <BookingList />
                </>
              </ProtectedRoute>
            }
          />
          {/* Food Delivery Routes */}
          <Route path="/" element={<FoodList />} />
          <Route path="/foods" element={<FoodList />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
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
            path="/order-confirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />
          {/* Legacy routes - maintain for backward compatibility */}
          <Route
            path="/order/:foodId"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:orderId"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          {/* Add routes for user profile and orders */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div>Profile Page</div>{" "}
                {/* Replace with actual Profile component */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <div>My Orders</div>{" "}
                {/* Replace with actual Orders component */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <div>My Bookings</div>{" "}
                {/* Replace with actual Bookings component */}
              </ProtectedRoute>
            }
          />
          {/* Add routes for Stays and Explore pages */}
          <Route path="/stays" element={<div>Stays Page</div>} />{" "}
          {/* Replace with actual Stays component */}
          <Route path="/explore" element={<div>Explore Page</div>} />{" "}
          {/* Replace with actual Explore component */}
          <Route path="/contact" element={<div>Contact Page</div>} />{" "}
          {/* Replace with actual Contact component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
