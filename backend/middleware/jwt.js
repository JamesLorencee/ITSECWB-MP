const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config;
const BlackListDB = require("../models/jwt.model");
const User = require("../models/user");


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
    const token = req.cookies["authorization"];

    if (!token) {
        return res.status(401).json({ error: "invalid_token" });
    }

    BlackListDB.checkIfBlacklisted(token)
        .then(() => {
            //if not blacklisted verify jwt
            jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
                req.user = user;
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        this.generateAccessToken(user)
                            .then((token) => {
                                res.cookie("authorization", token, { httpOnly: true, secure: true, sameSite: 'None' })
                                return next();
                            })
                            .catch((err) => {
                                return res.status(401).json({ error: err });
                            });
                    }
                    return res.status(401).json({ error: "invalid_token" });
                }
                res.cookie("authorization", token, { httpOnly: true, secure: true, sameSite: 'None' })
                return next();
            });
        })
        .catch(() => {
            //if blacklisted
            return res.status(401).json({ error: "invalid_token" });
        });
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
