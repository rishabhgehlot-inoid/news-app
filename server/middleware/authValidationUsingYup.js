const yup = require("yup");

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

exports.authValidationUsingYup = (req, res, next) => {
  schema
    .validate(req.body)
    .then((valid) => {
      next();
    })
    .catch((err) => {
      return res.status(400).json({ error: err.errors[0] });
    });
};
