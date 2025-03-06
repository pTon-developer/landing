import type React from "react"
import type { Metadata } from "next"
import { Inter, Press_Start_2P } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
})

// Update the metadata
export const metadata: Metadata = {
  title: "pTon - Snake Game on Telegram",
  description: "The first Ton-powered snake game with real token rewards",
  themeColor: "#84cc16",
  icons: ['/favicon.ico']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart2P.variable} font-pixel bg-black text-white`}>{children}</body>
    </html>
  )
}