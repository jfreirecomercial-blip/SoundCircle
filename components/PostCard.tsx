'use client'

import { Heart, MessageCircle, Share2, Play, Pause } from "lucide-react"
import { useState } from "react"

interface Post {
  id: number
  user: { name: string; avatar: string; instrument: string }
  content: string
  time: string
  likes: number
  comments: number
  liked: boolean
  audio?: string
}

export function PostCard({ post }: { post: Post }) {
  const [liked, setLiked] = useState(post.liked)
  const [likes, setLikes] = useState(post.likes)
  const [playing, setPlaying] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  return (
    <div className="glass-card p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
          {post.user.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-zinc-100">{post.user.name}</span>
            <span className="text-xs text-zinc-500">•</span>
            <span className="text-xs text-zinc-500">{post.user.instrument}</span>
            <span className="text-xs text-zinc-500">•</span>
            <span className="text-xs text-zinc-500">{post.time}</span>
          </div>
          <p className="mt-2 text-sm text-zinc-300 leading-relaxed">{post.content}</p>

          {post.audio && (
            <div className="mt-3 glass rounded-xl p-3 flex items-center gap-3 max-w-md">
              <button
                onClick={() => setPlaying(!playing)}
                className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 hover:bg-purple-500/30 transition-all flex-shrink-0"
              >
                {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full w-1/3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full ${playing ? 'animate-pulse' : ''}`} />
              </div>
              <span className="text-xs text-zinc-500 flex-shrink-0">3:24</span>
            </div>
          )}

          <div className="mt-3 flex items-center gap-4">
            <button onClick={handleLike} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-purple-400 transition-colors group">
              <Heart className={`w-4 h-4 transition-all ${liked ? 'fill-purple-400 text-purple-400' : 'group-hover:text-purple-400'}`} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-cyan-400 transition-colors group">
              <MessageCircle className="w-4 h-4 group-hover:text-cyan-400" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
