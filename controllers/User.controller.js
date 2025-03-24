const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST/auth/signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });

    const token = generateToken(user);

    // res.cookie("token", token, {
    //   httpOnly: true, // Prevents access via JavaScript
    //   secure: process.env.NODE_ENV === "production", // Ensures it's only sent over HTTPS in production
    //   sameSite: "none",
    //   path: "/",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    // });

    res.status(201).json({
      success: true,
      message: "Login successful",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST/auth/logout
const logoutUser = (req, res) => {
  try {
    // res.clearCookie("token", {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Strict",
    // });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log("Cookie cant be deleted", err);
  }
};

const generateToken = (user) => {
  return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = { signupUser, loginUser, logoutUser };
