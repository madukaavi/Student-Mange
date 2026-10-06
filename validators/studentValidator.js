const { z } = require("zod");

const studentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  age: z
    .number()
    .int("Age must be a whole number")
    .min(16, "Age must be at least 16")
    .max(100, "Age must be less than or equal to 100"),

  course: z
    .string()
    .trim()
    .min(2, "Course must be at least 2 characters")
});

module.exports = studentSchema;