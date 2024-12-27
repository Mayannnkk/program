import React, { useContext, useEffect } from 'react';
import Navbar from './Navbar';
import Feeds from './feeds';
import Menu from './menu';
import Profile from './Profile';
import { UserContext } from '../context';

const Home = () => {
  const { currentUser, loading, error,setCurrentUser } = useContext(UserContext);
  
  useEffect(()=>{
    
    const storedUser  = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser (storedUser );
  },[])
  
  return (
    <>
        {
        < Navbar />}
          <div className="flex flex-row h-screen">
            {/* Menu Section */}
            <div className="w-1/5 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
              <Menu />
            </div>

            {/* Main Content Section */}
            <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-gray-900">
              {/* <h2 className="text-lg font-bold p-4">Main Section (Feeds)</h2> */}
              {/* Scrollable Feeds Section */}
              <div className="flex-1 overflow-y-auto p-4 scrollable-feeds">
                <div className="flex flex-col -mx-4">
                  <Feeds />
                  
                </div>
              </div>
            </div>

            {/* Profile Section */}
            <div className="w-1/5 bg-gradient-to-l from-gray-800 to-gray-900 p-4">
              <Profile />
            </div>
          </div>
        
          <style jsx>{`
        .scrollable-feeds::-webkit-scrollbar {
          display: none; /* Hide scrollbar */
        }

        .scrollable-feeds {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer and Edge */
        }
      `}</style>
    </>
  );
};

export default Home;