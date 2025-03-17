const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  entryFee: { type: Number, default: 0 },
  bestTimeToVisit: { type: String },
  category: {
    type: String,
    enum: ["beach", "temple", "park", "museum", "food", "market"],
    required: true,
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
