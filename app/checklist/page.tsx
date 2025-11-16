import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ChecklistClient from "./checklist-client"

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
    id: "8",
    title: "Join the buddy program",
    description: "Connect with current students who can help you settle in.",
    category: "social",
    priority: "medium",
    completed: false,
    estimatedTime: "15 minutes",
    deadline: "First month",
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

export default async function ChecklistPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <ChecklistClient user={user} />
}

// ChecklistClient component remains unchanged
