"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Download, FileText, Search, Calendar, User } from "lucide-react"

interface Document {
  id: string
  title: string
  description: string
  category: "academic" | "administrative" | "housing" | "general"
  fileType: "pdf" | "doc" | "xlsx"
  size: string
  uploadDate: string
  downloadCount: number
}

const documents: Document[] = [
  {
    id: "1",
    title: "Course Registration Guide",
    description: "Step-by-step guide for registering courses in the university system",
    category: "academic",
    fileType: "pdf",
    size: "2.3 MB",
    uploadDate: "2024-01-15",
    downloadCount: 245,
  },
  {
    id: "2",
    title: "Residence Permit Application Form",
    description: "Official form for applying for residence permit in Germany",
    category: "administrative",
    fileType: "pdf",
    size: "1.8 MB",
    uploadDate: "2024-01-10",
    downloadCount: 189,
  },
  {
    id: "3",
    title: "Student Housing Application",
    description: "Application form for university dormitories and student housing",
    category: "housing",
    fileType: "pdf",
    size: "1.2 MB",
    uploadDate: "2024-01-08",
    downloadCount: 156,
  },
  {
    id: "4",
    title: "Health Insurance Comparison",
    description: "Comparison of different health insurance options for students",
    category: "administrative",
    fileType: "xlsx",
    size: "0.8 MB",
    uploadDate: "2024-01-05",
    downloadCount: 134,
  },
  {
    id: "5",
    title: "Campus Map and Building Guide",
    description: "Detailed map of both Duisburg and Essen campuses with building locations",
    category: "general",
    fileType: "pdf",
    size: "5.2 MB",
    uploadDate: "2024-01-03",
    downloadCount: 298,
  },
  {
    id: "6",
    title: "Exam Regulations Handbook",
    description: "Complete guide to exam procedures, regulations, and important dates",
    category: "academic",
    fileType: "pdf",
    size: "3.1 MB",
    uploadDate: "2024-01-01",
    downloadCount: 167,
  },
  {
    id: "7",
    title: "Bank Account Opening Checklist",
    description: "Required documents and steps for opening a German bank account",
    category: "administrative",
    fileType: "doc",
    size: "0.5 MB",
    uploadDate: "2023-12-28",
    downloadCount: 203,
  },
  {
    id: "8",
    title: "German Language Course Information",
    description: "Information about free German language courses offered by the university",
    category: "general",
    fileType: "pdf",
    size: "1.4 MB",
    uploadDate: "2023-12-25",
    downloadCount: 178,
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "administrative":
        return "bg-red-100 text-red-800"
      case "housing":
        return "bg-green-100 text-green-800"
      case "general":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFileTypeIcon = (fileType: string) => {
    return <FileText className="w-4 h-4" />
  }

  const handleDownload = (document: Document) => {
    // In a real application, this would trigger the actual file download
    alert(`Downloading: ${document.title}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Document Library</h1>
          <p className="text-gray-600 mb-6">
            Download important documents, forms, and guides for your studies and life in Germany
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Categories
            </Button>
            <Button
              variant={selectedCategory === "academic" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("academic")}
            >
              Academic
            </Button>
            <Button
              variant={selectedCategory === "administrative" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("administrative")}
            >
              Administrative
            </Button>
            <Button
              variant={selectedCategory === "housing" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("housing")}
            >
              Housing
            </Button>
            <Button
              variant={selectedCategory === "general" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("general")}
            >
              General
            </Button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">{document.title}</CardTitle>
                  <Badge variant="secondary" className={getCategoryColor(document.category)}>
                    {document.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{document.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    {getFileTypeIcon(document.fileType)}
                    <span>{document.fileType.toUpperCase()}</span>
                  </div>
                  <span>{document.size}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{document.downloadCount}</span>
                  </div>
                </div>

                <Button onClick={() => handleDownload(document)} className="w-full" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Documents Found</h3>
              <p className="text-gray-600">
                No documents match your search criteria. Try adjusting your search terms or category filter.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Upload Request Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need a Document?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Can't find the document you're looking for? Let us know what you need and we'll try to add it to the
              library.
            </p>
            <Button variant="outline">
              <User className="w-4 h-4 mr-2" />
              Request Document
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
