"use client"

import { useState } from "react"
import { ArrowLeft, Phone, MessageCircle, Clock, CheckCircle, Truck, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface OrderTrackingScreenProps {
  onNavigate: (screen: string) => void
}

export default function OrderTrackingScreen({ onNavigate }: OrderTrackingScreenProps) {
  const [currentOrder] = useState({
    id: "ZW001",
    status: "In Progress",
    service: "Wash & Fold",
    items: 12,
    total: 600,
    pickupTime: "10:00 AM",
    deliveryTime: "6:00 PM (Est.)",
    rider: {
      name: "Adebayo Ogundimu",
      phone: "+234 801 234 5678",
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  })

  const trackingSteps = [
    {
      id: 1,
      title: "Order Confirmed",
      time: "8:30 AM",
      completed: true,
      icon: CheckCircle,
      description: "Your order has been confirmed and assigned to a rider",
    },
    {
      id: 2,
      title: "Pickup Scheduled",
      time: "9:00 AM",
      completed: true,
      icon: Clock,
      description: "Rider is on the way to pickup your items",
    },
    {
      id: 3,
      title: "Items Collected",
      time: "10:15 AM",
      completed: true,
      icon: Package,
      description: "12 items collected and sent to facility",
    },
    {
      id: 4,
      title: "In Progress",
      time: "Now",
      completed: false,
      active: true,
      icon: Clock,
      description: "Your items are being processed",
    },
    {
      id: 5,
      title: "Out for Delivery",
      time: "5:00 PM (Est.)",
      completed: false,
      icon: Truck,
      description: "Items ready and out for delivery",
    },
    {
      id: 6,
      title: "Delivered",
      time: "6:00 PM (Est.)",
      completed: false,
      icon: CheckCircle,
      description: "Items delivered to your address",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="text-navy-900">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold text-navy-900">Track Order</h1>
      </div>

      {/* Order Info */}
      <Card className="border-l-4 border-l-navy-900">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg text-navy-900">#{currentOrder.id}</CardTitle>
              <p className="text-sm text-gray-600">
                {currentOrder.service} • {currentOrder.items} items
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">{currentOrder.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Pickup Time</p>
              <p className="font-medium text-navy-900">{currentOrder.pickupTime}</p>
            </div>
            <div>
              <p className="text-gray-600">Delivery Time</p>
              <p className="font-medium text-navy-900">{currentOrder.deliveryTime}</p>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium text-navy-900">Total Amount</span>
            <span className="font-bold text-navy-900">₦{currentOrder.total}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rider Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-navy-900">Your Rider</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={currentOrder.rider.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-navy-900 text-white">
                  {currentOrder.rider.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-navy-900">{currentOrder.rider.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600">{currentOrder.rider.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="border-navy-900 text-navy-900 bg-transparent">
                <Phone size={16} />
              </Button>
              <Button variant="outline" size="icon" className="border-navy-900 text-navy-900 bg-transparent">
                <MessageCircle size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-navy-900">Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trackingSteps.map((step, index) => (
              <div key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : step.active
                          ? "bg-navy-900 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <step.icon size={16} />
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-8 mt-1 ${step.completed ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium ${step.completed || step.active ? "text-navy-900" : "text-gray-500"}`}>
                      {step.title}
                    </h3>
                    <span className={`text-sm ${step.completed || step.active ? "text-navy-900" : "text-gray-500"}`}>
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="border-navy-900 text-navy-900 hover:bg-navy-50 bg-transparent">
          Cancel Order
        </Button>
        <Button className="bg-navy-900 hover:bg-navy-800 text-white">Contact Support</Button>
      </div>
    </div>
  )
}
