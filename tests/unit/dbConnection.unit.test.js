describe("dbConnection", () => {
  const MOCK_URI = "mongodb://mock_uri";

  beforeEach(() => {
    jest.resetModules(); // reset require cache
    process.env.MONGODB_URL = MOCK_URI;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("skips connection in test environment", async () => {
    process.env.NODE_ENV = "test";

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const mongoose = require("mongoose");
    const connectSpy = jest.spyOn(mongoose, "connect");

    const dbConnection = require("../../config/dbConnection");
    await dbConnection();

    expect(logSpy).toHaveBeenCalledWith(
      "⚡ Skipping DB connection in test environment"
    );
    expect(connectSpy).not.toHaveBeenCalled();
  });

  it("connects successfully in non-test environment", async () => {
    process.env.NODE_ENV = "development";

    const mongoose = require("mongoose");
    
    const connectSpy = jest.spyOn(mongoose, "connect").mockResolvedValueOnce();
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const dbConnection = require("../../config/dbConnection");
    await dbConnection();

    expect(connectSpy).toHaveBeenCalledWith(MOCK_URI);
    expect(logSpy).toHaveBeenCalledWith("MongoDB connection successful!");
  });

  it("logs an error when connection fails", async () => {
    process.env.NODE_ENV = "development";
    const mongoose = require("mongoose");
    const testError = new Error("connection fail");

    const connectSpy = jest
      .spyOn(mongoose, "connect")
      .mockRejectedValueOnce(testError);
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const dbConnection = require("../../config/dbConnection");
    await dbConnection();

    expect(connectSpy).toHaveBeenCalledWith(MOCK_URI);
    expect(logSpy).toHaveBeenCalledWith(
      "MongoDB connection failed:",
      testError
    );
  });
});
