import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Calendar, AlertTriangle, CheckCircle } from "lucide-react"

export default function CourseRegistrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Course Registration Guide</h1>
          <p className="text-gray-600">Complete guide to registering for courses at University of Duisburg-Essen</p>
        </div>

        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> Course registration deadlines are strictly enforced. Late registrations may not
            be accepted.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Registration Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Winter Semester</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Early Registration: July 1-15</li>
                    <li>Regular Registration: August 1-31</li>
                    <li>Late Registration: September 1-15</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Summer Semester</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Early Registration: January 1-15</li>
                    <li>Regular Registration: February 1-28</li>
                    <li>Late Registration: March 1-15</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step-by-Step Registration Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Access the Student Portal</h3>
                    <p className="text-gray-600 text-sm">
                      Log in to the university student portal using your student credentials
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Navigate to Course Registration</h3>
                    <p className="text-gray-600 text-sm">
                      Find the "Course Registration" or "Kursanmeldung" section in the portal
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Check Prerequisites</h3>
                    <p className="text-gray-600 text-sm">
                      Verify that you meet all prerequisites for the courses you want to register for
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold">Select Your Courses</h3>
                    <p className="text-gray-600 text-sm">
                      Browse available courses and add them to your registration list
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold">Submit Registration</h3>
                    <p className="text-gray-600 text-sm">Review your selections and submit your course registration</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold">Confirmation</h3>
                    <p className="text-gray-600 text-sm">
                      Wait for confirmation email and check your registration status in the portal
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Before Registration</span>
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Valid student enrollment</li>
                    <li>• Paid semester fees</li>
                    <li>• Completed prerequisite courses</li>
                    <li>• Academic advisor approval (if required)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span>Common Issues</span>
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Course capacity full</li>
                    <li>• Time conflicts between courses</li>
                    <li>• Missing prerequisites</li>
                    <li>• Technical portal issues</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Types and Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Badge className="mb-2">Lecture</Badge>
                    <h4 className="font-semibold">Vorlesung</h4>
                    <p className="text-sm text-gray-600">Traditional lectures with large groups</p>
                    <p className="text-sm font-medium mt-2">Usually 3-6 ECTS</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Badge className="mb-2">Seminar</Badge>
                    <h4 className="font-semibold">Seminar</h4>
                    <p className="text-sm text-gray-600">Interactive sessions with presentations</p>
                    <p className="text-sm font-medium mt-2">Usually 3-4 ECTS</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Badge className="mb-2">Lab</Badge>
                    <h4 className="font-semibold">Praktikum</h4>
                    <p className="text-sm text-gray-600">Hands-on practical work</p>
                    <p className="text-sm font-medium mt-2">Usually 2-4 ECTS</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">If you encounter issues during course registration:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Contact the Student Service Center (Studierendensekretariat)</li>
                  <li>• Visit your academic advisor during office hours</li>
                  <li>• Check the university's FAQ section</li>
                  <li>• Ask for help in the student forum</li>
                </ul>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Contact Information</h4>
                  <p className="text-sm text-blue-700">
                    Student Service Center: studierendensekretariat@uni-due.de
                    <br />
                    Phone: +49 203 379-2222
                    <br />
                    Office Hours: Mon-Fri 9:00-12:00, Mon-Thu 13:00-15:00
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
