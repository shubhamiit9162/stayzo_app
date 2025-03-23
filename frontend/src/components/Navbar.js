import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo replacing "Stayzo Travel Guide" */}
        <Link to="/">
          <img src="/logo.jpg" className="h-10 md:h-12" />
        </Link>

        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/listings">Listings</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/stays">Stays</Link>
          <Link to="/food">Food</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
