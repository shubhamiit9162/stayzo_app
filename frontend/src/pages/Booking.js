import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";

const Booking = () => {
  const { id } = useParams(); // Get Stay ID from URL
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    stay: id || "",
  });

  // Fetch all bookings from backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5003/api/bookings/bookings"
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5003/api/bookings",
        formData
      );
      setBookings([...bookings, response.data]);
      setFormData({ name: "", email: "", date: "", stay: id }); // Reset form
      alert("Booking successful!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  // Cancel booking
  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) return;

    try {
      await axios.delete(`http://localhost:5003/api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
      alert("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Book Your Stay</h2>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="stay"
          placeholder="Stay Name"
          value={formData.stay}
          required
          className="block w-full p-2 mb-2 border rounded"
          disabled
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>

      {/* Booking List */}
      <h2 className="text-2xl font-bold mt-6 mb-4">Your Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <ul className="space-y-4">
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            bookings.map((booking) => (
              <li
                key={booking._id}
                className="p-4 border rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{booking.name}</p>
                  <p>{booking.email}</p>
                  <p>{booking.date}</p>
                  <p>{booking.stay}</p>
                </div>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Booking;
