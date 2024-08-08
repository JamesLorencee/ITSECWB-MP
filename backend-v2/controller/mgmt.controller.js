const User = require("../models/user");
const { logger } = require("../util/logger");

exports.getUsers = async (req, res) => {
  try {
    const uid = req.user.userId;
    const userList = await User.getUsers(uid);
    res.status(200).json({ ok: true, userList: userList });
  } catch (err) {
    let json = { ok: false, error: "Users Error" };

    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    return res.status(500).json(json);
  }
};

exports.getUsersByRole = async (req, res) => {
  try {
    const uid = req.user.userId;
    const role = req.params.role;
    const userList = await User.getUsersByRole(uid, role);
    res.status(200).json({ ok: true, userList: userList });
  } catch (err) {
    let json = { ok: false, error: "Users Error" };

    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    return res.status(500).json(json);
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const uid = req.params.userId;
    const user = await User.findByID(uid);
    res.status(200).json({ ok: true, user: user });
  } catch (err) {
    let json = { ok: false, error: "Users Error" };

    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    return res.status(500).json(json);
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logList = await User.getLogs();
    res.status(200).json({ ok: true, logList: logList });
  } catch (err) {
    let json = { ok: false, error: "Users Error" };

    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    return res.status(500).json(json);
  }
};

exports.setRole = async (req, res) => {
  const uid = req.params.userId;
  const user = req.user.userId;
  try {
    const setRole = await User.setRole(uid);
    res.status(200).json({ ok: true, res: setRole });
    logger.warn(`${uid} role changed by Admin ${user}.`);
  } catch (err) {
    let json = { ok: false, error: "Users Error" };

    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    logger.error(
      `An attempt made by Admin ${user} to change the role of ${uid} failed.`
    );
    return res.status(500).json(json);
  }
};

exports.setActive = async (req, res) => {
  const uid = req.params.userId;
  const user = req.user.userId;
  try {
    const setActive = await User.setActive(uid);
    res.status(200).json({ ok: true, res: setActive });
    logger.warn(`${uid} active status changed by Admin ${user}.`);
  } catch (err) {
    let json = { ok: false, error: "Users Error" };

    if (process.env.DEBUG) json = { ...json, stack: err.stack };
    logger.error(
      `An attempt made by Admin ${user} to change the active status of ${uid} failed.`
    );
    return res.status(500).json(json);
  }
};
