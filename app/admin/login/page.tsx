"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { Lock, Mail, UserPlus, Eye, EyeOff } from "lucide-react"

function StatusAlert({ type, message }: { type: string; message: string }) {
  if (!message) return null
  return (
    <Alert variant={type === "error" ? "destructive" : "default"}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

async function ensureAdminUser(email: string) {
  const { data: existingAdmin, error } = await supabase.from("admin_users").select("*").eq("email", email).single()
  if (!existingAdmin) {
    const { error: insertError } = await supabase.from("admin_users").insert({
      email,
      name: "Sandesh Shrestha",
      role: "admin",
    })
    if (insertError) throw insertError
  }
}

// Hardcoded allowlist for admin registration
const ADMIN_EMAIL_ALLOWLIST = [
  "sandesh@example.com",
  "admin@example.com"
];

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [status, setStatus] = useState({ type: "", message: "" })

  const router = useRouter()

  useEffect(() => {
    if (status.message) {
      const timeout = setTimeout(() => setStatus({ type: "", message: "" }), 4000)
      return () => clearTimeout(timeout)
    }
  }, [status])

  const createAdminUser = async () => {
    setCreating(true)
    setStatus({ type: "", message: "" })

    // Restrict registration to allowlisted emails
    if (!ADMIN_EMAIL_ALLOWLIST.includes(email.trim().toLowerCase())) {
      setStatus({ type: "error", message: "This email is not authorized to register as admin." });
      setCreating(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { email_confirm: true } },
      })

      if (signUpError) {
        if (signUpError.message.includes("already")) {
          await ensureAdminUser(email)
          setStatus({ type: "success", message: "User already exists. Try logging in!" })
          return
        }
        throw signUpError
      }

      await ensureAdminUser(email)
      setStatus({ type: "success", message: "Admin user created! Check your email if confirmation is required." })
    } catch (err: any) {
      setStatus({ type: "error", message: ` ${err.message}` })
    } finally {
      setCreating(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: "", message: "" })

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError) {
        if (authError.message.includes("Invalid")) {
          setStatus({ type: "error", message: "❌ User doesn't exist. Please create an admin user first." })
          return
        }
        if (authError.message.includes("Email not confirmed")) {
          setStatus({ type: "error", message: "❌ Email not confirmed. Check your inbox!" })
          return
        }
        throw authError
      }

      await ensureAdminUser(email)

      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .single()

      if (!adminUser || adminError) {
        await supabase.auth.signOut()
        throw new Error("Access denied. Admin privileges required.")
      }

      setStatus({ type: "success", message: "✅ Login successful! Redirecting..." })

      setTimeout(() => router.push("/admin/dashboard"), 1000)
    } catch (err: any) {
      setStatus({ type: "error", message: `❌ ${err.message}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sandesh Shrestha</h1>
            <p className="text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-muted-foreground">Sign in to access the admin panel</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-2.5 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <StatusAlert type={status.type} message={status.message} />

              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={loading || creating}>
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={createAdminUser}
                  disabled={loading || creating}
                >
                  {creating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                      Creating User...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Admin User
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
