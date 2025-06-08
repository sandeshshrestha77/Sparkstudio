"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Monitor, Video, Zap, ArrowRight, CheckCircle } from "lucide-react"

export function Services() {
  const [activeService, setActiveService] = useState("branding")

  const services = [
    {
      id: "branding",
      icon: Palette,
      title: "Branding & Identity",
      description: "Complete brand identity design that makes your business memorable and distinctive.",
      features: ["Logo Design", "Brand Guidelines", "Color Schemes", "Typography", "Business Cards", "Stationery"],
      price: "Starting at $2,500",
    },
    {
      id: "web-design",
      icon: Monitor,
      title: "Web Design",
      description: "Modern, responsive websites that convert visitors into customers with seamless UX.",
      features: [
        "Responsive Design",
        "UI/UX Design",
        "E-commerce",
        "Landing Pages",
        "CMS Integration",
        "SEO Optimization",
      ],
      price: "Starting at $5,000",
    },
    {
      id: "video",
      icon: Video,
      title: "Video Production",
      description: "Professional video content from concept to completion for all your marketing needs.",
      features: [
        "Commercial Videos",
        "Social Media Content",
        "Animations",
        "Post-Production",
        "Color Grading",
        "Sound Design",
      ],
      price: "Starting at $3,500",
    },
    {
      id: "motion-graphics",
      icon: Zap,
      title: "Motion Graphics",
      description: "Eye-catching animated graphics that bring your brand to life across digital platforms.",
      features: [
        "2D Animation",
        "Visual Effects",
        "Explainer Videos",
        "Logo Animation",
        "Kinetic Typography",
        "3D Graphics",
      ],
      price: "Starting at $2,000",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do Best</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions to help your brand stand out in today's competitive market
          </p>
        </div>

        <Tabs value={activeService} onValueChange={setActiveService} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {services.map((service) => (
              <TabsTrigger key={service.id} value={service.id} className="flex items-center gap-2">
                <service.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{service.title.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                        <Badge variant="secondary">{service.price}</Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>

                <div className="relative">
                  <Card className="bg-muted/50">
                    <CardContent className="p-8">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                        <service.icon className="h-16 w-16 text-primary/60" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
