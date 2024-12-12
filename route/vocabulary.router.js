const express = require("express");
const { createVocabulary, getAllVocabulary } = require("../controller/vocabulary.controller");
const router = express.Router();
const jwtAuthentication = require('../middleware/jwtAuthentication')
const authorization = require('../middleware/authorization')

// Router
router.post("/createvocabulary", authorization, createVocabulary);
router.get("/getallvocabulary", jwtAuthentication, getAllVocabulary);

module.exports = router;
