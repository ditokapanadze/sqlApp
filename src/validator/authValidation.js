const { body } = require("express-validator");

exports.registerValidation = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .normalizeEmail()
      .withMessage("please provide valid email address"),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 4, max: 16 })
      .withMessage("Username must be at least 4 characters long"),
    body("password")
      .notEmpty()
      .withMessage("Password required")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

exports.loginValidation = () => {
  return [
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
};
