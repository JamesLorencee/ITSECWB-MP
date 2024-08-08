const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { authenticateRoles } = require("../middleware/role");
const mgmtController = require("../controller/mgmt.controller");
const { authenticateJWT } = require("../middleware/jwt");

router.get(
  "/",
  authenticateJWT,
  authenticateRoles(true),
  mgmtController.getUsers
);

router.get(
  "/filter/:role",
  authenticateJWT,
  authenticateRoles(true),
  mgmtController.getUsersByRole
);

router.get(
  "/logs",
  authenticateJWT,
  authenticateRoles(true),
  mgmtController.getLogs
);

router.get(
  "/edit/:userId",
  authenticateJWT,
  authenticateRoles(true),
  mgmtController.getUserByID
);

router.post(
  "/role/:userId",
  authenticateJWT,
  authenticateRoles(true),
  mgmtController.setRole
);

router.post(
  "/active/:userId",
  authenticateJWT,
  authenticateRoles(true),
  mgmtController.setActive
);

module.exports = router;
