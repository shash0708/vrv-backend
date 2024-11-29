const bcrypt = require('bcrypt')
const express = require('express');
const { getTodos, createTodo, deleteTodo } = require('../controller/todoController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const authorize = require('../middleware/authorize');

const verifyRole = require('../middleware/verifyRole');
const User = require('../models/db')
var jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('Email is already registered');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Save user to the database
      const newUser = new User({
        email,
        password: hashedPassword,
        role: role || 'User'
      });
  
      await newUser.save();
  
      res.status(201).send('User registered successfully');
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).send('An error occurred during registration');
    }
  });

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
   
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Include role in the token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    // Store the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production', // Send only over HTTPS in production
      sameSite: 'strict', // CSRF protection
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: 'Login successful',role: user.role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err});
  }
});
// Backend Response Example:




router.get('/admin', verifyRole(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin!' });
});

// User and Admin access
router.get('/dashboard', verifyRole(['user', 'admin']), (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.role}!` });
});


// Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// router.get('/todos', protect, getTodos);
// router.post('/todos', protect, isAdmin, createTodo);
// router.delete('/todos/:id', protect, isAdmin, deleteTodo);

router.get('/todos', protect, authorize(['admin', 'moderator', 'user']), getTodos);
router.post('/todos', protect, authorize(['admin']), createTodo);
router.delete('/todos/:id', protect, authorize(['admin', 'moderator']), deleteTodo);



  module.exports= router