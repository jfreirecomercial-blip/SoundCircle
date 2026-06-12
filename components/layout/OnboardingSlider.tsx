"use client"

import * as React from "react"
import { Music, Users, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Music,
    title: "Compartilhe seu som",
    description:
      "Mostre ao mundo sua arte. Publique suas músicas, beats e criações para uma comunidade que respira música.",
  },
  {
    icon: Users,
    title: "Conecte-se",
    description:
      "Descubra artistas, produtores e compositores com estilos que combinam com o seu. O match perfeito está a um clique.",
  },
  {
    icon: Handshake,
    title: "Collab & Renda",
    description:
      "Crie parcerias, troque ideias e transforme colaborações em oportunidades reais de crescimento e renda.",
  },
]

interface OnboardingSliderProps {
  onComplete: () => void
  className?: string
}

export function OnboardingSlider({ onComplete, className }: OnboardingSliderProps) {
  const [current, setCurrent] = React.useState(0)
  const step = steps[current]
  const Icon = step.icon

  const next = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1)
    } else {
      onComplete()
    }
  }

  const skip = () => {
    onComplete()
  }

  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-between px-8 py-12 text-center",
        className
      )}
    >
      <div className="flex w-full justify-end">
        {current < steps.length - 1 && (
          <button
            onClick={skip}
            className="text-sm text-white/40 transition-colors hover:text-white/70"
          >
            Pular
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#a78bfa]/20 to-[#2dd4bf]/20 backdrop-blur-xl border border-white/10">
          <Icon className="h-10 w-10 text-[#a78bfa]" />
        </div>

        <h2 className="bg-gradient-to-r from-[#a78bfa] to-[#2dd4bf] bg-clip-text text-2xl font-bold text-transparent">
          {step.title}
        </h2>

        <p className="max-w-xs text-sm leading-relaxed text-white/60">
          {step.description}
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === current
                  ? "w-8 bg-gradient-to-r from-[#a78bfa] to-[#2dd4bf]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <Button onClick={next} size="lg" className="w-full max-w-xs">
          {current < steps.length - 1 ? "Próximo" : "Começar"}
        </Button>
      </div>
    </div>
  )
}
