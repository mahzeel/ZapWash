"use client"

import { useState } from "react"
import {
  ArrowLeft,
  User,
  MapPin,
  Bell,
  CreditCard,
  HelpCircle,
  Settings,
  LogOut,
  Star,
  Gift,
  Phone,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

interface ProfileScreenProps {
  onNavigate: (screen: string) => void
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)

  const userProfile = {
    name: "Ifeanyi John Chimezie",
    email: "ifeanyi.john@email.com",
    phone: "+234 801 234 5678",
    address: "15 Adeola Odeku Street, Victoria Island, Lagos",
    joinDate: "January 2025",
    totalOrders: 24,
    loyaltyPoints: 1250,
    rating: 4.8,
    avatar: "/placeholder.svg?height=80&width=80",
  }

  const menuItems = [
    { icon: User, label: "Edit Profile", action: () => {} },
    { icon: MapPin, label: "Manage Addresses", action: () => {} },
    { icon: CreditCard, label: "Payment Methods", action: () => {} },
    { icon: Bell, label: "Notifications", action: () => {} },
    { icon: Gift, label: "Referral Program", action: () => {}, badge: "Earn ₦200" },
    { icon: Star, label: "Rate App", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", action: () => {} },
    { icon: Settings, label: "Settings", action: () => {} },
  ]

  const recentActivity = [
    { type: "order", description: "Wash & Fold completed", date: "Today" },
    { type: "referral", description: "Friend joined via your referral", date: "Yesterday" },
    { type: "review", description: "You rated your last service", date: "2 days ago" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="text-navy-900">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold text-navy-900">Profile</h1>
      </div>

      {/* Profile Card */}
      <Card className="border-navy-900">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-navy-900 text-white text-xl">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-navy-900">{userProfile.name}</h2>
              <div className="flex items-center gap-1 mt-1">
                <Star className="text-yellow-500 fill-current" size={16} />
                <span className="text-sm text-gray-600">{userProfile.rating} rating</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Member since {userProfile.joinDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-navy-900">{userProfile.totalOrders}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-navy-900">{userProfile.loyaltyPoints}</p>
              <p className="text-sm text-gray-600">Loyalty Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-navy-900">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-gray-600" />
            <span className="text-sm">{userProfile.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={16} className="text-gray-600" />
            <span className="text-sm">{userProfile.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-gray-600" />
            <span className="text-sm">{userProfile.address}</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-navy-900">Quick Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-gray-600" />
              <span className="text-sm">Push Notifications</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-600" />
              <span className="text-sm">Email Notifications</span>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Button
                variant="ghost"
                className="w-full justify-start h-14 px-4 rounded-none hover:bg-navy-50"
                onClick={item.action}
              >
                <item.icon size={20} className="text-gray-600 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && <Badge className="bg-green-100 text-green-800 text-xs">{item.badge}</Badge>}
              </Button>
              {index < menuItems.length - 1 && <div className="border-b border-gray-100" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-navy-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-navy-900 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-navy-900">{activity.description}</p>
                <p className="text-xs text-gray-600">{activity.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 bg-transparent"
      >
        <LogOut size={16} className="mr-2" />
        Logout
      </Button>
    </div>
  )
}
