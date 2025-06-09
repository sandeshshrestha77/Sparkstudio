"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Bell, User } from "lucide-react"
import Logo from "@/components/Logo"

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  return (
    <header className="bg-background border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="h-10 w-auto" />
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">{user?.email}</div>
                <div className="text-xs text-muted-foreground">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
