import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/connectDB';
import { Notification } from '@/models/Notification';

export const POST = async (request) => {
  try {
    const body = await request.json();
    
    const {
      userId,
      type,
      title,
      message,
      relatedEntity,
      relatedEntityType,
      metadata
    } = body;

    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: "Missing required fields: userId, type, title, message" },
        { status: 400 }
      );
    }

    await connectDB();

    const newNotification = new Notification({
      userId,
      type,
      title,
      message,
      relatedEntity,
      relatedEntityType,
      metadata
    });

    await newNotification.save();

    return NextResponse.json(
      { 
        message: "Notification created successfully!", 
        notification: newNotification 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const isRead = searchParams.get('isRead');
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    await connectDB();

    const filter = { userId };
    if (isRead) filter.isRead = isRead === 'true';

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json(
      { notifications },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}