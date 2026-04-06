const Task = require("../models/Task.model");
const createError = require("http-errors");

const createTask = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, userId: req.user });
    const newTask = await task.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    next(createError(400, err.message));
  }
};

const getAllTasks = async (req, res, next) => {
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
    next(createError(500, err.message));
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );

    if (!task) {
      throw createError(404, "Task not found");
    }

    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user,
    });

    if (!task) {
      throw createError(404, "Task not found");
    }

    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
};
