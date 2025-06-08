import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"

export default function AdminBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
