const Task = require("../models/Task.model");

// POST/api/tasks
const createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    // console.log("Task", task);

    const newTask = await task.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET/api/tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET/api/tasks/:id
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET/api/tasks/:date
const getTasksOfDay = async (req, res) => {
  const date = req.params.date;

  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  try {
    const tasks = await Task.find({
      timestamp: { $gte: startOfDay, $lt: endOfDay },
    });

    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET/api/tasks/:priority
const getTasksPriorityWise = async (req, res) => {
  const taskPriority = req.params.priority;

  try {
    const tasks = await Task.find({ priority: taskPriority });
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET/api/tasks/pending-before-today
const getTasksPendingBeforeToday = async (req, res) => {
  try {
    // Get today's date at 00:00:00 (start of the day)
    const todayStart = new Date().setHours(0, 0, 0, 0);

    // Find tasks where status is "In Progress" or "To Do" and dueDate is before today
    const tasks = await Task.find({
      status: { $in: ["In Progress", "To Do"] },
      dueDate: { $lt: todayStart },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a task // PUT/api/tasks/:id
const updateTask = async (req, res) => {
  // console.log("Update", req.params.id, req.body);

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a task // DELETE/api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    // console.log("Task", req.params.id, typeof req.params.id);

    const task = await Task.findByIdAndDelete(req.params.id);
    // console.log("Task", task);
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
  getTask,
  getTasksOfDay,
  getTasksPriorityWise,
  getTasksPendingBeforeToday,
};
