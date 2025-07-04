import connectDB from "@/lib/db";
import { Notification } from "@/models/Notification";
import { Session } from "@/models/Session";
import { Module } from "@/models/Module";
import { NextResponse } from "next/server";


export const POST = async (request) => {
  try {
    const body = await request.json();

    const {
      studentId,
      tutorId,
      moduleId,
      startTime,
      endTime,
      date,
      meetingLink,
      notes
    } = body;

    if (!studentId || !tutorId || !moduleId || !startTime || !endTime || !date) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const newSession = new Session({
      studentId,
      tutorId,
      moduleId,
      startTime,
      endTime,
      date,
      meetingLink,
      notes
    });

    await newSession.save();

    await Notification.create({
      userId: tutorId,
      type: 'booking',
      title: 'New Session Booked',
      message: `You have a new session scheduled with student ID: ${studentId}`,
      relatedEntity: newSession._id,
      relatedEntityType: 'Session'
    });

    return NextResponse.json(
      { message: "Session created successfully!", session: newSession },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const role = searchParams.get('role')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const status = searchParams.get('status')

    if (!userId || !role) {
      return NextResponse.json(
        { error: "Missing userId or role parameter" },
        { status: 400 }
      )
    }

    await connectDB()

    const filter = {}
    if (role === 'student') {
      filter.studentId = userId
    } else if (role === 'tutor') {
      filter.tutorId = userId
    } else {
      return NextResponse.json(
        { error: "Invalid role parameter" },
        { status: 400 }
      )
    }

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }

    if (status) {
      filter.status = status
    }

    const sessions = await Session.find(filter)
      .populate('studentId', 'name email firstName lastName')
      .populate('tutorId', 'name email firstName lastName')
      .populate('moduleId', 'name sign')
      .sort({ date: 1, startTime: 1 }) 

    return NextResponse.json(
      { sessions },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error fetching sessions:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}