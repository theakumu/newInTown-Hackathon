import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ForumClient from "./forum-client"

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  authorEmail: string
  category: "general" | "academic" | "housing" | "social" | "technical"
  createdAt: Date
  upvotes: number
  downvotes: number
  replyCount: number
  views: number
  userVote?: "up" | "down" | null
}

const initialPosts: ForumPost[] = [
  {
    id: "1",
    title: "How to register for courses in the first semester?",
    content:
      "I'm having trouble understanding the course registration process. Can someone guide me through the steps?",
    author: "Sarah Chen",
    authorEmail: "sarah.chen@example.com",
    category: "academic",
    createdAt: new Date("2024-01-15T10:30:00"),
    upvotes: 15,
    downvotes: 2,
    replyCount: 8,
    views: 124,
    userVote: null,
  },
  {
    id: "2",
    title: "Best places to find student housing in Duisburg?",
    content: "Looking for recommendations on student-friendly neighborhoods and housing options.",
    author: "Ahmed Hassan",
    authorEmail: "ahmed.hassan@example.com",
    category: "housing",
    createdAt: new Date("2024-01-14T15:45:00"),
    upvotes: 23,
    downvotes: 1,
    replyCount: 12,
    views: 89,
    userVote: null,
  },
  {
    id: "3",
    title: "Study group for Engineering Mathematics?",
    content: "Anyone interested in forming a study group for Engineering Mathematics? We could meet weekly.",
    author: "Maria Rodriguez",
    authorEmail: "maria.rodriguez@example.com",
    category: "academic",
    createdAt: new Date("2024-01-13T09:15:00"),
    upvotes: 18,
    downvotes: 0,
    replyCount: 15,
    views: 67,
    userVote: null,
  },
  {
    id: "4",
    title: "Weekend activities and social events?",
    content: "What do ISE students usually do on weekends? Any regular social events or activities?",
    author: "John Smith",
    authorEmail: "john.smith@example.com",
    category: "social",
    createdAt: new Date("2024-01-12T18:20:00"),
    upvotes: 12,
    downvotes: 3,
    replyCount: 6,
    views: 45,
    userVote: null,
  },
  {
    id: "5",
    title: "Issues with university WiFi connection",
    content: "Having trouble connecting to the university WiFi. Anyone else experiencing this?",
    author: "Lisa Wang",
    authorEmail: "lisa.wang@example.com",
    category: "technical",
    createdAt: new Date("2024-01-11T14:10:00"),
    upvotes: 8,
    downvotes: 1,
    replyCount: 4,
    views: 32,
    userVote: null,
  },
]

export default async function ForumPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <ForumClient user={user} />
}
