// @ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const dummyFoods = [
  {
    name: "Veg Thali",
    cuisine: "Indian",
    price: 7.99,
    rating: 4.5,
    image: "https://picsum.photos/seed/vegthali/500/350",
    description: "A complete vegetarian Indian meal.",
  },
  {
    name: "Margherita Pizza",
    cuisine: "Italian",
    price: 9.49,
    rating: 4.7,
    image: "https://picsum.photos/seed/margherita/500/350",
    description: "Classic pizza with fresh tomatoes and mozzarella.",
  },
  {
    name: "Chicken Biryani",
    cuisine: "Indian",
    price: 11.25,
    rating: 4.6,
    image: "https://picsum.photos/seed/biryani/500/350",
    description: "Fragrant rice with spiced chicken.",
  },
  {
    name: "Sushi Platter",
    cuisine: "Japanese",
    price: 13.99,
    rating: 4.8,
    image: "https://picsum.photos/seed/sushi/500/350",
    description: "A variety of fresh sushi rolls.",
  },
  {
    name: "Pad Thai",
    cuisine: "Thai",
    price: 10.5,
    rating: 4.4,
    image: "https://picsum.photos/seed/padthai/500/350",
    description: "Stir-fried rice noodles with shrimp and tofu.",
  },
  {
    name: "Cheeseburger",
    cuisine: "American",
    price: 8.75,
    rating: 4.2,
    image: "https://picsum.photos/seed/cheeseburger/500/350",
    description: "Juicy burger with melted cheese.",
  },
  {
    name: "Falafel Wrap",
    cuisine: "Middle Eastern",
    price: 6.95,
    rating: 4.3,
    image: "https://picsum.photos/seed/falafel/500/350",
    description: "Crispy falafel with tahini sauce.",
  },
  {
    name: "Tandoori Chicken",
    cuisine: "Indian",
    price: 12.5,
    rating: 4.6,
    image: "https://picsum.photos/seed/tandoori/500/350",
    description: "Spiced grilled chicken with yogurt marinade.",
  },
  {
    name: "Pasta Alfredo",
    cuisine: "Italian",
    price: 9.99,
    rating: 4.5,
    image: "https://picsum.photos/seed/alfredo/500/350",
    description: "Creamy pasta with parmesan cheese.",
  },
  {
    name: "Paneer Butter Masala",
    cuisine: "Indian",
    price: 8.99,
    rating: 4.7,
    image: "https://picsum.photos/seed/paneer/500/350",
    description: "Soft paneer cubes in rich tomato gravy.",
  },
];

const Food = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/foods");
        console.log("API Response for Food:", res.data);

        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setFoodItems(res.data);
        } else {
          console.warn("Using dummy food items as fallback");
          setFoodItems(dummyFoods);
        }
      } catch (err) {
        console.error("Error fetching food:", err);
        setError("Failed to load food items. Displaying dummy items.");
        setFoodItems(dummyFoods);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, []);

  const handleOrderFood = () => {
    navigate("/booking");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Delicious Food</h1>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 p-4 rounded-lg animate-pulse h-40"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* No data */}
      {!loading && foodItems.length === 0 && !error && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          No food items found.
        </div>
      )}

      {/* Food List */}
      {!loading && foodItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {foodItems.map((item, idx) => (
            <div
              key={item._id || item.id || idx}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/400/300";
                  }}
                />
              )}
              <div className="p-4">
                <h3 className="text-xl   text-blue-800 font-semibold mb-2">
                  {item.name}
                </h3>
                <p className="text-red-600 mb-3">
                  {item.description || "No description available"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {item.cuisine || "General"}
                  </span>
                  <span className="font-bold  text-blue-800 text-lg">
                    {typeof item.price === "number"
                      ? `$${item.price.toFixed(2)}`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleOrderFood}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          Order Food
        </button>
      </div>
    </div>
  );
};

export default Food;
