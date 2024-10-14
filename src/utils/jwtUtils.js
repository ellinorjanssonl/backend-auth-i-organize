// src/utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Sätt en hemlig nyckel i .env-fil

// Skapa en JWT-token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
};

// Verifiera en JWT-token
const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
