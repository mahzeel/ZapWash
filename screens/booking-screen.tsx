"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, MapPin, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface BookingScreenProps {
  onNavigate: (screen: string) => void
}

export default function BookingScreen({ onNavigate }: BookingScreenProps) {
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [itemCount, setItemCount] = useState(1)

  const services = [
    {
      id: "wash-fold",
      name: "Wash & Fold",
      price: 500,
      unit: "kg",
      icon: "👕",
      description: "Regular washing and folding",
    },
    {
      id: "dry-clean",
      name: "Dry Cleaning",
      price: 800,
      unit: "item",
      icon: "🧥",
      description: "Professional dry cleaning",
    },
    { id: "ironing", name: "Ironing Only", price: 200, unit: "item", icon: "👔", description: "Ironing service only" },
    { id: "express", name: "Express Service", price: 1000, unit: "kg", icon: "⚡", description: "Same day delivery" },
  ]

  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
  ]

  const calculateTotal = () => {
    const service = services.find((s) => s.id === selectedService)
    return service ? service.price * itemCount : 0
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="text-navy-900">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold text-navy-900">Book Service</h1>
      </div>

      {/* Service Selection */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">Select Service</h2>
        <div className="space-y-2">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all ${
                selectedService === service.id ? "border-navy-900 bg-navy-50" : "border-gray-200 hover:border-navy-300"
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h3 className="font-medium text-navy-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-navy-900">₦{service.price}</p>
                    <p className="text-sm text-gray-600">per {service.unit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quantity */}
      {selectedService && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-navy-900">Quantity</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Number of {services.find((s) => s.id === selectedService)?.unit}s</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                className="h-8 w-8"
              >
                <Minus size={16} />
              </Button>
              <span className="font-semibold text-navy-900 w-8 text-center">{itemCount}</span>
              <Button variant="outline" size="icon" onClick={() => setItemCount(itemCount + 1)} className="h-8 w-8">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">Pickup Date</h2>
        <div className="grid grid-cols-3 gap-2">
          {["Today", "Tomorrow", "Jan 10"].map((date) => (
            <Button
              key={date}
              variant={selectedDate === date ? "default" : "outline"}
              onClick={() => setSelectedDate(date)}
              className={`h-12 ${
                selectedDate === date
                  ? "bg-navy-900 hover:bg-navy-800"
                  : "border-gray-300 text-gray-700 hover:border-navy-900"
              }`}
            >
              <div className="flex flex-col items-center">
                <Calendar size={16} />
                <span className="text-xs">{date}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">Pickup Time</h2>
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "default" : "outline"}
              onClick={() => setSelectedTime(time)}
              className={`h-12 text-xs ${
                selectedTime === time
                  ? "bg-navy-900 hover:bg-navy-800"
                  : "border-gray-300 text-gray-700 hover:border-navy-900"
              }`}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">Pickup Address</h2>
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <MapPin size={16} className="text-gray-600" />
          <span className="text-sm">15 Adeola Odeku Street, Victoria Island, Lagos</span>
          <Button variant="ghost" size="sm" className="text-navy-900 p-0 h-auto ml-auto">
            Change
          </Button>
        </div>
      </div>

      {/* Special Instructions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">Special Instructions</h2>
        <Textarea placeholder="Any special instructions for handling your items..." className="resize-none" />
      </div>

      {/* Order Summary */}
      {selectedService && (
        <Card className="border-navy-900">
          <CardHeader>
            <CardTitle className="text-lg text-navy-900">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>{services.find((s) => s.id === selectedService)?.name}</span>
              <span>₦{calculateTotal()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Service fee</span>
              <span>₦100</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-navy-900">
              <span>Total</span>
              <span>₦{calculateTotal() + 100}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Book Button */}
      <Button
        className="w-full bg-navy-900 hover:bg-navy-800 text-white h-12"
        disabled={!selectedService || !selectedDate || !selectedTime}
        onClick={() => onNavigate("tracking")}
      >
        Book Now - ₦{calculateTotal() + 100}
      </Button>
    </div>
  )
}
