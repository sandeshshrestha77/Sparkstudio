import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
