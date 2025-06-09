"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("@/components/admin/QuillEditor"), { ssr: false });
import { supabase } from "@/lib/supabase";

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: [] as string[],
    published: false,
    featured_image: "",
  });

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      setError("");
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setError("Could not fetch blog post");
      } else {
        setPost(data);
      }
      setLoading(false);
    }
    if (id) fetchPost();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setPost((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        tags: post.tags,
        published: post.published,
        featured_image: post.featured_image,
      })
      .eq("id", id);
    if (error) {
      setError("Failed to update blog post");
    } else {
      setSuccess("Blog post updated!");
      setTimeout(() => router.push("/admin/blog"), 1000);
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="Blog title"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="excerpt">Excerpt</label>
          <Input
            id="excerpt"
            name="excerpt"
            value={post.excerpt}
            onChange={handleChange}
            placeholder="Short excerpt"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="content">Content</label>
          <QuillEditor
            value={post.content}
            onChange={value => setPost(prev => ({ ...prev, content: value }))}
            placeholder="Blog content"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="author">Author</label>
          <Input
            id="author"
            name="author"
            value={post.author}
            onChange={handleChange}
            placeholder="Author name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="category">Category</label>
          <Input
            id="category"
            name="category"
            value={post.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="tags">Tags (comma separated)</label>
          <Input
            id="tags"
            name="tags"
            value={post.tags.join(", ")}
            onChange={e => setPost(p => ({ ...p, tags: e.target.value.split(",").map((t: string) => t.trim()) }))}
            placeholder="tag1, tag2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="featured_image">Featured Image URL</label>
          <Input
            id="featured_image"
            name="featured_image"
            value={post.featured_image}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            checked={post.published}
            onChange={handleChange}
          />
          Published
        </label>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
