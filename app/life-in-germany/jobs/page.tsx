"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Briefcase, Clock, Euro, FileText, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const jobTypes = [
    {
      title: "Student Assistant (HiWi)",
      description: "Work as a research or teaching assistant at the university",
      hourlyRate: "€10-15",
      monthlyIncome: "€400-600",
      maxHours: "19 hours/week",
      requirements: ["Enrolled student", "Good grades", "Relevant skills"],
      benefits: ["Flexible schedule", "Academic experience", "Networking", "CV building"],
      where: "University departments, research institutes, libraries",
    },
    {
      title: "Mini-Job (450€ Job)",
      description: "Part-time work in retail, hospitality, or services",
      hourlyRate: "€12-15",
      monthlyIncome: "€300-450",
      maxHours: "10-15 hours/week",
      requirements: ["Basic German", "Reliability", "Customer service skills"],
      benefits: ["Tax-free income", "Flexible hours", "Work experience", "Language practice"],
      where: "Supermarkets, restaurants, cafés, retail stores",
    },
    {
      title: "Working Student (Werkstudent)",
      description: "Professional work in your field of study",
      hourlyRate: "€12-20",
      monthlyIncome: "€500-800",
      maxHours: "20 hours/week",
      requirements: ["Advanced German", "Relevant studies", "Professional skills"],
      benefits: ["Industry experience", "Higher pay", "Career development", "Professional network"],
      where: "Companies, startups, consulting firms, tech companies",
    },
    {
      title: "Freelancing",
      description: "Independent work in tutoring, translation, or digital services",
      hourlyRate: "€15-50",
      monthlyIncome: "€200-1000+",
      maxHours: "Flexible",
      requirements: ["Specialized skills", "Self-motivation", "Business registration"],
      benefits: ["Complete flexibility", "Higher earning potential", "Skill development", "Entrepreneurship"],
      where: "Online platforms, private clients, small businesses",
    },
  ]

  const workPermitInfo = [
    {
      category: "EU/EEA Students",
      status: "✅ No Restrictions",
      details: "Can work unlimited hours without special permits",
      requirements: ["Valid student enrollment", "EU/EEA passport or ID"],
    },
    {
      category: "Non-EU Students",
      status: "⚠️ Limited Hours",
      details: "120 full days OR 240 half days per year",
      requirements: ["Valid student visa", "Enrollment certificate", "Work permit for some jobs"],
    },
    {
      category: "Student Visa Holders",
      status: "📋 Permit Required",
      details: "Need approval from Ausländerbehörde for most work",
      requirements: ["Student visa", "University enrollment", "Work permit application"],
    },
  ]

  const jobPortals = [
    {
      name: "StepStone",
      type: "General",
      description: "Germany's leading job portal with professional positions",
      url: "https://www.stepstone.de/",
      bestFor: "Working student positions, internships",
    },
    {
      name: "Indeed Deutschland",
      type: "General",
      description: "International job search engine with German positions",
      url: "https://de.indeed.com/",
      bestFor: "All types of student jobs",
    },
    {
      name: "Xing Jobs",
      type: "Professional",
      description: "German professional network with job listings",
      url: "https://www.xing.com/jobs",
      bestFor: "Professional working student positions",
    },
    {
      name: "Studentjob.de",
      type: "Student-focused",
      description: "Specialized platform for student jobs and internships",
      url: "https://www.studentjob.de/",
      bestFor: "Mini-jobs, HiWi positions, part-time work",
    },
    {
      name: "Jobmensa",
      type: "Student-focused",
      description: "Student job portal with flexible opportunities",
      url: "https://www.jobmensa.de/",
      bestFor: "Flexible student jobs, event work",
    },
    {
      name: "UDE Job Portal",
      type: "University",
      description: "Official UDE job board for student positions",
      url: "https://www.uni-due.de/stellenmarkt/",
      bestFor: "HiWi positions, research assistantships",
    },
  ]

  const salaryTable = [
    { position: "Student Assistant (HiWi)", hourly: "€10-15", monthly: "€400-600", annual: "€4,800-7,200" },
    { position: "Mini-Job", hourly: "€12-15", monthly: "€300-450", annual: "€3,600-5,400" },
    { position: "Working Student", hourly: "€12-20", monthly: "€500-800", annual: "€6,000-9,600" },
    { position: "Tutoring", hourly: "€15-25", monthly: "€200-500", annual: "€2,400-6,000" },
    { position: "Freelance Translation", hourly: "€20-40", monthly: "€300-800", annual: "€3,600-9,600" },
    { position: "Event Staff", hourly: "€12-18", monthly: "€200-400", annual: "€2,400-4,800" },
  ]

  const applicationTips = [
    {
      title: "German CV (Lebenslauf)",
      points: [
        "Include a professional photo (common in Germany)",
        "List education and work experience chronologically",
        "Include personal details (age, nationality, marital status)",
        "Keep it to 1-2 pages maximum",
        "Use a clean, professional format",
      ],
    },
    {
      title: "Cover Letter (Anschreiben)",
      points: [
        "Address it to a specific person if possible",
        "Explain why you want this specific job",
        "Highlight relevant skills and experience",
        "Show knowledge about the company",
        "Keep it to one page",
      ],
    },
    {
      title: "Interview Preparation",
      points: [
        "Research the company thoroughly",
        "Prepare answers in German",
        "Practice common interview questions",
        "Prepare questions to ask the interviewer",
        "Dress professionally and arrive on time",
      ],
    },
    {
      title: "Required Documents",
      points: [
        "CV (Lebenslauf) with photo",
        "Cover letter (Anschreiben)",
        "University enrollment certificate",
        "Transcript of records",
        "Work permit (if required)",
        "References from previous employers",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/life-in-germany">
            <Button variant="outline" className="mb-4 flex items-center space-x-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Life in Germany</span>
            </Button>
          </Link>

          <div className="flex items-center space-x-3 mb-4">
            <Briefcase className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Jobs & Work for Students</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Find part-time work opportunities and understand work regulations for international students in Germany
          </p>
        </div>

        {/* Work Permit Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <FileText className="w-6 h-6 text-blue-600" />
            <span>Work Permit Information</span>
          </h2>

          <div className="grid gap-4">
            {workPermitInfo.map((info, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{info.category}</h3>
                      <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{info.status}</p>
                    </div>
                    <AlertCircle className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{info.details}</p>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {info.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Job Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-green-600" />
            <span>Types of Student Jobs</span>
          </h2>

          <div className="grid gap-6">
            {jobTypes.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-green-700 dark:text-green-300">{job.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300">{job.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{job.hourlyRate}/hour</div>
                      <div className="text-sm text-gray-500">{job.monthlyIncome}/month</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Max Hours: {job.maxHours}</span>
                      </h4>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.benefits.map((benefit, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Where to find:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.where}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Salary Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <Euro className="w-6 h-6 text-yellow-600" />
            <span>Salary Overview</span>
          </h2>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Hourly Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Monthly Income
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Annual Income
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {salaryTable.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {row.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {row.hourly}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {row.monthly}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {row.annual}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Job Search Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <ExternalLink className="w-6 h-6 text-purple-600" />
            <span>Job Search Resources</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobPortals.map((portal, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-purple-700 dark:text-purple-300">{portal.name}</CardTitle>
                    <Badge variant="secondary">{portal.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{portal.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Best for:</strong> {portal.bestFor}
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Website</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Tips */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-blue-600" />
            <span>Application Tips</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applicationTips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700 dark:text-blue-300">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    {tip.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Reminders</h3>
                <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>Always check your work permit restrictions before accepting a job</li>
                  <li>Keep track of your working hours to stay within legal limits</li>
                  <li>Inform your employer about your student status and work restrictions</li>
                  <li>Consider the impact of work on your studies and academic performance</li>
                  <li>Save money for taxes if you earn more than the tax-free allowance</li>
                  <li>Update your address with employers when you move</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
