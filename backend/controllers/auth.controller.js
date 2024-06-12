require("dotenv").config();
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
  addToBlacklist,
} = require("../middleware/jwt");

exports.logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  addToBlacklist(token).then((val) => {
    console.log(val);
    if (!val) return res.sendStatus(403);

    User.deleteRefreshToken(val).then(() => {
      res.sendStatus(204);
    });
  });
};

exports.token = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) res.sendStatus(401);

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, user) => {
      if (err) return res.sendStatus(403);
      User.getRefreshToken(user.userId).then(async (storedRefreshToken) => {
        if (!storedRefreshToken.refreshToken) return res.sendStatus(403);

        try {
          const match = await bcrypt.compare(
            refreshToken,
            storedRefreshToken.refreshToken
          );
          if (!match) {
            return res.status(401);
          }
          const accessToken = generateAccessToken({
            email: user.email,
            userId: user.userId,
            isAdmin: user.isAmin,
          });

          res.status(200).json({
            accessToken: accessToken,
          });
        } catch (err) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
        }
      });
    }
  );
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.find(email);
    if (!user) return res.status(401).json({ message: "Invalid login." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid login." });

    const userAccess = {
      email: user.email,
      userId: user.id,
      isAdmin: user.isAdmin,
    };

    const accessToken = generateAccessToken(userAccess);
    const refreshToken = generateRefreshToken(userAccess);

    User.updateRefreshToken(refreshToken, user.id);
    console.log(user);

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
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
