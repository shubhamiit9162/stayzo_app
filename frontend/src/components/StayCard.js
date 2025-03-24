import { useNavigate } from "react-router-dom";

const StayCard = ({ stay, addToCart }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    if (typeof addToCart === "function") {
      addToCart(stay); // ✅ Ensure addToCart is a function before calling it
      navigate("/cart"); // ✅ Redirect to cart page
    } else {
      console.error("addToCart is not a function");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img
        src={stay.image}
        alt={stay.name}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{stay.name}</h2>
        <p className="text-gray-600">{stay.location}</p>
        <p className="text-green-600 font-bold">{stay.price}</p>

        {/* Book Now Button */}
        <button
          onClick={handleBooking}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default StayCard;
