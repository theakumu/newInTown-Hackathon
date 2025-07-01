"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronUp, ChevronDown, MessageSquare, Eye, ArrowLeft, Send, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

interface Reply {
  id: string
  content: string
  author: string
  authorEmail: string
  createdAt: Date
  upvotes: number
  downvotes: number
  userVote?: "up" | "down" | null
  isHidden?: boolean
}

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
  views: number
  userVote?: "up" | "down" | null
  replies: Reply[]
}

// Mock data - in real app this would come from API
const mockPost: ForumPost = {
  id: "1",
  title: "How to register for courses in the first semester?",
  content:
    "I'm having trouble understanding the course registration process. Can someone guide me through the steps? I've tried accessing the student portal but I'm not sure which courses I should prioritize for my first semester. Any advice would be greatly appreciated!",
  author: "Sarah Chen",
  authorEmail: "sarah.chen@example.com",
  category: "academic",
  createdAt: new Date("2024-01-15T10:30:00"),
  upvotes: 15,
  downvotes: 2,
  views: 124,
  userVote: null,
  replies: [
    {
      id: "r1",
      content:
        "You should start by logging into the student portal and checking your program requirements. Make sure to register for core courses first!",
      author: "Ahmed Hassan",
      authorEmail: "ahmed.hassan@example.com",
      createdAt: new Date("2024-01-15T11:15:00"),
      upvotes: 8,
      downvotes: 0,
      userVote: null,
    },
    {
      id: "r2",
      content:
        "I had the same issue last semester. The academic advisor can help you create a course plan. Book an appointment ASAP!",
      author: "Maria Rodriguez",
      authorEmail: "maria.rodriguez@example.com",
      createdAt: new Date("2024-01-15T12:30:00"),
      upvotes: 12,
      downvotes: 1,
      userVote: null,
    },
    {
      id: "r3",
      content:
        "This is completely wrong advice. You don't need an advisor for basic course registration. Just read the handbook.",
      author: "Negative User",
      authorEmail: "negative@example.com",
      createdAt: new Date("2024-01-15T13:45:00"),
      upvotes: 2,
      downvotes: 15,
      userVote: null,
      isHidden: true,
    },
    {
      id: "r4",
      content:
        "Don't forget to check the prerequisites for each course. Some advanced courses require completion of basic ones first.",
      author: "John Smith",
      authorEmail: "john.smith@example.com",
      createdAt: new Date("2024-01-15T14:20:00"),
      upvotes: 6,
      downvotes: 0,
      userVote: null,
    },
  ],
}

