import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, BookOpen } from "lucide-react"

export default function ExamsPage() {
  const examPeriods = [
    {
      title: "Winter Semester Exams",
      period: "February - March",
      status: "upcoming",
      description: "Main examination period for winter semester courses",
    },
    {
      title: "Summer Semester Exams",
      period: "July - August",
      status: "planning",
      description: "Main examination period for summer semester courses",
    },
    {
      title: "Retake Exams",
      period: "September - October",
      status: "planning",
      description: "Second attempt examinations for failed courses",
    },
  ]

  const examTips = [
    {
      title: "Registration",
      description: "Register for exams through the online portal at least 2 weeks before the exam date",
      icon: Calendar,
    },
    {
      title: "Preparation",
      description: "Start studying early and use past exam papers available in the library",
      icon: BookOpen,
    },
    {
      title: "Documentation",
      description: "Bring your student ID and any required materials to the exam",
      icon: CheckCircle,
    },
    {
      title: "Timing",
      description: "Arrive at least 15 minutes before the scheduled exam time",
      icon: Clock,
    },
  ]

  const importantDates = [
    {
      date: "January 15",
      event: "Exam registration opens",
      type: "registration",
    },
    {
      date: "February 1",
      event: "Registration deadline",
      type: "deadline",
    },
    {
      date: "February 15",
      event: "Exam period begins",
      type: "exam",
    },
    {
      date: "March 15",
      event: "Exam period ends",
      type: "exam",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Examination Information
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about exams at University of Duisburg-Essen
          </p>
        </div>

        {/* Exam Periods */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Exam Periods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examPeriods.map((period, index) => (
              <Card
                key={index}
                className="glass-effect border-blue-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{period.title}</CardTitle>
                    <Badge variant={period.status === "upcoming" ? "default" : "secondary"}>{period.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-600">{period.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{period.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Important Dates</h2>
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                {importantDates.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.type === "deadline"
                            ? "bg-red-500"
                            : item.type === "registration"
                              ? "bg-green-500"
                              : "bg-blue-500"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-gray-800 dark:text-white">{item.date}</span>
                        <span className="text-gray-600 dark:text-gray-300">{item.event}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Exam Tips & Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examTips.map((tip, index) => {
              const IconComponent = tip.icon
              return (
                <Card
                  key={index}
                  className="glass-effect border-blue-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{tip.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="glass-effect border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <span>Need Help?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Examination Office</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Building LC, Room 105</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Mon-Fri: 9:00-15:00</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Student Advisory</h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>Email: studienberatung@uni-due.de</div>
                  <div>Phone: +49 203 379-2345</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
