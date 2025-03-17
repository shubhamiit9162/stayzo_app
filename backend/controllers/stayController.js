const Stay = require("../models/Stay");

// Create a new stay
exports.createStay = async (req, res) => {
  try {
    const {
      name,
      location,
      pricePerNight,
      rating,
      description,
      images,
      amenities,
    } = req.body;

    if (!name || !location || !pricePerNight) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, location, and price are required",
        });
    }

    const stay = new Stay({
      name,
      location,
      pricePerNight,
      rating,
      description,
      images,
      amenities,
      createdBy: req.user.id,
    });

    await stay.save();
    res
      .status(201)
      .json({ success: true, message: "Stay added successfully", stay });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all stays
exports.getAllStays = async (req, res) => {
  try {
    const stays = await Stay.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, stays });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get stay by ID
exports.getStayById = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!stay) {
      return res
        .status(404)
        .json({ success: false, message: "Stay not found" });
    }
    res.status(200).json({ success: true, stay });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update stay
exports.updateStay = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id);
    if (!stay) {
      return res
        .status(404)
        .json({ success: false, message: "Stay not found" });
    }

    if (stay.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to update this stay" });
    }

    Object.assign(stay, req.body);
    await stay.save();

    res
      .status(200)
      .json({ success: true, message: "Stay updated successfully", stay });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete stay
exports.deleteStay = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id);
    if (!stay) {
      return res
        .status(404)
        .json({ success: false, message: "Stay not found" });
    }

    if (stay.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete this stay" });
    }

    await stay.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Stay deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
