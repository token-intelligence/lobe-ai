import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Lobe AI - Your AI Life Coach",
  description:
    "Transform your dreams into reality with personalized AI coaching. Break down your biggest goals into daily actionable steps.",
  keywords: ["AI coach", "life coaching", "goal setting", "personal development", "productivity"],
  openGraph: {
    title: "Lobe AI - Your AI Life Coach",
    description: "Transform your dreams into reality with personalized AI coaching.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
