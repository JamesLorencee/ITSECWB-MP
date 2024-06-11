const multer = require("multer");
const User = require("../models/user");
const path = require("path");

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files should be stored
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate filename using current datetime
    const datetime = Date.now();
    const extension = file.originalname.split(".").pop(); // Get file extension
    const filename = datetime + "." + extension;
    // Specify how the uploaded files should be named
    cb(null, filename);
  },
});

const uploadSignUp = multer({
  storage: storage,
  fileFilter: async (req, file, cb) => {
    const { name, email, password, phone } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password || !phone) {
      return cb(new Error("Please provide all required fields."), false);
    }

    // Validate email format
    if (
      !/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return cb(new Error("Please enter a valid email address."), false);
    }

    // Check if email already exists
    const existingUser = await User.find(email);
    if (existingUser) {
      return cb(new Error("Email already exists."), false);
    }

    // Validate password length
    if (password.length < 12) {
      return cb(
        new Error("Password must be at least 12 characters long."),
        false
      );
    }

    // Validate phone format
    if (!/^\d{11}$/.test(phone)) {
      return cb(new Error("Phone number must be exactly 11 digits."), false);
    }

    // Check file extension
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true);
    } else {
      // Reject a file
      return cb(
        new Error("Only .jpg, .jpeg, and .png files are allowed"),
        false
      );
    }
  },
});
module.exports = uploadSignUp;
