const { validationResult, body } = require("express-validator");

exports.newsValidation = [
  body("title", "Invalid title").trim().isEmpty(),
  body("description", "Invalid description").trim().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
