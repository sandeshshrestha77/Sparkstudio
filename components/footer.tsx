import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"
import Logo from "@/components/Logo"

export function Footer() {
  return (
    <footer className="bg-black border-t border-blue-900/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="h-8 w-auto" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Spark Studio is your creative partner for branding, web design, video production, and digital marketing. We help startups and businesses ignite their brand presence and connect with audiences through innovative solutions.
            </p>
            <div className="text-gray-300 text-sm mb-4">
              <span className="block">Contact us: <a href="mailto:sparkstudionp@gmail.com" className="underline hover:text-blue-400">sparkstudionp@gmail.com</a></span>
              <span className="block">Kathmandu, Nepal</span>
            </div>
            <div className="flex space-x-4">
              <Button
              variant="outline"
              size="icon"
              className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
              asChild
              >
              <a href="https://www.instagram.com/sparkstudio.np" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4 text-blue-400" />
              </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Portfolio</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/portfolio" className="hover:text-blue-400 transition-colors">Our Work</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
              </li>
              <li>
                <a href="/journal" className="hover:text-blue-400 transition-colors">Blog</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Spark Studio. All rights reserved.</div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="./privacy-policy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="./terms-of-service" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="./cookie-policy" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
