import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Lobe - AI Dream Capture Device",
  description:
    "Never lose a dream again. Lobe is a screenless AI device that captures your dreams while you sleep and completes them before they fade.",
  keywords: ["dream capture", "sleep technology", "AI device", "dream recording", "REM sleep", "biometrics"],
  openGraph: {
    title: "Lobe - AI Dream Capture Device",
    description: "Never lose a dream again. Capture and complete your dreams with AI.",
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
