import { createClient } from "@supabase/supabase-js"

// Create a separate admin client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Helper function to check if a user is admin
export async function isUserAdmin(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin.from("admin_users").select("id").eq("email", email).single()

    if (error) {
      console.error("Admin check error:", error)
      return false
    }

    return !!data
  } catch (error) {
    console.error("Admin check failed:", error)
    return false
  }
}
