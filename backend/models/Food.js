const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  price: Number,
  rating: Number,
});

module.exports = mongoose.model("Food", FoodSchema);
