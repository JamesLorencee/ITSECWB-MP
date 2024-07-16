const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const mgmtController = require("../controllers/mgmt.controller");
const { authenticateJWT } = require("../middleware/jwt");

router.get("/", authenticateJWT, mgmtController.getUsers);
router.get("/logs", authenticateJWT, mgmtController.getLogs);
router.get("/edit/:userId", authenticateJWT, mgmtController.getUserByID);
router.post("/role/:userId", authenticateJWT, mgmtController.setRole);
router.post("/active/:userId", authenticateJWT, mgmtController.setActive);

module.exports = router;