export default function PostPage() {
  const [user, setUser] = useState<any>(null)
  const [post, setPost] = useState<ForumPost>(mockPost)
  const [newReply, setNewReply] = useState("")
  const [showHidden, setShowHidden] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const userData = localStorage.getItem("forum-user")
    if (!userData) {
      router.push("/auth")
      return
    }
    setUser(JSON.parse(userData))

    // Increment view count
    setPost((prev) => ({ ...prev, views: prev.views + 1 }))
  }, [router])

  const handleVote = (type: "post" | "reply", id: string, voteType: "up" | "down") => {
    if (type === "post") {
      setPost((prev) => {
        let newUpvotes = prev.upvotes
        let newDownvotes = prev.downvotes
        let newUserVote: "up" | "down" | null = voteType

        if (prev.userVote === "up") newUpvotes--
        if (prev.userVote === "down") newDownvotes--

        if (prev.userVote === voteType) {
          newUserVote = null
        } else {
          if (voteType === "up") newUpvotes++
          if (voteType === "down") newDownvotes++
        }

        return {
          ...prev,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote,
        }
      })
    } else {
      setPost((prev) => ({
        ...prev,
        replies: prev.replies.map((reply) => {
          if (reply.id === id) {
            let newUpvotes = reply.upvotes
            let newDownvotes = reply.downvotes
            let newUserVote: "up" | "down" | null = voteType

            if (reply.userVote === "up") newUpvotes--
            if (reply.userVote === "down") newDownvotes--

            if (reply.userVote === voteType) {
              newUserVote = null
            } else {
              if (voteType === "up") newUpvotes++
              if (voteType === "down") newDownvotes++
            }

            const score = newUpvotes - newDownvotes
            const shouldHide = score <= -10

            return {
              ...reply,
              upvotes: newUpvotes,
              downvotes: newDownvotes,
              userVote: newUserVote,
              isHidden: shouldHide,
            }
          }
          return reply
        }),
      }))
    }
  }

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReply.trim() || !user) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const reply: Reply = {
      id: `r${Date.now()}`,
      content: newReply,
      author: user.name,
      authorEmail: user.email,
      createdAt: new Date(),
      upvotes: 0,
      downvotes: 0,
      userVote: null,
    }

    setPost((prev) => ({
      ...prev,
      replies: [...prev.replies, reply],
    }))

    setNewReply("")
    setIsSubmitting(false)
  }

  const getScore = (item: { upvotes: number; downvotes: number }) => item.upvotes - item.downvotes

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

  const visibleReplies = post.replies.filter((reply) => !reply.isHidden || showHidden)
  const hiddenCount = post.replies.filter((reply) => reply.isHidden).length

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/forum" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Forum</span>
        </Link>

        {/* Main Post */}
        <Card className="glass-effect border-blue-200 dark:border-gray-700 mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className={getCategoryColor(post.category)}>
                {post.category}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Posted by {post.author} • {formatTimeAgo(post.createdAt)}
              </span>
            </div>
            <CardTitle className="text-2xl text-gray-800 dark:text-white">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              {/* Vote Section */}
              <div className="flex flex-col items-center space-y-1 min-w-[60px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote("post", post.id, "up")}
                  className={`p-1 h-8 w-8 ${post.userVote === "up" ? "text-orange-600 bg-orange-100 dark:bg-orange-900/20" : "text-gray-400 hover:text-orange-600"}`}
                >
                  <ChevronUp className="w-5 h-5" />
                </Button>

                <span
                  className={`font-bold text-lg ${
                    getScore(post) > 0 ? "text-orange-600" : getScore(post) < 0 ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {getScore(post)}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote("post", post.id, "down")}
                  className={`p-1 h-8 w-8 ${post.userVote === "down" ? "text-blue-600 bg-blue-100 dark:bg-blue-900/20" : "text-gray-400 hover:text-blue-600"}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </Button>
              </div>

              {/* Post Content */}
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{post.content}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.replies.length} replies</span>
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

        {/* Reply Form */}
        <Card className="glass-effect border-blue-200 dark:border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Add a Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReply} className="space-y-4">
              <Textarea
                placeholder="Share your thoughts or help answer the question..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="min-h-[100px] glass-effect border-blue-200 dark:border-gray-600"
                required
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>Posting as {user.name}</span>
                </div>
                <Button
                  type="submit"
                  disabled={!newReply.trim() || isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Posting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Post Reply</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Hidden Comments Alert */}
        {hiddenCount > 0 && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
            <EyeOff className="w-4 h-4" />
            <AlertDescription className="flex items-center justify-between">
              <span className="text-yellow-700 dark:text-yellow-400">
                {hiddenCount} comment{hiddenCount > 1 ? "s" : ""} hidden due to low score
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHidden(!showHidden)}
                className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
              >
                {showHidden ? "Hide" : "Show"} hidden comments
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Replies */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Replies ({post.replies.length})</h3>

          {visibleReplies.map((reply) => {
            const score = getScore(reply)
            return (
              <Card
                key={reply.id}
                className={`glass-effect border-blue-200 dark:border-gray-700 ${
                  reply.isHidden ? "opacity-60 border-dashed" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center space-y-1 min-w-[50px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote("reply", reply.id, "up")}
                        className={`p-1 h-6 w-6 ${reply.userVote === "up" ? "text-orange-600 bg-orange-100 dark:bg-orange-900/20" : "text-gray-400 hover:text-orange-600"}`}
                      >
                        <ChevronUp className="w-4 h-4" />
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
                        onClick={() => handleVote("reply", reply.id, "down")}
                        className={`p-1 h-6 w-6 ${reply.userVote === "down" ? "text-blue-600 bg-blue-100 dark:bg-blue-900/20" : "text-gray-400 hover:text-blue-600"}`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Reply Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gray-600 text-white text-xs">
                            {reply.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm text-gray-800 dark:text-white">{reply.author}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimeAgo(reply.createdAt)}
                        </span>
                        {reply.isHidden && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          >
                            Hidden
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{reply.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {post.replies.length === 0 && (
          <Card className="glass-effect border-blue-200 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Replies Yet</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Be the first to help answer this question or share your thoughts!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
