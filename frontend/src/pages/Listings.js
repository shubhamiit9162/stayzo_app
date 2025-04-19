import { useEffect, useState } from "react";
import { fetchStays, fetchFoods } from "../api/api";
import StayCard from "../components/StayCard";
import FoodCard from "../components/FoodCard";
import { useNavigate } from "react-router-dom";

const Listings = () => {
  const navigate = useNavigate();
  const [stays, setStays] = useState([
    {
      _id: 1,
      name: "Luxury Resort",
      image: "/stay-1.jpg",
      location: "Goa",
      pricePerNight: 150, // Changed to match the expected format in Booking.js
      price: "$150/night",
    },
    {
      _id: 2,
      name: "Cozy Cottage",
      image: "/stay-2.jpg",
      location: "Manali",
      pricePerNight: 100,
      price: "$100/night",
    },
    {
      _id: 3,
      name: "Beachfront Villa",
      image: "/stay-3.jpg",
      location: "Kerala",
      pricePerNight: 200,
      price: "$200/night",
    },
    {
      _id: 4,
      name: "Mountain Cabin",
      image: "https://picsum.photos/500/350",
      location: "Shimla",
      pricePerNight: 120,
      price: "$120/night",
    },
    {
      _id: 5,
      name: "City Apartment",
      image: "https://picsum.photos/500/350",
      location: "Mumbai",
      pricePerNight: 180,
      price: "$180/night",
    },
    {
      _id: 6,
      name: "Lakeview Retreat",
      image: "https://picsum.photos/seed/lakeview/400/300",
      location: "Udaipur",
      pricePerNight: 160,
      price: "$160/night",
    },
    {
      _id: 7,
      name: "Hilltop Hideaway",
      image: "https://picsum.photos/seed/hilltop/400/300",
      location: "Darjeeling",
      pricePerNight: 110,
      price: "$110/night",
    },
    {
      _id: 8,
      name: "Forest Lodge",
      image: "https://picsum.photos/seed/forestlodge/400/300",
      location: "Jim Corbett",
      pricePerNight: 130,
      price: "$130/night",
    },
    {
      _id: 9,
      name: "Backwater Bungalow",
      image: "https://picsum.photos/seed/backwater/400/300",
      location: "Alleppey",
      pricePerNight: 140,
      price: "$140/night",
    },
    {
      _id: 10,
      name: "Royal Palace Stay",
      image: "https://picsum.photos/seed/royalpalace/400/300",
      location: "Jaipur",
      pricePerNight: 200,
      price: "$200/night",
    },
    {
      _id: 11,
      name: "Jungle Camp",
      image: "https://picsum.photos/seed/junglecamp/400/300",
      location: "Ranthambore",
      pricePerNight: 125,
      price: "$125/night",
    },
    {
      _id: 12,
      name: "Snowy Chalet",
      image: "https://picsum.photos/seed/snowychalet/400/300",
      location: "Gulmarg",
      pricePerNight: 190,
      price: "$190/night",
    },
    {
      _id: 13,
      name: "Desert Tent",
      image: "https://picsum.photos/seed/deserttent/400/300",
      location: "Jaisalmer",
      pricePerNight: 95,
      price: "$95/night",
    },
    {
      _id: 14,
      name: "Riverside Inn",
      image: "https://picsum.photos/seed/riversideinn/400/300",
      location: "Rishikesh",
      pricePerNight: 115,
      price: "$115/night",
    },
    {
      _id: 15,
      name: "Island Escape",
      image: "https://picsum.photos/seed/islandescape/400/300",
      location: "Andaman",
      pricePerNight: 210,
      price: "$210/night",
    },
  ]);

  const [foods, setFoods] = useState([
    {
      _id: 1,
      name: "Pizza",
      image: "/food-1.jpg",
      cuisine: "Italian",
      price: "$12",
      pricePerItem: 12, // Added for consistency
    },
    {
      _id: 2,
      name: "Sushi",
      image: "/food-2.jpg",
      cuisine: "Japanese",
      price: "$15",
      pricePerItem: 15,
    },
    {
      _id: 3,
      name: "Biryani",
      image: "/food-3.jpg",
      cuisine: "Indian",
      price: "$10",
      pricePerItem: 10,
    },
    {
      _id: 4,
      name: "Burger",
      image: "https://picsum.photos/seed/vegthali/500/350",
      cuisine: "American",
      price: "$8",
      pricePerItem: 8,
    },
    {
      _id: 5,
      name: "Tacos",
      image: "/food-3.jpg",
      cuisine: "Mexican",
      price: "$9",
      pricePerItem: 9,
    },
    {
      _id: 6,
      name: "Pasta",
      image: "https://picsum.photos/seed/pasta/500/350",
      cuisine: "Italian",
      price: "$11",
      pricePerItem: 11,
    },
    {
      _id: 7,
      name: "Dim Sum",
      image: "https://picsum.photos/seed/dimsum/500/350",
      cuisine: "Chinese",
      price: "$13",
      pricePerItem: 13,
    },
    {
      _id: 8,
      name: "Butter Chicken",
      image: "https://picsum.photos/seed/butterchicken/500/350",
      cuisine: "Indian",
      price: "$14",
      pricePerItem: 14,
    },
    {
      _id: 9,
      name: "Ramen",
      image: "https://picsum.photos/seed/ramen/500/350",
      cuisine: "Japanese",
      price: "$16",
      pricePerItem: 16,
    },
    {
      _id: 10,
      name: "Falafel",
      image: "https://picsum.photos/seed/falafel/500/350",
      cuisine: "Middle Eastern",
      price: "$9",
      pricePerItem: 9,
    },
    {
      _id: 11,
      name: "Pad Thai",
      image: "https://picsum.photos/seed/padthai/500/350",
      cuisine: "Thai",
      price: "$12",
      pricePerItem: 12,
    },
    {
      _id: 12,
      name: "Steak",
      image: "https://picsum.photos/seed/steak/500/350",
      cuisine: "American",
      price: "$22",
      pricePerItem: 22,
    },
    {
      _id: 13,
      name: "Shawarma",
      image: "https://picsum.photos/seed/shawarma/500/350",
      cuisine: "Lebanese",
      price: "$10",
      pricePerItem: 10,
    },
    {
      _id: 14,
      name: "Fish Curry",
      image: "https://picsum.photos/seed/fishcurry/500/350",
      cuisine: "Coastal Indian",
      price: "$15",
      pricePerItem: 15,
    },
    {
      _id: 15,
      name: "Veg Thali",
      image: "https://picsum.photos/seed/vegthali/500/350",
      cuisine: "Indian",
      price: "$10",
      pricePerItem: 10,
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staysRes = await fetchStays();
        const foodsRes = await fetchFoods();

        if (Array.isArray(staysRes.data)) {
          // Ensure each stay has pricePerNight property
          const formattedStays = staysRes.data.map((stay) => ({
            ...stay,
            pricePerNight:
              stay.pricePerNight ||
              parseInt(stay.price?.replace(/\D/g, "")) ||
              100,
          }));
          setStays(formattedStays);
        }

        if (Array.isArray(foodsRes.data)) {
          // Ensure each food has pricePerItem property
          const formattedFoods = foodsRes.data.map((food) => ({
            ...food,
            pricePerItem:
              food.pricePerItem ||
              parseInt(food.price?.replace(/\D/g, "")) ||
              10,
          }));
          setFoods(formattedFoods);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("successfully fetch to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBooking = (id, type) => {
    if (!id) {
      console.error(`Error: Missing ID for ${type} booking.`);
      return;
    }

    // Fix: Navigate to the correct route based on type
    if (type === "stay") {
      navigate(`/booking/${id}`); // This route should match your router configuration
    } else if (type === "food") {
      navigate(`/food-order/${id}`); // This route is for food orders
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stay Listings</h2>
      {loading && <p className="text-gray-600">Loading listings...</p>}
      {error && <p className="text-blue-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stays.map((stay) => (
          <div
            key={stay._id}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <StayCard
              stay={stay}
              onBook={() => handleBooking(stay._id, "stay")}
            />
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">Food Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div
            key={food._id}
            className="cursor-pointer transition-transform hover:scale-105"
          >
            <FoodCard
              food={food}
              onOrder={() => handleBooking(food._id, "food")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
