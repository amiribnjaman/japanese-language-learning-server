const express = require("express");
const router = express.Router();
const jwtAuthentication = require("../middleware/jwtAuthentication");
const authorization = require("../middleware/authorization");
const {
  addLession,
  getAllLession,
} = require("../controller/lession.controller");

// Router
router.post("/addlession",authorization, addLession);
router.get("/getalllession",authorization, getAllLession);


module.exports = router;