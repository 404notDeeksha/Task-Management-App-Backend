if (process.env.NODE_ENV !== "test") {
  require("dotenv").config();
}

const requiredEnvVars = [
  "PORT",
  "DEP_FRONTEND_URL",
  "DEV_FRONTEND_URL",
  "JWT_SECRET_KEY",
  "MONGODB_URL",
];

function validateEnv() {
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    console.error(
      `🚨 Missing environment variables: ${missingVars.join(", ")}`
    );
    process.exit(1);
  }

  console.log("✅ All required environment variables are set.");
}

if (process.env.NODE_ENV !== "test") {
  validateEnv();
}

module.exports = {
  validateEnv,
  PORT: process.env.PORT || 5002,
  DEP_FRONTEND_URL: process.env.DEP_FRONTEND_URL,
  DEV_FRONTEND_URL: process.env.DEV_FRONTEND_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
};
