"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminIndexPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard or login
    router.push("/admin/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading admin panel...</p>
      </div>
    </div>
  )
}
