import React, { useState, useEffect } from "react";
import axios from "axios";
import "./booking.css";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: "",
    stay: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
  });

  const [bookings, setBookings] = useState([]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5003/api/bookings",
        formData
      );
      alert("Booking created successfully! Redirecting to payment...");

      // Navigate to payment page with booking data
      navigate("/payment", {
        state: {
          bookingId: response.data._id,
          bookingDetails: response.data,
          amount: formData.totalAmount,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/api/bookings/${id}`);
      alert("Booking cancelled");
      fetchBookings();
    } catch (err) {
      alert("Error cancelling booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Create Booking</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          name="user"
          placeholder="User ID"
          onChange={handleChange}
          value={formData.user}
          required
        />
        <input
          name="stay"
          placeholder="Stay ID"
          onChange={handleChange}
          value={formData.stay}
          required
        />
        <input
          type="date"
          name="checkInDate"
          onChange={handleChange}
          value={formData.checkInDate}
          required
        />
        <input
          type="date"
          name="checkOutDate"
          onChange={handleChange}
          value={formData.checkOutDate}
          required
        />
        <input
          name="totalAmount"
          type="number"
          placeholder="Total Amount"
          onChange={handleChange}
          value={formData.totalAmount}
          required
        />
        <button type="submit">Book Now</button>
      </form>

      <h2>All Bookings</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {bookings.map((booking) => (
          <li
            key={booking._id}
            style={{
              marginBottom: "1rem",
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <div>
              {booking.user?.name && (
                <>
                  <strong>User:</strong> {booking.user.name} <br />
                </>
              )}
              {booking.stay?.title && (
                <>
                  <strong>Stay:</strong> {booking.stay.title} <br />
                </>
              )}
              <strong>Check-In:</strong>{" "}
              {new Date(booking.checkInDate).toLocaleDateString()} <br />
              <strong>Check-Out:</strong>{" "}
              {new Date(booking.checkOutDate).toLocaleDateString()} <br />
              <strong>Total:</strong> ₹{booking.totalAmount} <br />
              <strong>Status:</strong> {booking.status}
            </div>

            <button
              onClick={() => cancelBooking(booking._id)}
              style={{
                marginTop: "0.5rem",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel Booking
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Booking;
