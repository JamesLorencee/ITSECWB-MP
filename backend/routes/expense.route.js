const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");

router.get("/get/:uid", expenseController.get);
router.post("/add/:uid", expenseController.add);
router.delete("/:expenseID", expenseController.delete);
router.get("/edit/:expenseID", expenseController.edit);
router.post("/", expenseController.save);

module.exports = router;
