"use client"
import { useState, useEffect } from "react"
import { Globe, ExternalLink, Clock, ChevronDown, ChevronUp, Play, Users } from 'lucide-react'
import { motion } from "framer-motion"

interface Playlist {
  id: number
  title: string
  videoId: string
  playlistUrl: string
  channel: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estDuration: string
}

const API_BASE_URL = "http://192.168.100.7:8000/api"

const difficultyConfig = {
  Beginner: { color: "from-green-500 to-emerald-600", bg: "from-green-50 to-emerald-50", text: "text-green-700" },
  Intermediate: { color: "from-blue-500 to-indigo-600", bg: "from-blue-50 to-indigo-50", text: "text-blue-700" },
  Advanced: { color: "from-purple-500 to-pink-600", bg: "from-purple-50 to-pink-50", text: "text-purple-700" },
}

export function YouTubePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${API_BASE_URL}/playlists/`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()

        const rawPlaylists = Array.isArray(data) ? data : data.results
        if (!Array.isArray(rawPlaylists)) {
          throw new Error("Invalid data format received from API")
        }

        const mapped: Playlist[] = rawPlaylists.map((pl: any) => ({
          id: pl.id,
          title: pl.title,
          videoId: pl.video_id,
          playlistUrl: pl.playlist_url,
          channel: pl.channel,
          difficulty: pl.difficulty,
          estDuration: pl.duration,
        }))
        setPlaylists(mapped)
      } catch (err) {
        setError("Failed to fetch playlists.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPlaylists()
  }, [])

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-2xl mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center bg-red-50 border border-red-200 rounded-3xl p-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to Load Playlists</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  const displayed = showAll ? playlists : playlists.slice(0, 9)

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200">
            <Play className="w-4 h-4 mr-2" />
            DevOps Playlist Courses
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-pink-800 bg-clip-text text-transparent mb-4"
        >
          Top DevOps & Cloud Playlists
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Recommended video playlists to learn DevOps tools like Linux, Docker, Kubernetes, AWS, Terraform, and more.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((pl, idx) => {
          const config = difficultyConfig[pl.difficulty]
          return (
            <motion.div
              key={pl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onHoverStart={() => setHoveredId(pl.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${pl.videoId}?modestbranding=1&rel=0`}
                  title={pl.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating badges */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`px-3 py-1 bg-gradient-to-r ${config.color} text-white text-xs font-medium rounded-full shadow-lg`}
                  >
                    {pl.difficulty}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {pl.title}
                </h3>

                <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      <strong>{pl.channel}</strong>
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 bg-gradient-to-r ${config.bg} ${config.text} text-xs font-medium rounded-full border border-gray-200`}
                  >
                    {pl.difficulty}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Clock className="w-4 h-4 mr-1 text-red-500" />
                  <span>
                    Estimated: <strong>{pl.estDuration}</strong>
                  </span>
                </div>

                <a
                  href={pl.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${config.color} text-white font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group/btn`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Playlist
                  <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>

      {playlists.length > 9 && (
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {showAll ? "Show Less" : `See All ${playlists.length} Playlists`}
            {showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </motion.button>
        </div>
      )}
    </section>
  )
}
