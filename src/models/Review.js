import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  feedback: {
    type: String
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  response: {
    type: String
  },
  responseDate: {
    type: Date
  }
}, { timestamps: true });

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);