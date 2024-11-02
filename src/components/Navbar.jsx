import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          PRO GRAM
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/myProjects" className="text-gray-300 hover:text-white">My Projects</Link>
          <Link to="/submitProject" className="text-gray-300 hover:text-white">Submit Project</Link>
          {!isLoggedIn && (
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;