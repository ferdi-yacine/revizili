"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
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
import { CheckCircle, XCircle, Clock, MessageCircle, Loader2, Calendar } from "lucide-react"

const TutorRequestsPage = () => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useState([])
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
          setSessions(data.sessions)
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
  const acceptedRequests = sessions.filter(session => session.status === 'accepted')

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Requests</h1>
        <p className="text-gray-600">Manage incoming tutoring requests from students</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Requests ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending requests</h3>
                <p className="text-gray-600">New student requests will appear here</p>
              </CardContent>
            </Card>
          ) : (
            pendingRequests.map((request) => (
              <Card key={request._id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={request.studentId?.avatar || "/placeholder.svg"}
                              alt={request.studentId?.firstName}
                            />
                            <AvatarFallback>
                              {request.studentId?.firstName
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold">{request.studentId?.firstName} {request.studentId?.lastName}</h3>
                            <p className="text-gray-600">{request.studentId?.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">Beginner</Badge>
                              <Badge className="bg-yellow-100 text-yellow-800">medium priority</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Requested</p>
                          <p className="text-sm font-medium">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Subject: {request.moduleId?.name}</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Preferred Schedule:</span>
                            <p className="text-gray-600">
                              {new Date(request.date).toLocaleDateString()} at {request?.startTime} to {request?.endTime}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Session Type:</span>
                            <p className="text-gray-600">Regular tutoring</p>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Message:</span>
                          <p className="text-gray-700 mt-1">{request.notes || "No additional message"}</p>
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
              <Card key={request._id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={request.studentId?.avatar || "/placeholder.svg"} 
                          alt={request.studentId?.firstName} 
                        />
                        <AvatarFallback>
                          {request.studentId?.firstName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{request.studentId?.firstName} {request.studentId?.lastName}</h3>
                        <p className="text-gray-600">{request.moduleId?.name}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(request.date).toLocaleDateString()} at {request.startTime} to {request.endTime}
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Accepted
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Reschedule
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