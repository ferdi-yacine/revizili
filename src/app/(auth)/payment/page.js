"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Badge } from "@/app/components/ui/badge"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { CreditCard, Shield, Check, BookOpen, Users, Star, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Separator } from "@radix-ui/react-dropdown-menu"

export default function PaymentPage() {
    const searchParams = useSearchParams()
    const userId = searchParams.get("id")
    console.log(userId)
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)

    // Pricing plans
    const plans = {
        student: {
            price: 2000,
            originalPrice: 3000,
            savings: "Save 33%",
            features: [
                "All monthly features",
                "Priority booking",
                "Advanced analytics",
                "Exclusive tutor access",
                "Free session credits",
                "Premium support",
            ],
        },
    }

    const currentPlans = plans.student
    const currentPlan = plans.student

    const handlePayment = async () => {
        setIsProcessing(true)

        const res = await fetch("/api/chargily-invoice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, amount: 2000 }),
        })

        const data = await res.json()
        console.log(data)

        if (data.checkout_url) {
            window.location.href = data.checkout_url
        } else {
            // alert("Failed to initiate payment.")
            console.log("Failed to initiate payment")
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-10">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Complete Your Student Registration
                        </h1>
                        <p className="text-xl text-gray-600">Choose your plan and start your learning journey today</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Plan Selection */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Choose Your Plan</CardTitle>
                                    <CardDescription>
                                        Select the plan that best fits your needs
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs value="yearly" className="w-full">
                                        <TabsList className="grid w-full grid-cols-1">
                                            <TabsTrigger value="yearly">
                                                Yearly
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="yearly" className="mt-6">
                                            <div className="border rounded-lg p-6 bg-blue-50 border-blue-200">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold">Yearly Plan</h3>
                                                        <p className="text-gray-600">Best value for committed learners</p>
                                                        <Badge className="mt-2">save 33%</Badge>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm text-gray-500 line-through">
                                                                3000DA
                                                            </span>
                                                            <span className="text-3xl font-bold text-blue-600">2000DA</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">per year</p>
                                                    </div>
                                                </div>
                                                <ul className="space-y-3">
                                                    {currentPlans.features.map((feature, index) => (
                                                        <li key={index} className="flex items-center">
                                                            <Check className="h-5 w-5 text-green-600 mr-3" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                            {/* Trust Indicators */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                            <p className="font-semibold">10,000+</p>
                                            <p className="text-sm text-gray-600">Active Users</p>
                                        </div>
                                        <div>
                                            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                                            <p className="font-semibold">4.9/5</p>
                                            <p className="text-sm text-gray-600">User Rating</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Payment Form */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <CreditCard className="h-5 w-5 mr-2" />
                                        Payment Information
                                    </CardTitle>
                                    <CardDescription>Your payment information is secure and encrypted</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Payment Method Selection */}
                                    <div>
                                        <Label>Payment Method</Label>
                                        <Tabs value="CardDahabia" className="w-full mt-2">
                                            <TabsList className="grid w-full grid-cols-1">
                                                <TabsTrigger value="card">DAHABAIA Card</TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="CardDahabia" className="mt-6 space-y-4">
                                                <div>
                                                    <Label htmlFor="cardNumber">Card Number</Label>
                                                    <Input
                                                        id="cardNumber"
                                                        placeholder="1234 5678 9012 3456"
                                                        // value={cardData.number}
                                                        // onChange={(e) =>
                                                        //     setCardData((prev) => ({
                                                        //         ...prev,
                                                        //         number: formatCardNumber(e.target.value),
                                                        //     }))
                                                        // }
                                                        maxLength={19}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="expiry">Expiry Date</Label>
                                                        <Input
                                                            id="expiry"
                                                            placeholder="MM/YY"
                                                            // value={cardData.expiry}
                                                            // onChange={(e) =>
                                                            //     setCardData((prev) => ({
                                                            //         ...prev,
                                                            //         expiry: formatExpiry(e.target.value),
                                                            //     }))
                                                            // }
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="cvc">CVC</Label>
                                                        <Input
                                                            id="cvc"
                                                            placeholder="123"
                                                            // value={cardData.cvc}
                                                            // onChange={(e) =>
                                                            //     setCardData((prev) => ({
                                                            //         ...prev,
                                                            //         cvc: e.target.value.replace(/\D/g, ""),
                                                            //     }))
                                                            // }
                                                            maxLength={4}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="cardName">Cardholder Name</Label>
                                                    <Input
                                                        id="cardName"
                                                        placeholder="John Doe"
                                                    // value={cardData.name}
                                                    // onChange={(e) =>
                                                    //     setCardData((prev) => ({
                                                    //         ...prev,
                                                    //         name: e.target.value,
                                                    //     }))
                                                    // }
                                                    />
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="paypal" className="mt-6">
                                                <div className="text-center py-8 border rounded-lg">
                                                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <span className="text-white font-bold text-xl">PP</span>
                                                    </div>
                                                    <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your payment</p>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>

                                    <Separator />

                                    {/* Billing Information */}
                                    <div className="space-y-4">
                                        <h4 className="font-medium">Billing Information</h4>

                                        <div>
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                            // value={billingData.email}
                                            // onChange={(e) =>
                                            //     setBillingData((prev) => ({
                                            //         ...prev,
                                            //         email: e.target.value,
                                            //     }))
                                            // }
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                placeholder="123 Main Street"
                                            // value={billingData.address}
                                            // onChange={(e) =>
                                            //     setBillingData((prev) => ({
                                            //         ...prev,
                                            //         address: e.target.value,
                                            //     }))
                                            // }
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    id="city"
                                                    placeholder="Constantine"
                                                // value={billingData.city}
                                                // onChange={(e) =>
                                                //     setBillingData((prev) => ({
                                                //         ...prev,
                                                //         city: e.target.value,
                                                //     }))
                                                // }
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="state">State</Label>
                                                <Input
                                                    id="state"
                                                    placeholder="Ali Mendjeli"
                                                // value={billingData.state}
                                                // onChange={(e) =>
                                                //     setBillingData((prev) => ({
                                                //         ...prev,
                                                //         state: e.target.value,
                                                //     }))
                                                // }
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="zipCode">ZIP Code</Label>
                                                <Input
                                                    id="zipCode"
                                                    placeholder="25000"
                                                // value={billingData.zipCode}
                                                // onChange={(e) =>
                                                //     setBillingData((prev) => ({
                                                //         ...prev,
                                                //         zipCode: e.target.value,
                                                //     }))
                                                // }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span>
                                                Student Plan yearly
                                            </span>
                                            <span>${currentPlan.price}</span>
                                        </div>
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-${(currentPlan.originalPrice - currentPlan.price).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>${currentPlan.price}</span>
                                        </div>
                                    </div>

                                    <Button onClick={handlePayment} disabled={isProcessing} className="w-full mt-6" size="lg">
                                        {isProcessing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="h-4 w-4 mr-2" />
                                                Complete Payment
                                            </>
                                        )}
                                    </Button>

                                    <Alert className="mt-4">
                                        <Shield className="h-4 w-4" />
                                        <AlertDescription>
                                            Your payment information is encrypted and secure. You can cancel anytime.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Security Footer */}
                    <div className="mt-12 text-center">
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Shield className="h-4 w-4 mr-2" />
                                SSL Encrypted
                            </div>
                            <div className="flex items-center">
                                <Lock className="h-4 w-4 mr-2" />
                                Secure Payment
                            </div>
                            <div className="flex items-center">
                                <Check className="h-4 w-4 mr-2" />
                                Money Back Guarantee
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
