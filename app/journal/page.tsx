"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import QuillViewer from "@/components/admin/QuillViewer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, BookOpen, ArrowRight, Heart, Share2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image_url?: string
  author_name?: string
  author_avatar?: string
  author_role?: string
  category: string
  tags: string[]
  featured?: boolean
  published?: boolean
  read_time?: string
  created_at: string
}

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          excerpt,
          content,
          category,
          tags,
          created_at,
          image_url,
          author_name,
          author_avatar,
          author_role,
          featured,
          published,
          read_time
        `)
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase error:", error)
        setError("Failed to load blog posts")
        setPosts([])
        return
      }

      setPosts(data || [])
    } catch (error) {
      console.error("Error loading blog posts:", error)
      setError("An unexpected error occurred")
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories from actual posts
  const getCategories = () => {
    const uniqueCategories = [...new Set(posts.map((post) => post.category).filter(Boolean))]
    return [
      { id: "all", label: "All Posts", count: posts.length },
      ...uniqueCategories.map((category) => ({
        id: category,
        label: category,
        count: posts.filter((p) => p.category === category).length,
      })),
    ]
  }

  const categories = getCategories()

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  if (error) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <h2 className="text-2xl font-bold mb-4 text-destructive">Error Loading Blog Posts</h2>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={loadPosts} variant="outline">
                  Try Again
                </Button>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Creative Journal</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Insights, stories, and perspectives from my creative journey
            </p>

            {/* Search and Filter - Only show if we have posts */}
            {posts.length > 0 && (
              <>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-80"
                    />
                  </div>
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
              </>
            )}
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
      ) : posts.length === 0 ? (
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <Card>
                <CardContent className="p-12">
                  <BookOpen className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
                  <h3 className="text-2xl font-semibold mb-4">No Blog Posts Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    I haven't published any blog posts yet. Check back soon for my latest insights and creative
                    stories!
                  </p>
                  <Button onClick={loadPosts} variant="outline">
                    Refresh
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && selectedCategory === "all" && !searchQuery && (
            <section className="py-12 px-4">
              <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="aspect-video lg:aspect-auto overflow-hidden">
                        <img
                          src={featuredPost.image_url || "/placeholder.svg?height=400&width=600"}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className="bg-primary">Featured</Badge>
                          <Badge variant="outline">{featuredPost.category}</Badge>
                        </div>
                        <Link href={`/journal/${featuredPost.id}`} passHref legacyBehavior>
                          <a className="text-2xl md:text-3xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer block">
                            {featuredPost.title}
                          </a>
                        </Link>

                        <QuillViewer value={featuredPost.content} />

                        <div className="flex items-center gap-4 mb-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage
                                src={featuredPost.author_avatar || "/placeholder.svg?height=40&width=40"}
                                alt={featuredPost.author_name || "Author"}
                              />
                              <AvatarFallback>
                                {(featuredPost.author_name || "A")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{featuredPost.author_name || "Anonymous"}</div>
                              <div className="text-muted-foreground text-xs">
                                {featuredPost.author_role || "Writer"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-muted-foreground text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(featuredPost.created_at).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {featuredPost.read_time || "5 min read"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Link href={`/journal/${featuredPost.id}`} passHref legacyBehavior>
                            <a className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium">
                              Read Article
                              <ArrowRight className="ml-2 h-3 w-3" />
                            </a>
                          </Link>
                          <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </div>
            </section>
          )}

          {/* Regular Posts Grid */}
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <div className="max-w-6xl mx-auto">
                {regularPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.image_url || "/placeholder.svg?height=400&width=600"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </div>

                          <Link href={`/journal/${post.id}`} passHref legacyBehavior>
                            <a className="text-lg font-semibold mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2 block">
                              {post.title}
                            </a>
                          </Link>

                          <QuillViewer value={post.content} />

                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src={post.author_avatar || "/placeholder.svg?height=40&width=40"}
                                alt={post.author_name || "Author"}
                              />
                              <AvatarFallback className="text-xs">
                                {(post.author_name || "A")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">{post.author_name || "Anonymous"}</span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            <span>{post.read_time || "5 min read"}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <Link href={`/journal/${post.id}`} passHref legacyBehavior>
                              <a className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium">
                                Read More
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </a>
                            </Link>
                            <div className="flex items-center gap-3">
                              <Button variant="ghost" size="sm" className="p-0 h-auto">
                                <Heart className="h-3 w-3 text-muted-foreground" />
                              </Button>
                              <Button variant="ghost" size="sm" className="p-0 h-auto">
                                <BookOpen className="h-3 w-3 text-muted-foreground" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredPosts.length === 0 && (searchQuery || selectedCategory !== "all") ? (
                  <div className="text-center py-16">
                    <Card>
                      <CardContent className="p-12">
                        <Search className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-4">No Articles Found</h3>
                        <p className="text-muted-foreground mb-6">
                          No articles match your current search or filter criteria.
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
                ) : null}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
