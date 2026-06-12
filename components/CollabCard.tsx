import { User, MapPin, Music, Users, DollarSign } from "lucide-react"

interface Collab {
  id: number
  poster: { name: string; avatar: string }
  title: string
  description: string
  instruments: string[]
  genre: string
  type: string
  budget: string
  applicants: number
}

export function CollabCard({ collab }: { collab: Collab }) {
  return (
    <div className="glass-card p-5 group">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {collab.poster.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-zinc-100">{collab.poster.name}</span>
            <span className="text-xs text-zinc-600">publicou</span>
          </div>
          <h3 className="font-semibold text-base text-zinc-50 mt-1">{collab.title}</h3>
          <p className="text-sm text-zinc-400 mt-1.5 line-clamp-2">{collab.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {collab.instruments.map((i) => (
              <span key={i} className="tag text-[10px] px-2 py-0.5">
                <Music className="w-2.5 h-2.5 mr-1" />
                {i}
              </span>
            ))}
            <span className="tag-cyan text-[10px] px-2 py-0.5">{collab.genre}</span>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {collab.type}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {collab.budget}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {collab.applicants} candidatos
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
