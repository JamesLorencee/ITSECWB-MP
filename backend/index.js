require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");

const db = require("./util/database");

const errorController = require("./controllers/error");

const app = express();

const ports = process.env.PORT || 3000;

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "../frontend/uploads" });

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Controll-Allow-Origin", "*");
  res.setHeader("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Controll-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.post("/api/upload", multipartMiddleware, (req, res) => {
  const file = req.files.profilePhoto;
  const filePath = path.join("uploads", file.path.split("/").pop());
  res.json({ filePath: filePath });
});

app.listen(ports, () => console.log(`Listening on port ${ports}`));

module.exports = {
  port: process.env.PORT || 3000,
  connection: db,
};
