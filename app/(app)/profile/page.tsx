'use client'

import { useState } from "react"
import { MapPin, Music, Users, FileText, MessageCircle, Grid3X3, Mic, Handshake, UserPlus, Send, Heart, MessageCircle as MessageCircleIcon } from "lucide-react"
import { PostCard } from "@/components/PostCard"

const user = {
  name: "Ana Beatriz",
  avatar: "AB",
  location: "São Paulo, SP",
  bio: "Cantora, compositora e violonista. Apaixonada por MPB, samba e jazz. Buscando colaborações criativas e músicos para projetos autorais.",
  instruments: ["Vocais", "Violão", "Teclado"],
  genres: ["MPB", "Samba", "Jazz"],
  stats: { followers: 342, following: 189, posts: 47, collabs: 23 },
}

const tabs = [
  { id: "posts", label: "Posts", icon: Grid3X3 },
  { id: "samples", label: "Samples", icon: Mic },
  { id: "collabs", label: "Collabs", icon: Handshake },
]

const myPosts = [
  { id: 1, user: { name: "Ana Beatriz", avatar: "AB", instrument: "Vocalista" }, content: "Acabei de gravar um novo sample de MPB com uma levada de violão bem suave. Quem topa colocar uma base de bateria?", time: "há 2h", likes: 24, comments: 8, liked: false, audio: "sample.mp3" },
  { id: 2, user: { name: "Ana Beatriz", avatar: "AB", instrument: "Vocalista" }, content: "Novo vídeo no canal! Cover de 'Águas de Março' com arranjo próprio.", time: "há 1d", likes: 56, comments: 12, liked: true },
  { id: 3, user: { name: "Ana Beatriz", avatar: "AB", instrument: "Vocalista" }, content: "Alguém tem recomendação de luthier em SP? Preciso de um ajuste no violão.", time: "há 3d", likes: 18, comments: 9, liked: false },
]

const samples = [
  { id: 1, title: "Sample MPB - Voz e Violão", duration: "2:34", plays: 156 },
  { id: 2, title: "Improviso Jazz - Vocalise", duration: "1:45", plays: 89 },
  { id: 3, title: "Samba Choro - Melodia", duration: "3:12", plays: 234 },
  { id: 4, title: "Composição Original - Intro", duration: "0:58", plays: 67 },
]

const pastCollabs = [
  { id: 1, partner: "Rafael Towers", role: "Guitarrista", project: "EP - Sons da Cidade", status: "Concluído" },
  { id: 2, partner: "Bia Batucada", role: "Baterista", project: "Single - Maré Alta", status: "Em andamento" },
  { id: 3, partner: "Gui Cordas", role: "Violonista", project: "Live Session", status: "Concluído" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="pb-8">
      <div className="glass-card p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold ring-4 ring-purple-500/20 flex-shrink-0">
            {user.avatar}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">{user.name}</h1>
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-sm text-zinc-500">
              <MapPin className="w-3.5 h-3.5" />
              {user.location}
            </div>
            <p className="text-sm text-zinc-400 mt-3 max-w-lg leading-relaxed">{user.bio}</p>
            <div className="flex flex-wrap gap-1.5 mt-3 justify-center sm:justify-start">
              {user.instruments.map((i) => (
                <span key={i} className="tag text-xs"><Music className="w-3 h-3 mr-1" />{i}</span>
              ))}
              {user.genres.map((g) => (
                <span key={g} className="tag-cyan text-xs">{g}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-row sm:flex-col gap-2">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`btn-primary text-sm py-2 px-5 ${isFollowing ? 'bg-white/10 text-zinc-300 hover:bg-white/15' : ''}`}
            >
              <UserPlus className="w-4 h-4" />
              {isFollowing ? "Seguindo" : "Seguir"}
            </button>
            <button className="btn-secondary text-sm py-2 px-5">
              <Send className="w-4 h-4" />
              Propor Collab
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5 max-w-md mx-auto sm:mx-0">
          {Object.entries(user.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-lg font-bold text-gradient">{value}</div>
              <div className="text-xs text-zinc-500 mt-0.5 capitalize">{key === 'collabs' ? 'collabs' : key}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? "text-purple-400 border-purple-500"
                : "text-zinc-500 border-transparent hover:text-zinc-300"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "posts" && (
        <div className="space-y-5">
          {myPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {activeTab === "samples" && (
        <div className="space-y-3">
          {samples.map((s) => (
            <div key={s.id} className="glass-card p-4 flex items-center gap-4 group">
              <button className="w-10 h-10 rounded-full bg-purple-500/15 flex items-center justify-center text-purple-400 hover:bg-purple-500/25 transition-all group-hover:scale-105 flex-shrink-0">
                <Mic className="w-5 h-5" />
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-100 truncate">{s.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-zinc-500">{s.duration}</span>
                  <span className="text-xs text-zinc-500">{s.plays} plays</span>
                </div>
              </div>
              <div className="flex-1 max-w-[200px] h-1.5 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                <div className="h-full w-2/5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "collabs" && (
        <div className="space-y-3">
          {pastCollabs.map((c) => (
            <div key={c.id} className="glass-card p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center text-cyan-400 text-sm font-bold flex-shrink-0">
                {c.partner.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-100">{c.project}</p>
                <p className="text-xs text-zinc-500">com {c.partner} • {c.role}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                c.status === "Concluído" ? "bg-cyan-500/10 text-cyan-400" : "bg-purple-500/10 text-purple-400"
              }`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
