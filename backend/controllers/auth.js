const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()){ 
    res.status(401).send({"error": "Inputs are not valid"})
    return;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phone;
  const photoFileName = req.body.photoFileName;

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
