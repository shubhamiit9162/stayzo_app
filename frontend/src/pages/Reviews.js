import { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview) return;

    try {
      const res = await axios.post("http://localhost:5003/api/reviews", {
        text: newReview,
      });
      setReviews([...reviews, res.data]);
      setNewReview("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Reviews</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="border p-2 w-full"
          placeholder="Write a review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 w-full mt-2">
          Submit Review
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border p-4 rounded-lg shadow-md">
            <p>{review.text}</p>
            <small className="text-gray-500">By {review.user}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
