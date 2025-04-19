import React, { useState } from "react";
import axios from "axios";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    stay: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5003/api/bookings", formData);
      alert("Booking created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <input
        name="user"
        placeholder="User ID"
        onChange={handleChange}
        required
      />
      <input
        name="stay"
        placeholder="Stay ID"
        onChange={handleChange}
        required
      />
      <input type="date" name="checkInDate" onChange={handleChange} required />
      <input type="date" name="checkOutDate" onChange={handleChange} required />
      <input
        name="totalAmount"
        type="number"
        placeholder="Total Amount"
        onChange={handleChange}
        required
      />
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
