import { useState } from "react";
import { login } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/listings");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold  text-red-800 mb-4 text-center">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition">
          Login
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-500 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
