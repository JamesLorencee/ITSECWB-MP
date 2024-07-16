require("dotenv").config();
const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const uid = req.user.userId;
    const userList = await User.getUsers(uid);
    res.json({ userList: userList });
  } catch (err) {
    res.status(500).json({ message: "GET Users Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const uid = req.params.userId;
    const user = await User.findByID(uid);
    res.json({ user: user });
  } catch (err) {
    res.status(500).json({ message: "GET Users Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.getLogs = async (req, res) => {
  try {
    console.log("LOGS");
    const logList = await User.getLogs();
    res.json({ logList: logList });
  } catch (err) {
    res.status(500).json({ message: "GET Logs Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.setRole = async (req, res) => {
  const uid = req.params.userId;
  try {
    const setRole = await User.setRole(uid);
    res.json({ res: setRole });
  } catch (err) {
    res.status(500).json({ message: "EDIT User Role Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.setActive = async (req, res) => {
  const uid = req.params.userId;
  try {
    const setActive = await User.setActive(uid);
    res.json({ res: setActive });
  } catch (err) {
    res.status(500).json({ message: "EDIT User Active Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};
