const router = require('express').Router();

const { loginValidation, signupValidation } = require("../middlewares/validations");

const login = require("../controllers/login");
const signup = require("../controllers/signup");

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;