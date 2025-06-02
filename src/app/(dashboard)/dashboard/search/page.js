"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Search, Star, MapPin, Clock, DollarSign } from "lucide-react"

const FindTutorsPage = () => {
  const [searchFilters, setSearchFilters] = useState({
    subject: "",
    level: "",
    priceRange: "",
    availability: "",
  })

  const [tutors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subjects: ["Mathematics", "Statistics"],
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 45,
      experience: "8 years",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "PhD in Mathematics with extensive experience in calculus, algebra, and statistics.",
      availability: "Weekdays 2-8 PM",
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subjects: ["Physics", "Engineering"],
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: 55,
      experience: "12 years",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Professor of Physics specializing in quantum mechanics and thermodynamics.",
      availability: "Evenings & Weekends",
      languages: ["English", "Mandarin"],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      subjects: ["Chemistry", "Biology"],
      rating: 4.7,
      reviewCount: 156,
      hourlyRate: 40,
      experience: "6 years",
      location: "Austin, TX",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Biochemistry expert with passion for organic chemistry and molecular biology.",
      availability: "Flexible schedule",
      languages: ["English", "Spanish"],
    },
    {
      id: 4,
      name: "James Wilson",
      subjects: ["Computer Science", "Programming"],
      rating: 4.9,
      reviewCount: 203,
      hourlyRate: 60,
      experience: "10 years",
      location: "Seattle, WA",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Software engineer and CS educator specializing in Python, JavaScript, and algorithms.",
      availability: "Weekends",
      languages: ["English"],
    },
  ])

  const handleSearch = () => {
    console.log("Searching with filters:", searchFilters)
    // Implement search logic here
  }

  const handleBookTutor = (tutorId) => {
    console.log("Booking tutor:", tutorId)
    // Navigate to booking page or open booking modal
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Tutors</h1>
        <p className="text-gray-600">Search for qualified tutors based on your needs</p>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl">
            <Search className="h-5 w-5 mr-2" />
            Search Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics, Physics..."
                value={searchFilters.subject}
                onChange={(e) => setSearchFilters((prev) => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={searchFilters.level}
                onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, level: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="priceRange">Price Range</Label>
              <Select
                value={searchFilters.priceRange}
                onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, priceRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-30">$0 - $30/hour</SelectItem>
                  <SelectItem value="30-50">$30 - $50/hour</SelectItem>
                  <SelectItem value="50-80">$50 - $80/hour</SelectItem>
                  <SelectItem value="80+">$80+/hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="availability">Availability</Label>
              <Select
                value={searchFilters.availability}
                onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, availability: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} className="mt-4">
            Search Tutors
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Available Tutors ({tutors.length})</h2>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {tutors.map((tutor) => (
          <Card key={tutor.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                    <AvatarFallback>
                      {tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{tutor.rating}</span>
                        <span className="text-gray-500 ml-1">({tutor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {tutor.location}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{tutor.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tutor.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-64 space-y-4">
                  <div className="text-center lg:text-right">
                    <div className="flex items-center justify-center lg:justify-end">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">{tutor.hourlyRate}</span>
                      <span className="text-gray-600">/hour</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{tutor.availability}</span>
                    </div>
                    <div>
                      <span className="font-medium">Experience: </span>
                      {tutor.experience}
                    </div>
                    <div>
                      <span className="font-medium">Languages: </span>
                      {tutor.languages.join(", ")}
                    </div>
                  </div>

                  <Button onClick={() => handleBookTutor(tutor.id)} className="w-full">
                    Book Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FindTutorsPage