const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getSigleUser,
  getAllUser,
  changeUserRole,
} = require("../controller/user.controller");
const jwtAuthentication = require("../middleware/jwtAuthentication");
const authorization = require("../middleware/authorization");

// Router
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/getuser/:userId", getSigleUser);
router.get("/getalluser/", authorization, getAllUser);
router.patch("/changeuserrole", authorization, changeUserRole);


module.exports = router;