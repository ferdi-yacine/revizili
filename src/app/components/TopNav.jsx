"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Badge } from "@/app/components/ui/badge"
import { Bell, Search, Settings, LogOut, User, CreditCard } from "lucide-react"
import { Input } from "@/app/components/ui/input"


export function TopNav({ userType, userName, userAvatar }) {
  const [notifications] = useState([
    {
      id: 1,
      title: "New session scheduled",
      message: "Your session with Dr. Sarah Johnson is confirmed",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment received",
      message: "Payment of $45 has been processed",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Session reminder",
      message: "You have a session in 30 minutes",
      time: "2 hours ago",
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const handleLogout = () => {
    console.log("Logging out...")
    // Implement logout logic
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={
                userType === "student"
                  ? "Search tutors, subjects..."
                  : userType === "tutor"
                    ? "Search students, sessions..."
                    : "Search users, modules..."
              }
              className="pl-10"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                    {notification.unread && <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>}
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center">
                <Button variant="ghost" size="sm" className="w-full">
                  View all notifications
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                  <AvatarFallback>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-gray-500 capitalize">{userType}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              {userType !== "admin" && (
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
