"use client"

import { useState } from "react"
import { Bell, MapPin, Plus, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HomeScreenProps {
  onNavigate: (screen: string) => void
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [activeOrders] = useState([
    {
      id: "ZW001",
      status: "In Progress",
      service: "Wash & Fold",
      items: 12,
      estimatedTime: "2 hours",
      icon: Clock,
    },
    {
      id: "ZW002",
      status: "Out for Delivery",
      service: "Dry Cleaning",
      items: 3,
      estimatedTime: "30 mins",
      icon: Truck,
    },
  ])

  const services = [
    { name: "Wash & Fold", price: "₦500/kg", icon: "👕", color: "bg-blue-100" },
    { name: "Dry Cleaning", price: "₦800/item", icon: "🧥", color: "bg-purple-100" },
    { name: "Ironing", price: "₦200/item", icon: "👔", color: "bg-green-100" },
    { name: "Express", price: "₦1000/kg", icon: "⚡", color: "bg-yellow-100" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Good Morning!</h1>
          <p className="text-gray-600">Ifeanyi John</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-navy-900" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
              2
            </Badge>
          </Button>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin size={16} />
        <span className="text-sm">Victoria Island, Lagos</span>
        <Button variant="ghost" size="sm" className="text-navy-900 p-0 h-auto">
          Change
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => onNavigate("booking")}
          className="bg-navy-900 hover:bg-navy-800 text-white h-16 flex flex-col gap-1"
        >
          <Plus size={20} />
          <span>New Order</span>
        </Button>
        <Button
          onClick={() => onNavigate("tracking")}
          variant="outline"
          className="border-navy-900 text-navy-900 hover:bg-navy-50 h-16 flex flex-col gap-1"
        >
          <Truck size={20} />
          <span>Track Order</span>
        </Button>
      </div>

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-navy-900">Active Orders</h2>
          {activeOrders.map((order) => (
            <Card key={order.id} className="border-l-4 border-l-navy-900">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-navy-900">#{order.id}</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.service} • {order.items} items
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <order.icon size={14} />
                      <span>{order.estimatedTime}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onNavigate("tracking")} className="text-navy-900">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Services */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-navy-900">Our Services</h2>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <Card key={service.name} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center space-y-2">
                <div
                  className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mx-auto text-2xl`}
                >
                  {service.icon}
                </div>
                <h3 className="font-medium text-navy-900">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Subscription Banner */}
      <Card className="bg-gradient-to-r from-navy-900 to-navy-700 text-white">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Save 20% with Monthly Plan</h3>
              <p className="text-sm opacity-90">Get unlimited washes</p>
            </div>
            <Button variant="secondary" size="sm">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
