const createError = require("http-errors");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      success: false,
      status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    if (err.isOperational) {
      res.status(statusCode).json({
        success: false,
        status,
        message: err.message,
      });
    } else {
      console.error("ERROR 💥", err);
      res.status(500).json({
        success: false,
        status: "error",
        message: "Something went wrong",
      });
    }
  }
};

const notFoundHandler = (req, res, next) => {
  next(createError(404, `Cannot find ${req.originalUrl} on this server`));
};

module.exports = {
  createError,
  errorHandler,
  notFoundHandler,
};
