const express = require("express");
const router = express.Router();

const taskController = require("../controllers/Task.controller");
const { validate, taskSchema, updateTaskSchema } = require("../middleware/validation");

router.post("/", validate(taskSchema), taskController.createTask);
router.get("/", taskController.getAllTasks);
router.put("/:id", validate(updateTaskSchema), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
