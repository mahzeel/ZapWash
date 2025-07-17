"use client"

import { useState } from "react"
import { ArrowLeft, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WalletScreenProps {
  onNavigate: (screen: string) => void
}

export default function WalletScreen({ onNavigate }: WalletScreenProps) {
  const [balance] = useState(2500)
  const [showFundWallet, setShowFundWallet] = useState(false)
  const [fundAmount, setFundAmount] = useState("")

  const transactions = [
    {
      id: 1,
      type: "debit",
      description: "Wash & Fold Service",
      amount: 600,
      date: "Today, 2:30 PM",
      status: "completed",
    },
    {
      id: 2,
      type: "credit",
      description: "Wallet Top-up",
      amount: 1000,
      date: "Yesterday, 10:15 AM",
      status: "completed",
    },
    {
      id: 3,
      type: "debit",
      description: "Dry Cleaning Service",
      amount: 800,
      date: "Jan 8, 4:20 PM",
      status: "completed",
    },
    {
      id: 4,
      type: "credit",
      description: "Referral Bonus",
      amount: 200,
      date: "Jan 7, 11:30 AM",
      status: "completed",
    },
  ]

  const subscriptionPlans = [
    {
      name: "Basic Plan",
      price: 2000,
      period: "Monthly",
      features: ["5 kg wash & fold", "Free pickup & delivery", "Standard turnaround"],
      popular: false,
    },
    {
      name: "Premium Plan",
      price: 3500,
      period: "Monthly",
      features: ["10 kg wash & fold", "3 dry cleaning items", "Express service", "Priority support"],
      popular: true,
    },
    {
      name: "Family Plan",
      price: 5000,
      period: "Monthly",
      features: ["20 kg wash & fold", "5 dry cleaning items", "Express service", "24/7 support"],
      popular: false,
    },
  ]

  const paymentMethods = [
    { name: "Debit/Credit Card", icon: CreditCard, description: "Visa, Mastercard, Verve" },
    { name: "Bank Transfer", icon: Building, description: "Direct bank transfer" },
    { name: "USSD", icon: Smartphone, description: "*737# or *966#" },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="text-navy-900">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold text-navy-900">Wallet</h1>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-navy-900 to-navy-700 text-white">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <p className="text-sm opacity-90">Available Balance</p>
            <h2 className="text-3xl font-bold">₦{balance.toLocaleString()}</h2>
            <Button variant="secondary" size="sm" onClick={() => setShowFundWallet(true)} className="mt-4">
              <Plus size={16} className="mr-2" />
              Fund Wallet
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fund Wallet Modal */}
      {showFundWallet && (
        <Card className="border-navy-900">
          <CardHeader>
            <CardTitle className="text-lg text-navy-900">Fund Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              placeholder="Enter amount"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              className="text-center text-lg"
            />
            <div className="grid grid-cols-3 gap-2">
              {["1000", "2000", "5000"].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => setFundAmount(amount)}
                  className="border-navy-900 text-navy-900"
                >
                  ₦{amount}
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-navy-900">Select Payment Method</p>
              {paymentMethods.map((method) => (
                <Button
                  key={method.name}
                  variant="outline"
                  className="w-full justify-start border-gray-300 hover:border-navy-900 bg-transparent"
                >
                  <method.icon size={16} className="mr-3" />
                  <div className="text-left">
                    <p className="font-medium">{method.name}</p>
                    <p className="text-xs text-gray-600">{method.description}</p>
                  </div>
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowFundWallet(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-navy-900 hover:bg-navy-800" disabled={!fundAmount}>
                Fund Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-navy-900">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-navy-900">
              View All
            </Button>
          </div>

          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="text-green-600" size={16} />
                        ) : (
                          <ArrowUpRight className="text-red-600" size={16} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-navy-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}₦{transaction.amount}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-3">
          <h3 className="text-lg font-semibold text-navy-900">Subscription Plans</h3>

          <div className="space-y-3">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name} className={`${plan.popular ? "border-navy-900 bg-navy-50" : ""}`}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-navy-900">{plan.name}</h4>
                          {plan.popular && <Badge className="bg-navy-900 text-white">Popular</Badge>}
                        </div>
                        <p className="text-2xl font-bold text-navy-900">₦{plan.price}</p>
                        <p className="text-sm text-gray-600">per {plan.period}</p>
                      </div>
                      <Button
                        variant={plan.popular ? "default" : "outline"}
                        size="sm"
                        className={plan.popular ? "bg-navy-900 hover:bg-navy-800" : "border-navy-900 text-navy-900"}
                      >
                        Subscribe
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-navy-900 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
