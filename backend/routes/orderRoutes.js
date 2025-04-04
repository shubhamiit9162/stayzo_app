const express = require("express");
const { createOrder, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

// Route to create a new order
router.post("/", createOrder);

// Route to get all orders
router.get("/", getAllOrders);

module.exports = router;
