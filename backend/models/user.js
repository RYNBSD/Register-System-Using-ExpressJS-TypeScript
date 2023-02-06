const USER_MODEL = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`

module.exports = {
  USER_MODEL,
}