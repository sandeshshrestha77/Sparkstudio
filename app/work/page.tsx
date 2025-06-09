"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ExternalLink, Calendar, Tag, Filter } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  tags: string[]
  featured: boolean
  client_name: string
  project_url: string
  created_at: string
}

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error("Error loading projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: "all", label: "All Work", count: projects.length },
    { id: "branding", label: "Branding", count: projects.filter((p) => p.category === "branding").length },
    { id: "website", label: "Web Development", count: projects.filter((p) => p.category === "website").length },
    { id: "video", label: "Video", count: projects.filter((p) => p.category === "video").length },
    { id: "print", label: "Print", count: projects.filter((p) => p.category === "print").length },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredProjects = filteredProjects.filter((project) => project.featured)
  const regularProjects = filteredProjects.filter((project) => !project.featured)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">My Work</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore My portfolio of creative projects. From brand identities to digital experiences, I bring ideas
              to life with passion and precision.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-3"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <section className="py-24 px-4">
              <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold mb-12 text-center">Featured Work</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {featuredProjects.slice(0, 2).map((project, index) => (
                      <Link href={`/work/${project.id}`} key={project.id} className="block group">
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={project.image_url || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <CardContent className="p-8">
                            <div className="flex items-center gap-2 mb-4">
                              <Badge className="bg-primary">Featured</Badge>
                              <Badge variant="outline">{project.category}</Badge>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                            <p className="text-muted-foreground mb-6">{project.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map((tag, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              {project.project_url && (
                                <Link href={project.project_url} target="_blank">
                                  <Button size="sm" className="group">
                                    View Project
                                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* All Projects Grid */}
          <section className="py-24 px-4">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                {regularProjects.length > 0 && <h2 className="text-3xl font-bold mb-12 text-center">All Projects</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularProjects.map((project, index) => (
                    <Link href={`/work/${project.id}`} key={project.id} className="block group">
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.image_url || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {project.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(project.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold mb-3 line-clamp-2">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {project.tags.slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            {project.project_url && (
                              <Link href={project.project_url} target="_blank">
                                <Button size="sm" variant="ghost" className="p-0 h-auto">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </Link>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-16">
                    <Card>
                      <CardContent className="p-12">
                        <h3 className="text-xl font-semibold mb-4">No Projects Found</h3>
                        <p className="text-muted-foreground mb-6">
                          {searchQuery || selectedCategory !== "all"
                            ? "Try adjusting your search or filter criteria."
                            : "No projects have been added yet. Check back soon for my latest work!"}
                        </p>
                        <Button
                          onClick={() => {
                            setSearchQuery("")
                            setSelectedCategory("all")
                          }}
                          variant="outline"
                        >
                          Clear Filters
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Load More */}
                {filteredProjects.length > 0 && (
                  <div className="text-center mt-16">
                    <Button size="lg" variant="outline">
                      Load More Projects
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
