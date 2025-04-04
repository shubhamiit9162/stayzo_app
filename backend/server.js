const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const stayRoutes = require("./routes/stayRoutes");
const foodRoutes = require("./routes/foodRoutes");
const contactRoutes = require("./routes/contactRoutes");
const placeRoutes = require("./routes/placeRoutes");
const exploreRoutes = require("./routes/exploreRoutes");
const notificationRoutes = require("./routes/notificationsRoutes");
const orderRoutes = require("./routes/orderRoutes");

const errorHandler = require("./middleware/errorMiddleware");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// ✅ Use Routes
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/stays", stayRoutes);
app.use("/api", foodRoutes);

app.use("/api", contactRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api", bookingRoutes);
app.use("/api/food-orders", orderRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
