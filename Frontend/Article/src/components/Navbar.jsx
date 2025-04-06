import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const specialUserId = `${import.meta.env.VITE_ADMIN_ID}`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">RemoteTaxConnect</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/articles" 
            className="text-gray-900 font-semibold  hover:text-blue-600 transition hidden md:block"
          >
            Home
          </Link>

          {user?.primaryEmailAddress?.emailAddress === specialUserId && (
            <Link
              to="/create-listing"
              className="flex items-center bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
            >
              <FaPlus className="mr-2" /> Create Listing
            </Link>
          )}

          <SignedOut>
            <Link
              to="/sign-in"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md"
            >
              Login/Signup
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-2">
          <Link
            to="/articles"
            className="block text-center text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>

          {user?.primaryEmailAddress?.emailAddress === specialUserId && (
            <Link
              to="/create-listing"
              className="block w-full text-center bg-green-500 text-white px-4 py-2 rounded-md"
            >
              <FaPlus className="mr-2 inline" /> Create Listing
            </Link>
          )}

          <SignedOut>
            <Link
              to="/sign-in"
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md"
            >
              Login/Signup
            </Link>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
