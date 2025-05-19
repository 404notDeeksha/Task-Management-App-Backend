const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/auth");

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {
  let req, res, next;

  const mockRes = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  });

  const runMiddleware = () => authMiddleware(req, res, next);

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer mockToken",
      },
    };
    res = mockRes();
    next = jest.fn();
    jest.clearAllMocks();
  });

  const expectUnauthorized = (message) => {
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message,
    });
    expect(next).not.toHaveBeenCalled();
  };

  it("should call next if token is valid", () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { userId: "12345" });
    });

    runMiddleware();

    expect(jwt.verify).toHaveBeenCalledWith(
      "mockToken",
      expect.any(String),
      expect.any(Function)
    );
    expect(req.user).toBe("12345");
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if no token is provided", () => {
    req.headers.authorization = undefined;

    runMiddleware();

    expectUnauthorized("Unauthorized. No token provided.");
  });

  it("should return 401 if token is invalid", () => {
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"), null);
    });

    runMiddleware();

    expectUnauthorized("Invalid token.");
  });
});
