const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const catchAsync = require('../utils/catchAsync');

// CREATE - POST /api/students
router.post(
  '/',
  catchAsync(studentController.createStudent)
);

// READ - GET /api/students (Get all students)
router.get(
  '/',
  catchAsync(studentController.getAllStudents)
);

// READ - GET /api/students/:id (Get single student)
router.get(
  '/:id',
  catchAsync(studentController.getStudent)
);

// UPDATE - PUT /api/students/:id
router.put(
  '/:id',
  catchAsync(studentController.updateStudent)
);

// DELETE - DELETE /api/students/:id
router.delete(
  '/:id',
  catchAsync(studentController.deleteStudent)
);

module.exports = router;
