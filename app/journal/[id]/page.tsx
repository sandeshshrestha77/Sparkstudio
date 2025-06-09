"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import QuillViewer from "@/components/admin/QuillViewer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  author_name?: string;
  author_avatar?: string;
  author_role?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  published?: boolean;
  read_time?: string;
  created_at: string;
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setError("Could not load blog post");
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    }
    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4 text-destructive">{error || "Blog post not found"}</h2>
            <Link href="/journal" className="inline-flex items-center gap-2 text-primary underline">
              <ArrowLeft className="h-4 w-4" /> Back to Journal
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link href="/journal" className="inline-flex items-center gap-2 text-muted-foreground mb-6 hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Journal
        </Link>
        <Card className="overflow-hidden">
          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="w-full h-64 object-cover" />
          )}
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{post.category}</Badge>
              {post.tags && post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.author_avatar || "/placeholder.svg?height=40&width=40"} alt={post.author_name || "Author"} />
                  <AvatarFallback>{(post.author_name || "A").split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{post.author_name || "Anonymous"}</span>
                <span className="text-xs">{post.author_role || "Writer"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.read_time || "5 min read"}
              </div>
            </div>
            <QuillViewer value={post.content} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
