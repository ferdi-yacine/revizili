import mongoose from "mongoose";

const becomeTutorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Step 1: Personal Information
    qualifications: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        enum: ['0-1', '2-3', '4-5', '6-10', '10+'],
        required: true
    },
    bio: {
        type: String,
        required: true
    },

    selectedModules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true
    }],

    resume: {
        type: String,
    },
    certificates: [{
        type: String,
    }],
    videoFile: {
        type: String,
        required: true
    },
    videoDescription: {
        type: String,
        required: true
    },

    languages: [{
        type: String,
        enum: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Mandarin', 'Japanese', 'Korean', 'Arabic'],
        required: true
    }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    termsAccepted: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

export const BecomeTutor = mongoose.models.BecomeTutor || mongoose.model("BecomeTutor", becomeTutorSchema);