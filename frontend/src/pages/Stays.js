import { useState, useEffect } from "react";
import axios from "axios";
import StayCard from "../components/StayCard"; // ✅ Import StayCard

const Stays = ({ addToCart }) => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/stays");
        console.log("API Response for Stay:", res.data);

        if (res.data && Array.isArray(res.data)) {
          setStayItems(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setStayItems([]);
        }
      } catch (err) {
        console.error("Error fetching stay:", err);
        setError("Failed to load stay places. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStay();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Best Stays</h2>

      {/* ✅ Loading State */}
      {loading && <p className="text-blue-500">Loading stays...</p>}

      {/* ✅ Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ No Data Available */}
      {!loading && !error && stays.length === 0 && (
        <p className="text-gray-500">No stays available at the moment.</p>
      )}

      {/* ✅ Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stays.map((stay) => (
          <StayCard key={stay._id} stay={stay} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Stays;
