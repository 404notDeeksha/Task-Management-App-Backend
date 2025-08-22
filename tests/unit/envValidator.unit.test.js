jest.mock("dotenv", () => ({
  config: () => ({ parsed: {} }),
}));

describe("Environment Validator", () => {
  const REQUIRED_VARS = [
    "PORT",
    "DEP_FRONTEND_URL",
    "DEV_FRONTEND_URL",
    "JWT_SECRET_KEY",
    "MONGODB_URL",
  ];

  const mockEnv = (envOverrides = {}) => {
    for (const key of REQUIRED_VARS) {
      if (Object.prototype.hasOwnProperty.call(envOverrides, key)) {
        if (envOverrides[key] === undefined) {
          delete process.env[key]; // explicitly remove it
        } else {
          process.env[key] = envOverrides[key];
        }
      } else {
        process.env[key] = "mock_value";
      }
    }
  };

  beforeEach(() => {
    jest.resetModules(); // clear module cache
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up env vars
    for (const key of REQUIRED_VARS) {
      delete process.env[key];
    }
  });

  it("should pass when all required env vars are set", () => {
    mockEnv();

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const { validateEnv, PORT } = require("../../config/envValidator");

    validateEnv(); // <--- call it explicitly

    expect(PORT).toBe("mock_value");
    expect(consoleSpy).toHaveBeenCalledWith(
      "✅ All required environment variables are set."
    );
  });

  it("should exit the process and log error if any env vars are missing", () => {
    mockEnv({ JWT_SECRET_KEY: undefined });

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});

    const { validateEnv } = require("../../config/envValidator");

    validateEnv(); // <--- call it explicitly

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "🚨 Missing environment variables: JWT_SECRET_KEY"
      )
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
