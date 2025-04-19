import React from "react";

const FoodCard = ({ food, onOrder }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {food.image ? (
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{food.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>{food.cuisine}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-800 font-medium">
            ${food.pricePerItem || food.price?.replace(/\D/g, "")}
          </p>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm text-gray-600">
              {food.rating || "4.5"}
            </span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent div's onClick
            onOrder();
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition font-medium"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
