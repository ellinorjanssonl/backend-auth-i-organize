require("dotenv").config({ path: [".env.development.local", ".env"] });
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173', // Byt till din frontend-domän
    credentials: true,               // Tillåt att cookies skickas med
  }));

app.use("/auth", authRoutes);

module.exports = app;