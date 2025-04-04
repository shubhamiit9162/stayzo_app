const Order = require("../models/orderModel");

// Create a new food order
exports.createOrder = async (req, res) => {
  try {
    const { name, email, address, food, foodId } = req.body;

    if (!name || !email || !address || !food || !foodId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({ name, email, address, food, foodId });
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error });
  }
};

// Fetch all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("foodId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
