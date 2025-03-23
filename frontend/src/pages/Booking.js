import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";

const Booking = () => {
  const { id } = useParams(); // Get Stay ID from URL
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    stay: id || "", // Set stay ID from URL
  });

  // Fetch all bookings from backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
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
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  // Cancel booking
  const handleCancel = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5003/api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
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
          onChange={handleChange}
          required
          className="block w-full p-2 mb-2 border rounded"
          disabled // Disable editing since stay is selected
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
      <ul className="space-y-4">
        {bookings.map((booking) => (
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
        ))}
      </ul>
    </div>
  );
};

export default Booking;
