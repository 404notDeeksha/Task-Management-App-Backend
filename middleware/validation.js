const { z } = require("zod");

// Validation schemas
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
});

const updateTaskSchema = taskSchema.partial();

// Validation middleware factory
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error.errors) {
      const messages = error.errors.map((e) => e.message).join(", ");
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }
    next(error);
  }
};

module.exports = {
  signupSchema,
  loginSchema,
  taskSchema,
  updateTaskSchema,
  validate,
};
