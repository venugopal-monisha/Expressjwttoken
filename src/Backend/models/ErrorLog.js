const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
  message: String,
  endpoint: String,
  method: String,
  statusCode: Number,
  category: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ErrorLog", errorLogSchema);
