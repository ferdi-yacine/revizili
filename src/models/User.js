import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'tutor', 'admin'],
    default: 'student',
    required: true,
  },
  paimentStatus: {
    type: String,
    enum: ["paid", "not paid", "expaired"],
    default: "not paid"
  }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);