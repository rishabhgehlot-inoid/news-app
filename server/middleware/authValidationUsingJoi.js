const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

exports.authValidationUsingJoi = (req, res, next) => {
  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ error: validation.error.details });
  }
  next();
};
