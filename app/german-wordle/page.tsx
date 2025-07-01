"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Trophy, BookOpen, Home, Lightbulb } from "lucide-react"
import Link from "next/link"

const germanWords = [
  { word: "HAUS", meaning: "House", pronunciation: "HOUSE" },
  { word: "BUCH", meaning: "Book", pronunciation: "BOOKH" },
  { word: "WELT", meaning: "World", pronunciation: "VELT" },
  { word: "ZEIT", meaning: "Time", pronunciation: "TSAIT" },
  { word: "LEBEN", meaning: "Life", pronunciation: "LAY-ben" },
  { word: "SCHULE", meaning: "School", pronunciation: "SHOO-leh" },
  { word: "ARBEIT", meaning: "Work", pronunciation: "AR-bite" },
  { word: "LIEBE", meaning: "Love", pronunciation: "LEE-beh" },
  { word: "MUSIK", meaning: "Music", pronunciation: "moo-ZEEK" },
  { word: "STADT", meaning: "City", pronunciation: "SHTAHT" },
  { word: "GELD", meaning: "Money", pronunciation: "GELT" },
  { word: "ESSEN", meaning: "Food", pronunciation: "ES-sen" },
  { word: "WASSER", meaning: "Water", pronunciation: "VAS-ser" },
  { word: "HIMMEL", meaning: "Sky", pronunciation: "HIM-mel" },
  { word: "FREUND", meaning: "Friend", pronunciation: "FROYNT" },
  { word: "SPIEL", meaning: "Game", pronunciation: "SHPEEL" },
  { word: "KRAFT", meaning: "Power", pronunciation: "KRAFT" },
  { word: "PLATZ", meaning: "Place", pronunciation: "PLAHTS" },
  { word: "BRIEF", meaning: "Letter", pronunciation: "BREEF" },
  { word: "TRAUM", meaning: "Dream", pronunciation: "TROWM" },
]

const fiveLetterWords = germanWords.filter((w) => w.word.length === 5)

