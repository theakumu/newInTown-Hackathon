"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Trophy, BookOpen, GamepadIcon, ArrowRight } from "lucide-react"
import Link from "next/link"

const germanWords = [
  { german: "HAUS", english: "House", pronunciation: "HOUSE" },
  { german: "BUCH", english: "Book", pronunciation: "BOOKH" },
  { german: "WELT", english: "World", pronunciation: "VELT" },
  { german: "ZEIT", english: "Time", pronunciation: "TSAIT" },
  { german: "LEBEN", english: "Life", pronunciation: "LAY-ben" },
  { german: "FREUND", english: "Friend", pronunciation: "FROYNT" },
  { german: "SCHULE", english: "School", pronunciation: "SHOO-leh" },
  { german: "ARBEIT", english: "Work", pronunciation: "AR-bite" },
  { german: "LIEBE", english: "Love", pronunciation: "LEE-beh" },
  { german: "MUSIK", english: "Music", pronunciation: "moo-ZEEK" },
  { german: "STADT", english: "City", pronunciation: "SHTAHT" },
  { german: "GELD", english: "Money", pronunciation: "GELT" },
  { german: "ESSEN", english: "Food", pronunciation: "ES-sen" },
  { german: "WASSER", english: "Water", pronunciation: "VAS-ser" },
  { german: "HIMMEL", english: "Sky", pronunciation: "HIM-mel" },
  { german: "Willkommen", english: "Welcome", pronunciation: "VILL-kom-men" },
  { german: "Universität", english: "University", pronunciation: "oo-nee-ver-zi-TAYT" },
  { german: "Studium", english: "Studies", pronunciation: "SHTOO-dee-oom" },
  { german: "Freund", english: "Friend", pronunciation: "FROYNT" },
  { german: "Hilfe", english: "Help", pronunciation: "HIL-feh" },
  { german: "Bibliothek", english: "Library", pronunciation: "bib-lee-oh-TAYK" },
  { german: "Vorlesung", english: "Lecture", pronunciation: "FOR-lay-zoong" },
  { german: "Prüfung", english: "Exam", pronunciation: "PRUE-foong" },
  { german: "Mensa", english: "Cafeteria", pronunciation: "MEN-za" },
  { german: "Wohnheim", english: "Dormitory", pronunciation: "VOHN-hime" },
]

const fiveLetterWords = germanWords.filter((w) => w.german.length === 5)

