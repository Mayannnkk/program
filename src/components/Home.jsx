import React from 'react';
import Navbar from './Navbar';
import Feeds from './feeds';
import Menu from './menu';
import Profile from './Profile';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-row h-screen">
        {/* Menu Section */}
        <div className="w-1/4 bg-gray-800 text-white p-4">
          <Menu />
        </div>

        {/* Main Content Section */}
        <div className="flex-1 flex flex-col bg-gray-200">
          <h2 className="text-lg font-bold p-4">Main Section (Feeds)</h2>
          {/* Scrollable Feeds Section */}
          <div className="flex-1 overflow-y-auto p-4 scrollable-feeds">
            <div className="flex flex-col -mx-4">
              <Feeds />
              <Feeds />
              <Feeds />
              <Feeds />
              <Feeds />
              <Feeds />
              <Feeds />
              <Feeds />
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="w-1/5 bg-gray-100 p-4">
          <Profile />
        </div>
      </div>
    </>
  );
};

export default Home;