const express = require('express');
/* const authRoutes = require('./src/routes/authRoutes'); */
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

/*  app.use('/api/auth', authRoutes);  */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.get("/", (req, res) => {
    res.send("welcome to auth-server");
  });
