import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FoodOrder = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [formData, setFormData] = useState({
    user: "",
    food: id || "",
    quantity: 1,
    deliveryAddress: "",
    deliveryTime: "",
    specialInstructions: "",
  });

  // Fetch current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      setUserLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5003/api/users/current",
          {
            withCredentials: true,
          }
        );

        if (response.data && response.data._id) {
          setCurrentUser(response.data);
          setFormData((prev) => ({
            ...prev,
            user: response.data._id,
          }));
        } else {
          setError("You must be logged in to place an order");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setError("Authentication required. Please log in to place orders.");
      } finally {
        setUserLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch food details
  useEffect(() => {
    const fetchFoodDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5003/api/foods/${id}`
        );
        setFood(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error);
        setError("Failed to load food details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetails();
  }, [id]);

  // Fetch user's previous orders
  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5003/api/food-orders/user/${currentUser._id}`,
        { withCredentials: true }
      );

      if (response.data && Array.isArray(response.data)) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    const quantity = parseInt(formData.quantity) || 1;
    const price = food?.pricePerItem || 0;
    return quantity * price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setError("You must be logged in to place an order");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const orderData = {
        ...formData,
        totalAmount: calculateTotal(),
      };

      const response = await axios.post(
        "http://localhost:5003/api/food-orders",
        orderData,
        { withCredentials: true }
      );

      if (response.data) {
        setOrders([...orders, response.data]);

        // Reset form but keep user and food
        setFormData({
          user: currentUser._id,
          food: id || "",
          quantity: 1,
          deliveryAddress: "",
          deliveryTime: "",
          specialInstructions: "",
        });

        // Show success message
        const successMessage = document.getElementById("success-message");
        successMessage.classList.remove("hidden");
        setTimeout(() => {
          successMessage.classList.add("hidden");
        }, 3000);

        // Refresh orders
        fetchOrders();
      }
    } catch (error) {
      console.error("Error placing food order:", error);
      setError(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Get min time (current time + 30 minutes)
  const getMinTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return now.toTimeString().substring(0, 5);
  };

  if (userLoading || loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Authentication Required</h2>
          <p className="mb-4">You must be logged in to place food orders.</p>
          <a
            href="/login"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Log In
          </a>
        </div>
      </div>
    );
  }

  if (error && !food) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <a
            href="/listings"
            className="inline-block mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Back to Listings
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Place Your Food Order
      </h2>

      {/* Success Message */}
      <div
        id="success-message"
        className="hidden mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded"
      >
        Order placed successfully!
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {/* Food Details */}
      {food && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:pr-6">
              {food.image ? (
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-auto rounded-md object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold mb-2">{food.name}</h3>
              <p className="text-gray-600 mb-2">{food.cuisine} Cuisine</p>
              <p className="text-xl font-semibold text-gray-800 mb-4">
                ${food.pricePerItem || food.price?.replace(/\D/g, "")}
              </p>

              <p className="text-gray-700 mb-4">
                {food.description ||
                  "Delicious food prepared with fresh ingredients."}
              </p>

              <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                    className="block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your full address"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Time
                  </label>
                  <input
                    type="time"
                    name="deliveryTime"
                    min={getMinTime()}
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    required
                    className="block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Please allow at least 30 minutes for delivery
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    className="block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    rows="3"
                    placeholder="Any special instructions for preparation or delivery"
                  ></textarea>
                </div>

                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Order Total:</span>
                    <span className="font-bold text-lg">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ${
                      submitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {submitting ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Previous Orders */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Your Previous Orders
        </h2>

        {orders.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            <p>No previous orders found.</p>
            <p className="text-sm mt-2">
              Your orders will appear here after you place them.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-gray-50"
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status?.charAt(0).toUpperCase() +
                          order.status?.slice(1) || "Processing"}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-800">
                      Order #{order._id?.slice(-6)}
                    </h3>

                    <div className="mt-2 space-y-1">
                      <p className="text-gray-700">
                        <span className="font-medium">Food ID:</span>{" "}
                        <span className="font-mono text-sm">{order.food}</span>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Quantity:</span>{" "}
                        {order.quantity}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Delivery Time:</span>{" "}
                        {order.deliveryTime}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Total:</span> $
                        {order.totalAmount?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodOrder;
