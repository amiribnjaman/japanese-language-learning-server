var jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/user.model");

const authorization = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const TOKEN = auth.split(" ")[1];
    jwt.verify(
      TOKEN,
      process.env.ACCESS_TOKEN,
      TOKEN,
      async function (err, decoded) {
        if (err) {
          return res.send({ status: "401", msg: "Unathorized Access" });
        } else {
          const {email} = decoded;
          const getuser = await User.findOne({ email: email });
          if (getuser.role == "admin") {
            console.log("ok");
            req.res = "accessed";
            next();
          } else {
            return res.send({ status: 401, msg: "Unathorized Access!" });
          }
        }
      }
    );
  } else {
    return res.send({ status: 401, msg: "Unathorized Access!" });
  }
};

module.exports = authorization;
