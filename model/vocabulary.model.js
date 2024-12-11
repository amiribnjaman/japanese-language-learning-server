const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  word: {
    type: String,
    required: true,
  },
  pronunciation: {
    type: String,
    required: true,
  },
  whenToSay: {
    type: String,
    required: true,
  },
  lessionNo: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  completion: {
    type: String,
    required: true,
    default: false
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vocabulary", vocabularySchema);
