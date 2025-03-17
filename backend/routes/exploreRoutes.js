const express = require("express");
const {
  getAllExplore,
  getExploreById,
  addExplore,
  updateExplore,
  deleteExplore,
  getExploreByType,
  getBudgetExplore,
} = require("../controllers/exploreController");

const router = express.Router();

router.get("/", getAllExplore); // Get all explore places
router.get("/type/:type", getExploreByType); // Get explore places by type (club, restaurant, restroclub)
router.get("/budget", getBudgetExplore); // Get budget-friendly explore places
router.get("/:id", getExploreById); // Get a explore place by ID
router.post("/", addExplore); // Add a new explore place
router.put("/:id", updateExplore); // Update an explore place
router.delete("/:id", deleteExplore); // Delete an explore place

module.exports = router;
