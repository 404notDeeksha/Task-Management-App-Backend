const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// /api/auth/signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to database
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST/api/auth/login
const loginUser = async (req, res) => {
  // console.log("Login");
  try {
    const { email, password } = req.body;
    console.log("login user data", email, password);
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not exists" });
    console.log("login match", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    const token = generateToken(user);
    console.log("login User token", token);
    res.cookie("token", token, {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === "production", // Ensures it's only sent over HTTPS in production
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
    });
    console.log("login User token", res.cookie);
    res.status(201).json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// POST/api/auth/logout
const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log("Cookie cant be deleted", err);
  }
};

module.exports = { signupUser, loginUser, logoutUser };

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};
