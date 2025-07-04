"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { BookOpen, Calendar, Clock, Star, Search } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { useSession } from "next-auth/react"
import { addDays } from "date-fns"

const DashboardStudent = () => {
  const { data: session } = useSession()
  const [searchModule, setSearchModule] = useState("")
  const [searchLevel, setSearchLevel] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [upcomingSessions, setUpcomingSessions] = useState([])

  useEffect(() => {
    const fetchSessions = async () => {
      if (!session?.user?.id) return

      try {
        setIsLoading(true)
        const today = new Date()
        const nextWeek = addDays(today, 7)

        const response = await fetch(
          `/api/session?userId=${session.user.id}&role=student&startDate=${today.toISOString()}&endDate=${nextWeek.toISOString()}&status=accepted`
        )
        const data = await response.json()

        if (response.ok) {
          setUpcomingSessions(data.sessions)
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


  // const upcomingSessions = [
  //   {
  //     id: 1,
  //     tutor: "Dr. Sarah Johnson",
  //     subject: "Mathematics",
  //     date: "2024-01-15",
  //     time: "2:00 PM",
  //     duration: "1 hour",
  //   },
  //   {
  //     id: 2,
  //     tutor: "Prof. Michael Chen",
  //     subject: "Physics",
  //     date: "2024-01-16",
  //     time: "4:00 PM",
  //     duration: "1.5 hours",
  //   },
  // ]

  const recentTutors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      rating: 4.9,
      sessions: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subject: "Physics",
      rating: 4.8,
      sessions: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleSearch = () => {
    console.log("Searching for:", { module: searchModule, level: searchLevel })
    // Navigate to search results
  }

  const calculateDuration = (startTime, endTime) => {
    return `${endTime.split(':')[0] - startTime.split(':')[0]} hours`;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Student!</h1>
        <p className="text-gray-600">Find tutors and manage your learning journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
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
                <p className="text-2xl font-bold text-gray-900">4.7</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900">36</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Become a Tutor CTA */}
      <Card className="mb-8 bg-gradient-to-r from-orange-50 to-orange-10 border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Share Your Knowledge?</h3>
              <p className="text-gray-600 mb-4">
                Join our community of expert tutors and start earning by teaching what you love.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Set your own rates and schedule</li>
                <li>• Teach students from around the world</li>
                <li>• Build your reputation and grow your income</li>
              </ul>
            </div>
            <div className="text-center">
              <Link href="/dashboard/become-tutor">
                <Button size="lg" className="bg-secondary-dark-orange hover:bg-secondary-medium-orange">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Become a Tutor
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Find Tutors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Find a Tutor
            </CardTitle>
            <CardDescription>Search for tutors by subject and level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="module">Subject/Module</Label>
              <Input
                id="module"
                placeholder="e.g., Mathematics, Physics, Chemistry..."
                value={searchModule}
                onChange={(e) => setSearchModule(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="level">Level</Label>
              <Select value={searchLevel} onValueChange={setSearchLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} className="w-full">
              Search Tutors
            </Button>
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
                  <div>
                    <h4 className="font-medium">{session?.moduleId?.name}</h4>
                    <p className="text-sm text-gray-600">with {session?.tutorId?.firstName} {session?.tutorId?.lastName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(session?.date).toLocaleDateString()} at {session?.startTime} - {session?.endTime}
                    </p>
                  </div>
                  <Badge variant="outline">{calculateDuration(session?.startTime, session?.endTime)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tutors */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Tutors</CardTitle>
            <CardDescription>Tutors you've worked with recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentTutors.map((tutor) => (
                <div key={tutor.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                    <AvatarFallback>
                      {tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{tutor.name}</h4>
                    <p className="text-sm text-gray-600">{tutor.subject}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">{tutor.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{tutor.sessions} sessions</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Book Again
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardStudent