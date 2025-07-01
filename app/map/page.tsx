"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  ExternalLink,
  ArrowLeft,
  Bus,
  Train,
  Wallet,
  Info,
  GraduationCap,
  Home,
  Utensils,
  ShoppingCart,
  Heart,
  Briefcase,
  Users,
} from "lucide-react"

interface Location {
  id: string
  name: string
  address: string
  coordinates: { lat: number; lng: number }
  phone?: string
  hours?: string
  description: string
  category: "university" | "housing" | "food" | "shopping" | "healthcare" | "services" | "social"
  icon: any
  color: string
}

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const locations: Location[] = [
    {
      id: "ude-duisburg",
      name: "UDE Campus Duisburg",
      address: "Forsthausweg 2, 47057 Duisburg",
      coordinates: { lat: 51.4344, lng: 6.7969 },
      phone: "+49 203 379-0",
      hours: "Mon-Fri: 8:00-18:00",
      description: "Main campus with engineering faculties, library, and student services",
      category: "university",
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      id: "ude-essen",
      name: "UDE Campus Essen",
      address: "Universitätsstraße 2, 45141 Essen",
      coordinates: { lat: 51.463, lng: 7.0133 },
      phone: "+49 201 183-1",
      hours: "Mon-Fri: 8:00-18:00",
      description: "Second campus with additional faculties and research facilities",
      category: "university",
      icon: GraduationCap,
      color: "bg-blue-500",
    },
    {
      id: "studentenwohnheim-duisburg",
      name: "Studentenwohnheim Duisburg",
      address: "Keetmanstraße 3-9, 47058 Duisburg",
      coordinates: { lat: 51.4289, lng: 6.8044 },
      phone: "+49 203 379-3000",
      description: "Student dormitory close to campus with affordable housing options",
      category: "housing",
      icon: Home,
      color: "bg-green-500",
    },
    {
      id: "mensa-duisburg",
      name: "Mensa Duisburg",
      address: "Lotharstraße 57, 47057 Duisburg",
      coordinates: { lat: 51.4356, lng: 6.7978 },
      phone: "+49 203 379-2870",
      hours: "Mon-Fri: 11:30-14:30",
      description: "University cafeteria with affordable meals for students",
      category: "food",
      icon: Utensils,
      color: "bg-orange-500",
    },
    {
      id: "forum-duisburg",
      name: "Forum Duisburg",
      address: "Königstraße 48, 47051 Duisburg",
      coordinates: { lat: 51.4326, lng: 6.7623 },
      phone: "+49 203 99480",
      hours: "Mon-Sat: 10:00-20:00",
      description: "Large shopping center in Duisburg city center",
      category: "shopping",
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      id: "helios-klinikum",
      name: "Helios Klinikum Duisburg",
      address: "An der Abtei 7-11, 47166 Duisburg",
      coordinates: { lat: 51.3789, lng: 6.7456 },
      phone: "+49 203 546-0",
      hours: "24/7 Emergency",
      description: "Major hospital providing comprehensive medical services",
      category: "healthcare",
      icon: Heart,
      color: "bg-red-500",
    },
    {
      id: "arbeitsagentur-duisburg",
      name: "Arbeitsagentur Duisburg",
      address: "Wintgensstraße 29-33, 47058 Duisburg",
      coordinates: { lat: 51.4167, lng: 6.7833 },
      phone: "+49 800 4555500",
      hours: "Mon-Fri: 8:00-12:30, Thu: 8:00-18:00",
      description: "Employment agency for job search and work permits",
      category: "services",
      icon: Briefcase,
      color: "bg-indigo-500",
    },
    {
      id: "asta-duisburg",
      name: "AStA UDE",
      address: "Forsthausweg 2, 47057 Duisburg",
      coordinates: { lat: 51.434, lng: 6.7965 },
      phone: "+49 203 379-2024",
      hours: "Mon-Fri: 10:00-16:00",
      description: "Student government offering support and social activities",
      category: "social",
      icon: Users,
      color: "bg-pink-500",
    },
  ]

  const categories = [
    { id: "all", name: "All Locations", icon: MapPin, color: "bg-gray-500" },
    { id: "university", name: "University", icon: GraduationCap, color: "bg-blue-500" },
    { id: "housing", name: "Housing", icon: Home, color: "bg-green-500" },
    { id: "food", name: "Food", icon: Utensils, color: "bg-orange-500" },
    { id: "shopping", name: "Shopping", icon: ShoppingCart, color: "bg-purple-500" },
    { id: "healthcare", name: "Healthcare", icon: Heart, color: "bg-red-500" },
    { id: "services", name: "Services", icon: Briefcase, color: "bg-indigo-500" },
    { id: "social", name: "Social", icon: Users, color: "bg-pink-500" },
  ]

  const filteredLocations =
    selectedCategory === "all" ? locations : locations.filter((location) => location.category === selectedCategory)

  const getDirectionsUrl = (coordinates: { lat: number; lng: number }) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}&travelmode=transit`
  }

  const getLocationUrl = (coordinates: { lat: number; lng: number }, name: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
  }

  const getFullAreaMapUrl = () => {
    return "https://www.google.com/maps/@51.4487,6.9294,12z"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Campus & City Map</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Important locations around UDE campuses</p>
            </div>
          </div>

          <Button
            onClick={() => window.open(getFullAreaMapUrl(), "_blank", "noopener,noreferrer")}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">View Full Area Map</span>
            <span className="sm:hidden">Full Map</span>
          </Button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 ${selectedCategory === category.id ? category.color : ""}`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredLocations.map((location) => {
            const IconComponent = location.icon
            return (
              <Card key={location.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`${location.color} p-2 rounded-lg`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{location.name}</CardTitle>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {location.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{location.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{location.address}</span>
                    </div>

                    {location.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <a
                          href={`tel:${location.phone}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {location.phone}
                        </a>
                      </div>
                    )}

                    {location.hours && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{location.hours}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        window.open(getDirectionsUrl(location.coordinates), "_blank", "noopener,noreferrer")
                      }
                      className="flex-1 flex items-center justify-center space-x-1 bg-green-600 hover:bg-green-700"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Get Directions</span>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(
                          getLocationUrl(location.coordinates, location.name),
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Navigation Tips */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
              <Info className="w-5 h-5" />
              <span>Navigation Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                  <Bus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Public Transport</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Use VRR app for real-time schedules and route planning
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
                  <Wallet className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 dark:text-green-200">Student Discounts</h3>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    Show your student ID for discounted public transport tickets
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
                  <Train className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200">Campus Connection</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-300">
                    Regular shuttle buses connect Duisburg and Essen campuses
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">📱 Recommended Apps</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>
                  • <strong>VRR App</strong> - Local public transport schedules and tickets
                </li>
                <li>
                  • <strong>Google Maps</strong> - Navigation and real-time traffic updates
                </li>
                <li>
                  • <strong>DB Navigator</strong> - German railway connections
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
