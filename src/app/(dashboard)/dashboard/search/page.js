"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Search, Star, MapPin, Clock } from "lucide-react"
import { BookingModal } from "@/app/components/BookSession"
import { useSession } from "next-auth/react"

const FindTutorsPage = () => {
  const { data: session } = useSession();
  const [modules, setModules] = useState([])
  const [loadingModules, setLoadingModules] = useState(true)
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedModule, setSelectedModule] = useState('')

  const [searchFilters, setSearchFilters] = useState({
    module: "",
    level: "",
  })

  const [tutors, setTutors] = useState([])

  const yearOptions = [
    { id: 'preparatoryYear1', label: '1st year', displayName: '1st Preparatory Year' },
    { id: 'preparatoryYear2', label: '2nd year', displayName: '2nd Preparatory Year' },
    { id: 'secondCycleYear1', label: '3rd year', displayName: '1st Year Second Cycle' },
    { id: 'secondCycleYear2', label: '4th year', displayName: '2nd Year Second Cycle' },
    { id: 'secondCycleYear3', label: '5th year', displayName: '3rd Year Second Cycle' },
  ]

  const specialtyOptions = {
    secondCycleYear2: [
      { id: 'financialMarket', name: 'Financial Market' },
      { id: 'accountingAudit', name: 'Accounting Audit' },
      { id: 'corporateFinance', name: 'Corporate Finance' },
      { id: 'banksInsurance', name: 'Banks & Insurance' }
    ],
    secondCycleYear3: [
      { id: 'financialMarket', name: 'Financial Market' },
      { id: 'accountingAudit', name: 'Accounting Audit' },
      { id: 'corporateFinance', name: 'Corporate Finance' },
      { id: 'banksInsurance', name: 'Banks & Insurance' }
    ]
  }

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoadingModules(true)
        const response = await fetch('/api/module')
        const data = await response.json()
        setModules(data.modules)
      } catch (error) {
        console.error('Error fetching modules:', error)
      } finally {
        setLoadingModules(false)
      }
    }

    fetchModules()
  }, [])

  const getFilteredModules = () => {
    if (loadingModules || !modules.length) return []

    let filtered = modules
    if (selectedYear) {
      filtered = filtered.filter(module => module.academicLevel === selectedYear)
    }
    if (selectedSpecialty) {
      filtered = filtered.filter(module => module.specialty === selectedSpecialty)
    }
    return filtered
  }

  const handleYearChange = (yearId) => {
    setSelectedYear(yearId)
    setSelectedSpecialty('')
    setSelectedModule('')
  }

  const handleSpecialtyChange = (specialtyId) => {
    setSelectedSpecialty(specialtyId)
    setSelectedModule('')
  }

  const handleModuleChange = (moduleId) => {
    setSelectedModule(moduleId)
    setSearchFilters(prev => ({
      ...prev,
      module: moduleId
    }))
  }

  const handleSearch = async () => {
    if (!selectedModule) {
      alert("Please select a module first");
      return;
    }

    try {
      const response = await fetch(`/api/tutor/search?moduleId=${selectedModule}&level=${searchFilters.level}`);
      const data = await response.json();

      if (response.ok) {
        setTutors(data.tutors);
      } else {
        console.error('Error searching tutors:', data.error);
        alert('Failed to search tutors');
      }
    } catch (error) {
      console.error('Error searching tutors:', error);
      alert('Failed to search tutors');
    }
  };

  const handleBookSession = async (bookingData) => {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: session?.user.id,
          tutorId: bookingData.tutorId,
          moduleId: bookingData.moduleId,
          date: bookingData.date,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          meetingLink: bookingData.meetingLink,
          notes: bookingData.notes
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book session')
      }

      alert('Session booked successfully!')
      // Optionally refresh data or redirect
    } catch (error) {
      console.error('Error booking session:', error)
      alert(error.message || 'Failed to book session')
    }
  }


  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Tutors</h1>
        <p className="text-gray-600">Search for qualified tutors based on your needs</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-3xl">
            <Search className="h-5 w-5 mr-2" />
            Search Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Academic Year</Label>
              <Select
                value={selectedYear}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(selectedYear === 'secondCycleYear2' || selectedYear === 'secondCycleYear3') && (
              <div className="flex flex-col gap-2">
                <Label>Specialty</Label>
                <Select
                  value={selectedSpecialty}
                  onValueChange={handleSpecialtyChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialtyOptions[selectedYear].map((specialty) => (
                      <SelectItem key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Label>Module</Label>
              <Select
                value={selectedModule}
                onValueChange={handleModuleChange}
                disabled={!selectedYear || (['secondCycleYear2', 'secondCycleYear3'].includes(selectedYear) && !selectedSpecialty)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingModules ? "Loading..." : "Select module"} />
                </SelectTrigger>
                <SelectContent>
                  {getFilteredModules().map((module) => (
                    <SelectItem key={module._id} value={module._id}>
                      {module.name} ({module.sign})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Level Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={searchFilters.level}
                onValueChange={(value) => setSearchFilters(prev => ({ ...prev, level: value }))}
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
          </div>

          <Button onClick={handleSearch} className="mt-4" disabled={!selectedModule}>
            Search Tutors
          </Button>
        </CardContent>
      </Card>

      {/* Results - remains the same */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Available Tutors ({tutors.length})</h2>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Sort by Rating</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {tutors.map((tutor) => (
          <Card key={tutor.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={tutor?.avatar || "/placeholder.svg"} alt={tutor?.firstName} />
                    <AvatarFallback>
                      {tutor?.firstName}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tutor?.firstName}</h3>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{tutor?.rating}</span>
                        <span className="text-gray-500 ml-1">({tutor?.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        Constantine
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{tutor?.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tutor?.modules.map((module) => (
                        <Badge key={module} variant="secondary">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:w-64 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{tutor?.availability}</span>
                    </div>
                    <div>
                      <span className="font-medium">Experience: </span>
                      {tutor?.experience}
                    </div>
                    <div>
                      <span className="font-medium">Languages: </span>
                      {tutor?.languages.join(", ")}
                    </div>
                  </div>

                  {/* <Button onClick={() => handleBookTutor(tutor.id)} className="w-full">
                    Book Session
                  </Button> */}
                  <BookingModal
                    tutor={tutor}
                    module={{ id: selectedModule, name: modules.find(m => m._id === selectedModule)?.name }}
                    onBookSession={handleBookSession}
                  />
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