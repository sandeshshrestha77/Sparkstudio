"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Play, Eye, Heart } from "lucide-react"

export function Portfolio() {
  const [likedProjects, setLikedProjects] = useState<number[]>([])

  const projects = [
    {
      id: 1,
      title: "TechFlow Branding",
      category: "branding",
      image: "/placeholder.svg?height=400&width=600",
      description: "Complete brand identity for a tech startup including logo, guidelines, and marketing materials.",
      tags: ["Logo Design", "Brand Guidelines", "Stationery"],
      client: "TechFlow Inc.",
      year: "2023",
      likes: 42,
    },
    {
      id: 2,
      title: "EcoLife Website",
      category: "web-design",
      image: "/placeholder.svg?height=400&width=600",
      description: "Sustainable living e-commerce platform with modern design and seamless user experience.",
      tags: ["Web Design", "E-commerce", "Responsive"],
      client: "EcoLife",
      year: "2023",
      likes: 38,
    },
    {
      id: 3,
      title: "Product Launch Video",
      category: "video",
      image: "/placeholder.svg?height=400&width=600",
      description: "Promotional video for new product launch with motion graphics and professional editing.",
      tags: ["Video Production", "Animation", "Commercial"],
      client: "InnovateTech",
      year: "2023",
      isVideo: true,
      likes: 56,
    },
    {
      id: 4,
      title: "App Interface Design",
      category: "web-design",
      image: "/placeholder.svg?height=400&width=600",
      description: "Mobile app UI/UX design for fitness tracking with intuitive navigation and modern aesthetics.",
      tags: ["UI/UX", "Mobile Design", "Prototyping"],
      client: "FitTracker",
      year: "2023",
      likes: 29,
    },
    {
      id: 5,
      title: "Motion Graphics Reel",
      category: "motion-graphics",
      image: "/placeholder.svg?height=400&width=600",
      description: "Animated logo and graphics package for corporate branding and marketing campaigns.",
      tags: ["Motion Graphics", "2D Animation", "Logo Animation"],
      client: "Corporate Solutions",
      year: "2023",
      isVideo: true,
      likes: 47,
    },
    {
      id: 6,
      title: "Restaurant Rebrand",
      category: "branding",
      image: "/placeholder.svg?height=400&width=600",
      description: "Complete visual identity redesign for upscale restaurant including menu and signage design.",
      tags: ["Rebranding", "Menu Design", "Signage"],
      client: "Bella Vista",
      year: "2023",
      likes: 33,
    },
  ]

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "branding", label: "Branding" },
    { id: "web-design", label: "Web Design" },
    { id: "video", label: "Video" },
    { id: "motion-graphics", label: "Motion Graphics" },
  ]

  const toggleLike = (projectId: number) => {
    setLikedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId],
    )
  }

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Work
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our latest projects and see how we've helped brands tell their stories through compelling design
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((project) => category.id === "all" || project.category === category.id)
                  .map((project) => (
                    <Card
                      key={project.id}
                      className="group overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="secondary">
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{project.title}</DialogTitle>
                                <DialogDescription>{project.description}</DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                                  <img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Project Details</h4>
                                    <p className="text-sm text-muted-foreground mb-2">Client: {project.client}</p>
                                    <p className="text-sm text-muted-foreground mb-4">Year: {project.year}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Services</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {project.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {project.isVideo && (
                            <Button size="sm">
                              <Play className="mr-2 h-4 w-4" />
                              Play
                            </Button>
                          )}
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="w-8 h-8 p-0"
                            onClick={() => toggleLike(project.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${likedProjects.includes(project.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Heart className="h-3 w-3" />
                            {project.likes + (likedProjects.includes(project.id) ? 1 : 0)}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {project.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tags.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
