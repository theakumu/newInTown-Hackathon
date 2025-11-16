"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MessageSquare, ThumbsUp, TrendingUp, Clock, Award, LogOut, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  category: "general" | "academic" | "housing" | "social" | "administrative"
  created_at: string
  likes: number
  replyCount: number
  userHasLiked: boolean
}

interface ForumClientProps {
  user: User
}

export default function ForumClient({ user }: ForumClientProps) {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"hot" | "new" | "top">("new")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "general" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const url = selectedCategory === "all" ? "/api/forum/posts" : `/api/forum/posts?category=${selectedCategory}`

      const response = await fetch(url)
      const data = await response.json()

      if (data.posts) {
        setPosts(data.posts)
      }
    } catch (error) {
      console.error("[v0] Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/auth/login"
  }

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })

      if (response.ok) {
        setIsCreateDialogOpen(false)
        setNewPost({ title: "", content: "", category: "general" })
        fetchPosts()
      }
    } catch (error) {
      console.error("[v0] Error creating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`/api/forum/posts/${postId}/like`, {
        method: "POST",
      })

      if (response.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error("[v0] Error liking post:", error)
    }
  }

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case "hot":
        return b.likes + b.replyCount - (a.likes + a.replyCount)
      case "new":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case "top":
        return b.likes - a.likes
      default:
        return 0
    }
  })

  const filteredPosts = sortedPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "housing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "social":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "administrative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "general":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
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
                <AvatarFallback className="bg-blue-600 text-white">{userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>Welcome, {userName}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

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
            {["academic", "housing", "social", "administrative", "general"].map((category) => (
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

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your thoughts, questions, or experiences with the community.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter post title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newPost.category}
                    onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="administrative">Administrative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your post content..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost} disabled={isSubmitting || !newPost.title || !newPost.content}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Post"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="glass-effect border-blue-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`p-2 h-auto ${post.userHasLiked ? "text-blue-600 bg-blue-100 dark:bg-blue-900/20" : "text-gray-400 hover:text-blue-600"}`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </Button>
                      <span className="font-bold text-sm text-blue-600">{post.likes}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary" className={getCategoryColor(post.category)}>
                          {post.category}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Posted by {post.author.split("@")[0]} • {formatTimeAgo(post.created_at)}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{post.content}</p>

                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{post.replyCount} replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
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
