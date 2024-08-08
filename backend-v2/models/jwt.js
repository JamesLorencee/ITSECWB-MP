require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        user,
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "1w",
            algorithm: "HS512",
        }
    )
}

exports.generateAccessToken = (user) => {
    return jwt.sign(
        user,
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "5m",
            algorithm: "HS512",
        }
    )
}

exports.setRefreshCookies = (res, token) => {
    res.cookie('rid', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
}

exports.setAccessCookies = (res, token) => {
    res.cookie('aid', token, { maxAge: 5 * 60 * 1000, httpOnly: true, secure: true });
}

exports.clearJWTCookies = res => {
    res.clearCookie("aid");
    res.clearCookie("rid");
}
