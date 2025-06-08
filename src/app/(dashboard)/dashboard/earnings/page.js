"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { DollarSign, Calendar, Download, TrendingUp, CreditCard, Users, ArrowUpRight } from "lucide-react"

const TutorEarningsPage = () => {
  const [dateRange, setDateRange] = useState("this-month")
  const [paymentStatus, setPaymentStatus] = useState("all")

  // Sample data
  const earningsSummary = {
    totalEarnings: 2340,
    pendingPayments: 450,
    sessionsCompleted: 42,
    averageRating: 4.8,
    monthlyGrowth: "+12%",
    projectedEarnings: 2500,
  }

  const recentPayments = [
    {
      id: 1,
      student: {
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 45,
      date: "2024-01-10",
      status: "completed",
      subject: "Mathematics",
      duration: "1 hour",
    },
    {
      id: 2,
      student: {
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 82.5,
      date: "2024-01-08",
      status: "completed",
      subject: "Physics",
      duration: "1.5 hours",
    },
    {
      id: 3,
      student: {
        name: "Carol Davis",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 40,
      date: "2024-01-05",
      status: "pending",
      subject: "Chemistry",
      duration: "1 hour",
    },
    {
      id: 4,
      student: {
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 60,
      date: "2024-01-03",
      status: "completed",
      subject: "Computer Science",
      duration: "1 hour",
    },
  ]

  const monthlyEarnings = [
    { month: "Jan", earnings: 2340 },
    { month: "Feb", earnings: 2100 },
    { month: "Mar", earnings: 2500 },
    { month: "Apr", earnings: 2800 },
    { month: "May", earnings: 3100 },
    { month: "Jun", earnings: 2900 },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "Bank Account",
      details: "•••• 1234",
      isDefault: true,
    },
    {
      id: 2,
      type: "PayPal",
      details: "tutor@email.com",
      isDefault: false,
    },
  ]

  const filteredPayments = recentPayments.filter((payment) => {
    if (paymentStatus === "all") return true
    return payment.status === paymentStatus
  })

  const handleDownloadStatement = () => {
    console.log("Downloading earnings statement")
    // Implement download logic
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings</h1>
        <p className="text-gray-600">Track your tutoring income and payments</p>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${earningsSummary.totalEarnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">${earningsSummary.pendingPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{earningsSummary.sessionsCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">{earningsSummary.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Growth</p>
                <p className="text-2xl font-bold text-green-600">{earningsSummary.monthlyGrowth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ArrowUpRight className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Projected</p>
                <p className="text-2xl font-bold text-gray-900">${earningsSummary.projectedEarnings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Your earnings over time</CardDescription>
              </div>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {/* Chart would go here - using a placeholder */}
              <div className="h-full flex items-end justify-between gap-2 pt-10 pb-2">
                {monthlyEarnings.map((month) => (
                  <div key={month.month} className="flex flex-col items-center w-full">
                    <div
                      className="bg-blue-600 rounded-t-md w-full"
                      style={{ height: `${(month.earnings / 3100) * 100}%` }}
                    ></div>
                    <div className="mt-2 text-xs font-medium">{month.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage how you receive payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{method.type}</p>
                  <p className="text-sm text-gray-600">{method.details}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {method.isDefault && <Badge variant="secondary">Default</Badge>}
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Recent payments for your tutoring sessions</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={handleDownloadStatement}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-6 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                <div className="col-span-2">Student</div>
                <div>Subject</div>
                <div>Date</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              <div className="divide-y">
                {filteredPayments.map((payment) => (
                  <div key={payment.id} className="grid grid-cols-6 p-4 text-sm">
                    <div className="col-span-2 flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={payment.student.avatar || "/placeholder.svg"} alt={payment.student.name} />
                        <AvatarFallback>
                          {payment.student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{payment.student.name}</p>
                        <p className="text-xs text-gray-500">{payment.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center">{payment.subject}</div>
                    <div className="flex items-center">{payment.date}</div>
                    <div className="flex items-center font-medium">${payment.amount}</div>
                    <div className="flex items-center">
                      <Badge
                        variant="outline"
                        className={
                          payment.status === "completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TutorEarningsPage