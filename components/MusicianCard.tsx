import { MapPin, Music, UserPlus, Eye } from "lucide-react"

interface Musician {
  id: number
  name: string
  avatar: string
  location: string
  instruments: string[]
  genres: string[]
  bio: string
}

export function MusicianCard({ musician }: { musician: Musician }) {
  return (
    <div className="glass-card p-5 flex flex-col items-center text-center group">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold mb-3 ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
        {musician.avatar}
      </div>
      <h3 className="font-semibold text-zinc-100">{musician.name}</h3>
      <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
        <MapPin className="w-3 h-3" />
        {musician.location}
      </div>
      <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{musician.bio}</p>
      <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
        {musician.instruments.map((inst) => (
          <span key={inst} className="tag text-[10px] px-2 py-0.5">
            <Music className="w-2.5 h-2.5 mr-1" />
            {inst}
          </span>
        ))}
        {musician.genres.slice(0, 1).map((g) => (
          <span key={g} className="tag-cyan text-[10px] px-2 py-0.5">{g}</span>
        ))}
      </div>
      <div className="flex gap-2 mt-4 w-full">
        <button className="flex-1 btn-primary text-xs py-2 px-3">
          <UserPlus className="w-3.5 h-3.5" />
          Conectar
        </button>
        <button className="flex-1 btn-secondary text-xs py-2 px-3">
          <Eye className="w-3.5 h-3.5" />
          Perfil
        </button>
      </div>
    </div>
  )
}
