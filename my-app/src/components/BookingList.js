import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

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
              <strong>User:</strong> {booking.user?.name || "N/A"} <br />
              <strong>Stay:</strong> {booking.stay?.title || "N/A"} <br />
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

export default BookingList;
