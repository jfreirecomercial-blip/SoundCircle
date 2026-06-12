import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] shadow-xl",
          hoverable &&
            "transition-all duration-300 hover:bg-white/[0.07] hover:border-[#a78bfa]/20 hover:shadow-[#a78bfa]/10 hover:shadow-2xl hover:-translate-y-0.5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
