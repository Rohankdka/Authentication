import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {/* Logo */}
            <Link to="/" className="flex items-center py-5 px-2 text-gray-700">
              <span className="font-bold">MyApp</span>
            </Link>

            {/* Primary Navbar items */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">Home</Link>
              <Link to="/blog" className="py-5 px-3 text-gray-700 hover:text-gray-900">My Post</Link>
            </div>
          </div>

          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-1">
            {user.username ? (
              <>
                <button onClick={logout} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-red-500 hover:text-white transition duration-300">Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
                <Link to="/register" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg className="w-6 h-6 text-gray-500 hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="hidden mobile-menu">
        <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</Link>
        <Link to="/mypost" className="block py-2 px-4 text-sm hover:bg-gray-200">My Post</Link>
        {user.username ? (
          <button onClick={logout} className="block w-full text-left py-2 px-4 text-sm text-gray-500 hover:bg-red-500 hover:text-white">Log Out</button>
        ) : (
          <>
            <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-200">Log In</Link>
            <Link to="/register" className="block py-2 px-4 text-sm hover:bg-gray-200">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
