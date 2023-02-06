const conn = require("./conn");
const { USER_MODEL } = require("./user");

const initTables = () => {
  conn.query(USER_MODEL, (err, result) => {
    if (err) {
      console.error("Failed to create table", err);
    };
  });
}

module.exports = initTables;