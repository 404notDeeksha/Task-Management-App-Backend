const express = require("express");
const router = express.Router();
const authRouter = require("./user.routes");
const taskRouter = require("./task.routes");

router.use("/auth", authRouter);
router.use("/tasks", taskRouter);

module.exports = router;
