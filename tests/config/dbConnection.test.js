const mongoose = require("mongoose");
const dbConnection = require("../../config/dbConnection");
const setupTestDbConnection = require("../setup/setupTestDbConnection");

describe("Database connection", () => {
  const { mockConnectSuccess, mockConnectFailure, getConnectSpy } =
    setupTestDbConnection();

  it("should skip DB connection in test environment", async () => {
    process.env.NODE_ENV = "test";

    await dbConnection();

    expect(getConnectSpy()).not.toHaveBeenCalled();
    console.log("⚡ Skipping DB connection in test environment");
  });

  it("should connect to the DB in non-test environment", async () => {
    process.env.NODE_ENV = "production";
    mockConnectSuccess();

    await dbConnection();

    expect(getConnectSpy()).toHaveBeenCalledWith("mongodb://localhost/test");
    console.log("MongoDB connection successful!");
  });

  it("should handle DB connection failure", async () => {
    process.env.NODE_ENV = "production";
    mockConnectFailure();
    await dbConnection();

    expect(getConnectSpy()).toHaveBeenCalledWith("mongodb://localhost/test");
    console.log("MongoDB connection failed:", new Error("Connection error"));
  });
});
