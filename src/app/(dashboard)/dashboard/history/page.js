"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"
import { Calendar, Clock, Star, MessageCircle, Search } from "lucide-react"

const SessionHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSubject, setFilterSubject] = useState("")
  const [selectedSession, setSelectedSession] = useState(null)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const [sessionHistory] = useState([
    {
      id: 1,
      tutor: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        subject: "Mathematics",
      },
      date: "2024-01-10",
      time: "2:00 PM - 3:00 PM",
      duration: "1 hour",
      status: "completed",
      rating: 5,
      feedback: "Excellent session! Very clear explanations.",
      notes: "Covered calculus derivatives and integration",
      cost: 45,
    },
    {
      id: 2,
      tutor: {
        name: "Prof. Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        subject: "Physics",
      },
      date: "2024-01-08",
      time: "4:00 PM - 5:30 PM",
      duration: "1.5 hours",
      status: "completed",
      rating: 4,
      feedback: "Good session, but could use more examples.",
      notes: "Quantum mechanics fundamentals",
      cost: 82.5,
    },
    {
      id: 3,
      tutor: {
        name: "Dr. Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        subject: "Chemistry",
      },
      date: "2024-01-05",
      time: "3:00 PM - 4:00 PM",
      duration: "1 hour",
      status: "completed",
      rating: 0, // Not rated yet
      feedback: "",
      notes: "Organic chemistry basics",
      cost: 40,
    },
    {
      id: 4,
      tutor: {
        name: "James Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        subject: "Computer Science",
      },
      date: "2024-01-03",
      time: "6:00 PM - 7:00 PM",
      duration: "1 hour",
      status: "completed",
      rating: 5,
      feedback: "Amazing tutor! Learned so much about algorithms.",
      notes: "Data structures and algorithms",
      cost: 60,
    },
  ])

  const handleRateSession = (sessionId) => {
    console.log("Rating session:", sessionId, "Rating:", rating, "Feedback:", feedback)
    // Implement rating logic
    setSelectedSession(null)
    setRating(0)
    setFeedback("")
  }

  const filteredSessions = sessionHistory.filter((session) => {
    const matchesSearch =
      session.tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.tutor.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = !filterSubject || session.tutor.subject === filterSubject
    return matchesSearch && matchesSubject
  })

  const totalSessions = sessionHistory.length
  const totalCost = sessionHistory.reduce((sum, session) => sum + session.cost, 0)
  const averageRating =
    sessionHistory.filter((s) => s.rating > 0).reduce((sum, s) => sum + s.rating, 0) /
      sessionHistory.filter((s) => s.rating > 0).length || 0

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Session History</h1>
        <p className="text-gray-600">Review your completed tutoring sessions</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{totalSessions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">{totalSessions * 1.2}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating Given</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">${totalCost}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by tutor name or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.tutor.avatar || "/placeholder.svg"} alt={session.tutor.name} />
                    <AvatarFallback>
                      {session.tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{session.tutor.subject}</h3>
                    <p className="text-gray-600 mb-2">with {session.tutor.name}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {session.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {session.time}
                      </div>
                      <Badge variant="outline">{session.duration}</Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ${session.cost}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{session.notes}</p>
                    {session.rating > 0 && (
                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < session.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{session.feedback}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  {session.rating === 0 ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedSession(session)}>
                          Rate Session
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Rate Your Session</DialogTitle>
                          <DialogDescription>How was your session with {session.tutor.name}?</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Rating</Label>
                            <div className="flex items-center space-x-1 mt-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                                  <Star
                                    className={`h-6 w-6 ${
                                      star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="feedback">Feedback (optional)</Label>
                            <Textarea
                              id="feedback"
                              placeholder="Share your experience..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                            />
                          </div>
                          <Button
                            onClick={() => handleRateSession(session.id)}
                            disabled={rating === 0}
                            className="w-full"
                          >
                            Submit Rating
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">Rated {session.rating}/5</span>
                    </div>
                  )}
                  <Button variant="outline" size="sm">
                    Book Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SessionHistoryPage