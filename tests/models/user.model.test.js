const setupTestDB = require("../setup/setupTestDB");
const User = require("../../models/User.model");
const { createTestUser } = require("../utils/user-utils");

setupTestDB();

describe("User Model", () => {
  it("should create a user with default userId", async () => {
    const user = await createTestUser();

    expect(user._id).toBeDefined();
    expect(user.userId).toBeDefined();
    expect(typeof user.userId).toBe("string");
  });

  it("should save and retrieve user correctly", async () => {
    const userData = {
      name: "Alice",
      email: "alice@example.com",
      password: "secret123",
    };

    const savedUser = await createTestUser(userData);
    const foundUser = await User.findOne({ email: userData.email });

    expect(foundUser).toBeTruthy();
    expect(foundUser.name).toBe("Alice");
    expect(foundUser.email).toBe("alice@example.com");
  });

  it("should not allow duplicate emails", async () => {
    await createTestUser({ email: "dup@example.com" });

    let error;
    try {
      await createTestUser({ email: "dup@example.com" });
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe("MongoServerError");
    expect(error.code).toBe(11000); // Duplicate key error
  });

  it("should not save without required fields", async () => {
    const user = new User({}); // missing all required fields

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe("ValidationError");
    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });
});
