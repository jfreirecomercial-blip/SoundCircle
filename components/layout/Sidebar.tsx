"use client"

import * as React from "react"
import { TrendingUp, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { GlassCard } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const suggestions = [
  { name: "Ana Beatriz", tag: "@anabeatriz", role: "Cantora" },
  { name: "Lucas Mendes", tag: "@lucasm", role: "Produtor" },
  { name: "Rafaela Costa", tag: "@rafacosta", role: "Compositora" },
]

const trends = [
  { tag: "#samba", posts: 1243 },
  { tag: "#mpb", posts: 987 },
  { tag: "#trapbr", posts: 756 },
  { tag: "#eletronica", posts: 534 },
  { tag: "#lo-fi", posts: 312 },
]

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("flex flex-col gap-6", className)}>
      <GlassCard className="p-4" hoverable>
        <h3 className="mb-3 text-sm font-semibold text-white/80">
          Sugestões para seguir
        </h3>
        <div className="flex flex-col gap-3">
          {suggestions.map((user) => (
            <div
              key={user.tag}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar name={user.name} className="h-9 w-9 shrink-0" showOnline />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-white/40">{user.role}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="shrink-0">
                <UserPlus size={14} />
                Seguir
              </Button>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-4" hoverable>
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-[#a78bfa]" />
          <h3 className="text-sm font-semibold text-white/80">
            Trending Topics
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {trends.map((trend) => (
            <a
              key={trend.tag}
              href="#"
              className="group flex items-center justify-between rounded-xl px-2 py-1.5 transition-all hover:bg-white/5"
            >
              <span className="text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                {trend.tag}
              </span>
              <Badge variant="cyan">
                {trend.posts} posts
              </Badge>
            </a>
          ))}
        </div>
      </GlassCard>
    </aside>
  )
}
