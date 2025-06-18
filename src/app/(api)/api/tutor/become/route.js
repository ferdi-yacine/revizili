// app/api/tutor/become/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import { BecomeTutor } from '@/models/BecomeTutor';
import { User } from '@/models/User';

export const POST = async (request) => {
  try {
    const body = await request.json();
    
    const {
      qualifications,
      experience,
      bio,
      selectedModule,
      resume,
      certificates,
      videoFile,
      videoDescription,
      languages,
      availability,
      termsAccepted,
      userId
    } = body;

    if (!qualifications || !experience || !bio || !selectedModule || !videoFile || 
        !videoDescription || !languages || !availability || !termsAccepted || !userId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const existingApplication = await BecomeTutor.findOne({ 
      userId,
      status: 'pending' 
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You already have a pending application." },
        { status: 400 }
      );
    }

    const newApplication = new BecomeTutor({
      userId,
      qualifications,
      experience,
      bio,
      selectedModule,
      resume,
      certificates,
      videoFile,
      videoDescription,
      languages,
      availability,
      termsAccepted
    });

    await newApplication.save();

    return NextResponse.json(
      { 
        message: "Tutor application submitted successfully!", 
        application: newApplication 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error submitting tutor application:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}