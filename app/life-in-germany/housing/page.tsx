import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Home, Euro, Wifi, AlertTriangle, CheckCircle, MapPin } from "lucide-react"

export default function HousingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Housing & Rundfunkbeitrag
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete guide to finding accommodation and understanding broadcasting fees in Germany
          </p>
        </div>

        <Alert className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
          <Home className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <strong>Housing Crisis:</strong> Student housing is extremely competitive in Germany. Start your search
            early and have multiple backup options!
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Home className="w-5 h-5" />
                <span>Housing Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    type: "Student Dormitory",
                    german: "Studentenwohnheim",
                    price: "€200-400/month",
                    pros: ["Cheapest option", "All utilities included", "International community", "Furnished rooms"],
                    cons: ["Long waiting lists", "Shared facilities", "Strict rules", "Limited privacy"],
                    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                  },
                  {
                    type: "Shared Apartment",
                    german: "WG (Wohngemeinschaft)",
                    price: "€300-600/month",
                    pros: ["Social environment", "Shared costs", "Flexible contracts", "Learn German"],
                    cons: ["Personality conflicts", "Shared responsibilities", "Varying cleanliness", "Turnover"],
                    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                  },
                  {
                    type: "Studio Apartment",
                    german: "1-Zimmer-Wohnung",
                    price: "€400-800/month",
                    pros: ["Complete privacy", "Own kitchen/bathroom", "No roommate issues", "Quiet study space"],
                    cons: ["Most expensive", "Utilities separate", "Can be isolating", "Harder to find"],
                    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                  },
                  {
                    type: "Host Family",
                    german: "Gastfamilie",
                    price: "€400-700/month",
                    pros: ["Cultural immersion", "Meals included", "Language practice", "Local guidance"],
                    cons: ["Less independence", "House rules", "Limited guests", "Cultural adjustment"],
                    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
                  },
                  {
                    type: "Private Dormitory",
                    german: "Privates Wohnheim",
                    price: "€500-900/month",
                    pros: ["Modern facilities", "All-inclusive", "Good locations", "International students"],
                    cons: ["Expensive", "Corporate feel", "Less authentic", "Waiting lists"],
                    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                  },
                  {
                    type: "Temporary Housing",
                    german: "Zwischenmiete",
                    price: "€20-50/night",
                    pros: ["Short-term solution", "Flexible dates", "Time to search", "No long commitment"],
                    cons: ["Expensive long-term", "Unstable", "Limited belongings", "Constant moving"],
                    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                  },
                ].map((housing) => (
                  <div
                    key={housing.type}
                    className="p-4 border border-blue-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{housing.type}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">{housing.german}</p>
                      <Badge className={`mt-2 ${housing.color}`}>
                        <Euro className="w-3 h-3 mr-1" />
                        {housing.price}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">Pros:</h5>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {housing.pros.map((pro, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <CheckCircle className="w-2 h-2 text-green-500" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">Cons:</h5>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                          {housing.cons.map((con, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <AlertTriangle className="w-2 h-2 text-red-500" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <MapPin className="w-5 h-5" />
                <span>Where to Search</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Online Platforms</h4>
                  {[
                    { name: "WG-Gesucht.de", desc: "Most popular for shared apartments", type: "WG & Apartments" },
                    { name: "Studenten-WG.de", desc: "Specifically for students", type: "Student Housing" },
                    { name: "Immobilienscout24.de", desc: "Largest real estate platform", type: "All Types" },
                    { name: "eBay Kleinanzeigen", desc: "Classified ads platform", type: "Various" },
                    { name: "Facebook Groups", desc: "Local housing groups", type: "Community" },
                  ].map((platform) => (
                    <div key={platform.name} className="p-3 border border-blue-200 dark:border-gray-600 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-gray-800 dark:text-white">{platform.name}</h5>
                        <Badge variant="outline" className="text-xs">
                          {platform.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{platform.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">Official Sources</h4>
                  {[
                    {
                      name: "University Housing Office",
                      desc: "Official student dormitories",
                      contact: "housing@uni-due.de",
                    },
                    { name: "Studentenwerk Essen", desc: "Student services organization", contact: "+49 201 8204-0" },
                    {
                      name: "International Office",
                      desc: "Support for international students",
                      contact: "international@uni-due.de",
                    },
                    { name: "Local Housing Companies", desc: "Private housing providers", contact: "Various contacts" },
                  ].map((source) => (
                    <div key={source.name} className="p-3 border border-blue-200 dark:border-gray-600 rounded-lg">
                      <h5 className="font-medium text-gray-800 dark:text-white mb-1">{source.name}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{source.desc}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">{source.contact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                <Wifi className="w-5 h-5" />
                <span>Rundfunkbeitrag (Broadcasting Fee)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                    <strong>Mandatory Fee:</strong> Every household in Germany must pay €18.36 per month for public
                    broadcasting, regardless of usage.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">What You Need to Know</h4>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li>• €18.36 per month per household</li>
                      <li>• Automatic registration when you register address</li>
                      <li>• One fee per apartment/WG (not per person)</li>
                      <li>• Covers TV, radio, and online content</li>
                      <li>• Payment by direct debit (SEPA)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Exemptions Available</h4>
                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                      <li>• BAföG recipients (with proof)</li>
                      <li>• Students with severe financial hardship</li>
                      <li>• People with certain disabilities</li>
                      <li>• Recipients of social benefits</li>
                      <li>• Students in dormitories (sometimes)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">How to Handle Rundfunkbeitrag</h4>
                  <div className="space-y-3">
                    {[
                      {
                        step: 1,
                        action: "Receive Registration Letter",
                        desc: "You'll get a letter after address registration",
                      },
                      {
                        step: 2,
                        action: "Check for Exemptions",
                        desc: "Apply for exemption if you qualify (within 4 weeks)",
                      },
                      { step: 3, action: "Set Up Payment", desc: "Provide bank details for automatic payment" },
                      { step: 4, action: "Keep Records", desc: "Save all correspondence for your records" },
                    ].map((item) => (
                      <div key={item.step} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {item.step}
                        </div>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-white">{item.action}: </span>
                          <span className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Housing Search Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400">Success Strategies</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Start searching 3-6 months before arrival</li>
                    <li>• Create a compelling application with photo</li>
                    <li>• Respond to listings within hours</li>
                    <li>• Have all documents ready digitally</li>
                    <li>• Be flexible with location and requirements</li>
                    <li>• Consider temporary housing first</li>
                    <li>• Network through university and social media</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400">Red Flags to Avoid</h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>• Requests for money before viewing</li>
                    <li>• Prices significantly below market rate</li>
                    <li>• No viewing appointments offered</li>
                    <li>• Poor German/English in communications</li>
                    <li>• Pressure to decide immediately</li>
                    <li>• Requests for personal financial information</li>
                    <li>• No proper rental contract offered</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-300">Emergency Housing Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 dark:text-red-200">
                    If you arrive without housing, contact the International Office immediately for emergency
                    accommodation options.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Temporary Solutions</h4>
                    <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                      <li>• Youth hostels (short-term)</li>
                      <li>• Airbnb (expensive but immediate)</li>
                      <li>• Hotel/pension (temporary)</li>
                      <li>• Couchsurfing (free, social)</li>
                      <li>• University guest rooms</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Support Contacts</h4>
                    <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                      <li>• International Office: +49 203 379-2430</li>
                      <li>• Student Counseling: +49 203 379-2464</li>
                      <li>• Studentenwerk: +49 201 8204-0</li>
                      <li>• Emergency Hotline: 112</li>
                      <li>• Buddy System (via this website)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
