"use client"

import { useState } from "react"
import { Home, Calendar, Wallet, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import HomeScreen from "./screens/home-screen"
import BookingScreen from "./screens/booking-screen"
import WalletScreen from "./screens/wallet-screen"
import ProfileScreen from "./screens/profile-screen"
import OrderTrackingScreen from "./screens/order-tracking-screen"

export default function ZapWashApp() {
  const [currentScreen, setCurrentScreen] = useState("home")
  const [hasNotifications, setHasNotifications] = useState(true)

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />
      case "booking":
        return <BookingScreen onNavigate={setCurrentScreen} />
      case "tracking":
        return <OrderTrackingScreen onNavigate={setCurrentScreen} />
      case "wallet":
        return <WalletScreen onNavigate={setCurrentScreen} />
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
      {/* Status Bar */}
      <div className="bg-navy-900 text-white px-4 py-2 flex justify-between items-center text-sm">
        <span>9:41 AM</span>
        <span>ZAP WASH</span>
        <div className="flex items-center gap-1">
          <span>100%</span>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-full h-full bg-white rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderScreen()}</div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          <Button
            variant={currentScreen === "home" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentScreen("home")}
            className={`flex flex-col items-center gap-1 h-auto py-2 ${
              currentScreen === "home"
                ? "bg-navy-900 text-white hover:bg-navy-800"
                : "text-gray-600 hover:text-navy-900"
            }`}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </Button>

          <Button
            variant={currentScreen === "booking" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentScreen("booking")}
            className={`flex flex-col items-center gap-1 h-auto py-2 ${
              currentScreen === "booking"
                ? "bg-navy-900 text-white hover:bg-navy-800"
                : "text-gray-600 hover:text-navy-900"
            }`}
          >
            <Calendar size={20} />
            <span className="text-xs">Book</span>
          </Button>

          <Button
            variant={currentScreen === "wallet" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentScreen("wallet")}
            className={`flex flex-col items-center gap-1 h-auto py-2 ${
              currentScreen === "wallet"
                ? "bg-navy-900 text-white hover:bg-navy-800"
                : "text-gray-600 hover:text-navy-900"
            }`}
          >
            <Wallet size={20} />
            <span className="text-xs">Wallet</span>
          </Button>

          <Button
            variant={currentScreen === "profile" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentScreen("profile")}
            className={`flex flex-col items-center gap-1 h-auto py-2 relative ${
              currentScreen === "profile"
                ? "bg-navy-900 text-white hover:bg-navy-800"
                : "text-gray-600 hover:text-navy-900"
            }`}
          >
            <div className="relative">
              <User size={20} />
              {hasNotifications && (
                <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              )}
            </div>
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
