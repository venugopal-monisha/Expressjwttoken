const ErrorLog = require("../models/ErrorLog");

module.exports = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  try {
    await ErrorLog.create({
      message: err.message,
      endpoint: req.originalUrl,
      method: req.method,
      statusCode,
      category: err.category || "runtime"
    });
  } catch (e) {
    console.error("Error saving error log:", e.message);
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message
  });
};
