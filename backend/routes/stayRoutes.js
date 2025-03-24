const express = require("express");
const router = express.Router();
const Stay = require("../models/Stay"); // Ensure this model exists

// ✅ Get all stay places
router.get("/stay", async (req, res) => {
  try {
    console.log("Fetching stay places from database...");

    const stays = await Stay.find();
    console.log("Stay places fetched:", stays);

    if (!stays.length) {
      console.log("No stay places found in database.");
      return res
        .status(404)
        .json({ success: false, message: "No stay places found" });
    }

    res.status(200).json(stays);
  } catch (error) {
    console.error("Error fetching stay places:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

module.exports = router;
