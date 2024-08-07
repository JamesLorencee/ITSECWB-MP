require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user.userId,
            role: user.role
        },
        process.env.JWT_REFRESH_SECRET,
        {
            exp: "5m",
            algorithm: "RS512",
        }
    )
}

exports.generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user.userId,
            role: user.role
        },
        process.env.JWT_ACCESS_SECRET,
        {
            exp: "5m",
            algorithm: "RS512",
        }
    )
}

