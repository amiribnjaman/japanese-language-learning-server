const express = require("express");
const router = express.Router();
const jwtAuthentication = require("../middleware/jwtAuthentication");
const authorization = require("../middleware/authorization");
const { addLession } = require("../controller/lession.controller");

// Router
router.post("/addlession",authorization, addLession);


module.exports = router;