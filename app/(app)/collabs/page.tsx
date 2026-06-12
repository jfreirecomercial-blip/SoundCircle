'use client'

import { CollabCard } from "@/components/CollabCard"
import { Plus, Filter } from "lucide-react"
import { useState } from "react"

const filters = ["Todas", "Presencial", "Remoto", "Misto"]
const instrumentFilters = ["Todos", "Vocais", "Guitarra", "Bateria", "Baixo", "Teclado", "Produção"]

const collabs = [
  {
    id: 1,
    poster: { name: "Rafael Towers", avatar: "RT" },
    title: "Guitarrista para banda de Rock Alternativo",
    description: "Procuramos guitarrista para fechar formação de banda com influências de Rock Alternativo, Indie e Pós-Punk. Temos ensaio marcado e queremos gravar um EP ainda esse semestre. Ensaios em São Paulo - Zona Oeste.",
    instruments: ["Guitarra"],
    genre: "Rock",
    type: "Presencial",
    budget: "A combinar",
    applicants: 8,
  },
  {
    id: 2,
    poster: { name: "Luna Mendes", avatar: "LM" },
    title: "Produtor(a) para gravação de Single",
    description: "Preciso de um produtor musical para me ajudar a finalizar um single autoral de MPB com influências eletrônicas. Já tenho as bases gravadas, preciso de mixagem, masterização e alguns arranjos adicionais.",
    instruments: ["Produção", "Teclado"],
    genre: "MPB",
    type: "Remoto",
    budget: "R$ 1.500",
    applicants: 12,
  },
  {
    id: 3,
    poster: { name: "Bia Batucada", avatar: "BB" },
    title: "Baixista para projeto de Samba/Jazz",
    description: "Montando um trio de samba-jazz instrumental. Preciso de baixista com experiência em samba e improvisação. Repertório autoral e standards. Ensaios em Brasília.",
    instruments: ["Baixo"],
    genre: "Samba",
    type: "Presencial",
    budget: "R$ 800",
    applicants: 5,
  },
  {
    id: 4,
    poster: { name: "DJ Eclipse", avatar: "DE" },
    title: "Vocalista para track eletrônica",
    description: "Buscando vocalista para collab em uma track eletrônica com vibe melancólica e atmosférica. Estilo: Electronica / Downtempo / Ambient Pop. Posso fazer a produção completa.",
    instruments: ["Vocais"],
    genre: "Eletrônica",
    type: "Remoto",
    budget: "R$ 500",
    applicants: 15,
  },
]

export default function CollabsPage() {
  const [activeFilter, setActiveFilter] = useState("Todas")
  const [activeInstrument, setActiveInstrument] = useState("Todos")

  const filtered = collabs.filter((c) => {
    const matchType = activeFilter === "Todas" || c.type === activeFilter
    const matchInstrument = activeInstrument === "Todos" || c.instruments.some((i) => i.toLowerCase() === activeInstrument.toLowerCase())
    return matchType && matchInstrument
  })

  return (
    <div className="pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Hub de Collabs</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Encontre ou publique oportunidades de colaboração</p>
        </div>
        <button className="btn-primary text-sm py-2.5 px-5 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Publicar Oportunidade
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
        {instrumentFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveInstrument(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeInstrument === f
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25"
                : "bg-white/5 text-zinc-500 border border-white/5 hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((collab) => (
          <CollabCard key={collab.id} collab={collab} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-zinc-500">Nenhuma oportunidade encontrada para esses filtros.</p>
        </div>
      )}
    </div>
  )
}
