// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";
import Videos from "./components/Videos";
import CreateVideo from "./components/CreateVideo";

const user = localStorage.getItem("user");

function App() {
  return (
    <Router>
      <div className="flex">
        {user && <Sidebar />}

        <div className="flex-1">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Dashboard /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/videos"
                element={
                  user ? <Videos /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/create-video"
                element={
                  user ? <CreateVideo /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/login"
                element={!user ? <AuthPage /> : <Dashboard />}
              />
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
