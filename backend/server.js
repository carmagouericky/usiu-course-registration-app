const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Replaces body-parser

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/usiuDB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  idNumber: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', userSchema);

// Course Selection Schema and Model
const courseSelectionSchema = new mongoose.Schema({
  student: {
    firstName: String,
    lastName: String,
    idNumber: String,
    email: String
  },
  selectedCourses: [
    {
      course: String,
      lecturer: String
    }
  ]
});
const CourseSelection = mongoose.model('CourseSelection', courseSelectionSchema);

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, idNumber, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send('Email already registered');

    const user = new User({ firstName, lastName, idNumber, email, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server error');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    if (user.password !== password) return res.status(400).send('Invalid password');

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      idNumber: user.idNumber,
      email: user.email
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});

// Course Selection Route
app.post('/courses', async (req, res) => {
  try {
    const { student, selectedCourses } = req.body;

    const newSelection = new CourseSelection({ student, selectedCourses });
    await newSelection.save();

    res.status(201).json({ message: 'Courses saved successfully' });
  } catch (err) {
    console.error('Course save error:', err);
    res.status(500).json({ error: 'Failed to save courses' });
  }
});

// Start Server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));
