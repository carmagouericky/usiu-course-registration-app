import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CourseSelection from "./components/CourseSelection";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* USIU Navbar */}
        <nav className="navbar">
          <h1 className="navbar-title">USIU Course Registration System</h1>
          <div className="navbar-links">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/course-selection">Courses</Link>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/course-selection" element={<CourseSelection />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
