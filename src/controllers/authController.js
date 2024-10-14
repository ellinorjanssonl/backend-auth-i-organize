// src/controllers/authController.js
const authService = require('../services/authService');

// Register a new user
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await authService.register(username, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login };
