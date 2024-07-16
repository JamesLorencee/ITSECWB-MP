const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const incomeController = require("../controllers/income.controller");

router.get("/get/:uid", incomeController.get);
router.post("/add/:uid", incomeController.add);
router.delete("/:incomeID", incomeController.delete);
router.get("/edit/:incomeID", incomeController.edit);
router.post("/", incomeController.save);

module.exports = router;
