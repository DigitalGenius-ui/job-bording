const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(500).json("You are not Authenticated");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(500).json("Token is not valid");
    req.user = user;
    next();
  });
};


const verifyUser = (req, res, next) => {
    verify(req, res, next, () => {
        if (req.user.email === res.user.email) {
            next();
        } else {
            return res.status(500).json("You are not Authenticated!!");
        }
    });
};

module.exports = verifyUser;