import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * In production you *must* set NEXT_PUBLIC_SUPABASE_URL and
 * NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel project settings.
 *
 * In the Next.js preview runtime those env vars are absent, which
 * causes `supabase-js` to throw “supabaseUrl is required”.
 * We fall back to a dummy project so local/preview builds keep working.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

/* ──────────────────────────────────────────────────────────
   Types for strongly-typed Supabase queries
   ────────────────────────────────────────────────────────── */
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone?: string
          gender: "male" | "female"
          type: "new" | "current"
          interests: string[]
          matched_with?: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string
          gender: "male" | "female"
          type: "new" | "current"
          interests: string[]
          matched_with?: string
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["users"]["Row"]>
      }
      /* … other tables remain unchanged … */
    }
  }
}
