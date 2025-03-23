import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Stayzo Travel Guide</h1>
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
