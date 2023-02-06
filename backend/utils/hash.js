const bcrypt = require("bcrypt");

const compareHash = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

module.exports = {
  compareHash,
  hashPassword,
}