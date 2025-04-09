const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
const env = require("./config/envValidator");
console.log("Reaching index.js");
const dbConnection = require("./config/dbConnection.js");

// dbConnection();

// const mongoose = require("mongoose");

// const dbConnection = async () => {
//   console.log("🟡 Trying to connect to MongoDB...");
//   try {
//     await mongoose.connect(env.MONGODB_URL);
//     console.log("MongoDB connection successful!");
//   } catch (err) {
//     console.log("MongoDB connection failed:", err);
//   }
// };

dbConnection();

const app = express();

const allowedOrigins = [env.DEV_FRONTEND_URL, env.DEP_FRONTEND_URL];

const isVercelPreview = (origin) =>
  /^https:\/\/task-management-app-frontend[a-z0-9-]*\.vercel\.app$/.test(
    origin || ""
  );

const corsOptions = {
  origin: (origin, callback) => {
    console;
    if (!origin || allowedOrigins.includes(origin) || isVercelPreview(origin)) {
      console.log(
        "CORS policy: Allowing origin:",
        origin,
        allowedOrigins.includes(origin),
        isVercelPreview(origin)
      );
      callback(null, true);
    } else {
      callback(new Error("CORS policy: This origin is not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.get("/api/test", (req, res) => {
  console.log("🔵 /api/test route hit!");
  res.json({ message: "API is working!" });
});

app.use("/", router);

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
