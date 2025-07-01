import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Calculator, Target, Award, BookOpen, Clock } from "lucide-react"

export default function CourseCreditsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Course Credits (ECTS)
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Understanding the European Credit Transfer System and academic progression at UDE
          </p>
        </div>

        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <GraduationCap className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>ECTS Credits:</strong> 1 ECTS credit represents 25-30 hours of student workload including lectures,
            seminars, and self-study.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Calculator className="w-5 h-5" />
                <span>Credit Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                  <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Bachelor's Degree</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Credits Required</span>
                        <span className="font-semibold">180 ECTS</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Duration: 6 semesters (3 years)</li>
                      <li>• Per semester: 30 ECTS average</li>
                      <li>• Thesis: 12-15 ECTS</li>
                      <li>• Internship: 12-18 ECTS</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                  <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200 flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Master's Degree</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Credits Required</span>
                        <span className="font-semibold">120 ECTS</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Duration: 4 semesters (2 years)</li>
                      <li>• Per semester: 30 ECTS average</li>
                      <li>• Thesis: 30 ECTS</li>
                      <li>• Specialization: 60-90 ECTS</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Target className="w-5 h-5" />
                <span>Credit Distribution by Course Type</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    type: "Lecture",
                    credits: "3-6 ECTS",
                    workload: "75-150 hours",
                    description: "Traditional lectures with exam",
                  },
                  {
                    type: "Seminar",
                    credits: "3-4 ECTS",
                    workload: "75-100 hours",
                    description: "Interactive sessions with presentation",
                  },
                  {
                    type: "Laboratory",
                    credits: "2-4 ECTS",
                    workload: "50-100 hours",
                    description: "Practical hands-on work",
                  },
                  {
                    type: "Project Work",
                    credits: "6-12 ECTS",
                    workload: "150-300 hours",
                    description: "Semester-long project",
                  },
                  {
                    type: "Internship",
                    credits: "12-18 ECTS",
                    workload: "300-450 hours",
                    description: "Industry experience",
                  },
                  {
                    type: "Thesis",
                    credits: "12-30 ECTS",
                    workload: "300-750 hours",
                    description: "Research and writing",
                  },
                ].map((course) => (
                  <div
                    key={course.type}
                    className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{course.type}</h4>
                    <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {course.credits}
                    </Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{course.description}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {course.workload}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Award className="w-5 h-5" />
                <span>Academic Progress Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    Semester Progress Example (Bachelor)
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        semester: "Semester 1-2",
                        credits: "60 ECTS",
                        percentage: 33,
                        description: "Foundation courses",
                      },
                      {
                        semester: "Semester 3-4",
                        credits: "60 ECTS",
                        percentage: 67,
                        description: "Core specialization",
                      },
                      {
                        semester: "Semester 5-6",
                        credits: "60 ECTS",
                        percentage: 100,
                        description: "Advanced courses + Thesis",
                      },
                    ].map((sem) => (
                      <div key={sem.semester}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{sem.semester}</span>
                          <span>{sem.credits}</span>
                        </div>
                        <Progress value={sem.percentage} className="h-2 mb-1" />
                        <p className="text-xs text-gray-600 dark:text-gray-400">{sem.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50/50 dark:bg-green-900/20">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Good Academic Standing</h4>
                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                      <li>• Complete 30 ECTS per semester</li>
                      <li>• Maintain GPA above 2.5</li>
                      <li>• Pass all required courses</li>
                      <li>• Meet prerequisite requirements</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50/50 dark:bg-orange-900/20">
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Academic Probation</h4>
                    <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
                      <li>• Less than 20 ECTS per semester</li>
                      <li>• GPA below 2.0</li>
                      <li>• Multiple failed courses</li>
                      <li>• Missing key prerequisites</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Credit Transfer and Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Transfer Credits</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• From other German universities</li>
                      <li>• International exchange programs</li>
                      <li>• Previous degree programs</li>
                      <li>• Professional certifications</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Recognition Process</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Submit official transcripts</li>
                      <li>• Course content comparison</li>
                      <li>• Academic committee review</li>
                      <li>• Decision within 4-6 weeks</li>
                    </ul>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                  <AlertDescription className="text-blue-800 dark:text-blue-200">
                    <strong>Tip:</strong> Apply for credit recognition early in your studies to avoid delays in
                    graduation.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Graduation Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">To Graduate You Must:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li>✓ Complete all required ECTS credits</li>
                      <li>✓ Pass all mandatory courses</li>
                      <li>✓ Complete internship (if required)</li>
                      <li>✓ Submit and defend thesis</li>
                    </ul>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li>✓ Maintain minimum GPA</li>
                      <li>✓ Pay all semester fees</li>
                      <li>✓ Complete language requirements</li>
                      <li>✓ Apply for graduation</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center p-4 border border-blue-200 dark:border-gray-600 rounded-lg">
                  <GraduationCap className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Graduation ceremonies are held twice a year in March and September
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