export function GermanWordOfDay() {
  const [targetWord, setTargetWord] = useState("")
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [gameWon, setGameWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showMeaning, setShowMeaning] = useState(false)
  const [currentWord, setCurrentWord] = useState(germanWords[0])

  useEffect(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const wordIndex = dayOfYear % fiveLetterWords.length
    setTargetWord(fiveLetterWords[wordIndex].german.toUpperCase())
    setCurrentWord(germanWords[wordIndex])
  }, [])

  const getLetterStatus = (letter: string, position: number, guess: string) => {
    if (!targetWord) return "default"

    if (targetWord[position] === letter) {
      return "correct" // Green - correct letter in correct position
    } else if (targetWord.includes(letter)) {
      return "present" // Yellow - letter exists but wrong position
    } else {
      return "absent" // Gray - letter not in word
    }
  }

  const getLetterColor = (status: string) => {
    switch (status) {
      case "correct":
        return "bg-green-500 text-white border-green-500"
      case "present":
        return "bg-yellow-500 text-white border-yellow-500"
      case "absent":
        return "bg-gray-400 text-white border-gray-400"
      default:
        return "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
    }
  }

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 5 || gameOver) return

    const newGuesses = [...guesses, currentGuess.toUpperCase()]
    setGuesses(newGuesses)

    if (currentGuess.toUpperCase() === targetWord) {
      setGameWon(true)
      setGameOver(true)
      setShowMeaning(true)
    } else if (newGuesses.length >= 6) {
      setGameOver(true)
      setShowMeaning(true)
    }

    setCurrentGuess("")
  }

  const resetGame = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const wordIndex = (dayOfYear + Math.floor(Math.random() * 10)) % fiveLetterWords.length
    setTargetWord(fiveLetterWords[wordIndex].german.toUpperCase())
    setGuesses([])
    setCurrentGuess("")
    setGameWon(false)
    setGameOver(false)
    setShowMeaning(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmitGuess()
    } else if (e.key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1))
    } else if (/^[a-zA-ZäöüÄÖÜß]$/.test(e.key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + e.key.toUpperCase())
    }
  }

  return (
    <div className="space-y-4">
      {/* German Wordle Game Button */}
      <Link href="/german-wordle">
        <Card className="max-w-md mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer group">
          <CardContent className="p-6 text-center text-white">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <GamepadIcon className="w-8 h-8 group-hover:animate-bounce" />
              <h3 className="text-xl font-bold">🇩🇪 German Wordle</h3>
            </div>
            <p className="text-blue-100 mb-4">Challenge yourself with our daily German word puzzle!</p>
            <div className="flex items-center justify-center space-x-2 text-sm font-medium">
              <span>Play Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Traditional Word of the Day */}
      <Card className="max-w-md mx-auto bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
        <CardContent className="p-4 bg-white dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <h3 className="text-sm font-medium mb-2 text-[rgba(38,36,182,1)] dark:text-blue-400">
              📚 German Word of the Day
            </h3>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{currentWord.german}</p>
              <p className="text-gray-600 dark:text-gray-300">{currentWord.english}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">{currentWord.pronunciation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Grid */}
      <Card className="max-w-md mx-auto mb-8 glass-effect border-blue-200 dark:border-gray-700">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg font-bold text-blue-700 dark:text-blue-300 flex items-center justify-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>🇩🇪 German Wordle</span>
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">Guess the 5-letter German word!</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex space-x-2 justify-center">
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  const guess = guesses[rowIndex] || ""
                  const letter = guess[colIndex] || ""
                  const isCurrentRow = rowIndex === guesses.length && !gameOver
                  const currentLetter = isCurrentRow ? currentGuess[colIndex] || "" : ""
                  const displayLetter = letter || currentLetter

                  const status = letter ? getLetterStatus(letter, colIndex, guess) : "default"

                  return (
                    <div
                      key={colIndex}
                      className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-300 ${getLetterColor(status)} ${
                        isCurrentRow && currentLetter ? "scale-110 border-blue-400" : ""
                      }`}
                    >
                      {displayLetter}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Input and Controls */}
          {!gameOver && (
            <div className="space-y-3">
              <Input
                value={currentGuess}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().replace(/[^A-ZÄÖÜß]/g, "")
                  if (value.length <= 5) setCurrentGuess(value)
                }}
                onKeyDown={handleKeyPress}
                placeholder="Enter 5-letter word..."
                className="text-center text-lg font-bold tracking-wider"
                maxLength={5}
              />
              <Button
                onClick={handleSubmitGuess}
                disabled={currentGuess.length !== 5}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Submit Guess ({guesses.length + 1}/6)
              </Button>
            </div>
          )}

          {/* Game Result */}
          {gameOver && (
            <div className="text-center space-y-3">
              {gameWon ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                    <Trophy className="w-6 h-6" />
                    <span className="text-xl font-bold">Ausgezeichnet!</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Solved in {guesses.length} guess{guesses.length !== 1 ? "es" : ""}!
                  </Badge>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">Game Over!</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    The word was: <span className="font-bold text-blue-600 dark:text-blue-400">{targetWord}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Word Meaning */}
          {showMeaning && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-center space-y-2">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 text-xl">{targetWord}</h4>
                <p className="text-gray-700 dark:text-gray-300">Welcome</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">Pronunciation: VILL-kom-men</p>
              </div>
            </div>
          )}

          {/* Reset Button */}
          {gameOver && (
            <Button
              onClick={resetGame}
              variant="outline"
              className="w-full flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-300 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </Button>
          )}

          {/* Instructions */}
          {guesses.length === 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p className="text-center font-medium">How to play:</p>
              <ul className="space-y-1">
                <li>• Guess the 5-letter German word in 6 tries</li>
                <li>
                  • <span className="inline-block w-3 h-3 bg-green-500 rounded"></span> Green = correct letter, correct
                  position
                </li>
                <li>
                  • <span className="inline-block w-3 h-3 bg-yellow-500 rounded"></span> Yellow = correct letter, wrong
                  position
                </li>
                <li>
                  • <span className="inline-block w-3 h-3 bg-gray-400 rounded"></span> Gray = letter not in word
                </li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
