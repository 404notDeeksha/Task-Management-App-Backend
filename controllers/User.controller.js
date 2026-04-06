const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../config/envValidator");
const createError = require("http-errors");

const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(400, "User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
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
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(422, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError(400, "Invalid credentials");
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logoutUser = (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

const generateToken = (user) => {
  return jwt.sign({ userId: user.userId }, env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = { signupUser, loginUser, logoutUser };
