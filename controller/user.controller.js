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


// GET SIGNLE UESR THROUGH THE USER ID
const getSigleUser = async (req, res) => {
  const { userId } = req.params;
  console.log(userId)
  try {
    if (userId) {
      const getuser = await User.findOne({ id: userId });
      res.send({
        status: "200",
        data: getuser,
      });
      
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
}


// GET ALL USER 
const getAllUser = async (req, res) => {
  const authRes = req.res
  try {
    if (authRes == "accessed") {
      const getuser = await User.find({});
      res.send({
        status: "200",
        data: getuser,
      });
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
}


// UPDATE USER ROLE API 
const changeUserRole = async (req, res) => {
  console.log('helloooooo')
  const authRes = req.res;
  const {email} = req.body
  try {
    if (authRes == "accessed") {
      const getuser = await User.findOne({ email: email });
      if (getuser.role == 'admin') {
        await User.updateOne({ email: email }, {
          $set: {
          role: 'user'
        }
        })
        res.send({
          status: "200",
          data: getuser,
          msg: 'User role updated to User'
        });
      } else if (getuser.role == 'user') {
        await User.updateOne({ email: email }, {
          $set: {
            role: 'admin',
          }
        })
        res.send({
          status: "200",
          data: getuser,
          msg: "User role updated to Admin",
        });
      }
      
    }
  } catch (error) {
    res.send({ status: "500", error });
  }
  
}


module.exports = {
  signupUser,
  loginUser,
  getSigleUser,
  getAllUser,
  changeUserRole,
};
