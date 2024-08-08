const User = require("../models/user");
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const checkfile = require("../middleware/check-file");
const uploadSignUp = require("../middleware/multer");
const rateLimit = require("express-rate-limit");
const { authenticateJWT } = require("../middleware/jwt");
const { clearJWTCookies } = require("../models/jwt");
const { logger } = require("../util/logger");

const rateLimiter = rateLimit({
  windowMs: 15 * 1000, // 15 seconds
  limit: 5 * 2, //
  message: {
    message:
      "There have been multiple requests made through this IP. Please try again after 15 minutes.",
  },
});

/**
 * Checker for Role
 * @param isAdmin - true is admin, false otherwise
 */
router.get(
  "/authenticate/:isAdmin",
  authenticateJWT,
  authController.authenticateRoles
);

/**
 * Checker for Login status
 */
router.get("/is-logged-in", authenticateJWT, (_req, res) => {
  res.status(200).send(true);
});

/**
 * Logout user
 */
router.delete("/logout", authenticateJWT, (_req, res) => {
  const uid = _req.user.userId;
  clearJWTCookies(res);
  res.status(200).json({ ok: true, message: "Logged out Successfully!" });
  logger.info(`User ${uid} logged out successfully.`);
});

/**
 * Sign up user
 */
router.post(
  "/signup",
  rateLimiter,
  uploadSignUp.single("profilePhoto"),
  checkfile,
  (req, res, next) => {
    // If there is an error from fileFilter, it will be stored in req.fileFilterError by multer
    if (req.fileFilterError) {
      return res
        .status(400)
        .json({ ok: false, error: req.fileFilterError.message });
    }
    next(); // Proceed to the next middleware
  },
  authController.signup
);

/**
 * Sign in user
 */
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

router.get("/getuser", authenticateJWT, authController.getUser);
router.get("/api/image/:filename", authenticateJWT, authController.getImage);

module.exports = router;
