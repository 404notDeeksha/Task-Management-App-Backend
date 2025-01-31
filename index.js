const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/DbConnection");
const cors = require("cors");
const router = require("./routes/index.routes");
dbConnection();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
