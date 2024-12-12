const Vocabulary = require("../model/vocabulary.model");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const mongoose = require("mongoose");

// CREATE VOCABULARY API FUNCTION
const createVocabulary = async (req, res) => {
  const { word, pronunciation, whenToSay, lessionNumber, adminEmail } =
    req.body;
  const authRes = req.res;
  try {
    if (authRes == "accessed") {
      const newVocabulary = new Vocabulary({
        _id: new mongoose.Types.ObjectId(),
        id: uuidv4(),
        word,
        pronunciation,
        whenToSay,
        lessionNumber,
        adminEmail,
      });
      await newVocabulary.save();
      res.send({
        status: "201",
        vocabulary: newVocabulary,
        message: "New vocabulary create successfully",
      });
    }
  } catch (error) {
    res.send({
      status: "500",
      error,
      message: "Something wrong. Try again later.",
    });
  }
};

// GETING VOCABULARY API FUNCTION
const getAllVocabulary = async (req, res) => {
  const authRes = req.res;
  try {
    if (authRes == "accessed") {
      const allVocabulary = await Vocabulary.find({});
      if (allVocabulary) {
        res.send({
          status: "200",
          allVocabulary: allVocabulary,
        });
      } else {
        res.send({ status: "401", message: "Something went wrong" });
      }
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
};

module.exports = { createVocabulary, getAllVocabulary };
