"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  tags: string[];
  featured: boolean;
  client_name: string;
  project_url: string;
  created_at: string;
}

import * as React from "react";

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { id } = React.use(params) as { id: string };

  useEffect(() => {
    async function loadProject() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        setProject(null);
      } else {
        setProject(data);
      }
      setLoading(false);
    }
    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Project not found.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="overflow-hidden mb-8">
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={project.image_url || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-4">
              {project.featured && <Badge className="bg-primary">Featured</Badge>}
              <Badge variant="outline">{project.category}</Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(project.created_at).toLocaleDateString()}
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
            <p className="text-muted-foreground mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            {project.project_url && (
              <Button asChild size="sm" className="group">
                <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                  Visit Project
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
        <Button variant="outline" onClick={() => router.back()}>
          Back to all work
        </Button>
      </div>
    </div>
  );
}
