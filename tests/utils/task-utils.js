const Task = require("../../models/task.model");

const defaultTaskData = {
  userId: "user123",
  title: "Test Task",
  description: "This is a test task",
  status: "To Do",
  dueDate: new Date(),
  priority: "Medium",
};

const createTask = async (override = {}) => {
  const data = { ...defaultTaskData, ...override };
  return await Task.create(data);
};

module.exports = {
  createTask,
  defaultTaskData,
};
