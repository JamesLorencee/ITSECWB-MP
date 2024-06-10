const express = require("express");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "../frontend/uploads" });
const path = require("path");
const { body } = require("express-validator");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (email) => {
        const user = await User.find(email);

        if (user) return Promise.reject("Please enter a valid email.");
      }
    )
      .normalizeEmail(),
    body("password").trim().isLength({ min: 12 }),
    body("phone")
      .trim()
        .matches(/^\d{11}$/)
      .withMessage("Phone number must be exactly 11 digits."),
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
  authController.signup
);

router.post("/api/upload", multipartMiddleware, (req, res) => {
  const file = req.files.profilePhoto;
  const filePath = path.join("uploads", file.path.split("/").pop());
  res.json({ filePath: filePath });
});

module.exports = router;
