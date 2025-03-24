import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const FoodOrder = () => {
  const { state } = useLocation(); // Get food details from navigation
  const { foodId } = useParams(); // Get food ID from URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    food: state?.food?.name || "", // Pre-fill with food name if available
  });

  useEffect(() => {
    if (state?.food) {
      setFormData((prev) => ({
        ...prev,
        food: state.food.name,
      }));
    }
  }, [state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5003/api/food-orders",
        formData
      );
      console.log("Order successful:", response.data);
      setFormData({
        name: "",
        email: "",
        address: "",
        food: state?.food?.name || "",
      });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Your Food</h2>

      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="food"
          value={formData.food}
          readOnly
          className="block w-full p-2 mb-2 border rounded bg-gray-100"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default FoodOrder;
