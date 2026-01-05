const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// CREATE - POST /api/students
router.post('/', studentController.createStudent);

// READ - GET /api/students (Get all students)
router.get('/', studentController.getAllStudents);

// READ - GET /api/students/:id (Get single student)
router.get('/:id', studentController.getStudent);

// UPDATE - PUT /api/students/:id
router.put('/:id', studentController.updateStudent);

// DELETE - DELETE /api/students/:id
router.delete('/:id', studentController.deleteStudent);

module.exports = router;