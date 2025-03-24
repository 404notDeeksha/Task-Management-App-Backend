console.log("Hitting Index.js file");
const express = require("express");
var isEmpty = require("lodash.isempty");
require("dotenv").config();
// require("./config/dbConnection"); // Just require it, no need to call a function
const cors = require("cors");
const router = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
// dbConnection();
const mongoose = require("mongoose");

(async () => {
  console.log("🟡 Trying to connect to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connection successful!");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
  }
})();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local testing
      "http://localhost:4173", // for local build
      getOrDefault(process.env.FRONTEND_PORT), //deployed frontend
      getOrDefault(process.env.FRONTEND_PORT1), //deployed frontend
      getOrDefault(process.env.FRONTEND_PORT2), //deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/", (req, res) => {
  console.log("GET working fine");
  res.send("GET working fine");
});
app.use(cookieParser());
app.use("/", router);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function getOrDefault(string) {
  if (string && isEmpty(string)) {
    return string;
  }
  return "";
}
