"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { BookOpen, Plus, Edit, Trash2, Users, DollarSign } from "lucide-react"

const TutorModulesPage = () => {
  const [modules, setModules] = useState([
    {
      id: 1,
      name: "Mathematics",
      level: "All Levels",
      description: "Comprehensive math tutoring from basic arithmetic to advanced calculus",
      hourlyRate: 45,
      activeStudents: 12,
      totalSessions: 156,
      status: "active",
    },
    {
      id: 2,
      name: "Statistics",
      level: "Intermediate to Advanced",
      description: "Statistical analysis, probability theory, and data interpretation",
      hourlyRate: 50,
      activeStudents: 8,
      totalSessions: 89,
      status: "active",
    },
    {
      id: 3,
      name: "Calculus",
      level: "Advanced",
      description: "Advanced calculus concepts including differential and integral calculus",
      hourlyRate: 55,
      activeStudents: 5,
      totalSessions: 67,
      status: "active",
    },
  ])

  const [newModule, setNewModule] = useState({
    name: "",
    level: "",
    description: "",
    hourlyRate: "",
  })

  const [editingModule, setEditingModule] = useState(null)

  const handleEditModule = (module) => {
    setEditingModule(module)
  }

  const handleUpdateModule = () => {
    setModules(modules.map((m) => (m.id === editingModule.id ? editingModule : m)))
    setEditingModule(null)
  }

  const handleDeleteModule = (moduleId) => {
    setModules(modules.filter((m) => m.id !== moduleId))
  }

  const toggleModuleStatus = (moduleId) => {
    setModules(
      modules.map((m) => (m.id === moduleId ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m)),
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Modules</h1>
            <p className="text-gray-600">Manage the subjects you teach</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Module</DialogTitle>
                <DialogDescription>Add a new subject that you can teach</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="moduleName">Module Name</Label>
                  <Input
                    id="moduleName"
                    placeholder="e.g., Mathematics, Physics..."
                    value={newModule.name}
                    onChange={(e) => setNewModule((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={newModule.level}
                    onValueChange={(value) => setNewModule((prev) => ({ ...prev, level: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="All Levels">All Levels</SelectItem>
                      <SelectItem value="Beginner to Intermediate">Beginner to Intermediate</SelectItem>
                      <SelectItem value="Intermediate to Advanced">Intermediate to Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you'll teach in this module..."
                    value={newModule.description}
                    onChange={(e) => setNewModule((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="45"
                    value={newModule.hourlyRate}
                    onChange={(e) => setNewModule((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Modules</p>
                <p className="text-2xl font-bold text-gray-900">
                  {modules.filter((m) => m.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {modules.reduce((sum, m) => sum + m.activeStudents, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Hourly Rate</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(modules.reduce((sum, m) => sum + m.hourlyRate, 0) / modules.length).toFixed(0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    {module.name}
                  </CardTitle>
                  <CardDescription>{module.level}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={module.status === "active" ? "default" : "secondary"}>{module.status}</Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditModule(module)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteModule(module.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{module.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{module.activeStudents}</p>
                  <p className="text-sm text-gray-600">Active Students</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{module.totalSessions}</p>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-xl font-bold text-green-600">{module.hourlyRate}</span>
                  <span className="text-gray-600">/hour</span>
                </div>
                <Button
                  variant={module.status === "active" ? "outline" : "default"}
                  size="sm"
                  onClick={() => toggleModuleStatus(module.id)}
                >
                  {module.status === "active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Module Dialog */}
      {editingModule && (
        <Dialog open={!!editingModule} onOpenChange={() => setEditingModule(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Module</DialogTitle>
              <DialogDescription>Update your module information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editModuleName">Module Name</Label>
                <Input
                  id="editModuleName"
                  value={editingModule.name}
                  onChange={(e) => setEditingModule((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="editLevel">Level</Label>
                <Select
                  value={editingModule.level}
                  onValueChange={(value) => setEditingModule((prev) => ({ ...prev, level: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="All Levels">All Levels</SelectItem>
                    <SelectItem value="Beginner to Intermediate">Beginner to Intermediate</SelectItem>
                    <SelectItem value="Intermediate to Advanced">Intermediate to Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  value={editingModule.description}
                  onChange={(e) => setEditingModule((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="editHourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="editHourlyRate"
                  type="number"
                  value={editingModule.hourlyRate}
                  onChange={(e) =>
                    setEditingModule((prev) => ({ ...prev, hourlyRate: Number.parseFloat(e.target.value) }))
                  }
                />
              </div>
              <Button onClick={handleUpdateModule} className="w-full">
                Update Module
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {modules.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No modules yet</h3>
            <p className="text-gray-600 mb-4">Add your first teaching module to start accepting students</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Your First Module</Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TutorModulesPage