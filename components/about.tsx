"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Target, Award, Heart, Mail, Linkedin, Twitter } from "lucide-react"

export function About() {
  const [activeTab, setActiveTab] = useState("mission")


  const values = [
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "Every design decision I make is with your business goals in mind.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "I strive for perfection in every pixel, frame, and interaction.",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "I love what I do, and it shows in the quality of my work.",
    },
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate designer, developer, and storyteller dedicated to helping brands create meaningful connections with their audiences.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="mission">My Mission</TabsTrigger>
            <TabsTrigger value="values">My Values</TabsTrigger>
          </TabsList>

          <TabsContent value="mission">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">My Mission</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I believe that great design has the power to transform businesses and inspire audiences. My mission is to ignite the creative spark within every brand I work with, crafting visual stories that resonate, engage, and drive meaningful results.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I started my journey in 2019, and since then I've been dedicated to providing a personal, hands-on approach to every client relationship.
                </p>
                <Button>Learn More About My Story</Button>
              </div>
              <Card>
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">2019</div>
                      <div className="text-muted-foreground">Founded</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="values">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
