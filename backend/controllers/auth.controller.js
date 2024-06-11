const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

require("dotenv").config();

exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.find(email);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid login." });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) {
      return res.status(401).json({ message: "Invalid login." });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );
    console.log(token);

    res.status(200).json({ token: token, userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phone;
  const photoFileName = req.file.filename;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = {
      name: name,
      email: email,
      password: hashed,
      phoneNumber: phoneNumber,
      photoFileName: photoFileName,
    };

    const result = await User.save(user);

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.saveImg = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(401).send({ error: errors });
    return;
  }

  const email = req.body.email;
  const photoFileName = req.body.photoFileName;

  try {
    const result = await User.saveImg(photoFileName, email);

    res.status(201).json({ message: "Image updated in DB!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
