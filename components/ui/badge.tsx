import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        purple: "bg-[#a78bfa]/15 text-[#a78bfa] border border-[#a78bfa]/20",
        cyan: "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/20",
        amber: "bg-[#fbbf24]/15 text-[#fbbf24] border border-[#fbbf24]/20",
      },
    },
    defaultVariants: {
      variant: "purple",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
