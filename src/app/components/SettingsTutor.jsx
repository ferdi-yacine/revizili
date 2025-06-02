"use client"

import { useState } from "react"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Switch } from "@/app/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { User, Bell, CreditCard, Shield, Camera, Clock } from "lucide-react"

const TutorSettingsPage = () => {
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bio: "PhD in Mathematics with extensive experience in calculus, algebra, and statistics.",
    timezone: "America/New_York",
    language: "English",
    qualifications: "PhD in Mathematics, Stanford University",
    experience: "8 years",
  })

  const [notifications, setNotifications] = useState({
    emailRequests: true,
    emailBookings: true,
    emailReminders: true,
    emailPayments: true,
    emailPromotions: false,
    pushRequests: true,
    pushBookings: true,
    pushReminders: true,
    smsReminders: false,
  })

  const [availability, setAvailability] = useState({
    monday: ["morning", "afternoon"],
    tuesday: ["morning", "afternoon", "evening"],
    wednesday: ["morning", "afternoon"],
    thursday: ["afternoon", "evening"],
    friday: ["morning", "afternoon"],
    saturday: ["morning"],
    sunday: [],
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileUpdate = () => {
    console.log("Updating profile:", profile)
    // Implement profile update logic
  }

  const handleNotificationUpdate = () => {
    console.log("Updating notifications:", notifications)
    // Implement notification update logic
  }

  const handleAvailabilityUpdate = () => {
    console.log("Updating availability:", availability)
    // Implement availability update logic
  }

  const handlePasswordChange = () => {
    console.log("Changing password")
    // Implement password change logic
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const toggleTimeSlot = (day, slot) => {
    setAvailability((prev) => {
      const currentSlots = prev[day] || []
      if (currentSlots.includes(slot)) {
        return {
          ...prev,
          [day]: currentSlots.filter((s) => s !== slot),
        }
      } else {
        return {
          ...prev,
          [day]: [...currentSlots, slot],
        }
      }
    })
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your tutor profile and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and tutor profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="flex items-center">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell students about yourself and your teaching experience..."
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input
                  id="qualifications"
                  value={profile.qualifications}
                  onChange={(e) => setProfile((prev) => ({ ...prev, qualifications: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  value={profile.experience}
                  onChange={(e) => setProfile((prev) => ({ ...prev, experience: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={profile.timezone}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, timezone: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Primary Language</Label>
                  <Select
                    value={profile.language}
                    onValueChange={(value) => setProfile((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleProfileUpdate}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Availability Settings
              </CardTitle>
              <CardDescription>Set your regular tutoring hours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                  <div key={day} className="border-b pb-4 last:border-0">
                    <h4 className="font-medium mb-3 capitalize">{day}</h4>
                    <div className="flex flex-wrap gap-3">
                      {["morning", "afternoon", "evening"].map((slot) => {
                        const isActive = availability[day]?.includes(slot)
                        return (
                          <Button
                            key={slot}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleTimeSlot(day, slot)}
                          >
                            {slot === "morning"
                              ? "Morning (8AM-12PM)"
                              : slot === "afternoon"
                                ? "Afternoon (12PM-5PM)"
                                : "Evening (5PM-9PM)"}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleAvailabilityUpdate}>Save Availability</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified about your tutoring activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Tutoring Requests</p>
                      <p className="text-sm text-gray-600">Get notified when students request your services</p>
                    </div>
                    <Switch
                      checked={notifications.emailRequests}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailRequests: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Booking Confirmations</p>
                      <p className="text-sm text-gray-600">Get notified when bookings are confirmed</p>
                    </div>
                    <Switch
                      checked={notifications.emailBookings}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailBookings: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Reminders</p>
                      <p className="text-sm text-gray-600">Reminders before your sessions</p>
                    </div>
                    <Switch
                      checked={notifications.emailReminders}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailReminders: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Notifications</p>
                      <p className="text-sm text-gray-600">Get notified about payments received</p>
                    </div>
                    <Switch
                      checked={notifications.emailPayments}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailPayments: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Promotions & Updates</p>
                      <p className="text-sm text-gray-600">Special offers and platform updates</p>
                    </div>
                    <Switch
                      checked={notifications.emailPromotions}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emailPromotions: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Push Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Tutoring Requests</p>
                      <p className="text-sm text-gray-600">Get notified when students request your services</p>
                    </div>
                    <Switch
                      checked={notifications.pushRequests}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushRequests: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Booking Updates</p>
                      <p className="text-sm text-gray-600">Real-time booking notifications</p>
                    </div>
                    <Switch
                      checked={notifications.pushBookings}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushBookings: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Reminders</p>
                      <p className="text-sm text-gray-600">Push reminders before sessions</p>
                    </div>
                    <Switch
                      checked={notifications.pushReminders}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, pushReminders: checked }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">SMS Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Reminders</p>
                      <p className="text-sm text-gray-600">SMS reminders 30 minutes before sessions</p>
                    </div>
                    <Switch
                      checked={notifications.smsReminders}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, smsReminders: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your password and security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity((prev) => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
                <Button onClick={handlePasswordChange}>Change Password</Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Setup 2FA</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Account Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Download Account Data
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Billing & Payment
              </CardTitle>
              <CardDescription>Manage your payment methods and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Payment Methods</h4>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-6 bg-blue-600 rounded"></div>
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-gray-600">•••• 1234</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Default</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-6 bg-blue-400 rounded"></div>
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-gray-600">tutor@email.com</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Make Default
                    </Button>
                  </div>
                </div>
                <Button variant="outline">Add Payment Method</Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Tax Information</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="taxId">Tax ID / SSN</Label>
                    <Input id="taxId" placeholder="XXX-XX-XXXX" />
                  </div>
                  <div>
                    <Label htmlFor="taxAddress">Tax Address</Label>
                    <Textarea id="taxAddress" placeholder="Enter your tax address" />
                  </div>
                  <Button variant="outline">Update Tax Information</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Payout Schedule</h4>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Current Schedule</p>
                    <p className="text-sm text-gray-600">Weekly (Every Monday)</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TutorSettingsPage