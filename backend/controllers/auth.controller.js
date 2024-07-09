require("dotenv").config();
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
    generateAccessToken,
    generateRefreshToken,
    addToBlacklist,
} = require("../middleware/jwt");

exports.authenticateRoles = (req, res) => {
    const role = req.params.role;
    console.log(req.user.isAdmin ? "true" : "false", role);
    if (req.user.isAdmin ? "true" : "false" == role)
        return res.status(200).send(true);
    else return res.status(401).json({ error: "unauthorized" });
};

exports.logout = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    addToBlacklist(token)
        .then((val) => {
            if (!val) return res.status(403).json({ error: "invalid_token" });

            User.deleteRefreshToken(val).then(() => {
                res.sendStatus(204);
            });
        })
        .catch(() => {
            res.status(403).json({ error: "already_loggedout" });
        });
};

exports.token = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (refreshToken == null) {
        return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
    }

    try {
        const user = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const storedRefreshToken = await User.getRefreshToken(user.userId);

        if (!storedRefreshToken.refreshToken) {
            return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
        }

        const match = await bcrypt.compare(
            refreshToken,
            storedRefreshToken.refreshToken
        );

        if (!match) {
            return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
        }

        const accessToken = generateAccessToken({
            email: user.email,
            userId: user.userId,
            isAdmin: user.isAmin, // This should be isAdmin, not isAmin
        });

        return res.status(200).json({
            accessToken: accessToken,
        });
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
        } else {
            return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
        }
    }
};

exports.signin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return;

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.find(email);
        if (!user) return res.status(401).json({ message: "Invalid login." });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid login." });

        const userAccess = {
            email: user.email,
            userId: user.id,
            isAdmin: user.isAdmin,
        };

        const accessToken = generateAccessToken(userAccess);
        const refreshToken = generateRefreshToken(userAccess);

        User.updateRefreshToken(refreshToken, user.id);
        console.log(user);

        res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};

exports.signup = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phone;
    const fileType = req.file.fileType;

    try {
        const salt = await bcrypt.genSalt(12);
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

        const filePath = path.join(__dirname, '../uploads', user.photoFileName);

        fs.mkdirSync(path.dirname(filePath), { recursive: true })

        fs.writeFile(filePath, req.file.buffer, err => {
            if (err)
                return res.status(500).json({ error: err });

            res.status(201).json({ message: "User registered!" });
        });

    } catch (err) {
        res.status(500).json({ message: "Signup Error", err: err })
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};
