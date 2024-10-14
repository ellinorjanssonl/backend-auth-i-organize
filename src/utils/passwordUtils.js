const bcrypt = require('bcrypt');

// Hasha lösenord
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Kontrollera lösenord
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
