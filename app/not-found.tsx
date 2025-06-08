import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home, Search, Mail, FileQuestion } from "lucide-react"

export default function NotFound() {
  // Common navigation links that might help lost users
  const helpfulLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: FileQuestion },
    { name: "Work", href: "/work", icon: Search },
    { name: "Contact", href: "/contact", icon: Mail },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-16">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="border-2 border-dashed">
            <CardContent className="p-8 md:p-12">
              {/* 404 Graphic */}
              <div className="mb-8 relative">
                <div className="text-9xl font-bold opacity-10">404</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <FileQuestion className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Page Not Found</h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Oops! The page you're looking for doesn't exist or has been moved. Let's help you find your way back.
              </p>

              {/* Primary Action */}
              <div className="mb-8">
                <Link href="/">
                  <Button size="lg" className="group">
                    <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              {/* Helpful Links */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">You might be looking for:</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {helpfulLinks.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <link.icon className="h-4 w-4" />
                        {link.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  If you can't find what you're looking for, please{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    contact us
                  </Link>{" "}
                  and we'll be happy to help.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="font-medium">Email:</span> hello@sparkstudio.com.np |{" "}
                  <span className="font-medium">Phone:</span> +977 9801234567
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
