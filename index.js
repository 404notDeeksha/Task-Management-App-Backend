const express = require("express");
var isEmpty = require("lodash.isempty");
require("dotenv").config();
const dbConnection = require("./config/DbConnection");
const cors = require("cors");
const router = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
dbConnection();

const app = express();
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "http://localhost:4173", // Local build
  getOrDefault(process.env.FRONTEND_PORT), // Deployed frontend (main)
  getOrDefault(process.env.FRONTEND_PORT1), // Additional frontend domain
  getOrDefault(process.env.FRONTEND_PORT2), // Another additional frontend domain
].filter(Boolean); // Removes undefined values

// Regex to match Vercel preview URLs (handling the dynamic part)
const vercelPreviewRegex =
  /^https:\/\/task-management-app-frontend-.*-deekshasharma-projects\.vercel\.app$/;

app.use(
  cors({
    origin: function (origin, callback) {
      console.log(`Request going throug CORS `, origin);
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        vercelPreviewRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allows cookies & authentication headers
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
  console.log("Using path ->", string);
  if (string && isEmpty(string)) {
    return string;
  }
  return "";
}
