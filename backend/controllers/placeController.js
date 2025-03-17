const Place = require("../models/Place");

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single place by ID
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new place
exports.addPlace = async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ message: "Error adding place" });
  }
};

// Update a place
exports.updatePlace = async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
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

// Delete a place
exports.deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace)
      return res.status(404).json({ message: "Place not found" });
    res.status(200).json({ message: "Place deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting place" });
  }
};
