const express = require("express");
const router = express.Router();
const Food = require("../models/Food"); // Ensure this model exists

// ✅ Get all food items
router.get("/food", async (req, res) => {
  try {
    console.log("Fetching food items from database...");

    const foodItems = await Food.find();
    console.log("Food items fetched:", foodItems);

    if (!foodItems.length) {
      console.log("No food items found in database.");
      return res
        .status(404)
        .json({ success: false, message: "No food items found" });
    }

    res.status(200).json(foodItems);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

module.exports = router;
