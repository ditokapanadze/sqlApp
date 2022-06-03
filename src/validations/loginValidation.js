const { body } = require("express-validator");

exports.loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .normalizeEmail()
    .withMessage("please provide valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password required")
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be at least 6 characters long"),
];
