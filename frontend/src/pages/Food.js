import { useState, useEffect } from "react";
import axios from "axios";

const Food = () => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/food")
      .then((res) => setFood(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Popular Food</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {food.map((item) => (
          <div key={item._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p>
              {item.cuisine} - ₹{item.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
