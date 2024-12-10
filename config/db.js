const mongoose = require("mongoose");
const config = require("./config");

const dbCon = config.dbUrl;

mongoose
  .connect(dbCon)
  .then(() => {
    console.log("Mongodb atlas is connected");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

module.exports = mongoose;
