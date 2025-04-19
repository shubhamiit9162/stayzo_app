import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get cart from local storage
    const savedCart = localStorage.getItem("foodCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error parsing saved cart:", err);
        navigate("/foods");
        return;
      }
    } else {
      navigate("/foods");
    }

    // Get user details if available
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        if (userData.address) {
          setDeliveryAddress(userData.address);
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, [navigate]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deliveryAddress.trim()) {
      setError("Delivery address is required");
      return;
    }

    // Get user ID from local storage
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login", { state: { from: "/order" } });
      return;
    }

    const userData = JSON.parse(user);
    const userId = userData._id;

    try {
      setLoading(true);

      // Format items to match the backend requirements
      const formattedItems = cart.map((item) => ({
        foodId: item.foodId,
        quantity: item.quantity,
      }));

      // Prepare order data
      const orderData = {
        userId: userId,
        items: formattedItems,
        deliveryAddress: deliveryAddress,
        // Frontend calculated total for validation
        calculatedTotal: totalAmount,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        navigate("/login", { state: { from: "/order" } });
        return;
      }

      const response = await axios.post(
        "http://localhost:5003/api/orders",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);

      if (response.data.success) {
        // Store order details for confirmation page
        localStorage.setItem(
          "currentOrder",
          JSON.stringify(response.data.order)
        );
        // Clear cart
        localStorage.removeItem("foodCart");
        // Redirect to payment page
        navigate("/payment", {
          state: {
            orderId: response.data.order._id,
            amount: response.data.order.totalAmount,
          },
        });
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please try again."
      );
      console.error("Order error:", err);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="order-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/foods")} className="return-btn">
          Browse Foods
        </button>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h1>Order Summary</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="order-container">
        <div className="order-items">
          <h2>Your Items</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.foodId} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x {item.quantity}</span>
                </div>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="order-total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="delivery-form">
          <h2>Delivery Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                placeholder="Enter your full delivery address"
              />
            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue to Payment"}
            </button>
          </form>

          <button
            className="back-btn"
            onClick={() => navigate("/foods")}
            disabled={loading}
          >
            Back to Food Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
