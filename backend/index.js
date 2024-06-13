require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/auth.route");

const db = require("./util/database");

const errorController = require("./controllers/error.controller");

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`));

module.exports = {
  port: process.env.PORT || 3000,
  connection: db,
};
