import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Languages, Clock, Users, BookOpen, Award, Calendar, MapPin, Euro } from "lucide-react"

export default function GermanCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            German Language Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Learn German with courses offered by the University of Duisburg-Essen and partner institutions
          </p>
        </div>

        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <Languages className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Free Courses Available:</strong> UDE offers free German courses for international students. Register
            early as spots are limited!
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <BookOpen className="w-5 h-5" />
                <span>University German Courses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                  <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Beginner Courses (A1-A2)</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>4 hours per week</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>15-20 students per class</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Full semester duration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-green-600" />
                      <span>Free for UDE students</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                  <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-200">Advanced Courses (B1-C1)</h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>6 hours per week</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>12-15 students per class</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Full semester duration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-green-600" />
                      <span>Free for UDE students</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Course Schedule</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Winter Semester:</strong>
                    <ul className="mt-1 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Registration: September</li>
                      <li>• Classes: October - February</li>
                      <li>• Exam: February</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Summer Semester:</strong>
                    <ul className="mt-1 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>• Registration: March</li>
                      <li>• Classes: April - July</li>
                      <li>• Exam: July</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Award className="w-5 h-5" />
                <span>Language Levels & Certificates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      level: "A1-A2",
                      title: "Basic User",
                      desc: "Can understand and use familiar everyday expressions",
                      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                    },
                    {
                      level: "B1-B2",
                      title: "Independent User",
                      desc: "Can understand main points of clear standard input",
                      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                    },
                    {
                      level: "C1-C2",
                      title: "Proficient User",
                      desc: "Can understand virtually everything heard or read",
                      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                    },
                  ].map((level) => (
                    <div
                      key={level.level}
                      className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      <Badge className={`mb-2 ${level.color}`}>{level.level}</Badge>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{level.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{level.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Certificate Options</h4>
                  <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>
                      • <strong>Goethe Certificate:</strong> Internationally recognized German proficiency
                    </li>
                    <li>
                      • <strong>TestDaF:</strong> Required for university admission (B2-C1 level)
                    </li>
                    <li>
                      • <strong>DSH:</strong> University-specific German exam
                    </li>
                    <li>
                      • <strong>UDE Certificate:</strong> Internal certification for course completion
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <MapPin className="w-5 h-5" />
                <span>Additional Learning Opportunities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Language Exchange Programs</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      • <strong>Tandem Program:</strong> Practice with native German speakers
                    </li>
                    <li>
                      • <strong>Conversation Groups:</strong> Weekly informal meetings
                    </li>
                    <li>
                      • <strong>Language Café:</strong> Relaxed speaking practice
                    </li>
                    <li>
                      • <strong>Buddy System:</strong> German practice with student partners
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">External Resources</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      • <strong>Volkshochschule:</strong> Community college courses
                    </li>
                    <li>
                      • <strong>Goethe Institut:</strong> Professional language courses
                    </li>
                    <li>
                      • <strong>Online Platforms:</strong> Babbel, Duolingo, Deutsche Welle
                    </li>
                    <li>
                      • <strong>Private Tutors:</strong> Individual instruction
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Registration & Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">How to Register</h4>
                  <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>1. Take online placement test</li>
                    <li>2. Complete registration form</li>
                    <li>3. Submit student enrollment certificate</li>
                    <li>4. Attend orientation session</li>
                    <li>5. Receive class assignment</li>
                  </ol>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50/50 dark:bg-green-900/20">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Requirements</h4>
                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                      <li>• Valid UDE student enrollment</li>
                      <li>• Completed placement test</li>
                      <li>• Regular attendance (80% minimum)</li>
                      <li>• Participation in class activities</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50/50 dark:bg-blue-900/20">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Contact Information</h4>
                    <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                      <li>• Language Center: Room LC 137</li>
                      <li>• Phone: +49 203 379-2425</li>
                      <li>• Email: sprachkurse@uni-due.de</li>
                      <li>• Office Hours: Mon-Fri 9:00-12:00</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-2 rounded-lg transition-all duration-300 hover:scale-105">
                    Register for German Courses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
