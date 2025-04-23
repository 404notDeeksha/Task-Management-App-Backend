const User = require("../../models/User.model");

const createTestUser = async (overrides = {}) => {
  const defaultData = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  const user = new User({ ...defaultData, ...overrides });
  return await user.save();
};

module.exports = { createTestUser };
