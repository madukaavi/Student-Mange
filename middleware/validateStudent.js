const studentSchema = require("../validators/studentValidator");

const validateStudent = (req, res, next) => {
  const result = studentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((error) => ({
        field: error.path[0],
        message: error.message
      }))
    });
  }

  req.body = result.data;

  next();
};

module.exports = validateStudent;