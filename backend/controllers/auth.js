const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return;

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const photoFileName = req.body.photoFileName;

  try {
    const hashed = await bcrypt.hash(password, 12);

    const user = {
      name: name,
      email: email,
      password: hashed,
      phoneNumber: phoneNumber,
      photoFileName: photoFileName,
    };

    const result = await User.save(user);
    console.log(result);

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
