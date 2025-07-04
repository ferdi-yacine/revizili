"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Input } from "@/app/components/ui/input"
import { Calendar, Clock, MessageCircle, Search, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

const SessionHistoryPage = () => {
  const { data: session } = useSession()
  const [searchTerm, setSearchTerm] = useState("")
  const [sessionHistory, setSessionHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSessionHistory = async () => {
      if (!session?.user?.id) return

      try {
        setIsLoading(true)
        const response = await fetch(`/api/session?userId=${session.user.id}&role=student&status=completed`)
        const data = await response.json()

        if (response.ok) {
          setSessionHistory(data.sessions)
        } else {
          console.error('Error fetching session history:', data.error)
        }
      } catch (error) {
        console.error('Error fetching session history:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSessionHistory()
  }, [session])

  const filteredSessions = sessionHistory.filter((session) => {
    return (
      session.tutorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.moduleId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Session History</h1>
        <p className="text-gray-600">Review your completed tutoring sessions</p>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by tutor name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Session List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <Card key={session._id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.tutorId?.avatar || "/placeholder.svg"} alt={session.tutorId?.name} />
                    <AvatarFallback>
                      {session.tutorId?.firstName?.[0]}{session.tutorId?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{session.moduleId?.name}</h3>
                    <p className="text-gray-600 mb-2">with {session.tutorId?.firstName} {session.tutorId?.lastName}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {session.startTime} - {session.endTime}
                      </div>
                      <Badge variant="outline">
                        {calculateDuration(session.startTime, session.endTime)}
                      </Badge>
                    </div>
                    {session.notes && (
                      <p className="text-sm text-gray-700">
                        <MessageCircle className="h-4 w-4 inline mr-1" />
                        {session.notes}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    Book Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSessions.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search' : 'You have no completed sessions yet'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SessionHistoryPage