"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AnimatedCounter } from "@/components/animated-counter"
import { CheckCircle, Clock, AlertTriangle, LogOut, Plus, Edit, Trash2, Star } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: "arrival" | "registration" | "academic" | "social" | "custom"
  priority: "high" | "medium" | "low"
  completed: boolean
  estimatedTime: string
  deadline?: string
  isCustom?: boolean
}

const defaultChecklistItems: ChecklistItem[] = [
  {
    id: "1",
    title: "Book temporary accommodation",
    description: "Secure a place to stay for your first few weeks while you search for permanent housing.",
    category: "arrival",
    priority: "high",
    completed: false,
    estimatedTime: "2-3 hours",
    deadline: "Before arrival",
  },
  {
    id: "2",
    title: "Register your address (Anmeldung)",
    description: "Visit the local registration office (Bürgeramt) within 14 days of arrival.",
    category: "registration",
    priority: "high",
    completed: false,
    estimatedTime: "1-2 hours",
    deadline: "Within 14 days",
  },
  {
    id: "3",
    title: "Open a German bank account",
    description: "Required for rent payments and receiving financial aid.",
    category: "registration",
    priority: "high",
    completed: false,
    estimatedTime: "1 hour",
    deadline: "Within 2 weeks",
  },
  {
    id: "4",
    title: "Get health insurance",
    description: "Mandatory for all students in Germany. Choose between public and private options.",
    category: "registration",
    priority: "high",
    completed: false,
    estimatedTime: "30 minutes",
    deadline: "Before enrollment",
  },
  {
    id: "5",
    title: "Complete university enrollment",
    description: "Submit all required documents and pay semester fees.",
    category: "academic",
    priority: "high",
    completed: false,
    estimatedTime: "2-3 hours",
    deadline: "Enrollment deadline",
  },
  {
    id: "6",
    title: "Register for courses",
    description: "Use the university's course registration system to select your classes.",
    category: "academic",
    priority: "medium",
    completed: false,
    estimatedTime: "1-2 hours",
    deadline: "Registration period",
  },
  {
    id: "7",
    title: "Get student ID card",
    description: "Obtain your student card for library access and discounts.",
    category: "academic",
    priority: "medium",
    completed: false,
    estimatedTime: "30 minutes",
    deadline: "After enrollment",
  },
  {
    id: "9",
    title: "Attend orientation events",
    description: "Participate in welcome events and campus tours.",
    category: "social",
    priority: "medium",
    completed: false,
    estimatedTime: "Half day",
    deadline: "First week",
  },
  {
    id: "10",
    title: "Set up internet and phone",
    description: "Arrange internet connection and get a German phone number.",
    category: "arrival",
    priority: "low",
    completed: false,
    estimatedTime: "1 hour",
    deadline: "First month",
  },
]

interface ChecklistClientProps {
  user: User
}

