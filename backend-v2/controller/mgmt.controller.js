const User = require("../models/user");

exports.getUsers = async (req, res) => {
    try {
        const uid = req.user.userId;
        const userList = await User.getUsers(uid);
        res.status(200).json({ ok: true, userList: userList });
    } catch (err) {
        res.status(500).json({ ok: false, error: "GET Users Error" });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};

exports.getUsersByRole = async (req, res) => {
    try {
        const uid = req.user.userId;
        const role = req.params.role;
        const userList = await User.getUsersByRole(uid, role);
        res.status(200).json({ ok: true, userList: userList });
    } catch (err) {
        res.status(500).json({ ok: false, error: "GET Users Error" });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};

exports.getUserByID = async (req, res) => {
    try {
        const uid = req.params.userId;
        const user = await User.findByID(uid);
        res.status(200).json({ ok: true, user: user });
    } catch (err) {
        res.status(500).json({ ok: false, error: "GET Users Error" });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};

exports.getLogs = async (req, res) => {
    try {
        console.log("LOGS");
        const logList = await User.getLogs();
        res.status(200).json({ ok: true, logList: logList });
    } catch (err) {
        res.status(500).json({ ok: false, error: "GET Logs Error" });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};

exports.setRole = async (req, res) => {
    const uid = req.params.userId;
    try {
        const setRole = await User.setRole(uid);
        res.status(200).json({ ok: true, res: setRole });
    } catch (err) {
        res.status(500).json({ ok: false, error: "EDIT User Role Error" });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};

exports.setActive = async (req, res) => {
    const uid = req.params.userId;
    try {
        const setActive = await User.setActive(uid);
        res.status(200).json({ ok: true, res: setActive });
    } catch (err) {
        res.status(500).json({ ok: false, error: "EDIT User Active Error" });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
    }
};
