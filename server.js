const express = require('express');
require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(express.json());

// Rutter för autentisering
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
