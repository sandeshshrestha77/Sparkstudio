"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Mail, Phone, Building, Calendar, DollarSign, Clock, MessageSquare, User } from "lucide-react"
import Link from "next/link"

interface ContactSubmission {
  id: string
  name: string
  email: string
  company: string
  service: string
  budget: string
  timeline: string
  message: string
  status: string
  created_at: string
  notes?: string
}

export default function ContactDetail() {
  const params = useParams()
  const router = useRouter()
  const [contact, setContact] = useState<ContactSubmission | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (params.id) {
      loadContact(params.id as string)
    }
  }, [params.id])

  const loadContact = async (id: string) => {
    try {
      const { data, error } = await supabase.from("contact_submissions").select("*").eq("id", id).single()

      if (error) throw error
      setContact(data)
      setNotes(data.notes || "")
    } catch (error) {
      console.error("Error loading contact:", error)
      router.push("/admin/contacts")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (status: string) => {
    if (!contact) return

    setUpdating(true)
    try {
      const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", contact.id)

      if (error) throw error

      setContact({ ...contact, status })
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setUpdating(false)
    }
  }

  const updateNotes = async () => {
    if (!contact) return

    setUpdating(true)
    try {
      const { error } = await supabase.from("contact_submissions").update({ notes }).eq("id", contact.id)

      if (error) throw error

      setContact({ ...contact, notes })
    } catch (error) {
      console.error("Error updating notes:", error)
    } finally {
      setUpdating(false)
    }
  }

  const deleteContact = async () => {
    if (!contact || !confirm("Are you sure you want to delete this contact submission?")) return

    try {
      const { error } = await supabase.from("contact_submissions").delete().eq("id", contact.id)

      if (error) throw error

      router.push("/admin/contacts")
    } catch (error) {
      console.error("Error deleting contact:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "default"
      case "contacted":
        return "secondary"
      case "in_progress":
        return "outline"
      case "completed":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-8 w-48 bg-muted rounded animate-pulse mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-background border rounded-lg animate-pulse"></div>
                <div className="h-32 bg-background border rounded-lg animate-pulse"></div>
              </div>
              <div className="space-y-6">
                <div className="h-48 bg-background border rounded-lg animate-pulse"></div>
                <div className="h-32 bg-background border rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Contact not found</h2>
          <p className="text-muted-foreground mb-4">The contact submission you're looking for doesn't exist.</p>
          <Link href="/admin/contacts">
            <Button>Back to Contacts</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/contacts">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Contacts
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Contact Details</h1>
              <p className="text-muted-foreground">Manage contact submission</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Contact Information
                    </CardTitle>
                    <Badge variant={getStatusColor(contact.status)}>{contact.status.replace("_", " ")}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{contact.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${contact.email}`} className="font-medium hover:underline">
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    {contact.company && (
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Company</p>
                          <p className="font-medium">{contact.company}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-medium">{contact.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">{contact.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Timeline</p>
                        <p className="font-medium">{contact.timeline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">{new Date(contact.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Internal Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Add notes about this contact</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add internal notes, follow-up reminders, or project details..."
                      rows={4}
                    />
                  </div>
                  <Button onClick={updateNotes} disabled={updating}>
                    {updating ? "Saving..." : "Save Notes"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={contact.status} onValueChange={updateStatus} disabled={updating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <a href={`mailto:${contact.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={deleteContact}>
                    Delete Contact
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
