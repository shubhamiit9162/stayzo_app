import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // Get order details from navigation state or localStorage
    if (location.state?.orderId && location.state?.amount) {
      setOrderId(location.state.orderId);
      setAmount(location.state.amount);
    } else {
      // Try to get from localStorage if not in navigation state
      const currentOrder = localStorage.getItem("currentOrder");
      if (currentOrder) {
        const orderDetails = JSON.parse(currentOrder);
        setOrderId(orderDetails._id);
        setAmount(orderDetails.totalAmount);
        setOrderDetails(orderDetails);
      } else {
        // No order details found, redirect back to food page
        navigate("/foods");
      }
    }
  }, [location.state, navigate]);

  const validateCardDetails = () => {
    if (paymentMethod === "card") {
      // Simple validation - in real app this would be more thorough
      if (!cardNumber || cardNumber.length < 16) {
        setError("Please enter a valid card number");
        return false;
      }

      if (!expiryDate || !expiryDate.includes("/")) {
        setError("Please enter a valid expiry date (MM/YY)");
        return false;
      }

      if (!cvv || cvv.length < 3) {
        setError("Please enter a valid CVV");
        return false;
      }

      if (!cardName) {
        setError("Please enter the name on your card");
        return false;
      }
    }

    return true;
  };

  const handleInitiatePayment = () => {
    setShowPaymentForm(true);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateCardDetails()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll simulate a successful payment
      // In a real application, you would integrate with a payment gateway

      // After successful payment, update the order's payment status
      const response = await axios.put(
        "http://localhost:5003/api/orders/payment",
        {
          orderId: orderId,
          paymentStatus: "paid",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        // Store updated order in localStorage
        localStorage.setItem(
          "currentOrder",
          JSON.stringify(response.data.order)
        );

        setOrderDetails(response.data.order);
        setPaymentComplete(true);
      } else {
        setError("Payment processing failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.response?.data?.message || "Payment processing failed");
    } finally {
      setLoading(false);
    }
  };

  // Function to format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Function to generate and download invoice
  const downloadInvoice = () => {
    // Create the invoice content
    const invoiceContent = `
      INVOICE
      -----------------------------------------------
      Order ID: ${orderId}
      Date: ${new Date().toLocaleDateString()}
      
      CUSTOMER DETAILS
      Name: ${orderDetails?.customerName || "N/A"}
      Email: ${orderDetails?.customerEmail || "N/A"}
      
      ORDER SUMMARY
      ${
        orderDetails?.items
          ?.map(
            (item) =>
              `${item.name} x ${item.quantity} - $${(
                item.price * item.quantity
              ).toFixed(2)}`
          )
          .join("\n      ") || "No items"
      }
      
      -----------------------------------------------
      Subtotal: $${(amount - amount * 0.1).toFixed(2)}
      Tax (10%): $${(amount * 0.1).toFixed(2)}
      Total: $${amount.toFixed(2)}
      
      Payment Status: Paid
      Payment Method: ${
        paymentMethod === "card" ? "Credit/Debit Card" : "PayPal"
      }
      
      Thank you for your order!
    `;

    // Create a Blob with the invoice content
    const blob = new Blob([invoiceContent], { type: "text/plain" });

    // Create a link element and trigger the download
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `invoice-${orderId}.txt`;
    a.click();
  };

  // Render the payment success view with download invoice option
  if (paymentComplete) {
    return (
      <div className="payment-success">
        <h1>Payment Successful!</h1>
        <div className="success-message">
          <p>
            Your payment of ${amount.toFixed(2)} has been processed
            successfully.
          </p>
          <p>Order ID: {orderId}</p>
        </div>
        <div className="action-buttons">
          <button onClick={downloadInvoice} className="download-invoice-btn">
            Download Invoice
          </button>
          <button
            onClick={() => navigate("/order-confirmation")}
            className="continue-btn"
          >
            Continue to Order Confirmation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h1>Payment Details</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="payment-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-details">
            <p>
              <strong>Order ID:</strong> {orderId}
            </p>
            <p>
              <strong>Amount to Pay:</strong> ${amount.toFixed(2)}
            </p>
          </div>
        </div>

        {!showPaymentForm ? (
          <div className="payment-initiate">
            <button
              onClick={handleInitiatePayment}
              className="initiate-payment-btn"
            >
              Proceed to Payment
            </button>
            <button className="back-btn" onClick={() => navigate("/order")}>
              Back to Order Summary
            </button>
          </div>
        ) : (
          <div className="payment-form">
            <h2>Payment Method</h2>

            <div className="payment-options">
              <div className="payment-option">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <label htmlFor="card">Credit/Debit Card</label>
              </div>

              <div className="payment-option">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
            </div>

            {paymentMethod === "card" && (
              <form onSubmit={handlePayment} className="card-form">
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>

                  <div className="form-group half">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="pay-now-btn"
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
                </button>
              </form>
            )}

            {paymentMethod === "paypal" && (
              <div className="paypal-form">
                <p>
                  You will be redirected to PayPal to complete your payment.
                </p>
                <button
                  onClick={handlePayment}
                  className="paypal-btn"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Pay with PayPal"}
                </button>
              </div>
            )}

            <button
              className="back-btn"
              onClick={() => setShowPaymentForm(false)}
              disabled={loading}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