export default function GermanWordlePage() {
  const [targetWord, setTargetWord] = useState("")
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [gameWon, setGameWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showMeaning, setShowMeaning] = useState(false)
  const [currentRow, setCurrentRow] = useState(0)

  useEffect(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const wordIndex = dayOfYear % fiveLetterWords.length
    setTargetWord(fiveLetterWords[wordIndex].word.toUpperCase())
  }, [])

  const getLetterStatus = (letter: string, position: number, guess: string) => {
    if (!targetWord || !guess) return "default"

    const targetLetters = targetWord.split("")
    const guessLetters = guess.split("")

    // First pass: mark exact matches
    const letterCounts = {}
    const result = new Array(5).fill("absent")

    // Count letters in target word
    targetLetters.forEach((letter) => {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1
    })

    // First pass: exact matches
    guessLetters.forEach((letter, idx) => {
      if (letter === targetLetters[idx]) {
        result[idx] = "correct"
        letterCounts[letter]--
      }
    })

    // Second pass: wrong position matches
    guessLetters.forEach((letter, idx) => {
      if (result[idx] === "absent" && letterCounts[letter] > 0) {
        result[idx] = "present"
        letterCounts[letter]--
      }
    })

    return result[position]
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
        return "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
    }
  }

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 5 || gameOver) return

    const newGuesses = [...guesses, currentGuess.toUpperCase()]
    setGuesses(newGuesses)
    setCurrentRow(currentRow + 1)

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
    const randomIndex = Math.floor(Math.random() * fiveLetterWords.length)
    setTargetWord(fiveLetterWords[randomIndex].word.toUpperCase())
    setGuesses([])
    setCurrentGuess("")
    setGameWon(false)
    setGameOver(false)
    setShowMeaning(false)
    setCurrentRow(0)
  }

  const handleLetterClick = (letter: string) => {
    if (currentGuess.length < 5 && !gameOver) {
      setCurrentGuess((prev) => prev + letter)
    }
  }

  const handleBackspace = () => {
    setCurrentGuess((prev) => prev.slice(0, -1))
  }

  const currentWordData = fiveLetterWords.find((w) => w.word === targetWord)

  const keyboard = [
    ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Y", "X", "C", "V", "B", "N", "M"],
  ]

  const getKeyboardLetterStatus = (letter: string) => {
    let status = "default"
    guesses.forEach((guess) => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === letter) {
          const letterStatus = getLetterStatus(letter, i, guess)
          if (letterStatus === "correct") {
            status = "correct"
          } else if (letterStatus === "present" && status !== "correct") {
            status = "present"
          } else if (letterStatus === "absent" && status === "default") {
            status = "absent"
          }
        }
      }
    })
    return status
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
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
            🇩🇪 German Wordle
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Guess the 5-letter German word in 6 tries and learn new vocabulary!
          </p>
        </div>

        <Card className="glass-effect border-blue-200 dark:border-gray-700 mb-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg font-bold text-blue-700 dark:text-blue-300 flex items-center justify-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Daily German Challenge</span>
            </CardTitle>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <Badge variant="outline">Attempt {guesses.length + 1}/6</Badge>
              {gameWon && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Won!</Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Game Grid */}
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
                        className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center font-bold text-xl transition-all duration-300 ${getLetterColor(status)} ${
                          isCurrentRow && currentLetter ? "scale-110 border-blue-400 shadow-lg" : ""
                        }`}
                      >
                        {displayLetter}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Virtual Keyboard */}
            <div className="space-y-2">
              {keyboard.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-1">
                  {rowIndex === 2 && (
                    <Button
                      onClick={handleSubmitGuess}
                      disabled={currentGuess.length !== 5 || gameOver}
                      className="px-3 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                      ENTER
                    </Button>
                  )}
                  {row.map((letter) => (
                    <Button
                      key={letter}
                      onClick={() => handleLetterClick(letter)}
                      disabled={gameOver}
                      className={`w-10 h-12 text-sm font-bold rounded transition-all duration-200 ${getLetterColor(getKeyboardLetterStatus(letter))}`}
                    >
                      {letter}
                    </Button>
                  ))}
                  {rowIndex === 2 && (
                    <Button
                      onClick={handleBackspace}
                      disabled={gameOver}
                      className="px-3 py-2 text-xs font-bold bg-gray-600 hover:bg-gray-700 text-white rounded"
                    >
                      ⌫
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Game Result */}
            {gameOver && (
              <div className="text-center space-y-4">
                {gameWon ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                      <Trophy className="w-8 h-8" />
                      <span className="text-2xl font-bold">Ausgezeichnet!</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-lg px-4 py-2">
                      Solved in {guesses.length} guess{guesses.length !== 1 ? "es" : ""}!
                    </Badge>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xl font-semibold text-red-600 dark:text-red-400">Game Over!</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      The word was:{" "}
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-xl">{targetWord}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Word Meaning */}
            {showMeaning && currentWordData && (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Word of the Day</span>
                  </div>
                  <h4 className="font-bold text-blue-800 dark:text-blue-200 text-3xl">{targetWord}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">{currentWordData.meaning}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    Pronunciation: /{currentWordData.pronunciation}/
                  </p>
                </div>
              </div>
            )}

            {/* Reset Button */}
            {gameOver && (
              <Button
                onClick={resetGame}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Play Again</span>
              </Button>
            )}

            {/* Instructions */}
            {guesses.length === 0 && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <p className="text-center font-semibold text-yellow-800 dark:text-yellow-200 flex items-center justify-center space-x-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>How to Play</span>
                  </p>
                  <ul className="space-y-1">
                    <li>• Guess the 5-letter German word in 6 tries</li>
                    <li className="flex items-center space-x-2">
                      <span>•</span>
                      <span className="inline-block w-4 h-4 bg-green-500 rounded"></span>
                      <span>Green = correct letter, correct position</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>•</span>
                      <span className="inline-block w-4 h-4 bg-yellow-500 rounded"></span>
                      <span>Yellow = correct letter, wrong position</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span>•</span>
                      <span className="inline-block w-4 h-4 bg-gray-400 rounded"></span>
                      <span>Gray = letter not in word</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Tips */}
        <Card className="glass-effect border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">German Learning Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Practice these words in daily conversations</li>
              <li>• Try to use each word in a sentence</li>
              <li>• Pay attention to German pronunciation patterns</li>
              <li>• Challenge yourself with a new word every day</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
