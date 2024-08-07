const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/check", async (req, res) => {
    try {
        const refreshToken = await User.getRefreshToken(req.body.id);
        res.status(200).send(refreshToken);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});
module.exports = router
