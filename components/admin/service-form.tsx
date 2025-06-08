"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabase"
import { Save, Plus, X } from "lucide-react"
import Link from "next/link"

interface ServiceFormProps {
  initialData?: {
    id?: string
    title: string
    description: string
    features: string[]
    price: string
    original_price: string
    timeline: string
    popular: boolean
    icon: string
  }
  mode: "create" | "edit"
}

export function ServiceForm({ initialData, mode }: ServiceFormProps) {
  const defaultData = {
    title: "",
    description: "",
    features: [""],
    price: "",
    original_price: "",
    timeline: "",
    popular: false,
    icon: "Palette",
  }

  const [formData, setFormData] = useState(initialData || defaultData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const featuresArray = formData.features.filter((feature) => feature.trim() !== "")

      if (mode === "create") {
        const { error } = await supabase.from("services").insert([
          {
            ...formData,
            features: featuresArray,
          },
        ])

        if (error) throw error
        setSuccess("Service created successfully!")
      } else {
        const { error } = await supabase
          .from("services")
          .update({
            ...formData,
            features: featuresArray,
          })
          .eq("id", initialData?.id)

        if (error) throw error
        setSuccess("Service updated successfully!")
      }

      setTimeout(() => {
        router.push("/admin/services")
      }, 1500)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }))
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === "create" ? "Service Details" : "Edit Service"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                placeholder="Enter service title"
              />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select value={formData.icon} onValueChange={(value) => handleChange("icon", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Palette">Palette (Design)</SelectItem>
                  <SelectItem value="Video">Video (Video)</SelectItem>
                  <SelectItem value="ImageIcon">Image (Social Media)</SelectItem>
                  <SelectItem value="FileText">File (Print)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Service description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
                placeholder="Starting at NPR 10,000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="original_price">Original Price</Label>
              <Input
                id="original_price"
                value={formData.original_price}
                onChange={(e) => handleChange("original_price", e.target.value)}
                placeholder="NPR 15,000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleChange("timeline", e.target.value)}
                placeholder="3-5 days"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Features</Label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Enter feature"
                    className="flex-1"
                  />
                  {formData.features.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="mr-2 h-4 w-4" />
                Add Feature
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="popular"
              checked={formData.popular}
              onCheckedChange={(checked) => handleChange("popular", checked === true)}
            />
            <Label htmlFor="popular">Popular Service</Label>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {mode === "create" ? "Creating..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {mode === "create" ? "Create Service" : "Update Service"}
                </>
              )}
            </Button>
            <Link href="/admin/services">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
