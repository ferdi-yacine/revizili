// app/api/tutor/accept-student/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import { Tutor } from '@/models/Tutor';

export const PUT = async (request) => {
  try {
    const body = await request.json();
    const { tutorId, studentId } = body;

    if (!tutorId || !studentId) {
      return NextResponse.json(
        { error: "Missing tutor ID or student ID." },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedTutor = await Tutor.findByIdAndUpdate(
      tutorId,
      { $addToSet: { students: studentId } },
      { new: true }
    ).populate('students');

    if (!updatedTutor) {
      return NextResponse.json(
        { error: "Tutor not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Student added successfully!",
        tutor: updatedTutor
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error accepting student:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}