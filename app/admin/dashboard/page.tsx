"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { FolderOpen, Settings, FileText, Mail, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import { AdminHeader } from "@/components/admin/header"

interface DashboardStats {
  projects: number
  services: number
  contactSubmissions: number
  blogPosts: number
}

interface Project {
  id: string
  title: string
  category: string
  client: string
  featured: boolean
  created_at: string
}

interface ContactSubmission {
  id: string
  name: string
  email: string
  service: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    services: 0,
    contactSubmissions: 0,
    blogPosts: 0,
  })
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (authChecked && user) {
      loadDashboardData()
    }
  }, [authChecked, user])

  const checkAuth = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        router.push("/admin/login")
        return
      }

      // Check if user is admin with better error handling
      const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", user.email)
        .single()

      if (adminError) {
        console.error("Admin check error:", adminError)
        if (adminError.code === "PGRST116") {
          // No rows returned - user is not an admin
          await supabase.auth.signOut()
          router.push("/admin/login")
          return
        }
      }

      if (!adminUser) {
        await supabase.auth.signOut()
        router.push("/admin/login")
        return
      }

      setUser(user)
    } catch (error) {
      console.error("Auth check failed:", error)
      router.push("/admin/login")
    } finally {
      setAuthChecked(true)
    }
  }

  const loadDashboardData = async () => {
    try {
      // Load stats with proper error handling
      const [projectsRes, servicesRes, contactsRes, blogRes] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact" }),
        supabase.from("services").select("id", { count: "exact" }),
        supabase.from("contact_submissions").select("id", { count: "exact" }),
        supabase.from("blog_posts").select("id", { count: "exact" }),
      ])

      setStats({
        projects: projectsRes.count || 0,
        services: servicesRes.count || 0,
        contactSubmissions: contactsRes.count || 0,
        blogPosts: blogRes.error ? 0 : blogRes.count || 0,
      })

      // Load recent projects
      const { data: projects } = await supabase
        .from("projects")
        .select("id, title, category, client, featured, created_at")
        .order("created_at", { ascending: false })
        .limit(5)

      setRecentProjects(projects || [])

      // Load recent contact submissions
      const { data: contacts } = await supabase
        .from("contact_submissions")
        .select("id, name, email, service, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5)

      setRecentContacts(contacts || [])
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!authChecked || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.projects}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.services}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contactSubmissions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blogPosts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/projects/new">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </Link>
          <Link href="/admin/services/new">
            <Button className="w-full" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button className="w-full" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Blog Post
            </Button>
          </Link>
          <Link href="/admin/contacts">
            <Button className="w-full" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              View Contacts
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Projects
                <Link href="/admin/projects">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">{project.client}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{project.category}</Badge>
                          {project.featured && <Badge>Featured</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/admin/projects/edit/${project.id}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-muted-foreground">No projects yet. Add your first project!</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Contact Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Contacts
                <Link href="/admin/contacts">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContacts.length > 0 ? (
                  recentContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{contact.service}</Badge>
                          <Badge variant={contact.status === "new" ? "default" : "secondary"}>{contact.status}</Badge>
                        </div>
                      </div>
                      <Link href={`/admin/contacts/${contact.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-muted-foreground">No contact submissions yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
