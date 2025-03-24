import { useState, useEffect } from "react";
import axios from "axios";

const Explore = () => {
  const [explore, setExplore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        const res = await axios.get("http://localhost:5003/api/explore");
        setExplore(res.data);
      } catch (err) {
        console.error("Error fetching explore data:", err);
        setError("Failed to load explore data.");
      } finally {
        setLoading(false);
      }
    };

    fetchExploreData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore More</h2>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded shadow animate-pulse">
              <div className="h-40 bg-gray-300 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 w-3/4 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* No Data Available */}
      {!loading && explore.length === 0 && (
        <p className="text-gray-500 text-center">No explore data found.</p>
      )}

      {/* Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {explore.map((item) => (
          <div key={item._id} className="p-4 border rounded shadow bg-white">
            <img
              src={item.image || "https://picsum.photos/400/300"}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-2">
              {item.description ? item.description : "No description available"}
              {/* ✅ Debugging line */}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {item.category || "General"}
              </span>
              <span>⭐ {item.rating || "No rating"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
