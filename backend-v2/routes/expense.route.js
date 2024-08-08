const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const expenseController = require("../controller/expense.controller");
const { authenticateJWT } = require("../middleware/jwt");

router.get("/get", authenticateJWT, expenseController.get);

router.post("/add", authenticateJWT, expenseController.add);

router.delete("/:expenseID", authenticateJWT, expenseController.delete);

router.get("/edit/:expenseID", authenticateJWT, expenseController.edit);

router.post("/", authenticateJWT, expenseController.save);

module.exports = router;
