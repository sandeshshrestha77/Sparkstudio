"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"
import { Plus, Edit, Trash2, Search, Palette, Video, ImageIcon, FileText } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price: string
  original_price: string
  timeline: string
  popular: boolean
  icon: string
  created_at: string
}

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadServices()
  }, [])

  useEffect(() => {
    filterServices()
  }, [services, searchTerm])

  const loadServices = async () => {
    try {
      const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error("Error loading services:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = services

    if (searchTerm) {
      filtered = filtered.filter((service) => service.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredServices(filtered)
  }

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    try {
      const { error } = await supabase.from("services").delete().eq("id", id)

      if (error) throw error

      setServices(services.filter((s) => s.id !== id))
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  const togglePopular = async (id: string, popular: boolean) => {
    try {
      const { error } = await supabase.from("services").update({ popular: !popular }).eq("id", id)

      if (error) throw error

      setServices(services.map((s) => (s.id === id ? { ...s, popular: !popular } : s)))
    } catch (error) {
      console.error("Error updating service:", error)
    }
  }

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Palette,
      Video,
      ImageIcon,
      FileText,
    }
    const IconComponent = iconMap[iconName] || Palette
    return <IconComponent className="h-6 w-6" />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading services...</p>
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
              <h1 className="text-2xl font-bold">Services Management</h1>
              <p className="text-muted-foreground">Manage your service offerings</p>
            </div>
            <Link href="/admin/services/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Service
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
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {getIcon(service.icon)}
                    </div>
                    <div>
                      <h3 className="font-semibold line-clamp-1">{service.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-green-600">{service.price}</span>
                        {service.original_price && (
                          <span className="text-xs text-muted-foreground line-through">{service.original_price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {service.popular && <Badge variant="default">Popular</Badge>}
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{service.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="outline">{service.timeline}</Badge>
                  <Badge variant="secondary">{service.features.length} features</Badge>
                </div>

                <div className="flex gap-2">
                  <Link href={`/admin/services/edit/${service.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => togglePopular(service.id, service.popular)}>
                    {service.popular ? "Unpopular" : "Popular"}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteService(service.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No services found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search criteria." : "Get started by adding your first service."}
              </p>
              <Link href="/admin/services/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Service
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
