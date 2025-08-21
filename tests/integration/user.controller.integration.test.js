process.env.NODE_ENV = "test";
const request = require("supertest");
const bcrypt = require("bcryptjs");
const User = require("../../models/User.model");
const setupTestDB = require("../utils/setupTestDB");
const app = require("../../app");

setupTestDB();

describe("POST /auth/signup", () => {
  test("should create a new user successfully", async () => {
    const res = await request(app).post("/auth/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "Password123!",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty("userId");
    expect(res.body.user.name).toBe("Test User");
    expect(res.body.user.email).toBe("testuser@example.com");
    expect(res.body.user).toHaveProperty("token");
  });

  test("should not allow duplicate email registration", async () => {
    const payload = {
      name: "Test User",
      email: "test@example.com",
      password: "Password123!",
    };

    await request(app).post("/auth/signup").send(payload);

    const res = await request(app).post("/auth/signup").send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/already exists/i);
  });

  test("should return 500 if something goes wrong (e.g., missing required field)", async () => {
    const res = await request(app).post("/auth/signup").send({
      name: "User Without Email",
      password: "Password123!",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Server Error");
  });
});

describe("POST /auth/login", () => {
  test("should login successfully with correct credentials", async () => {
    const password = "Password123!";
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Login User",
      email: "login@example.com",
      password: hashedPassword,
    });

    const res = await request(app).post("/auth/login").send({
      email: "login@example.com",
      password: password,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty("userId");
    expect(res.body.user.email).toBe("login@example.com");
    expect(res.body.user).toHaveProperty("token");
  });

  test("should fail with incorrect password", async () => {
    const hashedPassword = await bcrypt.hash("CorrectPassword", 10);

    await User.create({
      name: "Test User",
      email: "wrongpass@example.com",
      password: hashedPassword,
    });

    const res = await request(app).post("/auth/login").send({
      email: "wrongpass@example.com",
      password: "WrongPassword",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });

  test("should fail with non-existing email", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "notfound@example.com",
      password: "AnyPassword123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/user not exists/i);
  });

  test("should return 422 if required fields are missing", async () => {
    const res = await request(app).post("/auth/login").send({
      password: "MissingEmail123",
    });

    expect(res.statusCode).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/required/i);
  });
});

describe("POST /auth/logout", () => {
  test("should return 200 and success message", async () => {
    const res = await request(app).post("/auth/logout");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Logged out successfully");
  });
});
