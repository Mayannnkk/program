import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const [currentUser , setCurrentUser ] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser (JSON.parse(userData));
    }
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" flex  gap-4 ">
          <h className="text-white text-3xl font-montserrat font-bold">PRO GRAM </h>
          <p className='text-white text-xl font-montserrat m-2'>Project-Gram</p>
        </div>
        
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
          <Link to="/myProjects" className="text-gray-300 hover:text-white transition duration-300">My Projects</Link>
          <Link to="/submitProject" className="text-gray-300 hover:text-white transition duration-300">Submit Project</Link>
          {/* Conditionally render Rate Project link if user is a professor */}
          {/* {currentUser  && currentUser .isProfessor && (
            <Link to="/rateProject" className="text-gray-300 hover:text-white transition duration-300">Rate Project</Link>
          )} */}
          {!isLoggedIn && (
            <Link to="/login" className="text-white bg-blue-600 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;