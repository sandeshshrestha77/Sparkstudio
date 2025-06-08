"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Briefcase, User, BookOpen, Mail, Palette, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function CreativeNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const pathname = usePathname()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const navItems = [
    { name: "Studio", href: "/", icon: Home, color: "from-blue-500 to-cyan-500" },
    { name: "Work", href: "/work", icon: Briefcase, color: "from-purple-500 to-pink-500" },
    { name: "Services", href: "/services", icon: Palette, color: "from-green-500 to-emerald-500" },
    { name: "About", href: "/about", icon: User, color: "from-orange-500 to-red-500" },
    { name: "Journal", href: "/journal", icon: BookOpen, color: "from-indigo-500 to-purple-500" },
    { name: "Contact", href: "/contact", icon: Mail, color: "from-pink-500 to-rose-500" },
  ]

  return (
    <>
      {/* Floating Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-effect rounded-full px-6 py-3 flex items-center gap-2">
          <div className="flex items-center gap-2 mr-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center morph-shape">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-space-grotesk font-bold text-white hidden sm:block">Spark</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`relative group ${
                      isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-20 rounded-md`} />
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 backdrop-blur-xl border-white/10">
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 slide-in-creative">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}
                        >
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{item.name}</div>
                          <div className="text-sm text-white/60">Explore {item.name.toLowerCase()}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Creative Cursor Follower */}
      <div
        className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />
    </>
  )
}
