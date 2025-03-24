const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // Ensure this model exists

// ✅ Get all contacts
router.get("/contacts", async (req, res) => {
  try {
    console.log("Fetching contacts from database...");

    const contacts = await Contact.find();
    console.log("Contacts fetched:", contacts);

    if (!contacts.length) {
      console.log("No contacts found in database.");
      return res
        .status(404)
        .json({ success: false, message: "No contacts found" });
    }

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
});

module.exports = router;
