import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Github } from "lucide-react";
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
              Transforming ideas into digital experiences. As a creative technologist, I craft compelling brands, design immersive websites, produce captivating videos, and architect strategic digital solutions that help businesses shine in the digital landscape. Let's create something extraordinary together.
            </p>
            <div className="text-gray-300 text-sm mb-4">
              <span className="block">Contact Me: <a href="mailto:sandeshstha67@gmail.com" className="underline hover:text-blue-400">sandeshstha67@gmail.com</a></span>
              <span className="block">ThapaGaun, New Baneshwor Kathmandu, Nepal</span>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
                asChild
              >
                <a href="https://www.behance.net/sandeshshrestha11" target="_blank" rel="noopener noreferrer" aria-label="Behance">
  <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7.1 10.8c.6 0 1.1-.2 1.1-.8 0-.5-.3-.8-1-.8H4.7v1.6h2.4zm.2 2.3c0-.6-.4-.9-1.2-.9H4.7v1.8h1.5c.8 0 1.1-.3 1.1-.9zm2.6-1.2c0 1-.5 1.7-1.4 2 .9.2 1.6.9 1.6 2.1 0 1.5-1.1 2.3-3.2 2.3H2V7.6h4.6c1.7 0 2.6.7 2.6 2 0 .7-.3 1.3-1 1.6.9.2 1.5.8 1.5 1.7zm3.2-4.3h4.5v1.1h-4.5V7.6zm7.5 5.1c-.2-.9-.8-1.4-1.7-1.4-.8 0-1.4.5-1.5 1.4h3.2zm-1.7-2.5c2.1 0 3.2 1.3 3.2 3.8h-4.8c.1 1.2.8 1.8 2 1.8.7 0 1.2-.3 1.4-.8h1.3c-.3 1.2-1.4 2.1-2.8 2.1-1.8 0-3.1-1.3-3.1-3.2.1-1.8 1.3-3.1 3.1-3.1zm-7.7 4.9c0-.6-.4-.9-1.2-.9H4.7v1.8h1.5c.8 0 1.1-.3 1.1-.9zm10.7-2.4c-.8 0-1.3.5-1.5 1.4h3c-.2-.9-.7-1.4-1.5-1.4z"/>
  </svg>
</a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
                asChild
              >
                <a href="https://www.facebook.com/sandesh.shrestha.98068" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4 text-blue-400" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
                asChild
              >
                <a href="https://www.instagram.com/sandesh__shrestha/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 text-blue-400" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-900/30 hover:border-blue-500/50 hover:bg-blue-900/20"
                asChild
              >
                <a href="https://github.com/sandeshshrestha77" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 text-blue-400" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Portfolio</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/work" className="hover:text-blue-400 transition-colors">My Work</a>
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
            <div className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Sandesh Shrestha. All rights reserved.</div>
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
