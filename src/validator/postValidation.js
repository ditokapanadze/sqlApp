const { body } = require("express-validator");

exports.postValidation = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 4, max: 30 })
      .withMessage("title should be at least 4 and max 30 characters long"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("description is required")
      .isLength({ min: 4, max: 500 })
      .withMessage(
        "description should be at least 4 and max 500 characters long",
      ),
  ];
};
