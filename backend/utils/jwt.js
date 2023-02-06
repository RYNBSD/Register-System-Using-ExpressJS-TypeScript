const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const createToken = (id) => {
  return jwt.sign({ user: id }, `${secretKey}`, { expiresIn: "7d" });
}

const verifyToken = (token) => {
  return jwt.verify(token, `${secretKey}`);
}

module.exports = {
  createToken,
  verifyToken,
}