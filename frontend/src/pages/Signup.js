import { useState } from "react";
import { register } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold   text-red-800 mb-4 text-center">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="border p-2 w-full rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-teal-500 text-white p-2 w-full rounded hover:bg-teal-600 transition">
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-teal-500 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
