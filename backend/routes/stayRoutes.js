const express = require("express");
const {
  createStay,
  getAllStays,
  getStayById,
  updateStay,
  deleteStay,
} = require("../controllers/stayController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Debugging: Log requests
router.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

// Routes
router.post("/", protect, createStay);
router.get("/", getAllStays);
router.get("/:id", getStayById);
router.put("/:id", protect, updateStay);
router.delete("/:id", protect, deleteStay);

module.exports = router;
