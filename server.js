require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoDBUrl = process.env.DATABASE_URL;
const routes = require("./src/routes/user.routes");

const port = 3000;
const app = express();

try {
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api", routes);

  mongoose.connect(mongoDBUrl);
  const database = mongoose.connection;

  database.once("connected", () => {
    console.log("Database Connected");
  });

  app.listen(port, () => {
    console.log("Server connected at port " + port);
  });
} catch (error) {
  console.log(error);
}

module.exports = app;
