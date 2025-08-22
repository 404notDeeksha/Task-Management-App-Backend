const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/envValidator");

// POST/auth/signup
const signupUser = async (req, res) => {
  try {
    /* Get user data from req body */
    const { name, email, password } = req.body;

    /* Find if user email already exists */
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const salt = await bcrypt.genSalt(10);

    /* Hashing password to store it */
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    /* Generating JWT token for User */
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
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", err });
  }
};

// POST/auth/login
const loginUser = async (req, res) => {
  try {
    /* Get user data from req body */
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Email and password are required",
      });
    }

    /* Find if user exists */
    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not exists" });

    /* Compare user stored password data with req body password data */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });

    /* Generating JWT token for User */
    const token = generateToken(user);

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
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// POST/auth/logout
const logoutUser = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log("Cannot log out", err);
  }
};

/* Function to Calculate JWT token */
const generateToken = (user) => {
  return jwt.sign({ userId: user.userId }, env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = { signupUser, loginUser, logoutUser };
