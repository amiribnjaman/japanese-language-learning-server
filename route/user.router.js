const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser
} = require("../controller/user.controller");

// Router
router.post("/login", loginUser);
router.post("/signup", signupUser);


module.exports = router;