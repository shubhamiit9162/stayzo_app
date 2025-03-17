import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/Listings";
import Reviews from "./pages/Reviews";
import Notifications from "./pages/Notifications";
import Places from "./pages/Places";
import Explore from "./pages/Explore";
import Stays from "./pages/Stays";
import Food from "./pages/Food";
import Contacts from "./pages/Contacts";
import Booking from "./pages/Booking";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/places" element={<Places />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/food" element={<Food />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
