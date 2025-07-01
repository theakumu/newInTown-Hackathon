"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Users, Globe, Award, ExternalLink, Clock, Euro, MapPin } from "lucide-react"
import Link from "next/link"

export default function LanguagePage() {
  const languageCourses = [
    {
      type: "University Courses",
      provider: "University of Duisburg-Essen",
      description: "Official German courses offered by UDE for international students",
      levels: "A1 - C2",
      duration: "1 semester",
      price: "€50-100",
      schedule: "2-3 times per week",
      benefits: ["ECTS credits", "Official certificate", "Student discounts", "Campus location"],
      contact: "sprachkurse@uni-due.de",
      website: "https://www.uni-due.de/international/",
    },
    {
      type: "Volkshochschule (VHS)",
      provider: "VHS Duisburg & VHS Essen",
      description: "Community college German courses - affordable and comprehensive",
      levels: "A1 - C2",
      duration: "10-15 weeks",
      price: "€120-200",
      schedule: "2 times per week (evenings)",
      benefits: ["Very affordable", "Evening classes", "Integration courses", "Official certificates"],
      contact: "info@vhs-duisburg.de",
      website: "https://www.vhs-duisburg.de/",
    },
    {
      type: "Private Language Schools",
      provider: "Various (Berlitz, Inlingua, etc.)",
      description: "Intensive German courses with flexible schedules",
      levels: "A1 - C2",
      duration: "4-12 weeks",
      price: "€300-800",
      schedule: "Daily intensive or flexible",
      benefits: ["Small groups", "Flexible timing", "Intensive programs", "Business German"],
      contact: "Contact individual schools",
      website: "Search locally",
    },
  ]

  const onlineResources = [
    {
      name: "Deutsche Welle (DW)",
      type: "Free",
      description: "Comprehensive German learning platform with courses, news, and media",
      features: ["A1-C2 courses", "News in slow German", "Mobile app", "Placement test"],
      url: "https://learngerman.dw.com/",
    },
    {
      name: "Goethe Institute",
      type: "Free/Paid",
      description: "Official German cultural institute with high-quality learning materials",
      features: ["Online courses", "Cultural content", "Exam preparation", "Community"],
      url: "https://www.goethe.de/",
    },
    {
      name: "Babbel",
      type: "Paid (€6-13/month)",
      description: "Popular language learning app with structured lessons",
      features: ["Interactive lessons", "Speech recognition", "Mobile app", "Practical focus"],
      url: "https://www.babbel.com/",
    },
    {
      name: "Busuu",
      type: "Paid (€5-17/month)",
      description: "Social language learning with native speaker feedback",
      features: ["AI-powered lessons", "Native speaker feedback", "Offline mode", "Certificates"],
      url: "https://www.busuu.com/",
    },
    {
      name: "Lingoda",
      type: "Paid (€50-500/month)",
      description: "Online German classes with certified teachers",
      features: ["Live classes", "Certified teachers", "Flexible schedule", "CEFR certificates"],
      url: "https://www.lingoda.com/",
    },
  ]

  const practiceOpportunities = [
    {
      title: "Language Exchange (Tandem)",
      description: "Practice German with native speakers while helping them with your language",
      locations: ["University language center", "HelloTalk app", "Tandem app", "Local meetups"],
      tips: ["Meet regularly", "Prepare topics", "Be patient", "Exchange languages equally"],
    },
    {
      title: "Conversation Groups",
      description: "Join German conversation groups in Duisburg and Essen",
      locations: ["Libraries", "Community centers", "Cafés", "University groups"],
      tips: ["Don't be shy", "Ask questions", "Listen actively", "Practice regularly"],
    },
    {
      title: "German Media Consumption",
      description: "Improve your German through movies, TV shows, podcasts, and books",
      locations: ["Netflix (German content)", "ARD/ZDF Mediathek", "Spotify podcasts", "Local libraries"],
      tips: ["Start with subtitles", "Choose familiar content", "Take notes", "Repeat watching"],
    },
    {
      title: "Daily Life Practice",
      description: "Use German in everyday situations around the city",
      locations: ["Shops", "Restaurants", "Government offices", "Public transport"],
      tips: ["Prepare phrases", "Ask for help", "Don't switch to English", "Practice small talk"],
    },
  ]

  const germanExams = [
    {
      name: "TestDaF",
      level: "B2-C1",
      purpose: "University admission",
      price: "€195",
      description: "Test of German as a Foreign Language for academic purposes",
    },
    {
      name: "DSH",
      level: "B2-C2",
      purpose: "University admission",
      price: "€150",
      description: "German Language University Entrance Examination",
    },
    {
      name: "Goethe Certificate",
      level: "A1-C2",
      purpose: "General proficiency",
      price: "€80-255",
      description: "Internationally recognized German language certificates",
    },
    {
      name: "telc Deutsch",
      level: "A1-C2",
      purpose: "General/Professional",
      price: "€120-180",
      description: "European Language Certificates for various purposes",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/life-in-germany">
            <Button variant="outline" className="mb-4 flex items-center space-x-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Life in Germany</span>
            </Button>
          </Link>

          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">German Language Learning</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Master German with courses, resources, and practice opportunities in Duisburg-Essen
          </p>
        </div>

        {/* German Language Courses */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <Award className="w-6 h-6 text-green-600" />
            <span>German Language Courses</span>
          </h2>

          <div className="grid gap-6">
            {languageCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-blue-700 dark:text-blue-300">{course.type}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 font-medium">{course.provider}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {course.levels}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Duration:</strong> {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Price:</strong> {course.price}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Schedule:</strong> {course.schedule}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      <strong>Contact:</strong> {course.contact}
                    </span>
                    <span>
                      <strong>Website:</strong> {course.website}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Online Learning Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <Globe className="w-6 h-6 text-purple-600" />
            <span>Online Learning Resources</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {onlineResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">{resource.name}</CardTitle>
                    <Badge
                      variant={resource.type.includes("Free") ? "default" : "secondary"}
                      className={resource.type.includes("Free") ? "bg-green-100 text-green-800" : ""}
                    >
                      {resource.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{resource.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {resource.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Website</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Practice Opportunities */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <Users className="w-6 h-6 text-orange-600" />
            <span>Practice Opportunities</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceOpportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-700 dark:text-orange-300">{opportunity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{opportunity.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Where to find:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {opportunity.locations.map((location, idx) => (
                        <li key={idx}>{location}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Tips:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {opportunity.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* German Proficiency Exams */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <Award className="w-6 h-6 text-red-600" />
            <span>German Proficiency Exams</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {germanExams.map((exam, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-red-700 dark:text-red-300">{exam.name}</CardTitle>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {exam.level}
                      </Badge>
                      <div className="text-sm font-semibold text-green-600">{exam.price}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {exam.purpose}
                    </Badge>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{exam.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-xl text-blue-800 dark:text-blue-200 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Quick Learning Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">For Beginners (A1-A2):</h4>
                  <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>Start with basic phrases for daily situations</li>
                    <li>Focus on pronunciation and listening</li>
                    <li>Use flashcards for vocabulary building</li>
                    <li>Practice with children's books and shows</li>
                    <li>Don't worry about perfect grammar initially</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">For Advanced (B2-C2):</h4>
                  <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>Read German newspapers and academic texts</li>
                    <li>Watch German news and documentaries</li>
                    <li>Practice writing essays and formal letters</li>
                    <li>Join German debate groups or forums</li>
                    <li>Focus on idiomatic expressions and cultural nuances</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
