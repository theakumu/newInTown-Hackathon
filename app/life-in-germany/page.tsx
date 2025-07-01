import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, CreditCard, Home, MessageCircle, Briefcase } from "lucide-react"

export default function LifeInGermanyPage() {
  const infoPages = [
    {
      title: "Registration & Residence Permit",
      description: "Essential steps for legal residence in Germany including Anmeldung and visa requirements",
      href: "/life-in-germany/registration",
      icon: FileText,
      color: "bg-red-500",
    },
    {
      title: "Bank Account",
      description: "How to open a German bank account, required documents, and best options for students",
      href: "/life-in-germany/bank-account",
      icon: CreditCard,
      color: "bg-green-500",
    },
    {
      title: "Housing & Rundfunkbeitrag",
      description: "Finding accommodation, dormitories, WG options, and understanding broadcasting fees",
      href: "/life-in-germany/housing",
      icon: Home,
      color: "bg-blue-500",
    },
    {
      title: "Language",
      description: "German language learning resources, courses, and tips for daily communication",
      href: "/life-in-germany/language",
      icon: MessageCircle,
      color: "bg-purple-500",
    },
    {
      title: "Jobs & Work",
      description: "Student job opportunities, work permits, and employment regulations for international students",
      href: "/life-in-germany/jobs",
      icon: Briefcase,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Life in Germany</h1>
          <p className="text-gray-600 mb-6">Essential information for international students living in Germany</p>
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
            <CardTitle>Quick Tips for New Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">First Week Priorities</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Complete address registration (Anmeldung)</li>
                  <li>• Open a German bank account</li>
                  <li>• Get health insurance</li>
                  <li>• Register for courses</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Cultural Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Germans value punctuality</li>
                  <li>• Quiet hours (Ruhezeiten) are respected</li>
                  <li>• Recycling is taken seriously</li>
                  <li>• Cash is still commonly used</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Emergency</h4>
                <p className="text-red-700">Police, Fire, Medical: 112</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">University</h4>
                <p className="text-blue-700">International Office: +49 203 379-2430</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Student Support</h4>
                <p className="text-green-700">Counseling: +49 203 379-2464</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
