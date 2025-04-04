const Booking = require("../models/booking");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { user, stay, totalAmount, checkInDate, checkOutDate } = req.body;

    // Validate required fields
    if (!user || !stay || !totalAmount || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save booking
    const newBooking = new Booking({
      user,
      stay,
      totalAmount,
      checkInDate,
      checkOutDate,
    });
    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error cancelling booking", error: error.message });
  }
};
