import React from "react";
import { useNavigate } from "react-router-dom";

const StayCard = ({ stay }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking/:stayId", { state: { stay } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-black-200">
        {stay.image ? (
          <img
            src={stay.image || "https://picsum.photos/400/300"}
            alt={stay.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{stay.name}</h3>
        <div className="flex items-center text-red-600 mb-2">
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
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{stay.location}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-red-800 font-medium">
            ${stay.pricePerNight || stay.price?.replace(/\D/g, "")}
            <span className="text-red-600 font-normal">/night</span>
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
            <span className="ml-1 text-sm text-red-600">
              {stay.rating || "4.5"}
            </span>
          </div>
        </div>

        <button
          onClick={handleBookNow}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition font-medium"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default StayCard;
