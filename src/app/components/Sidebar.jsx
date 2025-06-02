"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { BookOpen, Home, Calendar, Users, Star, Settings, BarChart3, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"


const Sidebar = ({ userType }) => {
  const pathname = usePathname()

  const getNavItems = () => {
    switch (userType) {
      case "student":
        return [
          { href: "/dashboard", label: "Dashboard", icon: Home },
          { href: "/dashboard/search", label: "Find Tutors", icon: Users },
          { href: "/dashboard/bookings", label: "My Bookings", icon: Calendar },
          { href: "/dashboard/history", label: "Session History", icon: Star },
          { href: "/dashboard/settings", label: "Settings", icon: Settings },
        ]
      case "tutor":
        return [
          { href: "/dashboard", label: "Dashboard", icon: Home },
          { href: "/dashboard/modules", label: "My Modules", icon: BookOpen },
          { href: "/dashboard/requests", label: "Requests", icon: Users },
          { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
          { href: "/dashboard/earnings", label: "Earnings", icon: BarChart3 },
          { href: "/dashboard/settings", label: "Settings", icon: Settings },
        ]
      case "admin":
        return [
          { href: "/dashboard", label: "Dashboard", icon: Home },
          { href: "/dashboard/users", label: "Users", icon: Users },
          { href: "/dashboard/modules", label: "Modules", icon: BookOpen },
          { href: "/dashboard/requests", label: "Tutor Requests", icon: Calendar },
          { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
          { href: "/dashboard/settings", label: "Settings", icon: Settings },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-secondary-dark-orange" />
          <h1 className="text-xl font-bold text-gray-900">Revizili</h1>
        </div>
      </div>

      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-orange-100 text-secondary-medium-orange" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </nav>
  )
}

export default Sidebar