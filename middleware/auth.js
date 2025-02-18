const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.userId;
    console.log("Verified Token");
    next();
  } catch (err) {
    console.log("Error", err);
    res
      .status(400)
      .json({ success: false, message: "Invalid token.", data: err });
  }
};
module.exports = authMiddleware;
