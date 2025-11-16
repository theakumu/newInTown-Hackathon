import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { postId } = await params
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user already liked this post
    const { data: existingLike } = await supabase
      .from("post_likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_email", user.email!)
      .single()

    if (existingLike) {
      // Unlike: remove the like
      await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_email", user.email!)

      // Decrement likes count
      await supabase.rpc("decrement_post_likes", { post_id: postId })

      return NextResponse.json({ liked: false })
    } else {
      // Like: add the like
      await supabase.from("post_likes").insert({
        post_id: postId,
        user_email: user.email!,
      })

      // Increment likes count
      await supabase.rpc("increment_post_likes", { post_id: postId })

      return NextResponse.json({ liked: true })
    }
  } catch (error) {
    console.error("[v0] Error in POST /api/forum/posts/[postId]/like:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
