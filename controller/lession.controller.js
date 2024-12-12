const Lession = require("../model/lession.model");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const mongoose = require("mongoose");

// Create OR Signup a user
const addLession = async (req, res) => {
  const { lessionName, lessionNumber } = req.body;
  const authRes = req.res;
  console.log(authRes, lessionName, lessionNumber);
  try {
    if (authRes == "accessed") {
      const getlession = await Lession.findOne({
        lessionNumber: lessionNumber,
      });
      // console.log(getlession);
      if (!getlession) {
        const newLession = new Lession({
          _id: new mongoose.Types.ObjectId(),
          id: uuidv4(),
          lessionName,
          lessionNumber,
        });
        await newLession.save();
        console.log(newLession);
        res.send({ status: "201", lession: newLession, message: "Lession created successfully " });
      } else {
        res.send({ status: "400", message: "Lession already on pogress" });
      }
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
};


// GETING VOCABULARY API FUNCTION
const getAllLession = async (req, res) => {
  const authRes = req.res;
  try {
    if (authRes == "accessed") {
      const allLession = await Lession.find({});
      if (allLession) {
        res.send({
          status: "200",
          allLession: allLession,
        });
      } else {
        res.send({ status: "401", message: "Something went wrong" });
      }
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
};

module.exports = {
  addLession,
  getAllLession,
};
