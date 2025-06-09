"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { Plus, Edit, Trash2, Search, Filter, Eye } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
const QuillViewer = dynamic(() => import("@/components/admin/QuillViewer"), { ssr: false })

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  published: boolean
  featured_image: string
  created_at: string
  updated_at: string
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, statusFilter])

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error("Error loading blog posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      const isPublished = statusFilter === "published"
      filtered = filtered.filter((post) => post.published === isPublished)
    }

    setFilteredPosts(filtered)
  }

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) throw error

      setPosts(posts.filter((p) => p.id !== id))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const { error } = await supabase.from("blog_posts").update({ published: !published }).eq("id", id)

      if (error) throw error

      setPosts(posts.map((p) => (p.id === id ? { ...p, published: !published } : p)))
    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Blog Management</h1>
              <p className="text-muted-foreground">Manage your blog posts and articles</p>
            </div>
            <Link href="/admin/blog/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Post
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onEdit={() => (window.location.href = `/admin/blog/${post.id}/edit`)}
              onTogglePublished={() => togglePublished(post.id, post.published)}
              onDelete={() => deletePost(post.id)}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No blog posts found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first blog post."}
              </p>
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Post
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// BlogPostCard component for rendering each blog post with expand/collapse for content
// (useState already imported at top)
import { FC } from "react";

type BlogPostCardProps = {
  post: BlogPost;
  onEdit: () => void;
  onTogglePublished: () => void;
  onDelete: () => void;
};

const BlogPostCard: FC<BlogPostCardProps> = ({ post, onEdit, onTogglePublished, onDelete }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <Badge variant={post.published ? "default" : "secondary"}>
                {post.published ? "Published" : "Draft"}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline">{post.category}</Badge>
              <Badge variant="outline">By {post.author}</Badge>
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              Created: {new Date(post.created_at).toLocaleDateString()} | Updated: {new Date(post.updated_at).toLocaleDateString()}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mb-2"
              onClick={() => setShowContent((v) => !v)}
            >
              <Eye className="h-4 w-4 mr-1" />
              {showContent ? "Hide" : "Read More"}
            </Button>
            {showContent && (
              <div className="border mt-2 rounded bg-background p-4">
                <QuillViewer value={post.content} />
              </div>
            )}
          </div>
          <div className="flex gap-2 ml-4">
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={onTogglePublished}>
              {post.published ? "Unpublish" : "Publish"}
            </Button>
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

