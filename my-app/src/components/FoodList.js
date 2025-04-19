import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("foodCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Error parsing saved cart:", err);
        localStorage.removeItem("foodCart");
      }
    }

    const fetchFoods = async () => {
      try {
        const response = await axios.get("http://localhost:5003/api/foods");
        setFoods(response.data.foods);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch food items");
        setLoading(false);
        console.error("Error fetching foods:", err);
      }
    };

    fetchFoods();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (food) => {
    const existingItem = cart.find((item) => item.foodId === food._id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.foodId === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          foodId: food._id,
          name: food.name,
          price: food.price,
          quantity: 1,
          image: food.image,
          cuisine: food.cuisine,
        },
      ]);
    }
  };

  const removeFromCart = (foodId) => {
    const existingItem = cart.find((item) => item.foodId === foodId);

    if (existingItem.quantity === 1) {
      setCart(cart.filter((item) => item.foodId !== foodId));
    } else {
      setCart(
        cart.map((item) =>
          item.foodId === foodId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5003/api/foods/search?query=${searchQuery}`
      );
      setFoods(response.data.foods);
      setLoading(false);
    } catch (err) {
      setError("Search failed");
      setLoading(false);
      console.error("Error searching foods:", err);
    }
  };

  const filterByCuisine = async (cuisine) => {
    try {
      setLoading(true);
      setCuisineFilter(cuisine);

      if (cuisine === "") {
        const response = await axios.get("http://localhost:5003/api/foods");
        setFoods(response.data.foods);
      } else {
        const response = await axios.get(
          `http://localhost:5003/api/foods/cuisine/${cuisine}`
        );
        setFoods(response.data.foods);
      }

      setLoading(false);
    } catch (err) {
      setError("Filtering failed");
      setLoading(false);
      console.error("Error filtering foods:", err);
    }
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Cart is already being saved in useEffect
    navigate("/order");
  };

  if (loading) return <div className="loading">Loading food items...</div>;
  if (error) return <div className="error">{error}</div>;

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="food-list-container">
      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="cuisine-filter">
          <select
            value={cuisineFilter}
            onChange={(e) => filterByCuisine(e.target.value)}
          >
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>

      <div className="food-grid">
        {foods.length > 0 ? (
          foods.map((food) => (
            <div key={food._id} className="food-card">
              <img
                src={
                  food.image === "default-food.jpg"
                    ? "https://via.placeholder.com/150"
                    : food.image
                }
                alt={food.name}
              />
              <h3>{food.name}</h3>
              <p className="cuisine">{food.cuisine}</p>
              <p className="description">{food.description}</p>
              <div className="food-footer">
                <span className="price">${food.price.toFixed(2)}</span>
                <span className="rating">★ {food.rating}</span>
              </div>
              <button className="add-to-cart" onClick={() => addToCart(food)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="no-foods">No food items found.</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Cart ({totalCartItems} items)</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.foodId}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(item.foodId)}>-</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      addToCart({
                        _id: item.foodId,
                        price: item.price,
                        name: item.name,
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodList;
