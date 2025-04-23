const mongoose = require("mongoose");
const env = require("./envValidator");

const dbConnection = async () => {
  if (env.NODE_ENV === "test") {
    console.log("⚡ Skipping DB connection in test environment");
    return; // Skip actual connection in test
  }
  console.log("🟡 Trying to connect to MongoDB...in mode ");
  try {
    await mongoose.connect(env.MONGODB_URL);
    console.log("MongoDB connection successful!");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
  }
};

module.exports = dbConnection;
