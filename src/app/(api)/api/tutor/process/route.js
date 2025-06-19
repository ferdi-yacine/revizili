import connectDB from "@/lib/db";
import { BecomeTutor } from "@/models/BecomeTutor";
import { Student } from "@/models/Student";
import { Tutor } from "@/models/Tutor";
import { User } from "@/models/User";
import { NextResponse } from "next/server";


export const PUT = async (request) => {
  try {
    const body = await request.json();
    const { applicationId, action } = body;

    if (!applicationId || !action) {
      return NextResponse.json(
        { error: "Missing application ID or action." },
        { status: 400 }
      );
    }

    await connectDB();

    const application = await BecomeTutor.findById(applicationId);
    if (!application) {
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      await User.findByIdAndUpdate(application.userId, { role: 'tutor' });

      await Student.findOneAndDelete({ userId: application.userId });

      const updateObj = {
        $setOnInsert: { userId: application.userId, students: [] }
      };

      if (application.selectedModules && Array.isArray(application.selectedModules)) {
        updateObj.$addToSet = { modules: { $each: application.selectedModules } };
      }

      const tutor = await Tutor.findOneAndUpdate(
        { userId: application.userId },
        updateObj,
        { upsert: true, new: true }
      );

      application.status = 'approved';
      await application.save();

      return NextResponse.json(
        { 
          message: "Application approved successfully!",
          tutor
        },
        { status: 200 }
      );

    } else if (action === 'reject') {
      application.status = 'rejected';
      await application.save();

      return NextResponse.json(
        { 
          message: "Application rejected.",
          application
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid action. Use 'approve' or 'reject'." },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}