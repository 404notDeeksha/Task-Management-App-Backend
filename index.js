const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/DbConnection");
const cors = require("cors");
const router = require("./routes/index.routes");
const cookieParser = require("cookie-parser");
dbConnection();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local testing
      "http://localhost:4173", // for local build
      process.env.FRONTEND_PORT, //deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/health", (req, res) => {
  console.log("GET working fine");
  res.send("GET working fine");
});
app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
