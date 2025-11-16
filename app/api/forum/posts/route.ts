import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")

    let query = supabase.from("forum_posts").select("*").order("created_at", { ascending: false })

    if (category && category !== "all") {
      query = query.eq("category", category)
    }

    const { data: posts, error } = await query

    if (error) {
      console.error("[v0] Error fetching posts:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get reply counts for each post
    const postsWithCounts = await Promise.all(
      (posts || []).map(async (post) => {
        const { count } = await supabase
          .from("forum_replies")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id)

        // Check if user has liked this post
        const { data: userLike } = await supabase
          .from("post_likes")
          .select("*")
          .eq("post_id", post.id)
          .eq("user_email", user.email!)
          .single()

        return {
          ...post,
          replyCount: count || 0,
          userHasLiked: !!userLike,
        }
      }),
    )

    return NextResponse.json({ posts: postsWithCounts })
  } catch (error) {
    console.error("[v0] Error in GET /api/forum/posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, category } = body

    if (!title || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data: post, error } = await supabase
      .from("forum_posts")
      .insert({
        title,
        content,
        author: user.email!,
        author_type: "student",
        category,
        likes: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating post:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("[v0] Error in POST /api/forum/posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
