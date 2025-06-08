"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { BookOpen } from "lucide-react"
import '@ant-design/v5-patch-for-react-19';
import { notification } from "antd"


const RegisterPage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        year: "",
        specialty: ""
    })

    const [showSpecialtySelect, setShowSpecialtySelect] = useState(false)

    const years = [
        { value: "1ere", label: "1st Preparatory Year" },
        { value: "2eme", label: "2nd Preparatory Year" },
        { value: "3eme", label: "1st Year Second Cycle" },
        { value: "4eme", label: "2nd Year Second Cycle" },
        { value: "5eme", label: "3rd Year Second Cycle" },
    ]

    const specialties = {
        "4eme": [
            { value: "financialMarket", label: "Financial Market and Financial Engineering" },
            { value: "accountingAudit", label: "Accounting and Accounting Audit" },
            { value: "corporateFinance", label: "Corporate Finance" },
            { value: "banksInsurance", label: "Banks and Insurance" }
        ],
        "5eme": [
            { value: "financialMarket", label: "Financial Market and Financial Engineering" },
            { value: "accountingAudit", label: "Accounting and Accounting Audit" },
            { value: "corporateFinance", label: "Corporate Finance" },
            { value: "banksInsurance", label: "Banks and Insurance" }
        ]
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Registration failed');
            }

            notification.success({
                message: 'Success',
                description: "Your account has been created successfully! Heading toward payment...",
            });
            setTimeout(() => {
                router.push(`/payment`);
            }, 2000)
        } catch (err) {
            console.log(err);
            notification.error({
                message: 'Error',
                description: err.message || 'Something went wrong. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }

    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        if (field === "year") {
            setShowSpecialtySelect(value === "4eme" || value === "5eme")
            if (value !== "4eme" && value !== "5eme") {
                setFormData(prev => ({ ...prev, specialty: "" }))
            }
        }
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-orange-50 to-orange-10 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <BookOpen className="h-12 w-12 text-secondary-medium-orange" />
                    </div>
                    <CardTitle className="text-2xl">Create Account</CardTitle>
                    <CardDescription>Join Revizili today</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <Label>Academic Year</Label>
                            <Select
                                value={formData.year}
                                onValueChange={(value) => handleInputChange("year", value)}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select your year" />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map((year) => (
                                        <SelectItem key={year.value} value={year.value}>
                                            {year.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {showSpecialtySelect && (
                            <div className="flex flex-col gap-2 w-full">
                                <Label>Specialty</Label>
                                <Select
                                    value={formData.specialty}
                                    onValueChange={(value) => handleInputChange("specialty", value)}
                                    required
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your specialty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {specialties[formData.year]?.map((specialty) => (
                                            <SelectItem key={specialty.value} value={specialty.value}>
                                                {specialty.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                required
                            />
                        </div>
                        <Button disabled={isLoading} type="submit" className="w-full">
                            Continue to Payment
                        </Button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-secondary-medium-orange hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage