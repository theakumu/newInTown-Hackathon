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

    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const { data: reply, error } = await supabase
      .from("forum_replies")
      .insert({
        post_id: postId,
        content,
        author: user.email!,
        author_type: "student",
        likes: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating reply:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("[v0] Error in POST /api/forum/posts/[postId]/replies:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
