"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, MessageCircle, Mail, Phone } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  gender: "male" | "female"
  type: "new" | "current"
  interests: string[]
  matchedWith?: string
}

interface Match {
  id: string
  user1: User
  user2: User
  matchedAt: Date
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Anna Schmidt",
    email: "anna.schmidt@example.com",
    phone: "+49 123 456 7890",
    gender: "female",
    type: "current",
    interests: ["Engineering", "Sports", "Music"],
  },
  {
    id: "2",
    name: "Max Mueller",
    email: "max.mueller@example.com",
    phone: "+49 123 456 7891",
    gender: "male",
    type: "current",
    interests: ["Computer Science", "Gaming", "Photography"],
  },
  {
    id: "3",
    name: "Lisa Weber",
    email: "lisa.weber@example.com",
    phone: "+49 123 456 7892",
    gender: "female",
    type: "current",
    interests: ["Business", "Travel", "Cooking"],
  },
]

export default function BuddySystemPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [matches, setMatches] = useState<Match[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    type: "",
    interests: "",
  })

  useEffect(() => {
    const savedUsers = localStorage.getItem("buddy-users")
    const savedMatches = localStorage.getItem("buddy-matches")
    const savedCurrentUser = localStorage.getItem("current-buddy-user")

    if (savedUsers) setUsers(JSON.parse(savedUsers))
    if (savedMatches) setMatches(JSON.parse(savedMatches))
    if (savedCurrentUser) setCurrentUser(JSON.parse(savedCurrentUser))
  }, [])

  const saveToStorage = (newUsers: User[], newMatches: Match[], newCurrentUser: User | null) => {
    localStorage.setItem("buddy-users", JSON.stringify(newUsers))
    localStorage.setItem("buddy-matches", JSON.stringify(newMatches))
    if (newCurrentUser) {
      localStorage.setItem("current-buddy-user", JSON.stringify(newCurrentUser))
    }
  }

  const handleRegistration = () => {
    if (!registrationData.name || !registrationData.email || !registrationData.gender || !registrationData.type) {
      alert("Please fill in all required fields")
      return
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: registrationData.name,
      email: registrationData.email,
      phone: registrationData.phone,
      gender: registrationData.gender as "male" | "female",
      type: registrationData.type as "new" | "current",
      interests: registrationData.interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i),
    }

    const newUsers = [...users, newUser]
    setUsers(newUsers)
    setCurrentUser(newUser)
    setShowRegistration(false)
    setRegistrationData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      type: "",
      interests: "",
    })

    saveToStorage(newUsers, matches, newUser)
  }

  const handleMatch = (targetUserId: string) => {
    if (!currentUser) return

    const targetUser = users.find((u) => u.id === targetUserId)
    if (!targetUser) return

    const newMatch: Match = {
      id: Date.now().toString(),
      user1: currentUser,
      user2: targetUser,
      matchedAt: new Date(),
    }

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id || user.id === targetUserId) {
        return { ...user, matchedWith: user.id === currentUser.id ? targetUserId : currentUser.id }
      }
      return user
    })

    const newMatches = [...matches, newMatch]
    const updatedCurrentUser = { ...currentUser, matchedWith: targetUserId }

    setUsers(updatedUsers)
    setMatches(newMatches)
    setCurrentUser(updatedCurrentUser)

    saveToStorage(updatedUsers, newMatches, updatedCurrentUser)
  }

  const availableUsers = users.filter(
    (user) =>
      !user.matchedWith &&
      user.id !== currentUser?.id &&
      user.gender === currentUser?.gender &&
      user.type !== currentUser?.type,
  )

  const userMatch = currentUser?.matchedWith
    ? matches.find(
        (m) =>
          (m.user1.id === currentUser.id && m.user2.id === currentUser.matchedWith) ||
          (m.user2.id === currentUser.id && m.user1.id === currentUser.matchedWith),
      )
    : null

  const matchedUser = userMatch ? (userMatch.user1.id === currentUser?.id ? userMatch.user2 : userMatch.user1) : null

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Buddy System</h1>
            <p className="text-gray-600 mb-6">
              Connect with other students to help each other settle in and make friends
            </p>
          </div>

          {!showRegistration ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">Join the Buddy Program</h3>
                <p className="text-gray-600 mb-6">
                  Register to be matched with a buddy who can help you with your studies and life in Germany
                </p>
                <Button onClick={() => setShowRegistration(true)} size="lg">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Register for Buddy Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={registrationData.gender}
                    onValueChange={(value) => setRegistrationData({ ...registrationData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type">Student Type *</Label>
                  <Select
                    value={registrationData.type}
                    onValueChange={(value) => setRegistrationData({ ...registrationData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your student type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Student</SelectItem>
                      <SelectItem value="current">Current Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="interests">Interests (comma-separated)</Label>
                  <Input
                    id="interests"
                    value={registrationData.interests}
                    onChange={(e) => setRegistrationData({ ...registrationData, interests: e.target.value })}
                    placeholder="e.g., Engineering, Sports, Music"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleRegistration} className="flex-1">
                    Register
                  </Button>
                  <Button variant="outline" onClick={() => setShowRegistration(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  if (matchedUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Buddy Match</h1>
            <p className="text-gray-600">You've been successfully matched! Here are your buddy's contact details.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Matched with {matchedUser.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{matchedUser.email}</span>
              </div>

              {matchedUser.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{matchedUser.phone}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{matchedUser.type === "new" ? "New Student" : "Current Student"}</Badge>
              </div>

              {matchedUser.interests.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Interests:</p>
                  <div className="flex flex-wrap gap-2">
                    {matchedUser.interests.map((interest, index) => (
                      <Badge key={index} variant="outline">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Your Buddy</h1>
          <p className="text-gray-600 mb-6">
            Available {currentUser.type === "new" ? "current students" : "new students"} looking for a buddy
          </p>
        </div>

        <div className="mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Welcome, {currentUser.name}!</p>
                  <p className="text-sm text-gray-600">{availableUsers.length} potential buddies available</p>
                </div>
                <Badge variant="secondary">{currentUser.type === "new" ? "New Student" : "Current Student"}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {availableUsers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Available Buddies</h3>
              <p className="text-gray-600">
                There are currently no available buddies matching your criteria. Check back later or encourage more
                students to join the program!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{user.name}</span>
                    <Badge variant="secondary">{user.type === "new" ? "New Student" : "Current Student"}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.interests.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Interests:</p>
                      <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button onClick={() => handleMatch(user.id)} className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Match with {user.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
