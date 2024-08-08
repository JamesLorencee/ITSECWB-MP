const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const incomeController = require("../controllers/income.controller");
const { authenticateJWT } = require("../middleware/jwt");

router.get("/get",
    authenticateJWT,
    incomeController.get
);

router.post("/add",
    authenticateJWT,
    incomeController.add
);

router.delete("/:incomeID",
    authenticateJWT,
    incomeController.delete
);

router.get("/edit/:incomeID",
    authenticateJWT,
    incomeController.edit
);

router.post("/",
    authenticateJWT,
    incomeController.save
);

module.exports = router;
