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

  const team = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      image: "/placeholder.svg?height=300&width=300",
      bio: "10+ years in brand design with a passion for storytelling through visuals.",
      skills: [
        { name: "Brand Strategy", level: 95 },
        { name: "Art Direction", level: 90 },
        { name: "Team Leadership", level: 88 },
      ],
      social: {
        email: "sarah@sparkstudio.com",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Video Editor",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Award-winning video editor specializing in commercial and narrative content.",
      skills: [
        { name: "Video Editing", level: 98 },
        { name: "Motion Graphics", level: 85 },
        { name: "Color Grading", level: 92 },
      ],
      social: {
        email: "marcus@sparkstudio.com",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Emily Watson",
      role: "UI/UX Designer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "User-centered design advocate creating intuitive digital experiences.",
      skills: [
        { name: "UI Design", level: 93 },
        { name: "UX Research", level: 87 },
        { name: "Prototyping", level: 90 },
      ],
      social: {
        email: "emily@sparkstudio.com",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "David Kim",
      role: "Motion Graphics Artist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Bringing brands to life through innovative animation and visual effects.",
      skills: [
        { name: "2D Animation", level: 96 },
        { name: "3D Graphics", level: 82 },
        { name: "Visual Effects", level: 89 },
      ],
      social: {
        email: "david@sparkstudio.com",
        linkedin: "#",
        twitter: "#",
      },
    },
  ]

  const values = [
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe the best work comes from close partnership with our clients",
    },
    {
      icon: Target,
      title: "Purpose-Driven",
      description: "Every design decision is made with your business goals in mind",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every pixel, frame, and interaction",
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We love what we do, and it shows in the quality of our work",
    },
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Spark Studio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a passionate team of designers, developers, and storytellers dedicated to helping brands create
            meaningful connections with their audiences.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="mission">Our Mission</TabsTrigger>
            <TabsTrigger value="values">Our Values</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
          </TabsList>

          <TabsContent value="mission">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  At Spark Studio, we believe that great design has the power to transform businesses and inspire
                  audiences. Our mission is to ignite the creative spark within every brand we work with, crafting
                  visual stories that resonate, engage, and drive meaningful results.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Founded in 2019, we've grown from a small creative collective to a full-service digital agency, but
                  we've never lost our startup spirit and personal approach to client relationships.
                </p>
                <Button>Learn More About Our Story</Button>
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

          <TabsContent value="team">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

                    <div className="space-y-3 mb-4">
                      {member.skills.map((skill, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                        <Linkedin className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                        <Twitter className="h-3 w-3" />
                      </Button>
                    </div>
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
