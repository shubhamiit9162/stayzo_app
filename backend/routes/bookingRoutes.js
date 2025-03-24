const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Booking = require("../models/booking");

router.post("/bookings", async (req, res) => {
  try {
    const { user, stay, totalAmount, checkInDate, checkOutDate } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(stay)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid user or stay ID format" });
    }

    if (!totalAmount || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = new Booking({
      user: new mongoose.Types.user(),
      stay: new mongoose.Types.stay(),
      totalAmount,
      checkInDate,
      checkOutDate,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
});

router.get("/bookings/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    const booking = await Booking.findOne({ type, itemId: id });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking details", error });
  }
});

module.exports = router;
