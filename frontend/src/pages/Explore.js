import { useState, useEffect } from "react";
import axios from "axios";

const Explore = () => {
  const [explore, setExplore] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/explore")
      .then((res) => setExplore(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Explore More</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {explore.map((item) => (
          <div key={item._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
