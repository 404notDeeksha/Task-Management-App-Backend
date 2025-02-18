const mongoose = require("mongoose");
const moment = require("moment");
const { Schema } = mongoose;
const taskSchema = new mongoose.Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Task", taskSchema);
