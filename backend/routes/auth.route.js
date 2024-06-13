const express = require("express");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "../frontend/uploads" });
const { body } = require("express-validator");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth.controller");
const uploadSignUp = require("../middleware/multer");
const rateLimit = require("express-rate-limit");
const loginLimiter = rateLimit({
  windowMs: 15 * 1000, // 15 seconds
  limit: 5 * 2, //
  message: {
    message:
      "There have been multiple requests made through this IP. Please try again after 15 minutes.",
  },
});
const { authenticateJWT } = require("../middleware/jwt");

router.get("/is-logged-in", authenticateJWT, (req, res) => {
  res.status(200).send(true);
});

router.get(
  "/authenticate/:role",
  authenticateJWT,
  authController.authenticateRoles
);

router.post("/token", authController.token);

router.delete("/logout", authController.logout);

router.post(
  "/signup",
  loginLimiter,
  uploadSignUp.single("profilePhoto"),
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
  loginLimiter,
  [
    body("email").isEmail().normalizeEmail().withMessage("Fix the email"),
    body("password")
      .trim()
      .isLength({ min: 12 })
      .withMessage("Fix the password"),
  ],
  loginLimiter,
  authController.signin
);

module.exports = router;
