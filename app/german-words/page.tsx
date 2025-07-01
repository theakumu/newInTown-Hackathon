"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Volume2, Home, Star, Clock } from "lucide-react"
import Link from "next/link"

interface GermanWord {
  german: string
  english: string
  pronunciation: string
  category: "basic" | "university" | "daily" | "academic"
  difficulty: "beginner" | "intermediate" | "advanced"
  example?: string
}

const germanWords: GermanWord[] = [
  {
    german: "Willkommen",
    english: "Welcome",
    pronunciation: "VILL-kom-men",
    category: "basic",
    difficulty: "beginner",
    example: "Willkommen an der Universität!",
  },
  {
    german: "Universität",
    english: "University",
    pronunciation: "oo-nee-ver-zi-TAYT",
    category: "university",
    difficulty: "beginner",
    example: "Die Universität Duisburg-Essen ist sehr modern.",
  },
  {
    german: "Studium",
    english: "Studies",
    pronunciation: "SHTOO-dee-oom",
    category: "academic",
    difficulty: "beginner",
    example: "Mein Studium macht mir Spaß.",
  },
  {
    german: "Freund",
    english: "Friend",
    pronunciation: "FROYNT",
    category: "basic",
    difficulty: "beginner",
    example: "Ich habe einen neuen Freund gefunden.",
  },
  {
    german: "Hilfe",
    english: "Help",
    pronunciation: "HIL-feh",
    category: "basic",
    difficulty: "beginner",
    example: "Können Sie mir helfen?",
  },
  {
    german: "Bibliothek",
    english: "Library",
    pronunciation: "bib-lee-oh-TAYK",
    category: "university",
    difficulty: "intermediate",
    example: "Die Bibliothek ist sehr groß.",
  },
  {
    german: "Vorlesung",
    english: "Lecture",
    pronunciation: "FOR-lay-zoong",
    category: "academic",
    difficulty: "intermediate",
    example: "Die Vorlesung beginnt um 10 Uhr.",
  },
  {
    german: "Prüfung",
    english: "Exam",
    pronunciation: "PRUE-foong",
    category: "academic",
    difficulty: "intermediate",
    example: "Nächste Woche habe ich eine wichtige Prüfung.",
  },
  {
    german: "Mensa",
    english: "Cafeteria",
    pronunciation: "MEN-za",
    category: "university",
    difficulty: "beginner",
    example: "Das Essen in der Mensa ist günstig.",
  },
  {
    german: "Wohnheim",
    english: "Dormitory",
    pronunciation: "VOHN-hime",
    category: "university",
    difficulty: "intermediate",
    example: "Ich wohne im Studentenwohnheim.",
  },
  {
    german: "Anmeldung",
    english: "Registration",
    pronunciation: "AN-mel-doong",
    category: "daily",
    difficulty: "advanced",
    example: "Die Anmeldung ist sehr wichtig.",
  },
  {
    german: "Krankenversicherung",
    english: "Health Insurance",
    pronunciation: "KRAN-ken-fer-zi-khe-roong",
    category: "daily",
    difficulty: "advanced",
    example: "Jeder Student braucht eine Krankenversicherung.",
  },
]

export default function GermanWordsPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  useEffect(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    setCurrentWordIndex(dayOfYear % germanWords.length)

    const savedFavorites = localStorage.getItem("german-word-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const filteredWords = germanWords.filter((word) => {
    const categoryMatch = selectedCategory === "all" || word.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "all" || word.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const currentWord = filteredWords[currentWordIndex % filteredWords.length] || germanWords[0]

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % filteredWords.length)
    setShowTranslation(false)
  }

  const prevWord = () => {
    setCurrentWordIndex((prev) => (prev - 1 + filteredWords.length) % filteredWords.length)
    setShowTranslation(false)
  }

  const toggleFavorite = (word: string) => {
    const newFavorites = favorites.includes(word) ? favorites.filter((f) => f !== word) : [...favorites, word]
    setFavorites(newFavorites)
    localStorage.setItem("german-word-favorites", JSON.stringify(newFavorites))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "basic":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "university":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "daily":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "academic":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            📚 German Word Learning
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Learn essential German vocabulary for your studies and daily life in Germany
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Categories
            </Button>
            <Button
              variant={selectedCategory === "basic" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("basic")}
            >
              Basic
            </Button>
            <Button
              variant={selectedCategory === "university" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("university")}
            >
              University
            </Button>
            <Button
              variant={selectedCategory === "academic" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("academic")}
            >
              Academic
            </Button>
            <Button
              variant={selectedCategory === "daily" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("daily")}
            >
              Daily Life
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedDifficulty === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("all")}
            >
              All Levels
            </Button>
            <Button
              variant={selectedDifficulty === "beginner" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("beginner")}
            >
              Beginner
            </Button>
            <Button
              variant={selectedDifficulty === "intermediate" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("intermediate")}
            >
              Intermediate
            </Button>
            <Button
              variant={selectedDifficulty === "advanced" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDifficulty("advanced")}
            >
              Advanced
            </Button>
          </div>
        </div>

        {/* Main Word Card */}
        <Card className="glass-effect border-blue-200 dark:border-gray-700 mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Button onClick={prevWord} variant="outline" size="sm" className="rounded-full bg-transparent">
                ←
              </Button>
              <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300 flex items-center space-x-2">
                <BookOpen className="w-6 h-6" />
                <span>Word of the Day</span>
              </CardTitle>
              <Button onClick={nextWord} variant="outline" size="sm" className="rounded-full bg-transparent">
                →
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Badge className={getCategoryColor(currentWord.category)}>{currentWord.category}</Badge>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${getDifficultyColor(currentWord.difficulty)}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{currentWord.difficulty}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            {/* German Word */}
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">{currentWord.german}</h2>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {showTranslation ? "Hide" : "Show"} Translation
                </Button>
                <Button
                  onClick={() => toggleFavorite(currentWord.german)}
                  variant="outline"
                  className={favorites.includes(currentWord.german) ? "text-yellow-500 border-yellow-500" : ""}
                >
                  <Star className={`w-4 h-4 ${favorites.includes(currentWord.german) ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline">
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Translation and Details */}
            {showTranslation && (
              <div className="space-y-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">{currentWord.english}</h3>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    Pronunciation: /{currentWord.pronunciation}/
                  </p>
                </div>

                {currentWord.example && (
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Example:</h4>
                    <p className="text-gray-700 dark:text-gray-300 italic">"{currentWord.example}"</p>
                  </div>
                )}
              </div>
            )}

            {/* Progress */}
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>
                  Word {(currentWordIndex % filteredWords.length) + 1} of {filteredWords.length}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>{favorites.length} favorites</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Word List */}
        <Card className="glass-effect border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">All Words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWords.map((word, index) => (
                <div
                  key={word.german}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                    index === currentWordIndex % filteredWords.length
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
                  onClick={() => {
                    setCurrentWordIndex(index)
                    setShowTranslation(false)
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 dark:text-white">{word.german}</h4>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getDifficultyColor(word.difficulty)}`}></div>
                      {favorites.includes(word.german) && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{word.english}</p>
                  <Badge className={`${getCategoryColor(word.category)} mt-2`} size="sm">
                    {word.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Tips */}
        <Card className="mt-8 glass-effect border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Learning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Practice pronunciation by repeating each word out loud</li>
              <li>• Try to use new words in sentences throughout your day</li>
              <li>• Create flashcards for words you find difficult</li>
              <li>• Practice with German-speaking friends or language partners</li>
              <li>• Review your favorite words regularly to reinforce memory</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
