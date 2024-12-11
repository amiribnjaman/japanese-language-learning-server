const User = require("../model/user.model");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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
        img,
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

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
      const getuser = await User.findOne({ email: email });
      console.log(getuser);
    if (getuser) {
        const comparePass = bcrypt.compareSync(password, getuser.password);
        console.log(comparePass);
      if (comparePass) {
        console.log('inside ',comparePass);
          // JWT Sign
        const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN);
          // res.cookie("Token", token, { httpOnly: false });
          console.log(token);
        res.send({
          status: "200",
          token,
          userId: getuser.id,
          message: "Logedin successfully!",
        });
      } else {
        res.send({ status: "401", message: "Email or password is Invalid" });
      }
    } else {
      res.send({ status: "404", message: "User not found!" });
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
