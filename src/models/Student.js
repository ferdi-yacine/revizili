import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  year: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
  },
}, { timestamps: true });

export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);