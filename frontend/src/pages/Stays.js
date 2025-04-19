import { useState, useEffect } from "react";
import axios from "axios";
import StayCard from "../components/StayCard";

const Stays = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/stays/stay");
        console.log("API Response for Stay:", res.data);
        if (res.data && Array.isArray(res.data)) {
          setStays(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setStays([]);
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

      {loading && <p className="text-blue-500">Loading stays...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && stays.length === 0 && (
        <p className="text-blue-500">No stays available at the moment.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stays.map((stay) => (
          <div key={stay._id} className="bg-white p-4 rounded-lg shadow-md">
            {/* Image logic here */}
            <img
              src={stay.image || "https://picsum.photos/seed/backwater/400/300"}
              alt={stay.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            {/* Pass the stay details to the StayCard */}
            <StayCard stay={stay} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stays;
