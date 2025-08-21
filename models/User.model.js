const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/* Acts as a safeguard hook to ensure userId is set before saving */
UserSchema.pre("save", function (next) {
  if (!this.userId) {
    this.userId = uuidv4();
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
