require("dotenv").config({ path: [".env.development.local", ".env"] });
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/auth", authRoutes);

module.exports = app;