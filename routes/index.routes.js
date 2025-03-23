const express = require("express");
const router = express.Router();
const authRouter = require("./user.routes");
const taskRouter = require("./task.routes");
// const authMiddleware = require("../middleware/auth");

router.use("/auth", authRouter);
router.use(
  "/tasks",
  // authMiddleware,
  taskRouter
);

module.exports = router;
