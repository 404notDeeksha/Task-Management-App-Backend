const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = require("../config/envValidator");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. No token provided." });
  }

  jwt.verify(token, env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }
    req.user = decoded.userId;
    next();
  });
};

module.exports = authMiddleware;
