const { check } = require("express-validator");

const loginValidation = [
  check("email").isEmail().normalizeEmail(),
  check("password").trim().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").escape(),
];

const signupValidation = [
  check("name").trim().isLength({ min: 3 }).withMessage("Name must be at least 3 characters long").whitelist("[a-zA-Z0-9_]"),
  check("email").isEmail().normalizeEmail(),
  check("password").trim().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").escape(),
];

module.exports = {
  loginValidation,
  signupValidation,
}