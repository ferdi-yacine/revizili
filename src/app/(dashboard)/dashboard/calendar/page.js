"use client"

import { useEffect, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Calendar } from "@/app/components/ui/calendar"
import { Badge } from "@/app/components/ui/badge"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"
import { CalendarIcon, Clock, Video, Plus, Users, CalendarPlus2Icon as CalendarIcon2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { addDays, format } from "date-fns"

const TutorCalendarPage = () => {
  const { data: session } = useSession()
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [upcomingSessions, setUpcomingSessions] = useState([])
  const [allSessions, setAllSessions] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [newSession, setNewSession] = useState({
    student: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    meetingLink: "",
    notes: "",
    module: "",
  })

  useEffect(() => {
    const fetchSessions = async () => {
      if (!session?.user?.id) return

      try {
        setIsLoading(true)
        const today = new Date()
        const nextWeek = addDays(today, 7)

        const response = await fetch(
          `/api/session?userId=${session.user.id}&role=tutor&startDate=${today.toISOString()}&endDate=${nextWeek.toISOString()}&status=accepted`
        )
        const data = await response.json()

        if (response.ok) {
          setAllSessions(data.sessions)
          const formattedSessions = data.sessions.map(session => ({
            ...session,
            date: new Date(session.date)
          }))
          setUpcomingSessions(formattedSessions)
        } else {
          console.error('Error fetching sessions:', data.error)
        }
      } catch (error) {
        console.error('Error fetching sessions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessions()
  }, [session])

  // Sample data
  const [students] = useState([
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Carol Davis", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40" },
  ])

  const [modules] = useState([
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Statistics" },
    { id: 3, name: "Calculus" },
  ])

  const [sessions] = useState([
    {
      id: 1,
      student: { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      date: new Date(2024, 0, 15),
      startTime: "14:00",
      endTime: "15:00",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      notes: "Focus on calculus derivatives",
      module: "Mathematics",
    },
    {
      id: 2,
      student: { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40" },
      date: new Date(2024, 0, 16),
      startTime: "16:00",
      endTime: "17:30",
      meetingLink: "https://meet.google.com/xyz-uvwx-yz",
      notes: "Quantum mechanics review",
      module: "Physics",
    },
    {
      id: 3,
      student: { id: 3, name: "Carol Davis", avatar: "/placeholder.svg?height=40&width=40" },
      date: new Date(2024, 0, 18),
      startTime: "10:00",
      endTime: "11:00",
      meetingLink: "https://meet.google.com/123-456-789",
      notes: "Organic chemistry basics",
      module: "Chemistry",
    },
  ])

  const [availabilitySlots] = useState([
    { day: "Monday", slots: ["09:00-11:00", "14:00-17:00"] },
    { day: "Tuesday", slots: ["10:00-12:00", "15:00-18:00"] },
    { day: "Wednesday", slots: ["09:00-12:00", "13:00-16:00"] },
    { day: "Thursday", slots: ["11:00-13:00", "16:00-19:00"] },
    { day: "Friday", slots: ["09:00-11:00", "14:00-17:00"] },
    { day: "Saturday", slots: ["10:00-14:00"] },
    { day: "Sunday", slots: [] },
  ])

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ]

  const handleCreateSession = () => {
    console.log("Creating new session:", newSession)
    // Implement session creation logic
  }

  const handleJoinMeeting = (meetingLink) => {
    window.open(meetingLink, "_blank")
  }

  // Filter sessions for the selected date
  const sessionsForSelectedDate = sessions.filter(
    (session) => date && session.date.toDateString() === date.toDateString(),
  )

  // Function to check if a date has sessions
  const hasSessionsOnDate = (date) => {
    return sessions.some((session) => session.date.toDateString() === date.toDateString())
  }

  console.log(allSessions)
  console.log(upcomingSessions)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
        <p className="text-gray-600">Manage your tutoring schedule and sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tutoring Schedule</CardTitle>
            <CardDescription>View and manage your upcoming sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="w-full flex items-center justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{
                    booked: (date) => hasSessionsOnDate(date),
                  }}
                  modifiersStyles={{
                    booked: { fontWeight: "bold", backgroundColor: "rgba(59, 130, 246, 0.1)" },
                  }}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">{date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}</h3>
                  <h3 className="text-lg font-medium">{"Select a date"}</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center">
                        <Plus className="h-4 w-4 mr-2" />
                        New Session
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Create New Session</DialogTitle>
                        <DialogDescription>Schedule a new tutoring session with a student</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="student" className="text-right">
                            Student
                          </Label>
                          <div className="col-span-3">
                            <Select
                              value={newSession.student}
                              onValueChange={(value) => setNewSession((prev) => ({ ...prev, student: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select student" />
                              </SelectTrigger>
                              <SelectContent>
                                {students.map((student) => (
                                  <SelectItem key={student.id} value={student.id.toString()}>
                                    <div className="flex items-center">
                                      <Avatar className="h-6 w-6 mr-2">
                                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                        <AvatarFallback>
                                          {student.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      {student.name}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="module" className="text-right">
                            Module
                          </Label>
                          <div className="col-span-3">
                            <Select
                              value={newSession.module}
                              onValueChange={(value) => setNewSession((prev) => ({ ...prev, module: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select module" />
                              </SelectTrigger>
                              <SelectContent>
                                {modules.map((module) => (
                                  <SelectItem key={module.id} value={module.name}>
                                    {module.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <div className="col-span-3">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {/* {newSession.date ? format(newSession.date, "PPP") :  */}
                                  <span>Pick a date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={newSession.date}
                                  onSelect={(date) => date && setNewSession((prev) => ({ ...prev, date }))}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="startTime" className="text-right">
                            Start Time
                          </Label>
                          <div className="col-span-3">
                            <Select
                              value={newSession.startTime}
                              onValueChange={(value) => setNewSession((prev) => ({ ...prev, startTime: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="endTime" className="text-right">
                            End Time
                          </Label>
                          <div className="col-span-3">
                            <Select
                              value={newSession.endTime}
                              onValueChange={(value) => setNewSession((prev) => ({ ...prev, endTime: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="meetingLink" className="text-right">
                            Meeting Link
                          </Label>
                          <Input
                            id="meetingLink"
                            placeholder="https://meet.google.com/..."
                            className="col-span-3"
                            value={newSession.meetingLink}
                            onChange={(e) => setNewSession((prev) => ({ ...prev, meetingLink: e.target.value }))}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="notes" className="text-right">
                            Notes
                          </Label>
                          <Textarea
                            id="notes"
                            placeholder="Session details, topics to cover..."
                            className="col-span-3"
                            value={newSession.notes}
                            onChange={(e) => setNewSession((prev) => ({ ...prev, notes: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={handleCreateSession}>Create Session</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {sessionsForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {sessionsForSelectedDate.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={session.student.avatar || "/placeholder.svg"}
                              alt={session.student.name}
                            />
                            <AvatarFallback>
                              {session.student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{session.student.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{session.module}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {session.startTime} - {session.endTime}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleJoinMeeting(session.meetingLink)}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <CalendarIcon2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions scheduled</h3>
                    <p className="text-gray-600 mb-4">No tutoring sessions for this date</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Schedule Session</Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Weekly Availability</span>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </CardTitle>
            <CardDescription>Your regular tutoring hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availabilitySlots.map((day) => (
                <div key={day.day} className="border-b pb-3 last:border-0">
                  <h4 className="font-medium mb-2">{day.day}</h4>
                  {day.slots.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {day.slots.map((slot) => (
                        <Badge key={slot} variant="secondary">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Not available</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>Your scheduled tutoring sessions for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
                <p className="text-gray-600">You have no sessions scheduled for the next 7 days</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingSessions.map((session) => (
                  <div key={session._id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session.studentId?.avatar || "/placeholder.svg"}
                          alt={session.studentId?.firstName}
                        />
                        <AvatarFallback>
                          {session.studentId?.firstName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{session.studentId?.firstName} {session.studentId?.lastName}</h4>
                        <p className="text-sm text-gray-600">{session.moduleId?.name}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {format(new Date(session.date), "EEEE, MMMM d")}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        {session.startTime} - {session.endTime}
                      </div>
                    </div>
                    {session.notes && (
                      <p className="text-sm text-gray-700 mb-3 border-t pt-2">
                        <span className="font-medium">Notes:</span> {session.notes}
                      </p>
                    )}
                    {session.meetingLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center justify-center"
                        onClick={() => handleJoinMeeting(session.meetingLink)}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Join Meeting
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TutorCalendarPage