const express = require('express'); 

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Välkommen till min API!');
});

router.get('/api', (req, res) => {
    res.send('Välkommen till min API!');
});

router.get('/api/secret', (req, res) => {
    res.send('The password is potato');
});

module.exports = router;



