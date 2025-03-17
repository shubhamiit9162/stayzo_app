const mongoose = require("mongoose");

const ExploreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["club", "restaurant", "restroclub"],
    required: true,
  },
  location: { type: String, required: true },
  avgCost: { type: Number, required: true }, // Average cost for two people
  rating: { type: Number, default: 0, min: 0, max: 5 }, // Rating out of 5
  bestTimeToVisit: { type: String },
  specialFeatures: { type: [String] }, // Example: ["Live Music", "Dance Floor"]
  contact: { type: String },
});

module.exports = mongoose.model("Explore", ExploreSchema);
