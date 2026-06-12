import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/Providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SoundCircle — Rede Social para Músicos",
  description: "Conecte-se com músicos independentes, encontre colaborações e compartilhe sua música no SoundCircle.",
  openGraph: {
    title: "SoundCircle — Rede Social para Músicos",
    description: "Conecte-se com músicos independentes, encontre colaborações e compartilhe sua música.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col noise-overlay">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
