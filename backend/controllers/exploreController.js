const Explore = require("../models/Explore");

// Get all explore places
exports.getAllExplore = async (req, res) => {
  try {
    const places = await Explore.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single explore place by ID
exports.getExploreById = async (req, res) => {
  try {
    const place = await Explore.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new explore place (Club, Restaurant, Restroclub)
exports.addExplore = async (req, res) => {
  try {
    const newPlace = new Explore(req.body);
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ message: "Error adding place" });
  }
};

// Get explore places by type (Club, Restaurant, Restroclub)
exports.getExploreByType = async (req, res) => {
  try {
    const places = await Explore.find({ type: req.params.type.toLowerCase() });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get budget-friendly explore places (Less than ₹500 per person)
exports.getBudgetExplore = async (req, res) => {
  try {
    const places = await Explore.find({ avgCost: { $lte: 1000 } });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update an explore place
exports.updateExplore = async (req, res) => {
  try {
    const updatedPlace = await Explore.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPlace)
      return res.status(404).json({ message: "Place not found" });
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: "Error updating place" });
  }
};

// Delete an explore place
exports.deleteExplore = async (req, res) => {
  try {
    const deletedPlace = await Explore.findByIdAndDelete(req.params.id);
    if (!deletedPlace)
      return res.status(404).json({ message: "Place not found" });
    res.status(200).json({ message: "Place deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting place" });
  }
};
