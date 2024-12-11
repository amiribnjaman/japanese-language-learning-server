const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getSigleUser
} = require("../controller/user.controller");

// Router
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/getuser/:userId", getSigleUser);


module.exports = router;