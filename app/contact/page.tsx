"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Calendar, DollarSign } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const { error } = await supabase.from("contact_submissions").insert([formData])

      if (error) throw error

      setIsSubmitted(true)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "We typically respond within a few hours",
      value: "sandeshstha67@gmail.com",
      action: "mailto:sandeshstha67@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Available Mon-Fri, 10AM-6PM NPT",
      value: "+977 9805364156",
      action: "tel:+9779805364156",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our studio in Kathmandu",
      value: "New Baneshwor, Kathmandu, Nepal",
      action: "https://www.google.com/maps/place/New+Baneshwor,+Kathmandu,+Nepal",
    },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Thanks for reaching out!</h2>
                <p className="text-muted-foreground mb-6">
                  I've received your message and I'm excited to learn about your project. I'll get back to you
                  within 24 hours with initial thoughts and next steps.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        service: "",
                        budget: "",
                        timeline: "",
                        message: "",
                      })
                    }}
                  >
                    Send Another Message
                  </Button>
                  <Button variant="outline">View My Work</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Work Together</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to start your project? I'd love to hear about your vision and explore how i can help
              bring it to life with exceptional design and video.
            </p>
            <Badge variant="secondary" className="mb-8">
              Currently accepting new projects
            </Badge>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tell me about your project</CardTitle>
                    <p className="text-muted-foreground">
                      Share your project details and I'll provide a proposal tailored to your needs and budget.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                            placeholder="John Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company (Optional)</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleChange("company", e.target.value)}
                            placeholder="Your company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>What do you need help with? *</Label>
                          <Select onValueChange={(value) => handleChange("service", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="logo">Logo & Brand Identity</SelectItem>
                              <SelectItem value="video">Video Editing</SelectItem>
                              <SelectItem value="social">Social Media Graphics</SelectItem>
                              <SelectItem value="print">Print Design</SelectItem>
                              <SelectItem value="other">Something else</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Budget Range (NPR)</Label>
                          <Select onValueChange={(value) => handleChange("budget", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="What's your budget?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-5k">Under NPR 5,000</SelectItem>
                              <SelectItem value="5k-10k">NPR 5,000 - 10,000</SelectItem>
                              <SelectItem value="10k-20k">NPR 10,000 - 20,000</SelectItem>
                              <SelectItem value="20k-50k">NPR 20,000 - 50,000</SelectItem>
                              <SelectItem value="50k+">NPR 50,000+</SelectItem>
                              <SelectItem value="discuss">Let's discuss</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Timeline</Label>
                          <Select onValueChange={(value) => handleChange("timeline", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="When do you need this?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">ASAP</SelectItem>
                              <SelectItem value="1week">Within a week</SelectItem>
                              <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                              <SelectItem value="1month">Within a month</SelectItem>
                              <SelectItem value="flexible">I'm flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Project Details *</Label>
                        <Textarea
                          id="message"
                          rows={6}
                          placeholder="Tell me about your project, goals, target audience, and any specific requirements or ideas you have..."
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          required
                        />
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertDescription>
                          I will review your project details and get back to you within 24 hours with initial thoughts and
                          next steps.
                        </AlertDescription>
                      </Alert>

                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending your message...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                          <a href={info.action} className="text-sm font-medium hover:underline">
                            {info.value}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100">Discounted Services</h3>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                      I'm committed to providing top quality services at unbeatable prices. Get in touch with me today to
                      learn more about our services and how i can help you.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-5 w-5" />
                      <h3 className="font-semibold">Our Schedule</h3>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>10:00 AM - 6:00 PM NPT</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>By appointment</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response time</span>
                        <span>Within 24 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
