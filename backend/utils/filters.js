const conn = require("../models/conn");

let ret = {}

const setResult = (results) => {
  ret = {
    isEmpty: results.length === 0,
    user: results,
  };
}

const checkEmail = (email) => {

  conn.query(`SELECT * FROM users WHERE email='${email}' LIMIT 1`, (err, result) => {
    if (err) throw err;
    else {
      setResult(result);
    }
  });

  return ret;
}

const checkID = ({ user }) => {
  conn.query(`SELECT * FROM users WHERE id=${user} LIMIT 1`, (err, result) => {
    if (err) throw err;
    else {
      setResult(result);
    }
  });

  return ret;
}

module.exports = {
  checkEmail,
  checkID,
}