// src/App.js
import React from 'react';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="flex-1">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
