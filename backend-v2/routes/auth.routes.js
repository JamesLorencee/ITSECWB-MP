const User = require("../models/user");
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller")
const checkfile = require("../middleware/check-file");
const uploadSignUp = require("../middleware/multer");
const rateLimit = require("express-rate-limit");
const { authenticateJWT } = require("../middleware/jwt");

router.get("/is-logged-in", authenticateJWT, (req, res) => {
    res.status(200).send(true);
});

const rateLimiter = rateLimit({
    windowMs: 15 * 1000, // 15 seconds
    limit: 5 * 2, //
    message: {
        message:
            "There have been multiple requests made through this IP. Please try again after 15 minutes.",
    },
});

router.post(
    "/signup",
    rateLimiter,
    uploadSignUp.single("profilePhoto"),
    checkfile,
    (req, res, next) => {
        // If there is an error from fileFilter, it will be stored in req.fileFilterError by multer
        if (req.fileFilterError) {
            return res.status(400).json({ error: req.fileFilterError.message });
        }
        next(); // Proceed to the next middleware
    },
    authController.signup
);

router.post(
    "/signin",
    rateLimiter,
    [
        body("email").isEmail().withMessage("Fix the email"),
        body("password")
            .trim()
            .isLength({ min: 12 })
            .withMessage("Fix the password"),
    ],
    authController.signin
);
module.exports = router
