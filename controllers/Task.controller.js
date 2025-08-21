const Task = require("../models/Task.model");

// POST/tasks
const createTask = async (req, res) => {
  try {
    console.log("Creating task", req.user, req.body);
    const task = new Task({ ...req.body, userId: req.user });
    const newTask = await task.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET/tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user });

    if (tasks.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: "No tasks found for this user.",
      });
    }

    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a task // PUT/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a task // DELETE/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user,
    });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
};
