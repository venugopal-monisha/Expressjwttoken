// In-memory database (for demonstration)
let students = [];
let currentId = 1;

// @desc    Create a new student
// @route   POST /api/students
// @access  Public
exports.createStudent = (req, res) => {
  try {
    const { name, email, phone, usn, password } = req.body;

    // Validation
    if (!name || !email || !phone || !usn || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid Gmail address'
      });
    }

    // Check if student already exists
    const existingStudent = students.find(s => s.email === email || s.usn === usn);
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'Student with this email or USN already exists'
      });
    }

    // Create new student
    const newStudent = {
      id: currentId++,
      name,
      email,
      phone,
      usn,
      password, // In production, hash this!
      createdAt: new Date().toISOString()
    };

    students.push(newStudent);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: {
        id: newStudent.id,
        name: newStudent.name,
        email: newStudent.email,
        phone: newStudent.phone,
        usn: newStudent.usn
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Public
exports.getAllStudents = (req, res) => {
  try {
    const studentsData = students.map(({ password, ...student }) => student);
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: studentsData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Public
exports.getStudent = (req, res) => {
  try {
    const { id } = req.params;
    const student = students.find(s => s.id === parseInt(id));

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const { password, ...studentData } = student;

    res.status(200).json({
      success: true,
      data: studentData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Public
exports.updateStudent = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, usn } = req.body;

    const studentIndex = students.findIndex(s => s.id === parseInt(id));

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Update student data
    if (name) students[studentIndex].name = name;
    if (email) students[studentIndex].email = email;
    if (phone) students[studentIndex].phone = phone;
    if (usn) students[studentIndex].usn = usn;
    students[studentIndex].updatedAt = new Date().toISOString();

    const { password, ...studentData } = students[studentIndex];

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: studentData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Public
exports.deleteStudent = (req, res) => {
  try {
    const { id } = req.params;
    const studentIndex = students.findIndex(s => s.id === parseInt(id));

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const deletedStudent = students.splice(studentIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: {
        id: deletedStudent.id,
        name: deletedStudent.name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};