const mongoose = require("mongoose");

const mockEnvVars = {
  MONGODB_URL: "mongodb://localhost/test",
};

function setupDbConnectionTest() {
  let connectSpy;

  beforeAll(() => {
    jest.mock("../../config/envValidator", () => mockEnvVars);
  });

  beforeEach(() => {
    connectSpy = jest.spyOn(mongoose, "connect").mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.NODE_ENV;
  });

  return {
    mockConnectSuccess: () => connectSpy.mockResolvedValue(),
    mockConnectFailure: (error = new Error("Connection error")) =>
      connectSpy.mockRejectedValueOnce(error),
    getConnectSpy: () => connectSpy,
  };
}

module.exports = setupDbConnectionTest;
