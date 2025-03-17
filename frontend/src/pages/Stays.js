import { useState, useEffect } from "react";
import axios from "axios";

const Stays = () => {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/stays");
        console.log("API Response:", res.data); // Debugging
        if (Array.isArray(res.data)) {
          setStays(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setStays([]); // Fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching stays:", err);
        setError("Failed to load stays. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStays();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Best Stays</h2>

      {loading && <p>Loading stays...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && stays.length === 0 && (
        <p>No stays available at the moment.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stays.map((stay) => (
          <div key={stay._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{stay.name}</h3>
            <p>{stay.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stays;
