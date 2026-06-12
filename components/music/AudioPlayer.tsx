"use client"

import * as React from "react"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  src: string
  trackName: string
  artistName: string
  className?: string
}

export function AudioPlayer({ src, trackName, artistName, className }: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)

  React.useEffect(() => {
    audioRef.current = new Audio(src)
    const audio = audioRef.current

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration))
    audio.addEventListener("timeupdate", () =>
      setProgress(audio.currentTime)
    )
    audio.addEventListener("ended", () => {
      setIsPlaying(false)
      setProgress(0)
    })

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [src])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = value
      setProgress(value)
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-4",
        className
      )}
    >
      <button
        onClick={togglePlay}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#a78bfa] to-[#2dd4bf] text-white shadow-lg shadow-[#a78bfa]/25 transition-transform hover:scale-105 active:scale-95"
      >
        {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{trackName}</p>
            <p className="truncate text-xs text-white/50">{artistName}</p>
          </div>
          <span className="shrink-0 text-xs text-white/40">
            {formatTime(progress)} / {formatTime(duration)}
          </span>
        </div>

        <div className="relative flex items-center gap-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#a78bfa] to-[#2dd4bf] transition-all duration-100"
              style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