export default function ChecklistClient({ user }: ChecklistClientProps) {
  const [items, setItems] = useState<ChecklistItem[]>(defaultChecklistItems)
  const [error, setError] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "custom" as ChecklistItem["category"],
    priority: "medium" as ChecklistItem["priority"],
    estimatedTime: "",
    deadline: "",
  })

  useEffect(() => {
    const savedProgress = localStorage.getItem(`checklist-progress-${user.id}`)
    const savedCustomItems = localStorage.getItem(`custom-checklist-items-${user.id}`)

    let customItems: ChecklistItem[] = []
    if (savedCustomItems) {
      try {
        customItems = JSON.parse(savedCustomItems)
      } catch (err) {
        console.error("Error parsing custom items:", err)
      }
    }

    const allItems = [...defaultChecklistItems, ...customItems]

    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress)
        const updatedItems = allItems.map((item) => {
          const savedItem = progress.find((p: any) => p.id === item.id)
          return savedItem ? { ...item, completed: savedItem.completed } : item
        })
        setItems(updatedItems)
      } catch (err) {
        console.error("Error parsing saved progress:", err)
        setItems(allItems)
      }
    } else {
      setItems(allItems)
    }
  }, [user.id])

  const saveProgressLocally = (updatedItems: ChecklistItem[]) => {
    const progress = updatedItems.map((item) => ({ id: item.id, completed: item.completed }))
    localStorage.setItem(`checklist-progress-${user.id}`, JSON.stringify(progress))
  }

  const saveCustomItemsLocally = (customItems: ChecklistItem[]) => {
    localStorage.setItem(`custom-checklist-items-${user.id}`, JSON.stringify(customItems))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "custom",
      priority: "medium",
      estimatedTime: "",
      deadline: "",
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const toggleItem = (id: string) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    setItems(updatedItems)
    saveProgressLocally(updatedItems)
  }

  const addCustomItem = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required")
      return
    }

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      estimatedTime: formData.estimatedTime || "Not specified",
      deadline: formData.deadline || undefined,
      completed: false,
      isCustom: true,
    }

    const updatedItems = [...items, newItem]
    setItems(updatedItems)

    const customItems = updatedItems.filter((item) => item.isCustom)
    saveCustomItemsLocally(customItems)
    saveProgressLocally(updatedItems)

    resetForm()
    setIsAddDialogOpen(false)
    setError(null)
  }

  const editCustomItem = () => {
    if (!editingItem || !formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required")
      return
    }

    const updatedItems = items.map((item) =>
      item.id === editingItem.id
        ? {
            ...item,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            priority: formData.priority,
            estimatedTime: formData.estimatedTime || "Not specified",
            deadline: formData.deadline || undefined,
          }
        : item,
    )

    setItems(updatedItems)

    const customItems = updatedItems.filter((item) => item.isCustom)
    saveCustomItemsLocally(customItems)
    saveProgressLocally(updatedItems)

    resetForm()
    setEditingItem(null)
    setIsEditDialogOpen(false)
    setError(null)
  }

  const deleteCustomItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id)
    setItems(updatedItems)

    const customItems = updatedItems.filter((item) => item.isCustom)
    saveCustomItemsLocally(customItems)
    saveProgressLocally(updatedItems)
  }

  const startEditItem = (item: ChecklistItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      priority: item.priority,
      estimatedTime: item.estimatedTime,
      deadline: item.deadline || "",
    })
    setIsEditDialogOpen(true)
  }

  const completedCount = items.filter((item) => item.completed).length
  const progress = (completedCount / items.length) * 100

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "arrival":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "registration":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "academic":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "social":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "custom":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "medium":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return null
    }
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Arrival Checklist
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Complete these essential tasks to get settled in Germany and start your studies at UDE.
          </p>

          <Card className="glass-effect border-blue-200 dark:border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Your Progress</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    <AnimatedCounter end={completedCount} /> of {items.length} completed
                  </span>
                  <Badge variant="outline" className="text-blue-600 dark:text-blue-400">
                    {userName}
                  </Badge>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
              <Progress value={progress} className="h-3 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <AnimatedCounter end={Math.round(progress)} suffix="%" /> complete
              </p>
            </CardContent>
          </Card>

          <div className="mb-6">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Task
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-orange-500" />
                    <span>Add Custom Task</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Task title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Task description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value as ChecklistItem["category"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom</SelectItem>
                        <SelectItem value="arrival">Arrival</SelectItem>
                        <SelectItem value="registration">Registration</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData({ ...formData, priority: value as ChecklistItem["priority"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    placeholder="Estimated time (e.g., 1 hour)"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                  />
                  <Input
                    placeholder="Deadline (optional)"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex space-x-2">
                    <Button onClick={addCustomItem} className="flex-1">
                      Add Task
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        resetForm()
                        setIsAddDialogOpen(false)
                        setError(null)
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <Card
              key={item.id}
              className={`glass-effect border-blue-200 dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${
                item.completed ? "bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : ""
              } ${item.isCustom ? "border-orange-200 dark:border-orange-800" : ""}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-1 transition-all duration-300 hover:scale-110"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3
                        className={`text-lg font-semibold transition-all duration-300 ${
                          item.completed
                            ? "line-through text-gray-500 dark:text-gray-400"
                            : "text-gray-800 dark:text-white"
                        }`}
                      >
                        {item.title}
                      </h3>
                      {item.isCustom && <Star className="w-4 h-4 text-orange-500" />}
                      {getPriorityIcon(item.priority)}
                      <Badge variant="secondary" className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                    <p className={`text-gray-600 dark:text-gray-300 mb-3 ${item.completed ? "line-through" : ""}`}>
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                          <Clock className="w-4 h-4" />
                          <span>{item.estimatedTime}</span>
                        </div>
                        {item.deadline && (
                          <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                            <AlertTriangle className="w-4 h-4" />
                            <span>{item.deadline}</span>
                          </div>
                        )}
                      </div>
                      {item.isCustom && (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditItem(item)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteCustomItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5 text-blue-500" />
                <span>Edit Custom Task</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Textarea
                placeholder="Task description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as ChecklistItem["category"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom</SelectItem>
                    <SelectItem value="arrival">Arrival</SelectItem>
                    <SelectItem value="registration">Registration</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value as ChecklistItem["priority"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Estimated time (e.g., 1 hour)"
                value={formData.estimatedTime}
                onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
              />
              <Input
                placeholder="Deadline (optional)"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex space-x-2">
                <Button onClick={editCustomItem} className="flex-1">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setEditingItem(null)
                    setIsEditDialogOpen(false)
                    setError(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card className="mt-8 glass-effect border-blue-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-300">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you need assistance with any of these tasks, don't hesitate to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Ask questions in the forum</li>
              <li>Contact the international student office</li>
              <li>Join our community for quick questions</li>
              <li>Check the FAQ section for common questions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
