"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Calculator, Info, TrendingUp } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Course {
  id: string
  name: string
  credits: number
  grade: number
}

export default function GradeCalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([{ id: "1", name: "", credits: 0, grade: 0 }])

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: "",
      credits: 0,
      grade: 0,
    }
    setCourses([...courses, newCourse])
  }

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id))
    }
  }

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(courses.map((course) => (course.id === id ? { ...course, [field]: value } : course)))
  }

  const calculateGPA = () => {
    const validCourses = courses.filter((c) => c.credits > 0 && c.grade > 0 && c.grade <= 5)
    if (validCourses.length === 0) return 0

    const totalCredits = validCourses.reduce((sum, c) => sum + c.credits, 0)
    const weightedSum = validCourses.reduce((sum, c) => sum + c.grade * c.credits, 0)

    return totalCredits > 0 ? weightedSum / totalCredits : 0
  }

  const gpa = calculateGPA()
  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0)

  const getGradeColor = (grade: number) => {
    if (grade === 0) return "text-gray-400"
    if (grade <= 1.5) return "text-green-600 dark:text-green-400"
    if (grade <= 2.5) return "text-blue-600 dark:text-blue-400"
    if (grade <= 3.5) return "text-yellow-600 dark:text-yellow-400"
    if (grade <= 4.0) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getGradeLabel = (grade: number) => {
    if (grade === 0) return "No grades yet"
    if (grade <= 1.5) return "Excellent (Sehr gut)"
    if (grade <= 2.5) return "Good (Gut)"
    if (grade <= 3.5) return "Satisfactory (Befriedigend)"
    if (grade <= 4.0) return "Sufficient (Ausreichend)"
    return "Failed (Nicht bestanden)"
  }

  const getBackgroundColor = (grade: number) => {
    if (grade === 0) return "bg-gray-100 dark:bg-gray-800"
    if (grade <= 1.5) return "bg-green-50 dark:bg-green-900/20"
    if (grade <= 2.5) return "bg-blue-50 dark:bg-blue-900/20"
    if (grade <= 3.5) return "bg-yellow-50 dark:bg-yellow-900/20"
    if (grade <= 4.0) return "bg-orange-50 dark:bg-orange-900/20"
    return "bg-red-50 dark:bg-red-900/20"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-4 mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Grade Calculator</h1>
              <p className="text-gray-600 dark:text-gray-400">Calculate your GPA based on German grading system</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Course Input */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Your Courses</span>
                </CardTitle>
                <CardDescription>Add your courses with credits and grades (1.0-5.0)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Course {index + 1}</span>
                      {courses.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCourse(course.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="md:col-span-1">
                        <Label htmlFor={`name-${course.id}`} className="text-sm">
                          Course Name
                        </Label>
                        <Input
                          id={`name-${course.id}`}
                          placeholder="e.g., Mathematics I"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`credits-${course.id}`} className="text-sm">
                          Credits (ECTS)
                        </Label>
                        <Input
                          id={`credits-${course.id}`}
                          type="number"
                          min="0"
                          max="30"
                          placeholder="e.g., 6"
                          value={course.credits || ""}
                          onChange={(e) => updateCourse(course.id, "credits", Number.parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`grade-${course.id}`} className="text-sm">
                          Grade (1.0-5.0)
                        </Label>
                        <Input
                          id={`grade-${course.id}`}
                          type="number"
                          min="1.0"
                          max="5.0"
                          step="0.1"
                          placeholder="e.g., 2.0"
                          value={course.grade || ""}
                          onChange={(e) => updateCourse(course.id, "grade", Number.parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button onClick={addCourse} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Another Course
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results & Info */}
          <div className="space-y-4">
            {/* GPA Result */}
            <Card className={`shadow-xl border-2 ${getBackgroundColor(gpa)}`}>
              <CardHeader>
                <CardTitle className="text-center">Your GPA</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className={`text-6xl font-bold ${getGradeColor(gpa)}`}>{gpa > 0 ? gpa.toFixed(2) : "—"}</div>
                <div className={`text-lg font-semibold ${getGradeColor(gpa)}`}>{getGradeLabel(gpa)}</div>
                <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Credits:</span>
                    <span className="font-semibold">{totalCredits} ECTS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Courses:</span>
                    <span className="font-semibold">{courses.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grading Scale */}
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Info className="w-5 h-5" />
                  <span>German Grading Scale</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  {
                    range: "1.0 - 1.5",
                    label: "Sehr gut",
                    labelEn: "Excellent",
                    color: "text-green-600 dark:text-green-400",
                  },
                  { range: "1.6 - 2.5", label: "Gut", labelEn: "Good", color: "text-blue-600 dark:text-blue-400" },
                  {
                    range: "2.6 - 3.5",
                    label: "Befriedigend",
                    labelEn: "Satisfactory",
                    color: "text-yellow-600 dark:text-yellow-400",
                  },
                  {
                    range: "3.6 - 4.0",
                    label: "Ausreichend",
                    labelEn: "Sufficient",
                    color: "text-orange-600 dark:text-orange-400",
                  },
                  {
                    range: "4.1 - 5.0",
                    label: "Nicht bestanden",
                    labelEn: "Failed",
                    color: "text-red-600 dark:text-red-400",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <span className={`font-semibold ${item.color}`}>{item.range}</span>
                    <div className="text-right">
                      <div className={`font-medium ${item.color}`}>{item.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.labelEn}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="shadow-xl border-2 bg-blue-50 dark:bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-lg">💡 Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>• Lower grades are better in the German system (1.0 is the best)</p>
                <p>• GPA is calculated as a weighted average based on credits</p>
                <p>• Formula: GPA = Σ(grade × credits) / Σ(credits)</p>
                <p>• This calculator uses your local browser only - no data is saved online</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
