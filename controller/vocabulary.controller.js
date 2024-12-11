const Vocabulary = require("../model/vocabulary.model");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const mongoose = require("mongoose");


// CREATE VOCABULARY API FUNCTION 
const createVocabulary = async (req, res) => {
  const { word, pronunciation, whenToSay, lessionNo, adminEmail } = req.body;

  try {
    const newVocabulary = new Vocabulary({
      _id: new mongoose.Types.ObjectId(),
      id: uuidv4(),
      word,
      pronunciation,
      whenToSay,
      lessionNo,
      adminEmail,
    });
    await newVocabulary.save();
    res.send({ status: "201", vocabulary: newVocabulary });
  } catch (error) {
    res.send({ status: "500", error });
  }
};

module.exports = { createVocabulary };
