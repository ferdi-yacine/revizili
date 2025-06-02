"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Badge } from "@/app/components/ui/badge"
import { Progress } from "@/app/components/ui/progress"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Upload, Video, BookOpen, User, FileText, CheckCircle, X } from "lucide-react"

const BecomeTutorPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    qualifications: "",
    experience: "",
    bio: "",
    hourlyRate: "",

    // Modules
    selectedModules: [],

    // Documents
    resume: null ,
    certificates: [],

    // Video Evidence
    videoFile: null,
    videoDescription: "",

    // Additional Info
    languages: [],
    availability: [],
    termsAccepted: false,
  })

  const availableModules = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Statistics",
    "Calculus",
    "Algebra",
    "Geometry",
    "English Literature",
    "History",
    "Economics",
    "Psychology",
    "Philosophy",
    "Foreign Languages",
  ]

  const availableLanguages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Mandarin",
    "Japanese",
    "Korean",
    "Arabic",
  ]

  const availabilityOptions = [
    "Weekday Mornings",
    "Weekday Afternoons",
    "Weekday Evenings",
    "Weekend Mornings",
    "Weekend Afternoons",
    "Weekend Evenings",
    "Flexible Schedule",
  ]

  const handleModuleToggle = (module) => {
    setFormData((prev) => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(module)
        ? prev.selectedModules.filter((m) => m !== module)
        : [...prev.selectedModules, module],
    }))
  }

  const handleLanguageToggle = (language) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const handleAvailabilityToggle = (option) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter((a) => a !== option)
        : [...prev.availability, option],
    }))
  }

  const handleFileUpload = (file, type) => {
    if (type === "resume") {
      setFormData((prev) => ({ ...prev, resume: file }))
    } else if (type === "certificate") {
      setFormData((prev) => ({ ...prev, certificates: [...prev.certificates, file] }))
    } else if (type === "video") {
      setFormData((prev) => ({ ...prev, videoFile: file }))
    }
  }

  const removeFile = (type, index) => {
    if (type === "resume") {
      setFormData((prev) => ({ ...prev, resume: null }))
    } else if (type === "video") {
      setFormData((prev) => ({ ...prev, videoFile: null }))
    } else if (type === "certificate" && index !== undefined) {
      setFormData((prev) => ({
        ...prev,
        certificates: prev.certificates.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = () => {
    console.log("Submitting tutor application:", formData)
    // Implement submission logic
    alert("Application submitted successfully! We'll review it and get back to you within 3-5 business days.")
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.qualifications && formData.experience && formData.bio && formData.hourlyRate
      case 2:
        return formData.selectedModules.length > 0
      case 3:
        return formData.resume && formData.videoFile && formData.videoDescription
      case 4:
        return formData.languages.length > 0 && formData.availability.length > 0 && formData.termsAccepted
      default:
        return false
    }
  }

  const progress = (currentStep / 4) * 100

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Tutor</h1>
        <p className="text-gray-600">Join our community of expert tutors and start teaching students worldwide</p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Application Progress</span>
            <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
          </div>
          <Progress value={progress} className="mb-4" />
          <div className="flex justify-between text-sm">
            <span className={currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>Personal Info</span>
            <span className={currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>Modules</span>
            <span className={currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}>Documents</span>
            <span className={currentStep >= 4 ? "text-blue-600 font-medium" : "text-gray-500"}>Final Details</span>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
            <CardDescription>Tell us about your background and teaching experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="qualifications">Qualifications</Label>
              <Input
                id="qualifications"
                placeholder="e.g., PhD in Mathematics, Master's in Physics..."
                value={formData.qualifications}
                onChange={(e) => setFormData((prev) => ({ ...prev, qualifications: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="experience">Years of Teaching Experience</Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-3">2-3 years</SelectItem>
                  <SelectItem value="4-5">4-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell students about yourself, your teaching style, and what makes you a great tutor..."
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
              <Input
                id="hourlyRate"
                type="number"
                placeholder="45"
                value={formData.hourlyRate}
                onChange={(e) => setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
              />
              <p className="text-sm text-gray-500 mt-1">You can adjust this later for different modules</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Modules Selection */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Teaching Modules
            </CardTitle>
            <CardDescription>Select the subjects you want to teach (you can add more later)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableModules.map((module) => (
                <div
                  key={module}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.selectedModules.includes(module)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleModuleToggle(module)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.selectedModules.includes(module)}
                      onChange={() => handleModuleToggle(module)}
                    />
                    <span className="text-sm font-medium">{module}</span>
                  </div>
                </div>
              ))}
            </div>

            {formData.selectedModules.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">Selected Modules ({formData.selectedModules.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedModules.map((module) => (
                    <Badge key={module} variant="secondary" className="flex items-center gap-1">
                      {module}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleModuleToggle(module)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Documents and Video */}
      {currentStep === 3 && (
        <div className="space-y-6">
          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Resume/CV
              </CardTitle>
              <CardDescription>Upload your resume or curriculum vitae</CardDescription>
            </CardHeader>
            <CardContent>
              {!formData.resume ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload your resume</p>
                  <p className="text-sm text-gray-500">PDF, DOC, or DOCX (max 10MB)</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "resume")}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById("resume-upload")?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{formData.resume.name}</p>
                      <p className="text-sm text-gray-500">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile("resume")}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Video Evidence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Teaching Video
              </CardTitle>
              <CardDescription>
                Record a 3-5 minute video explaining one of your selected modules. This helps us assess your teaching
                ability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!formData.videoFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload your teaching video</p>
                  <p className="text-sm text-gray-500">MP4, MOV, or AVI (max 100MB)</p>
                  <input
                    type="file"
                    accept=".mp4,.mov,.avi"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "video")}
                    className="hidden"
                    id="video-upload"
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById("video-upload")?.click()}
                  >
                    Choose Video
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Video className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{formData.videoFile.name}</p>
                      <p className="text-sm text-gray-500">{(formData.videoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFile("video")}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div>
                <Label htmlFor="videoDescription">Video Description</Label>
                <Textarea
                  id="videoDescription"
                  placeholder="Briefly describe what you covered in your teaching video..."
                  value={formData.videoDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, videoDescription: e.target.value }))}
                />
              </div>

              <Alert>
                <Video className="h-4 w-4" />
                <AlertDescription>
                  <strong>Video Tips:</strong> Introduce yourself, explain a concept from one of your selected modules,
                  and demonstrate your teaching style. Keep it engaging and clear!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Final Details */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Final Details
            </CardTitle>
            <CardDescription>Complete your application with additional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Languages */}
            <div>
              <Label>Languages You Speak</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {availableLanguages.map((language) => (
                  <div
                    key={language}
                    className={`p-2 border rounded cursor-pointer transition-colors ${
                      formData.languages.includes(language)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleLanguageToggle(language)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.languages.includes(language)}
                        onChange={() => handleLanguageToggle(language)}
                      />
                      <span className="text-sm">{language}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <Label>Preferred Teaching Times</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {availabilityOptions.map((option) => (
                  <div
                    key={option}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      formData.availability.includes(option)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleAvailabilityToggle(option)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.availability.includes(option)}
                        onChange={() => handleAvailabilityToggle(option)}
                      />
                      <span className="text-sm">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, termsAccepted: !!checked }))}
              />
              <div className="text-sm">
                <p>
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
                <p className="text-gray-500 mt-1">
                  I understand that my application will be reviewed and I may be contacted for additional information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button onClick={nextStep} disabled={!isStepValid()}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!isStepValid()} className="bg-green-600 hover:bg-green-700">
            Submit Application
          </Button>
        )}
      </div>
    </div>
  )
}

export default BecomeTutorPage
