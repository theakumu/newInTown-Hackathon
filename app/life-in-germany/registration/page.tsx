import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, MapPin, AlertTriangle, CheckCircle, CreditCard } from "lucide-react"

export default function RegistrationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Registration & Residence Permit
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Essential steps for legal residence in Germany including Anmeldung and visa requirements
          </p>
        </div>

        <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>Important:</strong> You must register your address (Anmeldung) within 14 days of moving to Germany.
            This is legally required!
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <FileText className="w-5 h-5" />
                <span>Address Registration (Anmeldung)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Required Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Valid passport or ID card</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Rental contract (Mietvertrag)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Landlord confirmation (Wohnungsgeberbestätigung)</span>
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Completed registration form</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Birth certificate (if required)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Marriage certificate (if applicable)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Duisburg Registration Office</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Address:</strong> Sonnenwall 73-75, 47051 Duisburg
                    </li>
                    <li>
                      <strong>Phone:</strong> +49 203 283-2345
                    </li>
                    <li>
                      <strong>Hours:</strong> Mon-Fri 8:00-16:00
                    </li>
                    <li>
                      <strong>Appointment:</strong> Required (online booking)
                    </li>
                  </ul>
                </div>

                <div className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Essen Registration Office</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Address:</strong> Porscheplatz 1, 45121 Essen
                    </li>
                    <li>
                      <strong>Phone:</strong> +49 201 88-88888
                    </li>
                    <li>
                      <strong>Hours:</strong> Mon-Fri 8:00-16:00
                    </li>
                    <li>
                      <strong>Appointment:</strong> Required (online booking)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <CreditCard className="w-5 h-5" />
                <span>Residence Permit (Aufenthaltstitel)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50/50 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">EU/EEA Citizens</h4>
                  <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <li>• No residence permit required</li>
                    <li>• Can live and work freely in Germany</li>
                    <li>• Only need address registration</li>
                    <li>• Can apply for permanent residence after 5 years</li>
                  </ul>
                </div>

                <div className="p-4 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50/50 dark:bg-orange-900/20">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">Non-EU Citizens</h4>
                  <ul className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                    <li>• Residence permit required</li>
                    <li>• Apply within 90 days of arrival</li>
                    <li>• Student visa converts to residence permit</li>
                    <li>• Renewal required annually</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                  Required Documents for Residence Permit
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>• Valid passport with entry visa</li>
                    <li>• Biometric passport photos</li>
                    <li>• University enrollment certificate</li>
                    <li>• Proof of financial resources</li>
                    <li>• Health insurance certificate</li>
                  </ul>
                  <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>• Address registration certificate</li>
                    <li>• Academic transcripts</li>
                    <li>• Language proficiency certificate</li>
                    <li>• Application form (completed)</li>
                    <li>• Fee payment (€100-110)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Clock className="w-5 h-5" />
                <span>Step-by-Step Process</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Find Accommodation",
                    desc: "Secure housing and get rental contract",
                    timeline: "Before arrival",
                  },
                  {
                    step: 2,
                    title: "Complete Anmeldung",
                    desc: "Register address within 14 days",
                    timeline: "Within 14 days",
                  },
                  {
                    step: 3,
                    title: "Open Bank Account",
                    desc: "Required for residence permit application",
                    timeline: "Week 1-2",
                  },
                  {
                    step: 4,
                    title: "Get Health Insurance",
                    desc: "Mandatory for residence permit",
                    timeline: "Week 1-2",
                  },
                  {
                    step: 5,
                    title: "Apply for Residence Permit",
                    desc: "Submit application with all documents",
                    timeline: "Within 90 days",
                  },
                  {
                    step: 6,
                    title: "Biometric Appointment",
                    desc: "Provide fingerprints and photo",
                    timeline: "2-4 weeks later",
                  },
                  {
                    step: 7,
                    title: "Collect Permit",
                    desc: "Pick up residence permit card",
                    timeline: "4-8 weeks later",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start space-x-4 p-4 border border-blue-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{item.desc}</p>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.timeline}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Important Tips & Common Mistakes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Tips for Success</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Book appointments online in advance</li>
                    <li>• Bring all original documents plus copies</li>
                    <li>• Learn basic German phrases for appointments</li>
                    <li>• Keep all receipts and confirmations</li>
                    <li>• Ask for help from international office</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Common Mistakes</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Missing the 14-day registration deadline</li>
                    <li>• Not getting landlord confirmation</li>
                    <li>• Incomplete document translations</li>
                    <li>• Not bringing enough passport photos</li>
                    <li>• Forgetting to update address when moving</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Contact & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">UDE International Office</h4>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <li>Phone: +49 203 379-2430</li>
                    <li>Email: international-office@uni-due.de</li>
                    <li>Office Hours: Mon-Fri 9:00-12:00</li>
                    <li>Location: Campus Duisburg, SG 134</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Emergency Contacts</h4>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <li>Police: 110</li>
                    <li>Emergency Services: 112</li>
                    <li>Student Counseling: +49 203 379-2464</li>
                    <li>Legal Aid: studentenwerk-essen.de</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
