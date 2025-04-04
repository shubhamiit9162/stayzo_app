import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Food = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/food");
        console.log("API Response for Food:", res.data);

        if (res.data && Array.isArray(res.data)) {
          setFoodItems(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setFoodItems([]);
        }
      } catch (err) {
        console.error("Error fetching food:", err);
        setError("Failed to load food items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, []);

  // Function to handle order button click
  const handleOrderFood = () => {
    navigate("/booking"); // Redirect to booking page
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Delicious Food</h2>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded shadow animate-pulse">
              <div className="h-40 bg-gray-300 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* No Data Available */}
      {!loading && foodItems.length === 0 && (
        <p className="text-gray-500 text-center">No food items found.</p>
      )}

      {/* Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <div key={item._id} className="p-4 border rounded shadow bg-white">
            <img
              src={item.image || "https://picsum.photos/400/300"}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {item.description ? item.description : "No description available"}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {item.category || "General"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Order Food Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleOrderFood}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition"
        >
          Order Food
        </button>
      </div>
    </div>
  );
};

export default Food;
