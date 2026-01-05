// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  usn: { type: String },
  password: { type: String, required: true },
  // department: { type: String, required: true },
  // yearofstudy: { type: String, required: true },
  // semester: { type: String, required: true }, 
  // dob: { type: String, required: true },
  // hashed
});

module.exports = mongoose.model('Student', studentSchema);
