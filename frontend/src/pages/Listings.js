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
      price: "$150/night",
    },
    {
      _id: 2,
      name: "Cozy Cottage",
      image: "/stay-2.jpg",
      location: "Manali",
      price: "$100/night",
    },
    {
      _id: 3,
      name: "Beachfront Villa",
      image: "/stay-3.jpg",
      location: "Kerala",
      price: "$200/night",
    },
    {
      _id: 4,
      name: "Mountain Cabin",
      image: "/stay-4.jpg",
      location: "Shimla",
      price: "$120/night",
    },
    {
      _id: 5,
      name: "City Apartment",
      image: "/stay-5.jpg",
      location: "Mumbai",
      price: "$180/night",
    },
  ]);

  const [foods, setFoods] = useState([
    {
      _id: 1,
      name: "Pizza",
      image: "/food-1.jpg",
      cuisine: "Italian",
      price: "$12",
    },
    {
      _id: 2,
      name: "Sushi",
      image: "/food-2.jpg",
      cuisine: "Japanese",
      price: "$15",
    },
    {
      _id: 3,
      name: "Biryani",
      image: "/food-3.jpg",
      cuisine: "Indian",
      price: "$10",
    },
    {
      _id: 4,
      name: "Burger",
      image: "/food-4.jpg",
      cuisine: "American",
      price: "$8",
    },
    {
      _id: 5,
      name: "Tacos",
      image: "/food-5.jpg",
      cuisine: "Mexican",
      price: "$9",
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staysRes = await fetchStays();
        const foodsRes = await fetchFoods();

        if (Array.isArray(staysRes.data)) setStays(staysRes.data);
        if (Array.isArray(foodsRes.data)) setFoods(foodsRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBooking = (id, type) => {
    navigate(`/booking/${type}/${id}`); // Redirects to booking page
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stay Listings</h2>

      {loading && <p>Loading listings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stays.map((stay) => (
          <div
            key={stay._id}
            onClick={() => handleBooking(stay._id, "stay")}
            className="cursor-pointer"
          >
            <StayCard stay={stay} />
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">Food Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div
            key={food._id}
            onClick={() => handleBooking(food._id, "food")}
            className="cursor-pointer"
          >
            <FoodCard food={food} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
