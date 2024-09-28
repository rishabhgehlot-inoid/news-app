const express = require("express");
const { register, login } = require("../controllers/authControllers");
const { body } = require("express-validator");
const { authenticationValidation } = require("../middleware/authValidation");
const {
  authValidationUsingJoi,
} = require("../middleware/authValidationUsingJoi");
const {
  authValidationUsingYup,
} = require("../middleware/authValidationUsingYup");
const router = express.Router();

router.post("/register", authValidationUsingYup, register);
router.post("/login", authValidationUsingYup, login);

module.exports = router;
