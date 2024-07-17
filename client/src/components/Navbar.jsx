import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-lg">
      {/* ... (rest of your navbar code) ... */}
      <div className="hidden md:flex items-center space-x-3">
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
    </nav>
  );
};

export default Navbar;
