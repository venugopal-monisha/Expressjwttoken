const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  usn: { type: String, unique: true },
  course: String,
  department: String,
  yearOfStudy: Number,
  semester: Number,
  dob: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);