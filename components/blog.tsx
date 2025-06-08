"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Calendar, ArrowRight, Clock, BookOpen } from "lucide-react"

export function Blog() {
  const [readingList, setReadingList] = useState<number[]>([])

  const posts = [
    {
      id: 1,
      title: "The Future of Brand Identity in 2024",
      excerpt:
        "Exploring emerging trends in logo design, color psychology, and brand storytelling that will shape the industry.",
      image: "/placeholder.svg?height=200&width=400",
      author: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Creative Director",
      },
      date: "Dec 15, 2023",
      category: "Branding",
      readTime: "5 min read",
      featured: true,
    },
    {
      id: 2,
      title: "Video Marketing: Why Motion Beats Static",
      excerpt: "Data-driven insights on how video content outperforms static imagery across all digital platforms.",
      image: "/placeholder.svg?height=200&width=400",
      author: {
        name: "Marcus Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Senior Video Editor",
      },
      date: "Dec 10, 2023",
      category: "Video",
      readTime: "7 min read",
      featured: false,
    },
    {
      id: 3,
      title: "UX Design Principles That Convert",
      excerpt:
        "Essential user experience guidelines that turn website visitors into loyal customers and brand advocates.",
      image: "/placeholder.svg?height=200&width=400",
      author: {
        name: "Emily Watson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI/UX Designer",
      },
      date: "Dec 5, 2023",
      category: "Design",
      readTime: "6 min read",
      featured: false,
    },
  ]

  const addToReadingList = (postId: number) => {
    setReadingList((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Latest Insights
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">From Our Blog</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with industry trends, design tips, and behind-the-scenes looks at our creative process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Post */}
          {featuredPost && (
            <div className="lg:col-span-2">
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge>{featuredPost.category}</Badge>
                    <Badge variant="secondary">Featured</Badge>
                  </div>
                  <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-base">{featuredPost.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={featuredPost.author.avatar || "/placeholder.svg"}
                          alt={featuredPost.author.name}
                        />
                        <AvatarFallback>
                          {featuredPost.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{featuredPost.author.name}</div>
                        <div className="text-muted-foreground">{featuredPost.author.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <Button>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addToReadingList(featuredPost.id)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      {readingList.includes(featuredPost.id) ? "Saved" : "Save"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular Posts */}
          <div className="space-y-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback className="text-xs">
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{post.author.name}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => addToReadingList(post.id)}>
                      <BookOpen className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
