"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { Genre } from "@/types/genre"

interface GenreGridProps {
  selected: Genre[]
  onChange: (genres: Genre[]) => void
  options: Genre[]
  className?: string
}

const genreColors: Record<Genre, string> = {
  Rock: "from-red-500 to-orange-500",
  Pop: "from-pink-500 to-rose-500",
  "Hip Hop": "from-yellow-500 to-amber-600",
  Jazz: "from-blue-500 to-indigo-500",
  Eletrônica: "from-cyan-500 to-purple-500",
  MPB: "from-green-500 to-emerald-500",
  Samba: "from-yellow-400 to-green-500",
  Funk: "from-purple-500 to-pink-500",
  "R&B": "from-teal-500 to-blue-500",
  Reggae: "from-green-400 to-lime-500",
  Clássica: "from-gray-400 to-gray-600",
  Indie: "from-orange-400 to-red-500",
  Metal: "from-gray-600 to-black",
  Country: "from-amber-500 to-yellow-500",
  Blues: "from-blue-600 to-indigo-600",
  Pagode: "from-green-400 to-teal-500",
  Forró: "from-orange-500 to-red-400",
  Trap: "from-purple-600 to-pink-600",
  "Lo-Fi": "from-violet-400 to-purple-400",
  House: "from-cyan-400 to-blue-500",
}

export function GenreGrid({ selected, onChange, options, className }: GenreGridProps) {
  const toggle = (genre: Genre) => {
    if (selected.includes(genre)) {
      onChange(selected.filter((g) => g !== genre))
    } else {
      onChange([...selected, genre])
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((genre) => {
        const isSelected = selected.includes(genre)
        return (
          <button
            key={genre}
            onClick={() => toggle(genre)}
            className={cn(
              "group relative overflow-hidden rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
              isSelected
                ? "bg-gradient-to-r from-[#a78bfa] to-[#2dd4bf] text-white shadow-lg shadow-[#a78bfa]/25"
                : "bg-white/5 text-white/60 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:text-white/80"
            )}
          >
            <span className="relative z-10">{genre}</span>
            {!isSelected && (
              <span
                className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-10 bg-gradient-to-r",
                  genreColors[genre]
                )}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
