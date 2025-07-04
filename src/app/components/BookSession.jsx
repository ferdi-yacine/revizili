"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { format } from "date-fns"
import { Button } from "./ui/button"
import { CalendarIcon } from "lucide-react"

const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
    "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"
]

export const BookingModal = ({ tutor, module, onBookSession }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [sessionData, setSessionData] = useState({
        date: null,
        startTime: "",
        endTime: "",
        meetingLink: "",
        notes: ""
    })

    const handleSubmit = async () => {
        if (!sessionData.date || !sessionData.startTime || !sessionData.endTime) {
            alert("Please select date and time")
            return
        }

        try {
            await onBookSession({
                tutorId: tutor.id,
                moduleId: module.id,
                date: sessionData.date,
                startTime: sessionData.startTime,
                endTime: sessionData.endTime,
                meetingLink: sessionData.meetingLink,
                notes: sessionData.notes
            })
            setIsOpen(false)
        } catch (error) {
            console.error("Error booking session:", error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">Book Session</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Book Session with {tutor?.firstName}</DialogTitle>
                    <DialogDescription>
                        Schedule a session for {module?.firstName}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Tutor</Label>
                        <div className="col-span-3 font-medium">{tutor?.firstName}</div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Module</Label>
                        <div className="col-span-3 font-medium">{module?.name}</div>
                    </div>

                    {/* Date Picker */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        <div className="col-span-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {sessionData.date ? format(sessionData.date, "PPP") : "Select a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={sessionData.date}
                                        onSelect={(date) => setSessionData(prev => ({ ...prev, date }))}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    {/* Start Time */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="startTime" className="text-right">
                            Start Time
                        </Label>
                        <div className="col-span-3">
                            <Select
                                value={sessionData.startTime}
                                onValueChange={(value) => setSessionData(prev => ({ ...prev, startTime: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select start time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* End Time */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="endTime" className="text-right">
                            End Time
                        </Label>
                        <div className="col-span-3">
                            <Select
                                value={sessionData.endTime}
                                onValueChange={(value) => setSessionData(prev => ({ ...prev, endTime: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select end time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Meeting Link */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meetingLink" className="text-right">
                            Meeting Link
                        </Label>
                        <Input
                            id="meetingLink"
                            placeholder="https://meet.google.com/..."
                            className="col-span-3"
                            value={sessionData.meetingLink}
                            onChange={(e) => setSessionData(prev => ({ ...prev, meetingLink: e.target.value }))}
                        />
                    </div>

                    {/* Notes */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="notes" className="text-right">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            placeholder="What would you like to focus on?"
                            className="col-span-3"
                            value={sessionData.notes}
                            onChange={(e) => setSessionData(prev => ({ ...prev, notes: e.target.value }))}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Confirm Booking
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}