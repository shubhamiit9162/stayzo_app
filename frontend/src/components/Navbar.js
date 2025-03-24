import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo replacing "Stayzo Travel Guide" */}
        <Link to="/">
          <img src="/logo.jpg" className="h-10 md:h-12" />
        </Link>
        {/* Empty div to push links to center */}
        <div className="flex-1"></div>

        {/* Centered Navigation Links */}
        <div className="flex space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/listings" className="hover:text-blue-600">
            Listings
          </Link>
          <Link to="/explore" className="hover:text-blue-600">
            Explore
          </Link>
          <Link to="/stays" className="hover:text-blue-600">
            Stays
          </Link>
          <Link to="/food" className="hover:text-blue-600">
            Food
          </Link>
          <Link to="/contacts" className="hover:text-blue-600">
            Contacts
          </Link>
        </div>
        {/* Login Button - Aligned Right */}
        <div className="flex-1 flex justify-end">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
