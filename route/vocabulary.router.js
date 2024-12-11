const express = require("express");
const { createVocabulary } = require("../controller/vocabulary.controller");
const router = express.Router();

// Router
router.post("/createVocabulary", createVocabulary);

module.exports = router;
