"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  MessageSquare,
  Eye,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  Clock,
  Award,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

export default function ForumPage() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"hot" | "new" | "top">("hot")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("forum-user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("forum-user")
    router.push("/auth")
  }

  const handleVote = (postId: string, voteType: "up" | "down") => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          let newUpvotes = post.upvotes
          let newDownvotes = post.downvotes
          let newUserVote: "up" | "down" | null = voteType

          // Remove previous vote
          if (post.userVote === "up") newUpvotes--
          if (post.userVote === "down") newDownvotes--

          // Add new vote (or remove if same)
          if (post.userVote === voteType) {
            newUserVote = null
          } else {
            if (voteType === "up") newUpvotes++
            if (voteType === "down") newDownvotes++
          }

          return {
            ...post,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote,
          }
        }
        return post
      }),
    )
  }

  const getScore = (post: ForumPost) => post.upvotes - post.downvotes

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case "hot":
        return getScore(b) + b.replyCount - (getScore(a) + a.replyCount)
      case "new":
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "top":
        return getScore(b) - getScore(a)
      default:
        return 0
    }
  })

  const filteredPosts = sortedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "housing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "social":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "technical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "general":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img src="/images/ise-logo-official.png" alt="ISE Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">ISE Forum</h1>
              <p className="text-gray-600 dark:text-gray-300">Connect, discuss, and help each other</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-600 text-white">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>Welcome, {user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-effect border-blue-200 dark:border-gray-600"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {["academic", "housing", "social", "technical", "general"].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort and New Post */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Sort by:</span>
            <Button variant={sortBy === "hot" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("hot")}>
              <TrendingUp className="w-4 h-4 mr-1" />
              Hot
            </Button>
            <Button variant={sortBy === "new" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("new")}>
              <Clock className="w-4 h-4 mr-1" />
              New
            </Button>
            <Button variant={sortBy === "top" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("top")}>
              <Award className="w-4 h-4 mr-1" />
              Top
            </Button>
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const score = getScore(post)
            return (
              <Card
                key={post.id}
                className="glass-effect border-blue-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-1 min-w-[60px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote(post.id, "up")}
                        className={`p-1 h-8 w-8 ${post.userVote === "up" ? "text-orange-600 bg-orange-100 dark:bg-orange-900/20" : "text-gray-400 hover:text-orange-600"}`}
                      >
                        <ChevronUp className="w-5 h-5" />
                      </Button>

                      <span
                        className={`font-bold text-sm ${
                          score > 0 ? "text-orange-600" : score < 0 ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        {score}
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote(post.id, "down")}
                        className={`p-1 h-8 w-8 ${post.userVote === "down" ? "text-blue-600 bg-blue-100 dark:bg-blue-900/20" : "text-gray-400 hover:text-blue-600"}`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className={getCategoryColor(post.category)}>
                          {post.category}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Posted by {post.author} • {formatTimeAgo(post.createdAt)}
                        </span>
                      </div>

                      <Link href={`/forum/post/${post.id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer mb-2 transition-colors">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{post.content}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.replyCount} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredPosts.length === 0 && (
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No posts match your search criteria. Try adjusting your filters or be the first to start a discussion!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
