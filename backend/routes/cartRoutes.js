const express = require("express");
const router = express.Router();

// Dummy Cart Data (Replace with MongoDB logic)
let cart = [];

// ✅ GET Cart Items
router.get("/", (req, res) => {
  res.json(cart);
});

// ✅ ADD Item to Cart
router.post("/", (req, res) => {
  const { foodId, quantity } = req.body;
  if (!foodId || !quantity)
    return res.status(400).json({ message: "Missing data" });

  cart.push({ foodId, quantity });
  res.json({ message: "Item added to cart", cart });
});

module.exports = router;
