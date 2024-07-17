const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currency.controller");

router.get('/', currencyController.getCurrencies);
router.post('/convert', currencyController.convert);

module.exports = router;
