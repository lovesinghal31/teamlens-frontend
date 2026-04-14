import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-context"
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "TeamLens — AI-Powered Team Collaboration",
  description:
    "TeamLens brings AI intelligence to group project collaboration. Track tasks, schedule meetings automatically, chat in real-time, and get actionable insights — all in one dashboard.",
  openGraph: {
    title: "TeamLens — AI-Powered Team Collaboration",
    description: "The smart dashboard that keeps your team aligned, productive, and in the loop.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TeamLens — AI-Powered Team Collaboration",
    description: "The smart dashboard that keeps your team aligned, productive, and in the loop.",
  },
}

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider><AuthProvider>{children}</AuthProvider></ThemeProvider>
      </body>
    </html>
  )
}
