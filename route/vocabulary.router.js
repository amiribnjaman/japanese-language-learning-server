const express = require("express");
const { createVocabulary, getAllVocabulary } = require("../controller/vocabulary.controller");
const router = express.Router();
const jwtAuthentication = require('../middleware/jwtAuthentication')
const authorization = require('../middleware/authorization')

// Router
router.post("/createVocabulary", authorization, createVocabulary);
router.get("/getAllVocabulary", jwtAuthentication, getAllVocabulary);

module.exports = router;
