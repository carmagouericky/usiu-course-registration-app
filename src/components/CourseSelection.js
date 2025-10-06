import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Some lecturers intentionally repeated across courses
const coursesList = [
  { name: "Software Engineering", lecturers: ["Dr. Kimani", "Prof. Wanjiku"] },
  { name: "Artificial Intelligence", lecturers: ["Dr. Otieno", "Dr. Kimani"] },
  { name: "Database Systems", lecturers: ["Dr. Koech", "Prof. Wanjiku"] },
  { name: "Computer Networks", lecturers: ["Dr. Njenga", "Dr. Otieno"] },
  { name: "Operating Systems", lecturers: ["Dr. Kibet", "Prof. Kamau"] },
  { name: "Machine Learning", lecturers: ["Dr. Otieno", "Mr. Mwangi"] },
  { name: "Web Development", lecturers: ["Prof. Wanjiku", "Mr. Onyango"] },
];

const CourseSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = location.state || {};

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleAddCourse = () => {
    if (selectedCourses.length >= 5) {
      alert("⚠️ You can only select up to 5 courses.");
      return;
    }
    setSelectedCourses([...selectedCourses, { course: "", lecturer: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...selectedCourses];

    // Prevent same lecturer teaching multiple selected courses
    if (field === "lecturer") {
      const lecturerAlreadyChosen = updated.some(
        (item, i) => item.lecturer === value && i !== index
      );
      if (lecturerAlreadyChosen) {
        alert("🚫 You cannot select two courses taught by the same lecturer!");
        return;
      }
    }

    updated[index][field] = value;
    setSelectedCourses(updated);
  };

  const handleSubmit = () => {
    if (selectedCourses.some((c) => c.course === "" || c.lecturer === "")) {
      alert("Please complete all selections!");
      return;
    }
    navigate("/summary", { state: { student, selectedCourses } });
  };

  return (
    <div className="course-selection-page">
      <div className="selection-card">
        <h2>Course Selection</h2>
        <p className="welcome">
          Welcome, <strong>{student?.firstName} {student?.lastName}</strong>
        </p>
        <p><b>ID:</b> {student?.idNumber}</p>

        <button className="add-btn" onClick={handleAddCourse}>+ Add Course</button>

        {selectedCourses.map((item, index) => (
          <div key={index} className="selection-row">
            <select
              value={item.course}
              onChange={(e) => handleChange(index, "course", e.target.value)}
            >
              <option value="">Select Course</option>
              {coursesList.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>

            {item.course && (
              <select
                value={item.lecturer}
                onChange={(e) => handleChange(index, "lecturer", e.target.value)}
              >
                <option value="">Select Lecturer</option>
                {coursesList
                  .find((c) => c.name === item.course)
                  ?.lecturers.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
              </select>
            )}
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit}>View Summary</button>
      </div>
    </div>
  );
};

export default CourseSelection;
