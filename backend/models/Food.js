const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "default-food.jpg",
    },
    description: {
      type: String,
      default: "Delicious food item",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);
