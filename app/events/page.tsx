"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users, ExternalLink, Heart } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  time: string
  location: string
  category: "academic" | "social" | "cultural" | "sports" | "workshop"
  attendees: number
  maxAttendees?: number
  imageUrl: string
  instagramUrl: string
  isLiked: boolean
  likes: number
}

const events: Event[] = [
  {
    id: "1",
    title: "Welcome Week 2024",
    description:
      "Join us for the official welcome week for new ISE students! Meet your classmates, learn about campus resources, and get ready for an amazing semester. This comprehensive orientation program includes campus tours, academic advising sessions, social mixers, and essential information sessions about life in Germany.",
    date: new Date("2024-02-05"),
    time: "09:00 - 17:00",
    location: "Main Campus Auditorium & Various Locations",
    category: "academic",
    attendees: 156,
    maxAttendees: 200,
    imageUrl: "/images/gallery/graduation-ceremony.jpg",
    instagramUrl: "https://instagram.com/p/welcome2024",
    isLiked: false,
    likes: 89,
  },
  {
    id: "2",
    title: "International Food Festival",
    description:
      "Taste delicious food from around the world prepared by our international student community. A great opportunity to experience different cultures, share your own culinary traditions, and connect with students from various countries. Live music, cultural performances, and cooking demonstrations included!",
    date: new Date("2024-02-12"),
    time: "12:00 - 18:00",
    location: "Student Center Courtyard",
    category: "cultural",
    attendees: 234,
    imageUrl: "/images/gallery/student-cafeteria.jpg",
    instagramUrl: "https://instagram.com/p/foodfest2024",
    isLiked: true,
    likes: 145,
  },
  {
    id: "3",
    title: "Research Showcase & Career Fair",
    description:
      "Discover cutting-edge research projects by ISE students and faculty, meet potential employers, learn about internship opportunities, and network with industry professionals. This event combines academic excellence with career development opportunities. Bring your CV and prepare for exciting conversations about your future!",
    date: new Date("2024-02-20"),
    time: "10:00 - 16:00",
    location: "Research Labs & Exhibition Hall",
    category: "academic",
    attendees: 89,
    maxAttendees: 300,
    imageUrl: "/images/gallery/research-lab.jpg",
    instagramUrl: "https://instagram.com/p/research2024",
    isLiked: false,
    likes: 67,
  },
]

export default function EventsPage() {
  const [eventList, setEventList] = useState(events)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredEvents = eventList
    .filter((event) => selectedCategory === "all" || event.category === selectedCategory)
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const handleLike = (eventId: string) => {
    setEventList((events) =>
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isLiked: !event.isLiked,
              likes: event.isLiked ? event.likes - 1 : event.likes + 1,
            }
          : event,
      ),
    )
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "social":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "cultural":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "sports":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "workshop":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isEventUpcoming = (date: Date) => {
    return date.getTime() > new Date().getTime()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ISE Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Stay updated with the latest events from our Instagram and campus activities. Join us for academic,
            cultural, and social experiences!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="transition-all duration-200"
          >
            All Events
          </Button>
          <Button
            variant={selectedCategory === "academic" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("academic")}
            className="transition-all duration-200"
          >
            Academic
          </Button>
          <Button
            variant={selectedCategory === "cultural" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("cultural")}
            className="transition-all duration-200"
          >
            Cultural
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className={`hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                !isEventUpcoming(event.date) ? "opacity-75" : ""
              } border-2 hover:border-blue-300 dark:hover:border-blue-600`}
            >
              <div className="relative">
                <img
                  src={event.imageUrl || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                {!isEventUpcoming(event.date) && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-gray-600 text-white">
                      Past Event
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className={getCategoryColor(event.category)}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">{event.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">
                  {event.description}
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{formatDate(event.date)}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="font-medium">{event.time}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="font-medium">{event.location}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">
                      {event.attendees} attending
                      {event.maxAttendees && ` / ${event.maxAttendees} max`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(event.id)}
                      className={`flex items-center space-x-2 transition-colors duration-200 ${
                        event.isLiked ? "text-red-600 hover:text-red-700" : "text-gray-600 hover:text-red-600"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${event.isLiked ? "fill-current" : ""}`} />
                      <span className="font-medium">{event.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(event.instagramUrl, "_blank")}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-medium">Instagram</span>
                    </Button>
                  </div>

                  {isEventUpcoming(event.date) && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Join Event
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600">
            <CardContent className="p-12 text-center">
              <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">No Events Found</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No events match your selected category. Check back later for new events!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Instagram CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Follow Us on Instagram
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Stay updated with the latest events, announcements, and campus life by following our official Instagram
              account. Get behind-the-scenes content and real-time updates!
            </p>
            <Button
              onClick={() => window.open("https://instagram.com/ise_ude", "_blank")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Follow @ise_ude
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
