import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./home.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const navigate = useNavigate(); // Initialize navigation

  const stays = [
    { id: 1, name: "Luxury Hotel", image: "/stay-1.jpg" },
    { id: 2, name: "Beachside Villa", image: "/stay-2.jpg" },
    { id: 3, name: "Mountain Retreat", image: "/stay-3.jpg" },
  ];

  const foods = [
    {
      id: 1,
      name: "Pizza",
      image: "/pizza.jpg",
      description: "Delicious cheese pizza with toppings.",
    },
    {
      id: 2,
      name: "Burger",
      image: "/burger.jpg",
      description: "Classic beef burger with fresh lettuce.",
    },
    {
      id: 3,
      name: "Sushi",
      image: "/sushi.jpg",
      description: "Fresh sushi rolls with fish and vegetables.",
    },
    {
      id: 4,
      name: "Pasta",
      image: "/pasta.jpg",
      description: "Italian pasta with creamy sauce and herbs.",
    },
    {
      id: 5,
      name: "Salad",
      image: "/salad.jpg",
      description: "Healthy mix of vegetables and dressing.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          className="relative z-10 text-white px-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-5xl md:text-7xl font-extrabold text-black bg-gradient-to-r from-blue-400 to-teal-400">
            Welcome to Stayzo
          </h3>

          <motion.button
            className="mt-6 px-6 py-3 bg-teal-500 text-black font-extrabold rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Explore Now
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Stays */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-extrabold text-black -900 text-center">
          Featured Stays
        </h2>
        <p className="text-red-600 text-center mt-2">
          Top-rated places curated just for you
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {stays.map((stay) => (
            <motion.div
              key={stay.id}
              className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: stay.id * 0.2 }}
              data-aos="fade-up"
            >
              <img
                src={stay.image}
                alt={stay.name}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold">{stay.name}</h3>
                <p className="text-red-600 mt-2">
                  Experience world-class comfort in the best locations.
                </p>
                <button
                  className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => navigate(`/booking/${stay.id}`)} // Navigate with stay ID
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 py-20 text-black text-center">
        <h2 className="text-4xl font-extrabold">
          Ready for Your Next Adventure?
        </h2>
        <p className="mt-4 text-lg">
          Book your dream stay today and make unforgettable memories.
        </p>
        <motion.button
          className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
