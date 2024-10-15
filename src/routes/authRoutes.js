const express = require('express'); 
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dbPath = path.join(__dirname, "../data/users.json");

router.get('/', (req, res) => {
    res.send('Välkommen till första sidan!');
});

router.get('/login', (req, res) => {
    res.send('Välkommen till min API - logga in för att fortsätta');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(dbPath));
    const user = users.find(user => (user.username === username) && (user.password === password));
    
    if (user) {
      res.json({ message: 'Du är inloggad!', id: user.id, token: 'some-token' }); // Returnera JSON-svar
    } else {
      res.status(401).json({ message: 'Fel användarnamn eller lösenord' }); // Returnera JSON vid fel
    }
  });

router.get('/register', (req, res) => {
    res.send('The password can be potato');
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const user = { username, password };
    const users = JSON.parse(fs.readFileSync(dbPath));
    users.push(user);
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
    res.send('Användaren har registrerats!');
}
);


module.exports = router;



