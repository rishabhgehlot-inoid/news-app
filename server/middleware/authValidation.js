const { validationResult, body } = require("express-validator");

exports.authenticationValidation = [
  body("email", "Invalid Email").trim().isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
