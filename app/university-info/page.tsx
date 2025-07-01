import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, BookOpen, FileText, Calendar } from "lucide-react"

export default function UniversityInfoPage() {
  const infoPages = [
    {
      title: "Course Registration",
      description: "Learn how to register for courses, prerequisites, and important deadlines",
      href: "/university-info/course-registration",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      title: "Exams",
      description: "Exam procedures, schedules, regulations, and important information",
      href: "/university-info/exams",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Course Credits",
      description: "Understanding ECTS credits, requirements, and academic progression",
      href: "/university-info/course-credits",
      icon: GraduationCap,
      color: "bg-purple-500",
    },
    {
      title: "German Courses",
      description: "Information about German language courses offered by the university",
      href: "/university-info/german-courses",
      icon: Calendar,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">University Information</h1>
          <p className="text-gray-600 mb-6">
            Essential academic information for ISE students at University of Duisburg-Essen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoPages.map((page) => {
            const IconComponent = page.icon
            return (
              <Link key={page.href} href={page.href}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardHeader>
                    <div
                      className={`${page.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{page.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{page.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you can't find the information you're looking for, here are additional resources:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Visit the International Student Office</li>
              <li>Contact your academic advisor</li>
              <li>Check the official university website</li>
              <li>Ask questions in the student forum</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
