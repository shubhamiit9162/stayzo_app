import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get order details from localStorage
    const currentOrder = localStorage.getItem("currentOrder");

    if (currentOrder) {
      setOrder(JSON.parse(currentOrder));
    } else {
      // No order found, redirect to food page
      navigate("/foods");
    }
  }, [navigate]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getEstimatedDelivery = () => {
    // Calculate estimated delivery time (30-45 minutes from order time)
    if (!order || !order.createdAt) return "Unknown";

    const orderDate = new Date(order.createdAt);
    const minDelivery = new Date(orderDate.getTime() + 30 * 60000);
    const maxDelivery = new Date(orderDate.getTime() + 45 * 60000);

    return `${minDelivery.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${maxDelivery.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  if (!order) {
    return <div className="loading">Loading order details...</div>;
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="check-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Your order has been placed successfully.</p>
        </div>

        <div className="order-info">
          <div className="info-section">
            <h2>Order Details</h2>
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(order.createdAt)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="status">{order.status}</span>
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              <span className="payment-status">{order.paymentStatus}</span>
            </p>
          </div>

          <div className="info-section">
            <h2>Delivery Information</h2>
            <p>
              <strong>Address:</strong> {order.deliveryAddress}
            </p>
            <p>
              <strong>Estimated Delivery:</strong> {getEstimatedDelivery()}
            </p>
          </div>
        </div>

        <div className="order-items">
          <h2>Order Summary</h2>
          <ul className="item-list">
            {order.items.map((item, index) => (
              <li key={index} className="order-item">
                <div className="item-details">
                  <span className="item-name">Food Item #{index + 1}</span>
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
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="confirmation-actions">
          <button
            className="track-order-btn"
            onClick={() => navigate("/orders")}
          >
            View My Orders
          </button>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/foods")}
          >
            Order More Food
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
