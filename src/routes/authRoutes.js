const express = require("express");
const { signJWT, validateJWT } = require("../utils/jwtUtils.js");
const {
  loginUser,
  registerUser,
  verifyJwt,
} = require("../controllers/authController.js");
const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.post("/verifyjwt", verifyJwt);

module.exports = router;




