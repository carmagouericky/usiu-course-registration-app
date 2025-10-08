import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userData = storedUsers.find(
      (user) =>
        user.email === credentials.email &&
        user.password === credentials.password
    );

    if (userData) {
      console.log("Logged in as:", userData.email);
      navigate("/course-selection", {
        state: {
          student: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            idNumber: userData.idNumber,
            email: userData.email,
          },
        },
      });
    } else {
      alert("❌ Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <h2>Student Login</h2>
        <p className="subtitle">Access your USIU course registration portal</p>

        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="footer-text">
          Don’t have an account?{" "}
          <span
            style={{ color: "#FDB913", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
