const cookie = require("cookie");
const { validationResult } = require("express-validator");
const { compareHash } = require("../utils/hash");
const { checkEmail, checkID } = require("../utils/filters");
const { createToken, verifyToken } = require("../utils/jwt");

const login = (req, res) => {
  try {

    console.log(req.body);
    
    let token = req.headers['authorization'];
    
    if (typeof token !== "undefined") {
      token = token.replace("Bearer ", "");
      
      const userID = verifyToken(token);

      if (typeof userID !== "undefined")  {
        const user = checkID(userID);

        console.log(user);

        return res.status(200).json({
          message: `Welcome ${user.user[0].name}!`,
          user: user.user,
        });
      }
      return;
    }

    const error = validationResult(req);
  
    if (!error.isEmpty()) {
      return res.status(401).json({
        message: "Check your fields",
      });
    }
  
    const { email, password } = req.body;

    const { isEmpty, user } = checkEmail(email);

    if (isEmpty) {
      return res.status(401).json({
        message: "Invalid email",
      });
    }

    const validPassword = compareHash(password, user[0].password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.setHeader('Set-Cookie', cookie.serialize("user_token", String(createToken(user[0].id)), { maxAge: 60*60*24*7 }));

    return res.status(200).json({
      message: "Logged in successfully",
      userData: user,
    });

  }
  catch (e) {
    return res.status(400).json({
      message: "Failed to login " + e,
    })
  }
}

module.exports = login;