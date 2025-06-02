"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { BookOpen, Calendar, DollarSign, Star, Users, CheckCircle, XCircle } from "lucide-react"

const DashboardTutor = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      student: "Alice Johnson",
      subject: "Mathematics",
      level: "Intermediate",
      preferredTime: "Weekday evenings",
      message: "I need help with calculus and algebra",
      status: "pending",
    },
    {
      id: 2,
      student: "Bob Smith",
      subject: "Physics",
      level: "Advanced",
      preferredTime: "Weekend mornings",
      message: "Preparing for university entrance exam",
      status: "pending",
    },
  ])

  const upcomingSessions = [
    {
      id: 1,
      student: "Emma Wilson",
      subject: "Mathematics",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "1 hour",
    },
    {
      id: 2,
      student: "David Brown",
      subject: "Physics",
      date: "2024-01-16",
      time: "4:00 PM",
      duration: "1.5 hours",
    },
  ]

  const handleRequestAction = (requestId, action) => {
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
    console.log(`${action} request ${requestId}`)
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
              <DollarSign className="h-8 w-8 text-green-600" />
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
              <Badge variant="secondary">{requests.length}</Badge>
            </CardTitle>
            <CardDescription>Students requesting tutoring sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{request.student}</h4>
                      <p className="text-sm text-gray-600">
                        {request.subject} - {request.level}
                      </p>
                    </div>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{request.message}</p>
                  <p className="text-sm text-gray-500 mb-3">Preferred: {request.preferredTime}</p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleRequestAction(request.id, "accept")}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRequestAction(request.id, "reject")}
                      className="flex items-center"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
              {requests.length === 0 && <p className="text-center text-gray-500 py-8">No new requests</p>}
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
                <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {session.student
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{session.student}</h4>
                      <p className="text-sm text-gray-600">{session.subject}</p>
                      <p className="text-sm text-gray-500">
                        {session.date} at {session.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{session.duration}</Badge>
                </div>
              ))}
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