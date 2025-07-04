import connectDB from "@/lib/db";
import { Notification } from "@/models/Notification";
import { Review } from "@/models/Review";
import { Session } from "@/models/Session";
import { Module } from "@/models/Module";
import { NextResponse } from "next/server";


export const POST = async (request) => {
  try {
    const body = await request.json();
    
    const {
      sessionId,
      studentId,
      tutorId,
      moduleId,
      rating,
      feedback,
    } = body;

    if (!sessionId || !studentId || !tutorId || !moduleId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const session = await Session.findById(sessionId);
    if (!session || session.status !== 'completed') {
      return NextResponse.json(
        { error: "Session not found or not completed." },
        { status: 400 }
      );
    }

    const existingReview = await Review.findOne({ sessionId });
    if (existingReview) {
      return NextResponse.json(
        { error: "Review already exists for this session." },
        { status: 400 }
      );
    }

    const newReview = new Review({
      sessionId,
      studentId,
      tutorId,
      moduleId,
      rating,
      feedback,
    });

    await newReview.save();

    await Notification.create({
      userId: tutorId,
      type: 'review',
      title: 'New Review Received',
      message: `You received a ${rating}-star review for your session`,
      relatedEntity: newReview._id,
      relatedEntityType: 'Review'
    });

    return NextResponse.json(
      { message: "Review submitted successfully!", review: newReview },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const tutorId = searchParams.get('tutorId');
    const studentId = searchParams.get('studentId');
    const moduleId = searchParams.get('moduleId');

    if (!tutorId && !studentId) {
      return NextResponse.json(
        { error: "Either tutorId or studentId must be provided" },
        { status: 400 }
      );
    }

    await connectDB();

    const filter = {};
    if (tutorId) filter.tutorId = tutorId;
    if (studentId) filter.studentId = studentId;
    if (moduleId) filter.moduleId = moduleId;

    const reviews = await Review.find(filter)
      .populate('studentId', 'name')
      .populate('tutorId', 'name')
      .populate('moduleId', 'name sign')
      .populate('sessionId', 'startTime')
      .sort({ createdAt: -1 })

    return NextResponse.json(
      { reviews },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}