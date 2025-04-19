import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUsername(userData.name || "User");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("foodCart");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo  text-red-800">
          Stayzo
        </Link>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"} />
        </div>

        <ul className={mobileMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/stays"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Stays
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/foods"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Food
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/explore"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="nav-item user-menu">
                <div className="user-profile">
                  <span>{username}</span>
                  <div className="dropdown-content">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/bookings"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>
                      My Orders
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link-btn login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link-btn register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
