const { body } = require("express-validator");

exports.postValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 4, max: 300 })
    .withMessage("title should be at least 4 and max 300 characters long"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 4, max: 15500 })
    .withMessage(
      "description should be at least 4 and max 15500 characters long",
    ),
];
