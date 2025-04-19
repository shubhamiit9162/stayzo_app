const Food = require("../models/Food");

// Create a new food item
exports.createFood = async (req, res) => {
  try {
    const { name, cuisine, price, rating, image, description } = req.body;

    // Validate required fields
    if (!name || !cuisine || !price || !rating) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, cuisine, price, and rating are required",
        });
    }

    const food = new Food({
      name,
      cuisine,
      price,
      rating,
      image: image || "default-food.jpg",
      description: description || "Delicious food item",
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: "Food item added successfully",
      food,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all food items
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get a single food item by ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    console.error("Error fetching food by ID:", error);

    // Check if error is due to invalid ID format
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update a food item
exports.updateFood = async (req, res) => {
  try {
    const { name, cuisine, price, rating, image, description } = req.body;
    const updateData = {};

    // Only include fields that were provided
    if (name) updateData.name = name;
    if (cuisine) updateData.cuisine = cuisine;
    if (price) updateData.price = price;
    if (rating) updateData.rating = rating;
    if (image) updateData.image = image;
    if (description) updateData.description = description;

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item updated successfully",
      food,
    });
  } catch (error) {
    console.error("Error updating food:", error);

    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete a food item
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting food:", error);

    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid food ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get foods by cuisine type
exports.getFoodsByCuisine = async (req, res) => {
  try {
    const { cuisineType } = req.params;

    const foods = await Food.find({
      cuisine: { $regex: cuisineType, $options: "i" },
    });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.error("Error fetching foods by cuisine:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Search foods by name
exports.searchFoods = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const foods = await Food.find({
      name: { $regex: query, $options: "i" },
    });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.error("Error searching foods:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
