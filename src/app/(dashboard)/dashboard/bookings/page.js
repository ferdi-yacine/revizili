"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Calendar, Clock, Video, MessageCircle, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

const BookingsPage = () => {
  const { data: session } = useSession()
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [pendingBookings, setPendingBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.id) return

      try {
        setIsLoading(true)
        // Fetch all sessions for this student
        const response = await fetch(`/api/session?userId=${session.user.id}&role=student`)
        const data = await response.json()

        if (response.ok) {
          const today = new Date()

          // Filter upcoming sessions (accepted and date is today or future)
          const upcoming = data.sessions.filter(session =>
            session.status === 'accepted' &&
            new Date(session.date) >= new Date(today.setHours(0, 0, 0, 0))
          )

          // Filter pending sessions (scheduled status)
          const pending = data.sessions.filter(session =>
            session.status === 'scheduled'
          )

          setUpcomingBookings(upcoming)
          setPendingBookings(pending)
        } else {
          console.error('Error fetching sessions:', data.error)
        }
      } catch (error) {
        console.error('Error fetching sessions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [session])

  const joinMeeting = (meetingLink) => {
    window.open(meetingLink, "_blank")
  }

  const cancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`/api/session/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'cancelled'
        })
      })

      if (response.ok) {
        // Update local state to remove the cancelled booking
        setUpcomingBookings(prev => prev.filter(b => b._id !== bookingId))
        setPendingBookings(prev => prev.filter(b => b._id !== bookingId))
      } else {
        console.error('Error cancelling booking')
      }
    } catch (error) {
      console.error('Error cancelling booking:', error)
    }
  }

  const rescheduleBooking = (bookingId) => {
    console.log("Rescheduling booking:", bookingId)
    // Implement rescheduling logic
  }

  const calculateDuration = (startTime, endTime) => {
    return `${endTime.split(':')[0] - startTime.split(':')[0]} hours`;
  }

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
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
              <Card key={booking._id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.tutorId?.avatar || "/placeholder.svg"} alt={booking.tutorId?.name} />
                        <AvatarFallback>
                          {booking.tutorId?.firstName
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">Module: {booking.moduleId?.name}</h3>
                        <p className="text-gray-600 mb-2">with {booking.tutorId?.firstName} {booking.tutorId?.lastName}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.startTime} - {booking.endTime}
                          </div>
                          <Badge variant="outline">
                            {calculateDuration(booking.startTime, booking.endTime)}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {booking.status}
                          </Badge>
                        </div>
                        {booking.responseMessage && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-700">
                              <MessageCircle className="h-4 w-4 inline mr-1" />
                              {booking.responseMessage}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      {booking.meetingLink && (
                        <Button onClick={() => joinMeeting(booking.meetingLink)} className="flex items-center">
                          <Video className="h-4 w-4 mr-2" />
                          Join Meeting
                        </Button>
                      )}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => rescheduleBooking(booking._id)}>
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => cancelBooking(booking._id)}>
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
              <Card key={booking._id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.tutorId?.avatar || "/placeholder.svg"} alt={booking.tutorId?.name} />
                        <AvatarFallback>
                          {booking.tutorId?.firstName?.[0]}{booking.tutorId?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">Module: {booking.moduleId?.name}</h3>
                        <p className="text-gray-600 mb-2">with {booking.tutorId?.firstName} {booking.tutorId?.lastName}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.startTime} - {booking.endTime}
                          </div>
                          <Badge variant="outline">
                            {calculateDuration(booking.startTime, booking.endTime)}
                          </Badge>
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
                      <Button variant="outline" size="sm" onClick={() => cancelBooking(booking._id)}>
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