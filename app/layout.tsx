import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandesh Shrestha - Creative Design Solutions for Nepali Businesses",
  description:
    "Professional graphic design and video editing services at affordable local rates. We help Nepali businesses stand out with exceptional creative work.",
  keywords: "graphic design, video editing, Nepal, creative agency, branding, logo design",
  authors: [{ name: "Sandesh Shrestha" }],
  creator: "Sandesh Shrestha",
  publisher: "Sandesh Shrestha",
  openGraph: {
    title: "Sandesh Shrestha - Creative Design Solutions",
    description: "Professional graphic design and video editing services for Nepali businesses",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandesh Shrestha - Creative Design Solutions",
    description: "Professional graphic design and video editing services for Nepali businesses",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable} font-sans`}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
