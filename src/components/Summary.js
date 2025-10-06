// src/components/Summary.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, selectedCourses } = location.state || {};

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F9FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          maxWidth: "650px",
          width: "100%",
        }}
      >
        <h2
          style={{
            color: "#003366",
            textAlign: "center",
            marginBottom: "25px",
            borderBottom: "3px solid #FDB813",
            paddingBottom: "10px",
          }}
        >
          Course Registration Summary
        </h2>

        <div
          style={{
            backgroundColor: "#F0F4F8",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "25px",
          }}
        >
          <h3 style={{ color: "#003366", marginBottom: "10px" }}>Student Details</h3>
          <p>
            <b>Full Name:</b> {student?.firstName} {student?.lastName}
          </p>
          <p>
            <b>ID Number:</b> {student?.idNumber}
          </p>
          <p>
            <b>Email:</b> {student?.email}
          </p>
        </div>

        <div>
          <h3 style={{ color: "#003366", marginBottom: "10px" }}>Selected Courses</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {selectedCourses.map((item, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: "#EAF2FB",
                  padding: "10px 15px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  borderLeft: "5px solid #FDB813",
                }}
              >
                <b style={{ color: "#003366" }}>{item.course}</b> — {item.lecturer}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => navigate("/courses", { state: { student } })}
            style={{
              backgroundColor: "#003366",
              color: "white",
              padding: "10px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0055A4")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#003366")}
          >
            ⬅ Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
