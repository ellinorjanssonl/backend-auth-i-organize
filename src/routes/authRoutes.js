const express = require('express'); 
const fs = require('fs');
const path = require('path');

const router = express.Router();

const dbPath = path.join(__dirname, "../data/users.json");

const generateId = (users) => {
    const lastUser = users[users.length - 1];
    return lastUser ? lastUser.id + 1 : 1; // Om inga användare finns, börja med id = 1
  };

router.get('/', (req, res) => {
    res.send('Välkommen till första sidan!');
});

router.get('/login', (req, res) => {
    res.send('Välkommen till min API - logga in för att fortsätta');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(dbPath));
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
      res.json({ message: 'Du är inloggad!', id: user.id, token: 'some-token' }); 
      
    } else {
      res.status(401).json({ message: 'Fel användarnamn eller lösenord' }); 
    }
  });

router.get('/register', (req, res) => {
    res.send('The password can be potato');
});

router.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    // Kontrollera att alla fält finns med
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Användarnamn, lösenord och e-post krävs' });
    }

    // Läsa in befintliga användare från users.json
    const users = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // Kontrollera om användarnamnet eller e-postadressen redan finns
    const userExists = users.some(user => user.username === username || user.email === email);
    if (userExists) {
        return res.status(409).json({ message: 'Användarnamn eller e-post finns redan' });
    }

    // Skapa en ny användare med ett unikt ID
    const newUser = {
        id: generateId(users), // Generera ett nytt ID
        username,
        password,
        email
    };

    // Lägg till den nya användaren i listan
    users.push(newUser);

    // Skriv tillbaka den uppdaterade listan till users.json
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

    res.json({ message: 'Användaren har registrerats!', user: newUser });
});

module.exports = router;




