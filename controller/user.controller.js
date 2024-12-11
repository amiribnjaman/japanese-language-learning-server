const User = require("../model/user.model");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
const mongoose = require("mongoose");

// Create OR Signup a user
const signupUser = async (req, res) => {
  const { name, email, password, img } = req.body;
  try {
    const getuser = await User.findOne({ email: email });
    if (!getuser) {
      const hashPass = bcrypt.hashSync(password, saltRounds);
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        id: uuidv4(),
        name,
        email,
        password: hashPass,
        img
      });
      await newUser.save();
      res.send({ status: "201", user: newUser });
    } else {
      res.send({ status: "400", message: "User already registered" });
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
};



module.exports = {
  signupUser,
};