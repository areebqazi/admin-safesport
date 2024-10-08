// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white  w-64 flex-shrink-0 min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Safe Sport</h1>
        <p className="mt-2 text-gray-400">Admin Dashboard</p>
      </div>
      <nav className="mt-8">
        <NavLink
          to="/"
          exact
          className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-900"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/videos"
          exact
          className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-900"
        >
          Videos
        </NavLink>
        {/* <NavLink
          to="/create-video"
          exact
          className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white"
          activeClassName="bg-gray-900"
        >
          Create Video
        </NavLink> */}
        {/* Add more links as needed */}
      </nav>
    </div>
  );
};

export default Sidebar;
