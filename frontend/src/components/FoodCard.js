import { useNavigate } from "react-router-dom";

const FoodCard = ({ food }) => {
  const navigate = useNavigate(); // Initialize navigation

  const handleOrder = () => {
    // Navigate to the food order page with food details as state
    navigate(`/food-order/${food.id}`, { state: { food } });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{food.name}</h2>
        <p className="text-gray-600">{food.cuisine}</p>
        <p className="text-green-600 font-bold">{food.price}</p>

        {/* Order Now Button */}
        <button
          onClick={handleOrder}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
