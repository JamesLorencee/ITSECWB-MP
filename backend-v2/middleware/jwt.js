require("dotenv").config();
const { verify } = require("jsonwebtoken");
const {
  clearJWTCookies,
  generateAccessToken,
  generateRefreshToken,
  setAccessCookies,
  setRefreshCookies,
} = require("../models/jwt");
const User = require("../models/user");

exports.authenticateJWT = (req, res, next) => {
  const access = req.cookies["aid"];
  const refresh = req.cookies["rid"];
  console.log(access);
  console.log(refresh);
  if (!access || !refresh) {
    clearJWTCookies(res);
    return res.status(401).json({ ok: false, message: "1Invalid Login" });
  }
  try {
    const refreshPayload = verify(refresh, process.env.JWT_REFRESH_SECRET);

    const payload = {
      email: refreshPayload.email,
      userId: refreshPayload.userId,
      isAdmin: refreshPayload.isAdmin,
    };

    let accessPayload;
    try {
      accessPayload = verify(access, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        // Access token is expired, generate a new access token and refresh token
        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        // Update cookies with new tokens
        User.storeRefreshToken(newRefreshToken, payload.userId);
        setAccessCookies(res, newAccessToken);
        setRefreshCookies(res, newRefreshToken);

        // Set the new tokens in the request for further processing
        req.cookies["aid"] = newAccessToken;
        req.cookies["rid"] = newRefreshToken;

        // Re-verify the new access token
        accessPayload = verify(newAccessToken, process.env.JWT_ACCESS_SECRET);
      } else {
        throw new Error("2Invalid Login");
      }
    }

    if (accessPayload.userId != refreshPayload.userId)
      throw new Error("3Invalid Login");

    req.user = accessPayload;
  } catch (err) {
    clearJWTCookies(res);
    let json = { ok: false, error: "4Invalid Login" };

    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    return res.status(401).json(json);
  }
  return next();
};
