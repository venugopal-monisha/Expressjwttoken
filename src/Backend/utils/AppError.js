class AppError extends Error {
  constructor(message, statusCode, category = "runtime") {
    super(message);

    this.statusCode = statusCode;
    this.category = category;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
