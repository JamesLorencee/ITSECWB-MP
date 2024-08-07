const { verify } = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
    const authorization = req.headers['authorization']

    if (!authorization) {
        throw new Error("Not Authorized");
    }

    try {
        const token = token.splt(" ")[1];
        const payload = verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = payload;
    } catch (err) {
        console.error(err);
        throw new Error("Not Authenticated");
    }
    return next();
}
