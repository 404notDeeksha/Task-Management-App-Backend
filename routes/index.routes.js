const express = require("express");
const router = express.Router();
const signupRouter = require("./user.routes");

router.use("/auth", signupRouter);
module.exports = router;
