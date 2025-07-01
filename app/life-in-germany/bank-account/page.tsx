import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Building, Clock, CheckCircle, AlertTriangle, Euro, Smartphone } from "lucide-react"

export default function BankAccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Opening a German Bank Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete guide to opening a bank account in Germany as an international student
          </p>
        </div>

        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <CreditCard className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Important:</strong> A German bank account is essential for rent payments, receiving BAföG, and many
            daily transactions in Germany.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Building className="w-5 h-5" />
                <span>Student-Friendly Banks</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "Deutsche Bank",
                    type: "Traditional Bank",
                    fee: "Free for students",
                    features: ["Free student account", "ATMs nationwide", "English support", "Online banking"],
                    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                  },
                  {
                    name: "Commerzbank",
                    type: "Traditional Bank",
                    fee: "Free for students",
                    features: ["StartKonto for students", "Free debit card", "Mobile banking", "Branch network"],
                    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                  },
                  {
                    name: "N26",
                    type: "Online Bank",
                    fee: "Free basic account",
                    features: ["100% mobile", "English app", "Instant notifications", "No paperwork"],
                    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                  },
                  {
                    name: "DKB",
                    type: "Online Bank",
                    fee: "Free with conditions",
                    features: ["Free worldwide ATM", "No foreign fees", "Online only", "Student benefits"],
                    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                  },
                  {
                    name: "Sparkasse",
                    type: "Regional Bank",
                    fee: "€5-10/month",
                    features: ["Local presence", "Comprehensive services", "Student discounts", "Regional focus"],
                    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                  },
                  {
                    name: "ING",
                    type: "Online Bank",
                    fee: "Free for students",
                    features: ["Free account", "No minimum balance", "Free debit card", "English support"],
                    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
                  },
                ].map((bank) => (
                  <div
                    key={bank.name}
                    className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{bank.name}</h4>
                      <Badge className={bank.color}>{bank.type}</Badge>
                    </div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-3">
                      <Euro className="w-3 h-3 inline mr-1" />
                      {bank.fee}
                    </p>
                    <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                      {bank.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <CheckCircle className="w-5 h-5" />
                <span>Required Documents</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Essential Documents</h4>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Valid passport or ID card</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Address registration (Anmeldung)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Student enrollment certificate</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Proof of income (if applicable)</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Additional Documents</h4>
                  <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <li className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span>Birth certificate (sometimes required)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span>Visa or residence permit</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span>Tax ID (Steuerliche Identifikationsnummer)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span>Initial deposit (varies by bank)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Smartphone className="w-5 h-5" />
                <span>Account Opening Process</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Choose Your Bank",
                    desc: "Compare fees, services, and locations",
                    tip: "Consider online banks for convenience, traditional banks for personal service",
                  },
                  {
                    step: 2,
                    title: "Gather Documents",
                    desc: "Collect all required paperwork",
                    tip: "Make copies of everything and bring originals",
                  },
                  {
                    step: 3,
                    title: "Book Appointment",
                    desc: "Schedule meeting at bank branch",
                    tip: "Online banks may offer video calls or digital processes",
                  },
                  {
                    step: 4,
                    title: "Visit Bank/Complete Online",
                    desc: "Meet with advisor or complete digital application",
                    tip: "Ask questions about fees, services, and student benefits",
                  },
                  {
                    step: 5,
                    title: "Identity Verification",
                    desc: "Complete PostIdent or VideoIdent process",
                    tip: "For online banks, this can be done via video call",
                  },
                  {
                    step: 6,
                    title: "Receive Banking Details",
                    desc: "Get account number, IBAN, and debit card",
                    tip: "Cards usually arrive within 5-10 business days",
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
                      <p className="text-blue-600 dark:text-blue-400 text-xs italic">💡 {item.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Banking in Germany - What to Know</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">Banking Culture</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Cash is still widely used in Germany</li>
                    <li>• Many places don't accept credit cards</li>
                    <li>• Debit cards (EC-Karte) are standard</li>
                    <li>• Online banking is very secure and popular</li>
                    <li>• Bank transfers are free and instant</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-400">Important Terms</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      • <strong>Girokonto:</strong> Current/checking account
                    </li>
                    <li>
                      • <strong>IBAN:</strong> International bank account number
                    </li>
                    <li>
                      • <strong>BIC:</strong> Bank identifier code
                    </li>
                    <li>
                      • <strong>Überweisung:</strong> Bank transfer
                    </li>
                    <li>
                      • <strong>Lastschrift:</strong> Direct debit
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Common Issues & Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50/50 dark:bg-red-900/20">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Common Problems</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                    <li>• Bank requires German address before you can get apartment</li>
                    <li>• Language barriers during account opening</li>
                    <li>• High fees for international transfers</li>
                    <li>• Difficulty getting credit cards as a student</li>
                  </ul>
                </div>
                <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50/50 dark:bg-green-900/20">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Solutions</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>• Use temporary accommodation address initially</li>
                    <li>• Bring a German-speaking friend or use translation apps</li>
                    <li>• Consider online banks with better international features</li>
                    <li>• Build credit history gradually with debit card usage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Next Steps After Opening Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Immediate Actions</h4>
                  <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                    <li>• Set up online banking</li>
                    <li>• Download mobile banking app</li>
                    <li>• Set up direct debits for rent and utilities</li>
                    <li>• Inform university of your bank details</li>
                    <li>• Update address with all services</li>
                  </ul>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">Long-term Planning</h4>
                  <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-300">
                    <li>• Consider savings account for emergency fund</li>
                    <li>• Look into student investment options</li>
                    <li>• Build credit history for future needs</li>
                    <li>• Explore additional banking services</li>
                    <li>• Plan for post-graduation banking needs</li>
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
