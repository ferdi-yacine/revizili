"use client"

import { useEffect, useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
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
import { BookOpen, Calendar, DollarSign, Star, Users, CheckCircle, XCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { useSession } from "next-auth/react"


const DashboardTutor = () => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useState([])
  const [upcomingSessions, setUpcomingSessions] = useState([])
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [responseMessage, setResponseMessage] = useState("")

  useEffect(() => {
    const fetchSessions = async () => {
      if (!session?.user?.id) return

      try {
        setIsLoading(true)
        const response = await fetch(`/api/session?userId=${session.user.id}&role=tutor`)
        const data = await response.json()

        if (response.ok) {
          const today = new Date()
          const upcoming = data.sessions.filter(session =>
            new Date(session.date) >= new Date(today) &&
            session.status === 'accepted'
          )

          setSessions(data.sessions)
          setUpcomingSessions(upcoming)
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

  const pendingRequests = sessions.filter(session => session.status === 'scheduled')

  const handleAcceptRequest = async (sessionId, message) => {
    try {
      const response = await fetch(`/api/session/${sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'accepted',
          responseMessage: message
        })
      })

      if (response.ok) {
        setSessions(prev => prev.map(s =>
          s._id === sessionId ? { ...s, status: 'accepted' } : s
        ))
        setSelectedRequest(null)
        setResponseMessage("")
      } else {
        console.error('Error accepting session')
      }
    } catch (error) {
      console.error('Error accepting session:', error)
    }
  }

  const handleRejectRequest = async (sessionId, message) => {
    try {
      const response = await fetch(`/api/session/${sessionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'cancelled',
          responseMessage: message
        })
      })

      if (response.ok) {
        setSessions(prev => prev.filter(s => s._id !== sessionId))
        setSelectedRequest(null)
        setResponseMessage("")
      } else {
        console.error('Error rejecting session')
      }
    } catch (error) {
      console.error('Error rejecting session:', error)
    }
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Tutor!</h1>
        <p className="text-gray-600">Manage your tutoring sessions and students</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sessions This Month</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <img src="/dzd.png" alt="Dinar Algerien" className="h-9 w-9 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Earnings</p>
                <p className="text-2xl font-bold text-gray-900">$2,340</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tutoring Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>New Requests</span>
              <Badge variant="secondary">{pendingRequests?.length}</Badge>
            </CardTitle>
            <CardDescription>Students requesting tutoring sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request?.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{request.studentId?.firstName} {request.studentId?.firstName}</h4>
                      <p className="text-sm text-gray-600">
                        {request.subject} - Beginner
                      </p>
                    </div>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{request.notes}</p>
                  <p className="text-sm text-gray-500 mb-3">Preferred: {new Date(request.date).toLocaleDateString()} at {request.startTime} to {request.startTime}</p>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center" onClick={() => setSelectedRequest(request)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Accept Request</DialogTitle>
                          <DialogDescription>
                            Accept tutoring request from {request.studentId?.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="acceptMessage">Message to Student (Optional)</Label>
                            <Textarea
                              id="acceptMessage"
                              placeholder="Hi! I'd be happy to help you with..."
                              value={responseMessage}
                              onChange={(e) => setResponseMessage(e.target.value)}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleAcceptRequest(request._id, responseMessage)}
                              className="flex-1"
                            >
                              Accept Request
                            </Button>
                            <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex items-center"
                          onClick={() => setSelectedRequest(request)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Decline Request</DialogTitle>
                          <DialogDescription>
                            Decline tutoring request from {request.studentId?.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="rejectMessage">Reason (Optional)</Label>
                            <Textarea
                              id="rejectMessage"
                              placeholder="Thank you for your interest, however..."
                              value={responseMessage}
                              onChange={(e) => setResponseMessage(e.target.value)}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="destructive"
                              onClick={() => handleRejectRequest(request._id, responseMessage)}
                              className="flex-1"
                            >
                              Decline Request
                            </Button>
                            <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && <p className="text-center text-gray-500 py-8">No new requests</p>}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled tutoring sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {session?.studentId?.firstName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{session?.studentId?.firstName} {session?.studentId?.lastName}</h4>
                      <p className="text-sm text-gray-600">{session?.moduleId?.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(session?.date).toLocaleDateString()} at {session?.startTime} - {session?.endTime}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{calculateDuration(session?.startTime, session?.endTime)}</Badge>
                </div>
              ))}
              {upcomingSessions.length === 0 && (
                <p className="text-center text-gray-500 py-8">No upcoming sessions</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Teaching Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Your Teaching Modules</CardTitle>
            <CardDescription>Subjects you're qualified to teach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {["Mathematics", "Physics", "Chemistry", "Biology"].map((module) => (
                <div key={module} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">{module}</span>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Modules
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest tutoring activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">Completed session with Emma Wilson</p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">Received 5-star rating from David Brown</p>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm">New request from Alice Johnson</p>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardTutor