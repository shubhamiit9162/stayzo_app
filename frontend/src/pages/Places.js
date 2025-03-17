import { useState, useEffect } from "react";
import axios from "axios";

const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/places")
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Places to Visit</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {places.map((place) => (
          <div key={place._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{place.name}</h3>
            <p>{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
