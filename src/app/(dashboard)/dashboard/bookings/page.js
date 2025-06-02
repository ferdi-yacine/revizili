"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Calendar, Clock, Video, MessageCircle } from "lucide-react"

const BookingsPage = () => {
  const [upcomingBookings] = useState([
    {
      id: 1,
      tutor: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        subject: "Mathematics",
      },
      date: "2024-01-15",
      time: "2:00 PM - 3:00 PM",
      duration: "1 hour",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "confirmed",
      notes: "Focus on calculus derivatives",
    },
    {
      id: 2,
      tutor: {
        name: "Prof. Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        subject: "Physics",
      },
      date: "2024-01-16",
      time: "4:00 PM - 5:30 PM",
      duration: "1.5 hours",
      meetingLink: "https://meet.google.com/xyz-uvwx-yz",
      status: "confirmed",
      notes: "Quantum mechanics review",
    },
  ])

  const [pendingBookings] = useState([
    {
      id: 3,
      tutor: {
        name: "Dr. Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        subject: "Chemistry",
      },
      date: "2024-01-18",
      time: "3:00 PM - 4:00 PM",
      duration: "1 hour",
      status: "pending",
      notes: "Organic chemistry basics",
    },
  ])

  const joinMeeting = (meetingLink) => {
    window.open(meetingLink, "_blank")
  }

  const cancelBooking = (bookingId) => {
    console.log("Canceling booking:", bookingId)
    // Implement cancellation logic
  }

  const rescheduleBooking = (bookingId) => {
    console.log("Rescheduling booking:", bookingId)
    // Implement rescheduling logic
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">Manage your tutoring sessions and meetings</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
                <p className="text-gray-600">Book a session with a tutor to get started</p>
              </CardContent>
            </Card>
          ) : (
            upcomingBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.tutor.avatar || "/placeholder.svg"} alt={booking.tutor.name} />
                        <AvatarFallback>
                          {booking.tutor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{booking.tutor.subject}</h3>
                        <p className="text-gray-600 mb-2">with {booking.tutor.name}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </div>
                          <Badge variant="outline">{booking.duration}</Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {booking.status}
                          </Badge>
                        </div>
                        {booking.notes && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-700">
                              <MessageCircle className="h-4 w-4 inline mr-1" />
                              {booking.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      <Button onClick={() => joinMeeting(booking.meetingLink)} className="flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => rescheduleBooking(booking.id)}>
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => cancelBooking(booking.id)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          {pendingBookings.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-600">All your booking requests have been processed</p>
              </CardContent>
            </Card>
          ) : (
            pendingBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.tutor.avatar || "/placeholder.svg"} alt={booking.tutor.name} />
                        <AvatarFallback>
                          {booking.tutor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{booking.tutor.subject}</h3>
                        <p className="text-gray-600 mb-2">with {booking.tutor.name}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </div>
                          <Badge variant="outline">{booking.duration}</Badge>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {booking.status}
                          </Badge>
                        </div>
                        {booking.notes && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-700">
                              <MessageCircle className="h-4 w-4 inline mr-1" />
                              {booking.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => cancelBooking(booking.id)}>
                        Cancel Request
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BookingsPage