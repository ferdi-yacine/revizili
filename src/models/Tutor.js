import mongoose from "mongoose";

const tutorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    modules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

export const Tutor = mongoose.models.Tutor || mongoose.model("Tutor", tutorSchema);