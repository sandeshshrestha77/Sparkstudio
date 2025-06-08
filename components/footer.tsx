import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-blue-900/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-400 blur-md opacity-50"></div>
                <span className="text-white font-bold text-lg relative z-10">S</span>
              </div>
              <span className="text-xl font-bold text-white text-glow">Spark Studio</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Igniting creative sparks and transforming brands through exceptional design, video production, and digital
              experiences that captivate and convert.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
              >
                <Facebook className="h-4 w-4 text-blue-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
              >
                <Instagram className="h-4 w-4 text-blue-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
              >
                <Linkedin className="h-4 w-4 text-blue-400" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
              >
                <Youtube className="h-4 w-4 text-blue-400" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Branding & Identity
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Web Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Video Production
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Motion Graphics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">© 2023 Spark Studio. All rights reserved.</div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
