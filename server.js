const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./src/routes/authRoutes');  // Importera dina rutter från filen där du definierade dem

const app = express();

app.use(cors());
app.use(express.json()); // Gör det möjligt att parsa JSON

// Använd de importerade rutterna
app.use('/', routes);  // Mountar alla rutter på rotnivå (t.ex. '/', '/api', '/api/secret')

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});

