import Link from "next/link"
import { Music, UserPlus, Search, MessageCircle, ArrowRight, Sparkles, Users, FileText, ChevronRight } from "lucide-react"

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: ((i * 17 + 3) % 100),
  delay: ((i * 2.3) % 8),
  duration: 8 + ((i * 1.7) % 7),
  size: 2 + ((i * 0.7) % 4),
}))

const stats = [
  { value: "2.4k", label: "músicos", icon: Users },
  { value: "847", label: "collabs", icon: MessageCircle },
  { value: "12k", label: "posts", icon: FileText },
]

const steps = [
  { step: "01", title: "Crie seu Perfil", desc: "Cadastre-se e mostre seus instrumentos, gêneros e seu som para o mundo." },
  { step: "02", title: "Descubra Talentos", desc: "Explore músicos perto de você ou encontre parceiros ideais para seu projeto." },
  { step: "03", title: "Colabore", desc: "Conecte-se, troque ideias e crie música incrível com outros artistas." },
]

const features = [
  { icon: Music, title: "Feed Musical", desc: "Compartilhe samples, vídeos e atualizações com a comunidade." },
  { icon: Search, title: "Descubra Artistas", desc: "Encontre músicos por instrumento, gênero ou localização." },
  { icon: MessageCircle, title: "Chat Integrado", desc: "Converse em tempo real com outros músicos." },
  { icon: Users, title: "Hub de Collabs", desc: "Publique ou encontre oportunidades de colaboração." },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(167,139,250,0.08)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(45,212,191,0.05)_0%,_transparent_50%)]" />

      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed rounded-full bg-purple-400/20 pointer-events-none"
          style={{
            width: p.size + "px",
            height: p.size + "px",
            left: p.left + "%",
            bottom: "-10px",
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: p.delay + "s",
          }}
        />
      ))}

      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-purple-400">Sound</span><span className="text-cyan-400">Circle</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm">Entrar</Link>
            <Link href="/cadastro" className="btn-primary text-sm py-2 px-4">Criar Conta</Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-4 pt-24 pb-16 sm:pt-32 sm:pb-20 text-center">
          <div className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-zinc-400">A rede social dos músicos independentes</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-gradient">SoundCircle</span>
            <br />
            <span className="text-zinc-100">O palco é aqui</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Conecte-se com músicos independentes, encontre colaborações incríveis
            e compartilhe sua música com quem realmente importa.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/cadastro" className="btn-primary text-base animate-pulse-glow">
              Criar Conta Grátis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#como-funciona" className="btn-secondary text-base">
              Explorar
            </Link>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="glass-card p-6 sm:p-8 grid grid-cols-3 gap-4 sm:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-xs sm:text-sm text-zinc-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="max-w-7xl mx-auto px-4 pb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-zinc-100 mb-4">Como funciona</h2>
          <p className="text-zinc-500 text-center max-w-xl mx-auto mb-12">Em três passos simples, você começa a fazer música com outros artistas.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="glass-card p-6 sm:p-8 text-center group hover:border-purple-500/20 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-gradient">{s.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 pb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-zinc-100 mb-4">Recursos</h2>
          <p className="text-zinc-500 text-center max-w-xl mx-auto mb-12">Tudo que você precisa para criar, conectar e colaborar.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6 text-center group hover:border-cyan-500/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-zinc-100 mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Music className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-zinc-400">SoundCircle</span>
            </div>
            <p className="text-xs text-zinc-600">© 2026 SoundCircle. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
