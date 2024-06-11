const express = require("express");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "../frontend/uploads" });
const { body } = require("express-validator");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth.controller");
const uploadSignUp = require("../middleware/multer");

router.post(
  "/signup",
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
  [
    body("email").isEmail().normalizeEmail().withMessage("Fix the email"),
    body("password")
      .trim()
      .isLength({ min: 12 })
      .withMessage("Fix the password"),
  ],
  authController.signin
);

router.post(
  "/saveImg",
  [
    body("email").isEmail().normalizeEmail(),
    body("photoFileName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Photo is required.")
      .custom((value) => {
        const valid = [".jpg", ".jpeg", ".png"];
        const extension = value.slice(value.lastIndexOf(".")).toLowerCase();
        if (!valid.includes(extension)) {
          throw new Error("Invalid file.");
        }
        return true;
      }),
  ],
  authController.saveImg
);

router.post("/api/upload", multipartMiddleware, (req, res) => {
  const file = req.files.profilePhoto;
  const filePath = path.join("uploads", file.path.split("/").pop());
  res.json({ filePath: filePath });
});

module.exports = router;
