const Task = require("../../models/Task.model");

const createTask = async (overrides = {}) => {
  const defaultData = {
    title: "Default Task",
    description: "Default Description",
    userId: "mock-user-id",
  };

  const task = new Task({ ...defaultData, ...overrides });
  return await task.save();
};

const createManyTasks = async (count = 2, overrides = {}) => {
  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push(
      await createTask({
        title: `Task ${i + 1}`,
        ...overrides,
      })
    );
  }
  return tasks;
};

module.exports = {
  createTask,
  createManyTasks,
};
