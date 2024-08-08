const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { logger } = require("../util/logger");
const { validationResult } = require("express-validator");
const {
    generateAccessToken,
    generateRefreshToken,
    setAccessCookies,
    setRefreshCookies,
} = require("../models/jwt");

exports.authenticateRoles = (req, res) => {
    const role = req.params.isAdmin;
    if ((req.user.isAdmin ? "true" : "false") == role)
        return res.status(200).json({ ok: true, same: true });
    return res.status(200).json({ ok: true, same: false });
};

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
            if (err) {
                let json = { ok: false, error: "Signup Error" };
                if (process.env.DEBUG) json = { ...json, stack: err.stack };

                return res.status(500).json(json);
            }

            res.status(201).json({ ok: true, message: "User registered!" });
            logger.info(
                `User ${uuid} with the Name: ${name}, Email: ${email}, Phone Num: ${phoneNumber} Successfully Registered `
            );
        });
    } catch (err) {
        let json = { ok: false, error: "Signup Error" };
        if (process.env.DEBUG) json = { ...json, stack: err.stack };
        res.status(500).json(json);
    }
};

exports.signin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let json = { ok: false, error: "Signin Error" };
        return res.status(400).json(json);
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.find(email);
        if (!user) {
            let json = { ok: false, error: "1Signin Error" };
            logger.error(
                `Unregistered user attempted to sign-in with email: ${email}`
            );

            return res.status(401).json(json);
        }
        if (!user.isActive) {
            let json = { ok: false, error: "2Signin Error" };
            logger.error(`User attempted to sign-in with inactive email: ${email}`);
            return res.status(401).json(json);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            console.log(user);
            let json = { ok: false, error: "3Signin Error" };
            logger.error(`Login attempt failed with email: ${email}`);
            return res.status(401).json(json);
        }

        const userAccess = {
            email: user.email,
            userId: user.id,
            isAdmin: user.isAdmin,
        };

        const refreshToken = generateRefreshToken(userAccess);
        const accessToken = generateAccessToken(userAccess);

        User.storeRefreshToken(refreshToken, user.id);
        setRefreshCookies(res, refreshToken);
        setAccessCookies(res, accessToken);

        User.setLastLogin(userAccess.userId);
        res.status(200).json({ ok: true, message: "Login Successful" });
        logger.info(`User ${user.id} Successfully Logged In`);
    } catch (err) {
        let json = { ok: false, error: "Login Error" };
        if (process.env.DEBUG) json = { ...json, stack: err.stack };

        res.status(500).json(json);
    }
};

exports.getUser = async (req, res) => {
    try {
        const uid = req.user.userId;
        const user = await User.findByID(uid);
        res.status(200).json({ ok: true, user: user });
    } catch (err) {
        let json = { ok: false, error: "Users Error" };

        if (process.env.DEBUG) json = { ...json, stack: err.stack };
        return res.status(500).json(json);
    }
};
