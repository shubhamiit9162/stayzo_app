const FoodCard = ({ food }) => {
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
      </div>
    </div>
  );
};

export default FoodCard;
