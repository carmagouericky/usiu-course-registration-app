import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", formData);
      alert("✅ Registration successful! Proceed to login.");
      navigate("/login");
    } catch (err) {
      alert("⚠️ Email already registered or server error.");
    }
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <h2>Student Registration</h2>
        <p className="subtitle">Create your USIU course registration account</p>

        <form onSubmit={handleRegister}>
          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>

        <p className="footer-text">
          Already registered?{" "}
          <span style={{ color: "#FDB913", cursor: "pointer" }} onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
