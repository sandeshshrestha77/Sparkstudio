"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Palette, Video, ImageIcon, FileText, Star } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price: string
  original_price: string
  timeline: string
  popular: boolean
  icon: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const { data, error } = await supabase.from("services").select("*").order("popular", { ascending: false })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error("Error loading services:", error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Palette,
      Video,
      ImageIcon,
      FileText,
    }
    return iconMap[iconName] || Palette
  }

  const addOns = [
    { name: "Rush delivery (24-48 hours)", price: "+50%" },
    { name: "Additional revisions", price: "NPR 1,500 each" },
    { name: "Source files", price: "NPR 3,000" },
    { name: "Social media kit", price: "NPR 5,000" },
    { name: "Advanced motion graphics", price: "NPR 8,000" },
    { name: "Print coordination", price: "NPR 2,000" },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              Limited time discount - Save up to 40%
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Services & Pricing</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professional creative services at affordable Nepali rates. We offer quality design and video work tailored
              to local business needs and budgets.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-muted rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-6 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {[1, 2, 3, 4, 5, 6].map((j) => (
                        <div key={j} className="h-4 bg-muted rounded"></div>
                      ))}
                    </div>
                    <div className="h-10 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {services.map((service, index) => {
                const IconComponent = getIcon(service.icon)
                return (
                  <Card
                    key={service.id}
                    className={`hover:shadow-lg transition-shadow relative ${
                      service.popular ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {service.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-2xl font-bold text-green-600">{service.price}</span>
                            {service.original_price && (
                              <span className="text-sm text-muted-foreground line-through">
                                {service.original_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{service.timeline}</Badge>
                        <Badge variant="secondary">Launch Price</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full group">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {services.length === 0 && !loading && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No services available</h3>
              <p className="text-muted-foreground">Services will be displayed here once they are added.</p>
            </div>
          )}

          {/* Add-ons */}
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Optional Add-ons
                </CardTitle>
                <CardDescription>Enhance your project with these additional services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addOns.map((addon, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">{addon.name}</span>
                      <Badge variant="outline">{addon.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A streamlined, collaborative approach that keeps you involved every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We discuss your project, goals, and vision to understand your needs.",
                },
                {
                  step: "02",
                  title: "Proposal",
                  description: "We create a detailed proposal with timeline, pricing, and deliverables.",
                },
                {
                  step: "03",
                  title: "Creation",
                  description: "Our team creates your designs or videos with regular updates for feedback.",
                },
                {
                  step: "04",
                  title: "Delivery",
                  description: "You receive all final files and assets in the formats you need.",
                },
              ].map((step, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Payment Options</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We offer flexible payment options to make working with us easy and convenient.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Bank Transfer",
                  description: "Direct transfer to our Nepali bank account",
                },
                {
                  title: "eSewa / Khalti",
                  description: "Convenient digital wallet payments",
                },
                {
                  title: "Cash Payment",
                  description: "Available for Kathmandu Valley clients",
                },
              ].map((option, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Get a Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
