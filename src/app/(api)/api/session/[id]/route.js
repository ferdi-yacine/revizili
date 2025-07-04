import connectDB from "@/lib/db"
import { Notification } from "@/models/Notification"
import { Session } from "@/models/Session"
import { NextResponse } from "next/server"


export const PATCH = async (request, { params }) => {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, responseMessage } = body

    if (!status || !['pending', 'accepted', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      )
    }

    await connectDB()

    const updatedSession = await Session.findByIdAndUpdate(
      id,
      { status, responseMessage },
      { new: true }
    ).populate('studentId tutorId moduleId')

    if (!updatedSession) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      )
    }

    await Notification.create({
      userId: updatedSession.studentId._id,
      type: 'booking',
      title: `Session ${status}`,
      message: `Your session with ${updatedSession.tutorId.name} has been ${status}`,
      relatedEntity: updatedSession._id,
      relatedEntityType: 'Session'
    })

    return NextResponse.json(
      { session: updatedSession },
      { status: 200 }
    )

  } catch (error) {
    console.error("Error updating session:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}