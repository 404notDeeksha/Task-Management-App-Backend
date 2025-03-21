const mongoose = require("mongoose");

const dbConnection = async () => {
  console.log("🟡 Trying to connect to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connection successful!");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
  }
};

module.exports = dbConnection;
