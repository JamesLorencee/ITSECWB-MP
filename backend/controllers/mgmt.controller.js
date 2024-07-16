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
