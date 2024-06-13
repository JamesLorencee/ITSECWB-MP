const jwt = require("jsonwebtoken");
require("dotenv").config;
const BlackListDB = require("../models/jwt.model");

// Function to add token to blacklist
exports.addToBlacklist = (tokenId) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      tokenId,
      process.env.JWT_ACCESS_SECRET,
      { ignoreExpiration: true },
      (err, userInfo) => {
        if (err) {
          reject(err);
          return;
        }

        BlackListDB.blackListJWT(tokenId, userInfo.exp)
          .then(() => {
            resolve(userInfo.userId);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};

exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "invalid_token" });
  }

  BlackListDB.checkIfBlacklisted(token)
    .then(() => {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "expired_token" });
          }
          return res.status(401).json({ error: "invalid_token" });
        }
        req.user = user;
        next();
      });
    })
    .catch(() => {
      return res.status(401).json({ error: "invalid_token" });
    });
};

exports.generateRefreshToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_REFRESH_SECRET);

  return token;
};

exports.generateAccessToken = (user) => {
  const token = jwt.sign(
    user,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" } //15m
  );

  return token;
};
