import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: post, error } = await supabase.from("forum_posts").select("*").eq("id", postId).single()

    if (error) {
      console.error("[v0] Error fetching post:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get replies
    const { data: replies, error: repliesError } = await supabase
      .from("forum_replies")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })

    if (repliesError) {
      console.error("[v0] Error fetching replies:", error)
    }

    // Check if user has liked this post
    const { data: userLike } = await supabase
      .from("post_likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_email", user.email!)
      .single()

    return NextResponse.json({
      post: {
        ...post,
        userHasLiked: !!userLike,
      },
      replies: replies || [],
    })
  } catch (error) {
    console.error("[v0] Error in GET /api/forum/posts/[postId]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
