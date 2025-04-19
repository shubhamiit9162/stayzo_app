const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

/**
 * @route   POST /api/foods
 * @desc    Create a new food item
 * @access  Private (Admin)
 */
router.post("/api/foods", foodController.createFood);

/**
 * @route   GET /api/foods
 * @desc    Get all food items
 * @access  Public
 */
router.get("/api/foods", foodController.getFoods);

/**
 * @route   GET /api/foods/:id
 * @desc    Get a single food item by ID
 * @access  Public
 */
router.get("/api/foods/:id", foodController.getFoodById);

/**
 * @route   PUT /api/foods/:id
 * @desc    Update a food item
 * @access  Private (Admin)
 */
router.put("/api/foods/:id", foodController.updateFood);

/**
 * @route   DELETE /api/foods/:id
 * @desc    Delete a food item
 * @access  Private (Admin)
 */
router.delete("/api/foods/:id", foodController.deleteFood);

/**
 * @route   GET /api/foods/cuisine/:cuisineType
 * @desc    Get food items by cuisine type
 * @access  Public
 */
router.get("/api/foods/cuisine/:cuisineType", foodController.getFoodsByCuisine);

/**
 * @route   GET /api/foods/search
 * @desc    Search food items by name
 * @access  Public
 */
router.get("/api/foods/search", foodController.searchFoods);

module.exports = router;
