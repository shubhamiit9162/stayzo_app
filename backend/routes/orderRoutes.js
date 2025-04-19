const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route to create a new order
router.post("/api/orders", orderController.createOrder);

// Route to get all orders
router.get("/api/orders", orderController.getAllOrders);

// Route to get a single order
router.get("/api/orders/:id", orderController.getOrderById);

// Route to update payment status
router.put("/api/orders/payment", orderController.updatePaymentStatus);

// Route to cancel an order
router.put("/api/orders/:id/cancel", orderController.cancelOrder);

module.exports = router;
