const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const setupTestDB = require("../utils/setupTestDB");
const { createTask, createManyTasks } = require("../utils/task-utils");
const Task = require("../../models/Task.model");

setupTestDB();

jest.mock("../../middleware/auth", () => (req, res, next) => {
  req.user = "mock-user-id";
  next();
});

describe("Task API", () => {
  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const res = await request(app).post("/tasks").send({
        title: "Test task",
        description: "Do this thing",
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("Test task");
      expect(res.body.data.userId).toBe("mock-user-id");
    });

    it("should return 400 if body is invalid", async () => {
      const res = await request(app).post("/tasks").send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /tasks", () => {
    it("should return all tasks for the logged-in user", async () => {
      await createManyTasks(2);

      const res = await request(app).get("/tasks");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
    });

    it("should return empty array if no tasks", async () => {
      const res = await request(app).get("/tasks");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
      expect(res.body.message).toBe("No tasks found for this user.");
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update an existing task", async () => {
      const task = await createTask({ title: "Old Title" });

      const res = await request(app)
        .put(`/tasks/${task._id}`)
        .send({ title: "New Title" });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe("New Title");
    });

    it("should return 404 if task is not found", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/tasks/${fakeId}`)
        .send({ title: "Updated" });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", async () => {
      const task = await createTask({ title: "Delete Me" });

      const res = await request(app).delete(`/tasks/${task._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Task deleted");

      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });

    it("should return 404 if task does not exist", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/tasks/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Task not found");
    });
  });
});
