"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Switch } from "@/app/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { User, Bell, CreditCard, Shield, Camera } from "lucide-react"

const StudentSettingsPage = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    bio: "Computer Science student passionate about learning",
    timezone: "America/New_York",
    language: "English",
  })

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailReminders: true,
    emailPromotions: false,
    pushBookings: true,
    pushReminders: true,
    smsReminders: false,
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

  const handlePasswordChange = () => {
    console.log("Changing password")
    // Implement password change logic
    setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
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
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
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
                  placeholder="Tell us about yourself..."
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
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
                  <Label htmlFor="language">Language</Label>
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

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified about your sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-3">
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
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                <Button variant="outline">Add Payment Method</Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Billing History</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Session with Dr. Sarah Johnson</p>
                      <p className="text-sm text-gray-600">Jan 10, 2024</p>
                    </div>
                    <span className="font-medium">$45.00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">Session with Prof. Michael Chen</p>
                      <p className="text-sm text-gray-600">Jan 8, 2024</p>
                    </div>
                    <span className="font-medium">$82.50</span>
                  </div>
                </div>
                <Button variant="outline">View All Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default StudentSettingsPage