'use client'

import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Navbar } from "@/components/layout/Navbar"
import { BottomNav } from "@/components/layout/BottomNav"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    router.replace("/login")
    return null
  }

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24">{children}</main>
      <BottomNav />
    </div>
  )
}
