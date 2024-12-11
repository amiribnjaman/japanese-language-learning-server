const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// app.use('api/v1/user')

// Testing route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "All Right",
  });
});

// Handling url error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Bad request",
  });
});

// Handling server error
app.use((error, req, res, next) => {
  res.status(500).json({
    message: "Internal problem",
  });
});

module.exports = app;
