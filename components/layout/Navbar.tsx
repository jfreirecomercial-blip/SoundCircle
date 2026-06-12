"use client"

import * as React from "react"
import {
  Home,
  Sparkles,
  Compass,
  MessageCircle,
  ChevronDown,
  Music,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"

const navLinks = [
  { href: "#", label: "Feed", icon: Home },
  { href: "#", label: "Collabs", icon: Sparkles },
  { href: "#", label: "Descobrir", icon: Compass },
  { href: "#", label: "Chat", icon: MessageCircle },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0b0b17]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-1">
          <Music className="h-6 w-6 text-[#a78bfa]" />
          <span className="bg-gradient-to-r from-[#a78bfa] to-[#2dd4bf] bg-clip-text text-xl font-bold text-transparent">
            SoundCircle
          </span>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
            >
              <link.icon size={16} />
              {link.label}
            </a>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-full bg-white/5 p-1 pr-3 backdrop-blur-xl border border-white/10 transition-all hover:bg-white/10"
          >
            <Avatar name="Usuário" className="h-8 w-8" />
            <ChevronDown
              size={14}
              className={cn(
                "text-white/50 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </button>

          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-50 w-48 overflow-hidden rounded-2xl bg-[#1a1a2e]/95 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <div className="p-2">
                  <a
                    href="#"
                    className="block rounded-xl px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Perfil
                  </a>
                  <a
                    href="#"
                    className="block rounded-xl px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Configurações
                  </a>
                  <hr className="my-1 border-white/10" />
                  <a
                    href="#"
                    className="block rounded-xl px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
                  >
                    Sair
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
