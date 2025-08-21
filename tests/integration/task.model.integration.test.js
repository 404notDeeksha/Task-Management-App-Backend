jest.setTimeout(20000);
const Task = require("../models/task.model.js");
const { createTask } = require("../utils/task-utils.js");
const setupTestDb = require("../utils/setupTestDB.js");

setupTestDb();

describe("Task Model", () => {
  it("should create a task with default values", async () => {
    const task = await createTask({ title: "Default Task", userId: "user123" });

    expect(task.status).toBe("To Do");
    expect(task.priority).toBe("Medium");
    expect(task.title).toBe("Default Task");
    expect(task.createdAt).toBeDefined();
    expect(task.updatedAt).toBeDefined();
  });

  it("should trim title and description", async () => {
    const task = await createTask({
      title: "   Trimmed Title   ",
      description: "  Trimmed description  ",
    });

    expect(task.title).toBe("Trimmed Title");
    expect(task.description).toBe("Trimmed description");
  });

  it("should not allow invalid status", async () => {
    const task = new Task({
      userId: "user123",
      title: "Bad Status",
      status: "Invalid",
    });

    await expect(task.validate()).rejects.toThrow(/validation failed/i);
  });

  it("should require userId and title", async () => {
    const task = new Task({});
    await expect(task.validate()).rejects.toThrow();
  });

  it("should convert to JSON with virtuals", async () => {
    const task = await createTask();
    const json = task.toJSON();

    expect(json).toHaveProperty("title");
    expect(json).toHaveProperty("createdAt");
  });
});
