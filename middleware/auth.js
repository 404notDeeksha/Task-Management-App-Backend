const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  // const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.userId;
    next();
  } catch (err) {
    console.log("Error", err);
    res
      .status(400)
      .json({ success: false, message: "Invalid token.", data: err });
  }
};

module.exports = { authMiddleware };
// const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//   const token = req.cookies.token; // ✅ Read token from HttpOnly Cookie

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Invalid or expired token" });
//     }
//     req.user = decoded.userId; // Attach user ID to request
//     next();
//   });
// };

// module.exports = authenticateUser;
