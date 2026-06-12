'use client'

import { PostCard } from "@/components/PostCard"
import { Sidebar } from "@/components/layout/Sidebar"
import { Music, Image, Mic } from "lucide-react"

const posts = [
  { id: 1, user: { name: "Ana Beatriz", avatar: "AB", instrument: "Vocalista" }, content: "Acabei de gravar um novo sample de MPB com uma levada de violão bem suave. Quem topa colocar uma base de bateria?", time: "há 2h", likes: 24, comments: 8, liked: false, audio: "sample.mp3" },
  { id: 2, user: { name: "Carlos Lima", avatar: "CL", instrument: "Guitarrista" }, content: "Procurando baixista pra fechar uma banda de rock alternativo em SP. Temos ensaio marcado e queremos gravar um EP ainda esse semestre.", time: "há 4h", likes: 42, comments: 15, liked: true },
  { id: 3, user: { name: "DJ Luna", avatar: "DL", instrument: "Produtora" }, content: "Novo beat eletrônico disponível pra collab! Alguém quer mandar uns vocais?", time: "há 6h", likes: 67, comments: 23, liked: false, audio: "beat.mp3" },
  { id: 4, user: { name: "Pedro Reis", avatar: "PR", instrument: "Baixista" }, content: "Alguém tem experiência com gravação em home studio? Preciso de dicas pra melhorar a captação do baixo.", time: "há 8h", likes: 15, comments: 12, liked: false },
  { id: 5, user: { name: "Marina Costa", avatar: "MC", instrument: "Cantora" }, content: "Acabei de lançar meu novo single nas plataformas! Muito obrigada a todos que colaboraram nesse projeto 🎵", time: "há 12h", likes: 89, comments: 31, liked: true },
]

export default function FeedPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 max-w-2xl space-y-5 pb-8">
        <div className="glass-card p-3 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">VC</div>
          <div className="flex-1 bg-white/5 rounded-full px-4 py-2 text-sm text-zinc-500 cursor-text hover:bg-white/10 transition-all">
            Compartilhe algo com a comunidade...
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all"><Image className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"><Mic className="w-4 h-4" /></button>
          </div>
        </div>

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="hidden lg:block w-80 flex-shrink-0 pb-8">
        <Sidebar />
      </div>
    </div>
  )
}
