const Food = require("../models/Food");

// Create a new food item
exports.createFood = async (req, res) => {
  try {
    const { name, cuisine, price, rating } = req.body;

    if (!name || !cuisine || !price || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const food = new Food({ name, cuisine, price, rating });
    await food.save();

    res
      .status(201)
      .json({ success: true, message: "Food item added successfully", food });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all food items
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json({ success: true, foods });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get a single food item by ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }
    res.status(200).json({ success: true, food });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update a food item
exports.updateFood = async (req, res) => {
  try {
    const { price, rating } = req.body;
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    if (price) food.price = price;
    if (rating) food.rating = rating;

    await food.save();
    res
      .status(200)
      .json({ success: true, message: "Food item updated successfully", food });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete a food item
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
