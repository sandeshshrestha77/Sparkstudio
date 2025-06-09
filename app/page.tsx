"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Star, Zap, Palette, ImageIcon, Video, CheckCircle, Users } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const { data, error } = await supabase.from("services").select("id, title, description, icon").limit(3)

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error("Error loading services:", error)
    } finally {
      setLoading(false)
    }
  }

  const getIconEmoji = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      Palette: "🖌️", // Logo & Brand Identity
      ImageIcon: "🖼️", // Social Media Posts
      Video: "🎬", // Video Editing
      Zap: "⚡", // Motion Graphics
    }
    return iconMap[iconName] || "✨"
  }

  const stats = [
    { icon: Palette, value: "Branding", label: "Logo & Brand Identity" },
    { icon: ImageIcon, value: "Social", label: "Social Media Posts" },
    { icon: Video, value: "Video", label: "Video Editing" },
    { icon: Zap, value: "Motion", label: "Motion Graphics" },
  ]

  const features = [
    "Affordable local pricing",
    "Quick turnaround times",
    "Modern design trends & techniques",
    "Dedicated project attention",
    "High-quality creative work",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/20"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm flex items-center">
                Available for work
                <div className="ml-2 h-3 w-3 rounded-full bg-green-500" />
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight break-words whitespace-normal">
              Where Vision Meets
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Craftsmanship
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Nepali businesses and entrepreneurs, elevate your brand presence with world-class creative solutions. 
              Sandesh Shrestha brings you professional branding, social media graphics, and video editing tailored to your local needs - 
              at an affordable price, with a quick turnaround, and with a focus on what matters most to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link href="/contact">
                <Button size="lg" className="group px-8 py-4 text-lg">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/work">
                <Button size="lg" variant="outline" className="group px-8 py-4 text-lg">
                  <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  View My Work
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-2 text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    

      {/* Why Choose Us Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <Badge variant="outline" className="mb-6 px-4 py-2">
                    Why Choose Me
                  </Badge>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                    Why choose Sandesh Shrestha?
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    As a solo designer, I understand the needs of local businesses and offer professional
                    creative services at affordable local rates, with the quality and attention you deserve.
                  </p>
                </div>

                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-2">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-base leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/about">
                  <Button variant="outline" size="lg" className="group px-8 py-4">
                    Learn More About Me
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <Card className="hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Zap className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I understand the Nepali market and create designs that resonate with local audiences
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Personalized Service</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Direct communication with my creative team throughout your project
                    </p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Star className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Affordable Quality</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Professional creative work at prices tailored for the Nepali market
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8">Start Your Project Today</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              If you're looking for professional design and video work, you're in the right place. Get in touch with us to
              get your project started.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group px-8 py-4 text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
