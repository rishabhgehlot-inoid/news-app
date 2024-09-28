const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

exports.newsValidationUsingJoi = (req, res, next) => {
  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ error: validation.error.details });
  }
  next();
};
