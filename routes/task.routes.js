const express = require("express");
const router = express.Router();
const taskController = require("../controllers/Task.controller");

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
// router.get("/:id", taskController.getTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
