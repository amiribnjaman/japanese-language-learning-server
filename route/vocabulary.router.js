const express = require("express");
const { createVocabulary, getAllVocabulary } = require("../controller/vocabulary.controller");
const router = express.Router();

// Router
router.post("/createVocabulary", createVocabulary);
router.get("/getAllVocabulary", getAllVocabulary);

module.exports = router;
