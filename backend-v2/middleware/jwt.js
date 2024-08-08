require("dotenv").config();
const { verify } = require("jsonwebtoken");
const { clearJWTCookies, generateAccessToken, generateRefreshToken, setAccessCookies, setRefreshCookies } = require("../models/jwt");
const User = require("../models/user");

exports.authenticateJWT = (req, res, next) => {
    const access = req.cookies['aid']
    const refresh = req.cookies['rid']

    if (!access || !refresh) {
        clearJWTCookies(res);
        return res.status(401).json({ ok: false, message: "Invalid Authentication" });
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
            if (err.name === 'TokenExpiredError') {
                // Access token is expired, generate a new access token and refresh token
                const newAccessToken = generateAccessToken(payload);
                const newRefreshToken = generateRefreshToken(payload);

                // Update cookies with new tokens
                User.storeRefreshToken(newRefreshToken, payload.userId)
                setAccessCookies(res, newAccessToken);
                setRefreshCookies(res, newRefreshToken);

                // Set the new tokens in the request for further processing
                req.cookies['aid'] = newAccessToken;
                req.cookies['rid'] = newRefreshToken;

                // Re-verify the new access token
                accessPayload = verify(newAccessToken, process.env.JWT_ACCESS_SECRET);

            } else { throw new Error("Invalid Access Token"); }
        }

        if (accessPayload.userId != refreshPayload.userId) throw new Error("Invalid JWT");

        req.user = accessPayload;
    } catch (err) {
        clearJWTCookies(res);
        let json = { ok: false, error: "Invalid Authentication Please Log-in" };

        if (process.env.DEBUG) json = { ...json, stack: err.stack };

        return res.status(401).json(json);
    }
    return next();
}
