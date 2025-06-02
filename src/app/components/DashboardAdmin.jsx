"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar"
import { BarChart3, Users, BookOpen, DollarSign, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react"

const DashboardAdmin = () => {
  const [tutorRequests, setTutorRequests] = useState([
    {
      id: 1,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      subjects: ["Mathematics", "Statistics"],
      experience: "8 years",
      qualifications: "PhD in Mathematics",
      status: "pending",
    },
    {
      id: 2,
      name: "Prof. James Wilson",
      email: "james.wilson@email.com",
      subjects: ["Physics", "Engineering"],
      experience: "12 years",
      qualifications: "PhD in Physics",
      status: "pending",
    },
  ])

  const handleTutorRequest = (requestId, action) => {
    setTutorRequests((prev) => prev.filter((req) => req.id !== requestId))
    console.log(`${action} tutor request ${requestId}`)
  }

  const platformStats = {
    totalUsers: 2847,
    totalTutors: 342,
    totalStudents: 2505,
    totalSessions: 15678,
    monthlyRevenue: 45230,
    averageRating: 4.7,
  }

  const recentActivity = [
    { type: "user", message: "New student registered: Alice Johnson", time: "5 minutes ago" },
    { type: "session", message: "Session completed: Math tutoring", time: "15 minutes ago" },
    { type: "payment", message: "Payment processed: $50.00", time: "1 hour ago" },
    { type: "tutor", message: "New tutor application: Dr. Smith", time: "2 hours ago" },
  ]

  const topModules = [
    { name: "Mathematics", sessions: 3245, growth: "+12%" },
    { name: "Physics", sessions: 2156, growth: "+8%" },
    { name: "Chemistry", sessions: 1876, growth: "+15%" },
    { name: "Biology", sessions: 1543, growth: "+5%" },
    { name: "Computer Science", sessions: 1234, growth: "+22%" },
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage the TutorConnect platform</p>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tutors</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.totalTutors}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Students</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.totalStudents.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.totalSessions.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${platformStats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{platformStats.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tutor Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tutor Applications</span>
              <Badge variant="secondary">{tutorRequests.length} pending</Badge>
            </CardTitle>
            <CardDescription>Review and approve new tutor applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tutorRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {request.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{request.name}</h4>
                        <p className="text-sm text-gray-600">{request.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm">
                      <strong>Subjects:</strong> {request.subjects.join(", ")}
                    </p>
                    <p className="text-sm">
                      <strong>Experience:</strong> {request.experience}
                    </p>
                    <p className="text-sm">
                      <strong>Qualifications:</strong> {request.qualifications}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleTutorRequest(request.id, "approve")}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTutorRequest(request.id, "reject")}
                      className="flex items-center"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
              {tutorRequests.length === 0 && <p className="text-center text-gray-500 py-8">No pending applications</p>}
            </div>
          </CardContent>
        </Card>

        {/* Top Modules */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Modules</CardTitle>
            <CardDescription>Most requested subjects and their growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topModules.map((module, index) => (
                <div key={module.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{module.name}</p>
                      <p className="text-sm text-gray-600">{module.sessions} sessions</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-green-600">
                    {module.growth}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "user"
                        ? "bg-blue-500"
                        : activity.type === "session"
                          ? "bg-green-500"
                          : activity.type === "payment"
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardAdmin