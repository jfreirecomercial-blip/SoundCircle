"use client"

import * as React from "react"
import { Home, Search, Sparkles, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Feed", icon: Home, href: "#" },
  { label: "Descobrir", icon: Search, href: "#" },
  { label: "Collabs", icon: Sparkles, href: "#" },
  { label: "Chat", icon: MessageCircle, href: "#" },
  { label: "Perfil", icon: User, href: "#" },
]

export function BottomNav({ className }: { className?: string }) {
  const [active, setActive] = React.useState(0)

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#0b0b17]/90 backdrop-blur-2xl md:hidden",
        className
      )}
    >
      <div className="flex items-center justify-around px-2 pb-safe">
        {tabs.map((tab, i) => (
          <a
            key={tab.label}
            href={tab.href}
            onClick={(e) => {
              e.preventDefault()
              setActive(i)
            }}
            className={cn(
              "relative flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors",
              i === active
                ? "text-[#a78bfa]"
                : "text-white/40 hover:text-white/60"
            )}
          >
            {i === active && (
              <span className="absolute -top-0.5 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#a78bfa] to-[#2dd4bf]" />
            )}
            <tab.icon size={20} />
            <span>{tab.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
