const mongoose = require("mongoose");

const lessionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  lessionName: {
    type: String,
    required: true,
  },
  lessionNumber: {
    type: String,
    required: true,
    unique: true,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lession", lessionSchema);
