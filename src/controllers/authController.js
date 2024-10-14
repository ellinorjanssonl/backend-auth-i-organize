const jwt = require('jsonwebtoken');
const { readUsers, writeUsers } = require('../utils/userUtils');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');

// Registrera användare
exports.register = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  // Kolla om användaren redan finns
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Användarnamnet är redan taget' });
  }

  // Hasha lösenordet och skapa ny användare
  const hashedPassword = hashPassword(password);
  const newUser = { id: users.length + 1, username, password: hashedPassword };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: 'Registrering lyckades!' });
};

// Logga in användare
exports.login = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(user => user.username === username);
  if (!user || !comparePassword(password, user.password)) {
    return res.status(400).json({ message: 'Felaktigt användarnamn eller lösenord' });
  }

  // Skapa JWT-token
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};
