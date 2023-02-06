const { validationResult } = require("express-validator");
const conn = require("../models/conn");
const { checkEmail } = require("../utils/filters");
const { hashPassword } = require("../utils/hash");

const insertElement = ({ name, email, hash }) => {
  conn.query(`INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${hash}')`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}

const signup = (req, res) => {
  try {

    const error = validationResult(req);
    
    if (!error.isEmpty()) {
      return res.status(401).json({
        message: "Check your fields",
      });
    }

    const { name, email, password } = req.body;

    if (!checkEmail(email).isEmpty) {
      res.status(403).json({
        message: "Check your email",
      });
    }

    const hash = hashPassword(password);

    insertElement({ name, email, hash });
    
    return res.status(201).json({
      message: "User created",
    })
  }
  catch (e) {
    return res.status(400).json({
      message: "Failed to signup",
    });
  }
}

module.exports = signup;