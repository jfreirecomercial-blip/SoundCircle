'use client'

import Link from "next/link"
import { Music, Mail, Lock, User, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function CadastroPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(45,212,191,0.08)_0%,_transparent_60%)]" />
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="fixed rounded-full bg-cyan-400/15 pointer-events-none"
          style={{
            width: ((i * 3 + 2) % 6) + "px",
            height: ((i * 3 + 2) % 6) + "px",
            left: ((i * 27 + 7) % 100) + "%",
            bottom: "-10px",
            animation: `float ${8 + (i * 1.3) % 6}s ease-in-out infinite`,
            animationDelay: (i * 0.7) % 5 + "s",
          }}
        />
      ))}

      <div className="glass-card p-8 sm:p-10 w-full max-w-md relative">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mb-4">
            <Music className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-100">Criar Conta</h1>
          <p className="text-sm text-zinc-500 mt-1">Junte-se ao SoundCircle</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Nome</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/40 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/40 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/40 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">Confirmar Senha</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/40 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500">
            Criar Conta
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0b0b17] px-4 text-zinc-600">ou crie com</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border border-white/10 text-sm text-zinc-300 hover:bg-white/5 hover:border-white/20 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#ea4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.832 1.24 6.926l4.026 2.839Z"/><path fill="#34a853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 2.82A11.959 11.959 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/><path fill="#4a90e2" d="M19.834 21c2.195-2.016 3.384-5.063 3.166-8.5H12v3.818h6.364c-.316 1.43-1.09 2.582-2.324 3.195l3.794 3.487Z"/><path fill="#fbbc05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.538.347-2.236L1.24 6.926A11.96 11.96 0 0 0 0 12c0 1.872.474 3.632 1.24 5.074l4.037-2.806Z"/></svg>
          Criar conta com Google
        </button>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Já tem conta?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}
