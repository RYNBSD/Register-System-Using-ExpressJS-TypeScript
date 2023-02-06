const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const initTables = require("./models/init");

const registerRouter = require("./routes/register");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initTables();

app.use("/register", registerRouter)

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
