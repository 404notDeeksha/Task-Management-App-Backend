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

    // assignedUser: {
    //   type: String,
    //   required: true,
    // },
    formattedDueDate: {
      type: String,
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

taskSchema.pre("save", function (next) {
  if (this.dueDate) {
    this.formattedDueDate = moment(this.dueDate).format("DD-MM-YY"); // Convert and store in "dd-mm-yy" format
  }
  next();
});

taskSchema.set("toJSON", { virtuals: true });
taskSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Task", taskSchema);
