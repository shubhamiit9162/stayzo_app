const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to create a new booking
router.post("/bookings", bookingController.createBooking);

// Route to get all bookings
router.get("/bookings", bookingController.getBookings);

// Route to cancel a booking by ID
router.delete("/bookings/:id", bookingController.cancelBooking);

module.exports = router;
