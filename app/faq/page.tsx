"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: "academic" | "housing" | "administrative" | "social" | "technical"
  tags: string[]
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I register for courses?",
    answer:
      "Course registration is done through the university's online portal. Log in with your student credentials, navigate to 'Course Registration', check prerequisites, select your courses, and submit. Registration periods are typically in July-August for winter semester and January-February for summer semester.",
    category: "academic",
    tags: ["courses", "registration", "portal"],
  },
  {
    id: "2",
    question: "What documents do I need for address registration (Anmeldung)?",
    answer:
      "For Anmeldung, you need: valid passport, rental contract or confirmation of accommodation, completed registration form (Anmeldeformular), and sometimes a confirmation from your landlord (Wohnungsgeberbestätigung). Visit the local registration office (Bürgeramt) within 14 days of moving.",
    category: "administrative",
    tags: ["anmeldung", "documents", "registration"],
  },
  {
    id: "3",
    question: "How can I find student housing?",
    answer:
      "Check these resources: University housing office, WG-Gesucht.de, Studenten-WG.de, Facebook groups for students, local newspapers, and ask in the buddy system. Apply early as housing is competitive. Consider both dormitories and shared apartments (WG).",
    category: "housing",
    tags: ["housing", "dormitory", "wg", "accommodation"],
  },
  {
    id: "4",
    question: "What health insurance do I need?",
    answer:
      "Health insurance is mandatory in Germany. EU students can use EHIC card temporarily, but should get German insurance. Non-EU students must have German health insurance. Options include public insurance (AOK, TK, Barmer) or private insurance. Public insurance costs around €110/month for students.",
    category: "administrative",
    tags: ["health insurance", "mandatory", "public", "private"],
  },
  {
    id: "5",
    question: "How do I open a German bank account?",
    answer:
      "Visit a bank branch with: passport, student enrollment certificate, address registration (Anmeldung), and sometimes proof of income. Popular student-friendly banks include Deutsche Bank, Commerzbank, and online banks like N26. Many offer free student accounts.",
    category: "administrative",
    tags: ["bank account", "documents", "student account"],
  },
  {
    id: "6",
    question: "Can I work as an international student?",
    answer:
      "EU students can work without restrictions. Non-EU students can work 120 full days or 240 half days per year without additional permit. For more hours, you need approval from Ausländerbehörde and Arbeitsagentur. Popular student jobs include tutoring, research assistant, and part-time positions.",
    category: "administrative",
    tags: ["work", "student job", "permit", "restrictions"],
  },
  {
    id: "7",
    question: "How does the German grading system work?",
    answer:
      "German grades range from 1.0 (excellent) to 5.0 (fail). 1.0-1.5 = sehr gut (very good), 1.6-2.5 = gut (good), 2.6-3.5 = befriedigend (satisfactory), 3.6-4.0 = ausreichend (sufficient), 5.0 = nicht ausreichend (insufficient/fail).",
    category: "academic",
    tags: ["grades", "grading system", "marks"],
  },
  {
    id: "8",
    question: "What is the buddy system and how do I join?",
    answer:
      "The buddy system pairs new international students with current students to help with integration. Visit the buddy system page on this website, register with your details, and you'll be matched with someone of the same gender. Your buddy can help with practical questions and social integration.",
    category: "social",
    tags: ["buddy system", "integration", "help"],
  },
  {
    id: "9",
    question: "How do I get my student ID card?",
    answer:
      "After enrollment, visit the student service center with your enrollment confirmation and a passport photo. The card gives you access to libraries, discounts, and campus facilities. It also serves as your semester ticket for public transport in the region.",
    category: "academic",
    tags: ["student id", "card", "enrollment"],
  },
  {
    id: "10",
    question: "What is Rundfunkbeitrag and do I have to pay it?",
    answer:
      "Rundfunkbeitrag is Germany's broadcasting fee (€18.36/month per household). Students living in dorms might be exempt if they receive BAföG. For shared apartments, only one person per household pays. You can apply for exemption with proof of financial hardship.",
    category: "administrative",
    tags: ["rundfunkbeitrag", "broadcasting fee", "exemption"],
  },
  {
    id: "11",
    question: "How do I access the university WiFi?",
    answer:
      "Connect to 'eduroam' network using your university credentials (student ID + password). If you have issues, try 'UDE-WLAN' as a backup. For setup help, visit the IT service center or check the university's IT support website for configuration guides.",
    category: "technical",
    tags: ["wifi", "eduroam", "internet", "campus"],
  },
  {
    id: "12",
    question: "Where can I learn German for free?",
    answer:
      "The university offers free German courses for international students. Check the language center website for schedules. Other options include: Volkshochschule (adult education center), language exchange programs, online resources like Deutsche Welle, and conversation groups.",
    category: "social",
    tags: ["german language", "free courses", "learning"],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "housing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "administrative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "social":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "technical":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-bounce-slow" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Find answers to common questions about studying and living in Germany
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-effect border-blue-200 dark:border-gray-600"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "academic", "housing", "administrative", "social", "technical"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-blue-200 dark:border-gray-600"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <Card
              key={faq.id}
              className="glass-effect border-blue-200 dark:border-gray-700 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="cursor-pointer" onClick={() => toggleExpanded(faq.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                      {faq.question}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getCategoryColor(faq.category)}>
                        {faq.category}
                      </Badge>
                      <div className="flex flex-wrap gap-1">
                        {faq.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300" />
                    )}
                  </div>
                </div>
              </CardHeader>
              {expandedItems.has(faq.id) && (
                <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-300">
                  <div className="border-t border-blue-100 dark:border-gray-700 pt-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">No FAQs Found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No questions match your search criteria. Try adjusting your search terms or category filter.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Contact Section */}
        <Card className="mt-8 glass-effect border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Still Have Questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Can't find what you're looking for? Here are other ways to get help:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Ask in the student forum for community help</li>
              <li>• Connect with a buddy through the buddy system</li>
              <li>• Contact the International Student Office</li>
              <li>• Visit the university's official website</li>
              <li>• Attend orientation events and workshops</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
