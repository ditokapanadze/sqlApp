const { body, validationResult } = require("express-validator");

exports.validatorMiddleware = (validation, req, res, next) => {
  return [
    [validation],
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
