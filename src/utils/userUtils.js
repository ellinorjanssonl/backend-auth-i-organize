const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data', 'users.json');

// Läs användardata från users.json
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Skriv användardata till users.json
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

module.exports = { readUsers, writeUsers };

