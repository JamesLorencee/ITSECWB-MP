const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const { generateAccessToken, generateRefreshToken, setAccessCookies, setRefreshCookies } = require("../models/jwt");

exports.signup = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phone;
    const fileType = req.file.fileType;

    try {
        const salt = await bcrypt.genSalt(13);
        const hashed = await bcrypt.hash(password, salt);
        const uuid = await User.getUUID();

        const user = {
            uuid: uuid,
            name: name,
            email: email,
            password: hashed,
            phoneNumber: phoneNumber,
            photoFileName: `${uuid}-${Date.now()}.${fileType}`,
        };

        await User.save(user);

        const filePath = path.join(__dirname, "../uploads", user.photoFileName);

        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        fs.writeFile(filePath, req.file.buffer, (err) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({ message: "User registered!" });
        });
    } catch (err) {
        res.status(500).json({ message: "Signup Error", err: err });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};

exports.signin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ error: errors });

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.find(email);
        if (!user) return res.status(401).json({ message: "Invalid login." });
        if (!user.isActive)
            return res.status(401).json({ message: "Invalid login." });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: "Invalid login." });

        const userAccess = {
            email: user.email,
            userId: user.id,
            isAdmin: user.isAdmin,
        };

        const refreshToken = generateRefreshToken(userAccess);
        const accessToken = generateAccessToken(userAccess);

        User.storeRefreshToken(refreshToken, user.id)
        setRefreshCookies(res, refreshToken);
        setAccessCookies(res, accessToken);

        User.setLastLogin(userAccess.userId);
        res.status(200).json({ ok: true, message: "Login Successful" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
}
