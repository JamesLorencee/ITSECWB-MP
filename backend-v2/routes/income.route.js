const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const incomeController = require("../controller/income.controller");
const { authenticateJWT } = require("../middleware/jwt");
const { validateIncomeMiddleware } = require("../middleware/income");

router.get("/get", authenticateJWT, incomeController.get);

router.post(
  "/add",
  authenticateJWT,
  validateIncomeMiddleware,
  incomeController.add
);

router.delete("/:incomeID", authenticateJWT, incomeController.delete);

router.get("/edit/:incomeID", authenticateJWT, incomeController.edit);

router.post(
  "/",
  authenticateJWT,
  validateIncomeMiddleware,
  incomeController.save
);

module.exports = router;
