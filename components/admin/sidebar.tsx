"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Logo from "@/components/Logo";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  FileText,
  Mail,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { supabase } from "@/lib/supabase"

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderOpen },
    { name: "Services", href: "/admin/services", icon: Settings },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Contact Submissions", href: "/admin/contacts", icon: Mail },
    { name: "Admin Users", href: "/admin/users", icon: Users },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/admin/login"
  }

  return (
    <div
      className={`bg-background border-r h-screen flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground rounded-md h-8 w-8 p-0"
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start mb-1 ${collapsed ? "px-2" : ""}`}
                >
                  <item.icon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-2"}`} />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={`w-full justify-start text-muted-foreground hover:text-foreground ${collapsed ? "px-2" : ""}`}
          onClick={handleLogout}
        >
          <LogOut className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-2"}`} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}
