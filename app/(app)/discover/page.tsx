'use client'

import { MusicianCard } from "@/components/MusicianCard"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { useState } from "react"

const filters = ["Todos", "Violão", "Guitarra", "Bateria", "Baixo", "Vocais", "Produção", "Teclado"]
const genres = ["MPB", "Rock", "Samba", "Eletrônica", "Jazz", "Hip-Hop", "Funk", "Clássico"]

const musicians = [
  { id: 1, name: "Luna Mendes", avatar: "LM", location: "São Paulo, SP", instruments: ["Vocais", "Violão"], genres: ["MPB", "Samba"], bio: "Cantora e compositora apaixonada por música brasileira. Buscando parcerias criativas." },
  { id: 2, name: "Rafael Towers", avatar: "RT", location: "Rio de Janeiro, RJ", instruments: ["Guitarra", "Teclado"], genres: ["Rock", "Jazz"], bio: "Guitarrista com 15 anos de estrada. Procuro banda para projetos autorais." },
  { id: 3, name: "Bia Batucada", avatar: "BB", location: "Brasília, DF", instruments: ["Bateria", "Percussão"], genres: ["Samba", "MPB"], bio: "Baterista versátil. Já toquei com vários artistas. Quero novas colaborações." },
  { id: 4, name: "DJ Eclipse", avatar: "DE", location: "Curitiba, PR", instruments: ["Produção", "Teclado"], genres: ["Eletrônica", "Hip-Hop"], bio: "Produtor musical e beatmaker. Vamos criar algo único juntos." },
  { id: 5, name: "Carlos Baixo", avatar: "CB", location: "Salvador, BA", instruments: ["Baixo", "Violão"], genres: ["Rock", "Funk"], bio: "Baixista profissional. Estúdio próprio. Disponibilidade para gravações." },
  { id: 6, name: "Marina Soprano", avatar: "MS", location: "Belo Horizonte, MG", instruments: ["Vocais", "Teclado"], genres: ["MPB", "Jazz"], bio: "Cantora lírica e popular. Busco pianista para duo ou trio." },
  { id: 7, name: "Gui Cordas", avatar: "GC", location: "Porto Alegre, RS", instruments: ["Violão", "Guitarra"], genres: ["MPB", "Samba"], bio: "Violonista e arranjador. Compor e gravar é o que me move." },
  { id: 8, name: "Kika Beat", avatar: "KB", location: "Recife, PE", instruments: ["Bateria", "Produção"], genres: ["Rock", "Eletrônica"], bio: "Baterista e produtora. Bateria eletrônica e acústica. Vamos fazer barulho!" },
]

export default function DiscoverPage() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")
  const [activeGenre, setActiveGenre] = useState<string | null>(null)

  const filtered = musicians.filter((m) => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.instruments.some((i) => i.toLowerCase().includes(search.toLowerCase()))
    const matchFilter = activeFilter === "Todos" || m.instruments.some((i) => i.toLowerCase().includes(activeFilter.toLowerCase()))
    const matchGenre = !activeGenre || m.genres.some((g) => g.toLowerCase() === activeGenre.toLowerCase())
    return matchSearch && matchFilter && matchGenre
  })

  return (
    <div className="pb-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar músicos, instrumentos..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-purple-500/40 focus:bg-white/10 transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white/10 transition-all">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeFilter === f
                ? "bg-purple-500/15 text-purple-400 border border-purple-500/25"
                : "bg-white/5 text-zinc-400 border border-white/10 hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGenre(activeGenre === g ? null : g)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeGenre === g
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25"
                : "bg-white/5 text-zinc-500 border border-white/5 hover:border-white/20"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-500">Nenhum músico encontrado para essa busca.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((m) => (
            <MusicianCard key={m.id} musician={m} />
          ))}
        </div>
      )}
    </div>
  )
}
