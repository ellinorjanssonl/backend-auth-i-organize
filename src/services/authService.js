
// src/services/authService.js
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwtUtils = require('../utils/jwtUtils');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Läs användare från JSON-fil
const readUsersFromFile = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Skriv användare till JSON-fil
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Registrera en ny användare
const register = async (username, password) => {
  const users = readUsersFromFile();
  
  // Kontrollera om användaren redan finns
  if (users.find(user => user.username === username)) {
    throw new Error('Användarnamnet är redan upptaget');
  }

  // Hasha lösenordet
  const hashedPassword = await bcrypt.hash(password, 10);

  // Skapa ny användare
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);

  // Skriv till fil
  writeUsersToFile(users);
  
  return newUser;
};

// Logga in en användare
const login = async (username, password) => {
  const users = readUsersFromFile();
  const user = users.find(user => user.username === username);

  if (!user) {
    throw new Error('Fel användarnamn eller lösenord');
  }

  // Jämför lösenord
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Fel användarnamn eller lösenord');
  }

  // Skapa JWT-token
  const token = jwtUtils.generateToken(user.id);
  return token;
};

module.exports = { register, login };
