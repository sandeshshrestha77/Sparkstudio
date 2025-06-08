import type React from "react"
import type { Metadata } from "next"
import { Inter, Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Spark Studio - Creative Design Solutions for Nepali Businesses",
  description:
    "Professional graphic design and video editing services at affordable local rates. We help Nepali businesses stand out with exceptional creative work.",
  keywords: "graphic design, video editing, Nepal, creative agency, branding, logo design",
  authors: [{ name: "Spark Studio" }],
  creator: "Spark Studio",
  publisher: "Spark Studio",
  openGraph: {
    title: "Spark Studio - Creative Design Solutions",
    description: "Professional graphic design and video editing services for Nepali businesses",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spark Studio - Creative Design Solutions",
    description: "Professional graphic design and video editing services for Nepali businesses",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
