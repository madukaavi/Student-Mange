const Student = require("../models/Student");

// ==========================================
// CREATE STUDENT
// ==========================================

const createStudent = async (req, res, next) => {
  try {
    const { name, age, course } = req.body;

    const student = await Student.create({
      name,
      age,
      course
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// GET ALL STUDENTS
// ==========================================

const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// GET STUDENT BY ID
// ==========================================

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// UPDATE STUDENT
// ==========================================

const updateStudent = async (req, res, next) => {
  try {
    const { name, age, course } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        course
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student
    });
  } catch (error) {
    next(error);
  }
};


// ==========================================
// DELETE STUDENT
// ==========================================

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};