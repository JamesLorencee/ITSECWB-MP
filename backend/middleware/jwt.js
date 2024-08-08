const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const HttpError = require("../util/error");
require("dotenv").config;
const BlackListDB = require("../models/jwt.model");
const User = require("../models/user");


// Function to add token to blacklist
exports.addToBlacklist = (tokenId) => {
    try {
        jwt.verify(
            tokenId,
            process.env.JWT_ACCESS_SECRET,
            { ignoreExpiration: true },
            (err, userInfo) => {
                if (err) throw new HttpError(400, "Invalid Token", err);

                BlackListDB.blackListJWT(tokenId, userInfo.exp)
                return userInfo.userId
            }
        );
    } catch (error) {
        throw error;
    }
    //  return new Promise((resolve, reject) => {
    //      jwt.verify(
    //          tokenId,
    //          process.env.JWT_ACCESS_SECRET,
    //          { ignoreExpiration: true },
    //          (err, userInfo) => {
    //              if (err) {
    //                  reject(err);
    //                  return;
    //              }
    //              BlackListDB.blackListJWT(tokenId, userInfo.exp)
    //                  .then(() => {
    //                      resolve(userInfo.userId);
    //                  })
    //                  .catch((error) => {
    //                      reject(error);
    //                  });
    //          }
    //      );
    //  });
};

exports.authenticateJWT = (req, res, next) => {
    const token = req.cookies["authorization"];

    if (!token) return res.status(401).json({ error: "Token not found." });

    try {
        BlackListDB.checkIfBlacklisted(token);

        //if not blacklisted verify jwt
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (!err) {
                req.user = user;
                res.cookie("authorization", token, { httpOnly: true, secure: true, sameSite: 'None' })
                return next();
            }
            if (err.name !== "TokenExpiredError") throw new HttpError(401, "Invalid Token", err);

            this.generateAccessToken(user)
                .then((token) => {
                    res.cookie("authorization", token, { httpOnly: true, secure: true, sameSite: 'None' })
                    return next();
                })
                .catch((err) => {
                    return res.status(401).json({ error: err });
                });
        });
    } catch (err) {
        if (err instanceof HttpError) {
            res.status(err.statusCode).json({ error: err.message });
        }

    }
    //  BlackListDB.checkIfBlacklisted(token)
    //      .then(() => {
    //          //if not blacklisted verify jwt
    //          jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    //              req.user = user;
    //              if (err) {
    //                  if (err.name === "TokenExpiredError") {
    //                      this.generateAccessToken(user)
    //                          .then((token) => {
    //                              res.cookie("authorization", token, { httpOnly: true, secure: true, sameSite: 'None' })
    //                              return next();
    //                          })
    //                          .catch((err) => {
    //                              return res.status(401).json({ error: err });
    //                          });
    //                  }
    //                  return res.status(401).json({ error: "invalid_token" });
    //              }
    //              res.cookie("authorization", token, { httpOnly: true, secure: true, sameSite: 'None' })
    //              return next();
    //          });
    //      })
    //      .catch(() => {
    //          //if blacklisted
    //          return res.status(401).json({ error: "invalid_token" });
    //      });
};

exports.generateRefreshToken = (user) => {
    const token = jwt.sign(
        user,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "1h" }
    );

    return token;
};

// Can only  generate access token if refresh token is valid
exports.generateAccessToken = (user) => {
    try {
        const token = User.getRefreshToken(user.userId)
        const refreshToken = this.generateRefreshToken(user);

        bcrypt.compare(refreshToken, token, (err) => {
            if (err) throw err;
            if (result) {
                jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
                    if (err) throw err;

                    // Generate the access token
                    const accessToken = jwt.sign(
                        user,
                        process.env.JWT_ACCESS_SECRET,
                        { expiresIn: "15m" } // 15 minutes
                    );
                    return accessToken;
                });
            }
            throw new Error("invalid_token");
        })
    } catch (err) {
        throw err;
    }
    return new Promise((resolve, reject) => {
        // Fetch the refresh token
        User.getRefreshToken(user.userId)
            .then((token) => {
                const refreshToken = this.generateRefreshToken(user)
                bcrypt.compare(refreshToken, token, (err, result) => {
                    if (err) reject({ error: err });
                    if (result) {
                        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
                            if (err) {
                                if (err.name === "TokenExpiredError") {
                                    reject({ error: "expired_token" });
                                } else {
                                    reject({ error: "invalid_token" });
                                }
                            } else {
                                // Generate the access token
                                const accessToken = jwt.sign(
                                    user,
                                    process.env.JWT_ACCESS_SECRET,
                                    { expiresIn: "15m" } // 15 minutes
                                );
                                resolve(accessToken);
                            }
                        });
                    }
                    reject({ error: "invalid_token" });
                });
                // Validate the refresh token
            })
            .catch((err) => {
                reject({ error: "token_fetch_error", details: err });
            });
    });
};
