"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
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
import { CheckCircle, XCircle, Clock, MessageCircle, Calendar } from "lucide-react"

const TutorRequestsPage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      student: {
        name: "Alice Johnson",
        email: "alice.johnson@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Beginner",
      },
      subject: "Mathematics",
      preferredSchedule: "Weekday evenings (6-8 PM)",
      message:
        "I need help with calculus and algebra. I'm struggling with derivatives and would like to improve my understanding before my upcoming exam.",
      requestDate: "2024-01-12",
      urgency: "medium",
      sessionType: "Regular tutoring",
      budget: "$40-50/hour",
      status: "pending",
    },
    {
      id: 2,
      student: {
        name: "Bob Smith",
        email: "bob.smith@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Advanced",
      },
      subject: "Statistics",
      preferredSchedule: "Weekend mornings (9-11 AM)",
      message:
        "Preparing for university entrance exam. Need intensive help with statistical analysis and probability theory.",
      requestDate: "2024-01-11",
      urgency: "high",
      sessionType: "Exam preparation",
      budget: "$50-60/hour",
      status: "pending",
    },
    {
      id: 3,
      student: {
        name: "Carol Davis",
        email: "carol.davis@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Intermediate",
      },
      subject: "Calculus",
      preferredSchedule: "Flexible",
      message:
        "Looking for ongoing support with integral calculus. I understand the basics but need help with more complex problems.",
      requestDate: "2024-01-10",
      urgency: "low",
      sessionType: "Regular tutoring",
      budget: "$45-55/hour",
      status: "pending",
    },
  ])

  const [acceptedRequests] = useState([
    {
      id: 4,
      student: {
        name: "David Wilson",
        email: "david.wilson@email.com",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Intermediate",
      },
      subject: "Mathematics",
      acceptedDate: "2024-01-09",
      nextSession: "2024-01-15 at 3:00 PM",
      status: "accepted",
    },
  ])

  const [selectedRequest, setSelectedRequest] = useState(null)
  const [responseMessage, setResponseMessage] = useState("")

  const handleAcceptRequest = (requestId, message) => {
    console.log("Accepting request:", requestId, "Message:", message)
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
    setSelectedRequest(null)
    setResponseMessage("")
  }

  const handleRejectRequest = (requestId, message) => {
    console.log("Rejecting request:", requestId, "Message:", message)
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
    setSelectedRequest(null)
    setResponseMessage("")
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Requests</h1>
        <p className="text-gray-600">Manage incoming tutoring requests from students</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Requests ({requests.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {requests.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-600">New student requests will appear here</p>
              </CardContent>
            </Card>
          ) : (
            requests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={request.student.avatar || "/placeholder.svg"}
                              alt={request.student.name}
                            />
                            <AvatarFallback>
                              {request.student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{request.student.name}</h3>
                            <p className="text-gray-600">{request.student.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{request.student.level}</Badge>
                              <Badge className={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Requested</p>
                          <p className="text-sm font-medium">{request.requestDate}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Subject: {request.subject}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Preferred Schedule:</span>
                            <p className="text-gray-600">{request.preferredSchedule}</p>
                          </div>
                          <div>
                            <span className="font-medium">Session Type:</span>
                            <p className="text-gray-600">{request.sessionType}</p>
                          </div>
                          <div>
                            <span className="font-medium">Budget:</span>
                            <p className="text-gray-600">{request.budget}</p>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Message:</span>
                          <p className="text-gray-700 mt-1">{request.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-48 space-y-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full flex items-center" onClick={() => setSelectedRequest(request)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Accept Request</DialogTitle>
                            <DialogDescription>Accept tutoring request from {request.student.name}</DialogDescription>
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
                                onClick={() => handleAcceptRequest(request.id, responseMessage)}
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
                            className="w-full flex items-center"
                            onClick={() => setSelectedRequest(request)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Decline Request</DialogTitle>
                            <DialogDescription>Decline tutoring request from {request.student.name}</DialogDescription>
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
                                onClick={() => handleRejectRequest(request.id, responseMessage)}
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

                      <Button variant="ghost" size="sm" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Student
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-6">
          {acceptedRequests.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No accepted requests</h3>
                <p className="text-gray-600">Accepted requests will appear here</p>
              </CardContent>
            </Card>
          ) : (
            acceptedRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={request.student.avatar || "/placeholder.svg"} alt={request.student.name} />
                        <AvatarFallback>
                          {request.student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{request.student.name}</h3>
                        <p className="text-gray-600">{request.subject}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Next: {request.nextSession}
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Accepted
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
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

export default TutorRequestsPage