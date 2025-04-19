const Order = require("../models/order");
const Food = require("../models/Food");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    // Populate both user and food details
    const orders = await Order.find()
      .populate("userId", "name email") // Assuming user model has these fields
      .populate("items.food");

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("items.food");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
    });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    console.log("Received order creation request:", req.body); // Debug log

    const { userId, items, deliveryAddress, calculatedTotal } = req.body;

    // Validation
    if (!userId || !items || !deliveryAddress || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Calculate total amount by fetching food items
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const food = await Food.findById(item.foodId);

      if (!food) {
        return res.status(404).json({
          success: false,
          message: `Food item with ID ${item.foodId} not found`,
        });
      }

      const itemTotal = food.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        food: item.foodId, // This matches the schema field name
        quantity: item.quantity,
        price: food.price,
      });
    }

    // Optional: Verify frontend calculation matches backend for security
    if (calculatedTotal && Math.abs(calculatedTotal - totalAmount) > 0.01) {
      console.warn(
        `Price mismatch: frontend $${calculatedTotal} vs backend $${totalAmount}`
      );
      // You might want to handle this differently based on your business logic
    }

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Update order payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, paymentStatus } = req.body;

    if (!orderId || !paymentStatus) {
      return res.status(400).json({
        success: false,
        message: "Order ID and payment status are required",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = paymentStatus;

    // Update order status based on payment status
    if (paymentStatus === "paid") {
      order.status = "confirmed";
    } else if (paymentStatus === "failed") {
      order.status = "payment_failed";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment status updated",
      order,
    });
  } catch (error) {
    console.error("Payment update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Check if order can be cancelled (e.g., not already delivered)
    if (order.status === "delivered" || order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: `Cannot cancel order with status '${order.status}'`,
      });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Order cancellation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};

// Get user orders (new endpoint)
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await Order.find({ userId })
      .populate("items.food")
      .sort({ createdAt: -1 }); // Most recent first

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};
