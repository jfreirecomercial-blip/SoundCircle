"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const gradientPairs = [
  "from-[#a78bfa] to-[#2dd4bf]",
  "from-[#f472b6] to-[#a78bfa]",
  "from-[#2dd4bf] to-[#fbbf24]",
  "from-[#fb923c] to-[#f472b6]",
  "from-[#60a5fa] to-[#a78bfa]",
]

function getGradient(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return gradientPairs[Math.abs(hash) % gradientPairs.length]
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  name?: string
  src?: string
  showOnline?: boolean
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, name = "U", src, showOnline = false, ...props }, ref) => {
  const gradient = getGradient(name)
  const initials = getInitials(name)

  return (
    <div className="relative inline-flex shrink-0">
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={name}
          className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-sm font-medium text-white",
            gradient
          )}
          delayMs={600}
        >
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      {showOnline && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0b0b17] bg-[#2dd4bf]" />
      )}
    </div>
  )
})
Avatar.displayName = "Avatar"

export { Avatar }
