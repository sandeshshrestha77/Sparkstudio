"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, CheckCircle, Star, Users, Zap, Clock } from "lucide-react"
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
      Palette: "🎨",
      Video: "🎬",
      ImageIcon: "📱",
      FileText: "📄",
      Monitor: "💻",
      Camera: "📸",
    }
    return iconMap[iconName] || "🎨"
  }

  const stats = [
    { icon: Clock, value: "24h", label: "Response Time" },
    { icon: Star, value: "100%", label: "Client Satisfaction" },
    { icon: Zap, value: "Fresh", label: "Ideas & Approach" },
    { icon: Users, value: "1-on-1", label: "Personal Attention" },
  ]

  const features = [
    "Direct communication with our team",
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
            <Badge variant="secondary" className="mb-8 px-4 py-2 text-sm">
              🚀 Newly launched - Special pricing available
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
              Creative{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                design solutions
              </span>
              <br />
              for Nepali businesses
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Spark Studio delivers exceptional graphic design and video editing services at affordable local rates. We
              help Nepali businesses stand out with professional creative work.
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
                  View Our Work
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

      {/* Services Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 px-4 py-2">
                Our Services
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">What We Do Best</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional creative services to help your business stand out in the Nepali market
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-muted rounded-xl animate-pulse mx-auto mb-6"></div>
                      <div className="h-6 bg-muted rounded animate-pulse mb-4"></div>
                      <div className="h-4 bg-muted rounded animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {services.map((service) => (
                  <Card key={service.id} className="text-center hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                        {getIconEmoji(service.icon)}
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {services.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎨</div>
                <p className="text-lg text-muted-foreground mb-4">No services available at the moment.</p>
                <p className="text-sm text-muted-foreground">Please check back later or contact us directly.</p>
              </div>
            )}

            <div className="text-center">
              <Link href="/services">
                <Button variant="outline" size="lg" className="group px-8 py-4">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
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
                    Why Choose Us
                  </Badge>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                    Why choose Spark Studio?
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    As a Nepali design studio, we understand local businesses and their needs. We offer professional
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
                    Learn More About Us
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
                      We understand the Nepali market and create designs that resonate with local audiences
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
                      Direct communication with our creative team throughout your project
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

      {/* Launch Special */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-green-600 hover:bg-green-700 px-6 py-2 text-sm font-medium">
              Limited Time Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-8">Launch Special Pricing</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              To celebrate the launch of Spark Studio, we're offering special pricing for our first clients. Get
              professional design and video work at even more affordable rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group px-8 py-4 text-lg">
                  Get Your Quote
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
