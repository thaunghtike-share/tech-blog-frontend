"use client"
import { useEffect, useState } from "react"
import { Play, ExternalLink, Clock, Globe, ChevronDown, ChevronUp, Star } from 'lucide-react'
import { motion } from "framer-motion"

interface Playlist {
  title: string
  video_id: string
  playlist_url: string
  duration: string
}

const API_BASE_URL = "http://172.20.10.6:8000/api"

export function YouTubePlaylistsMM() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [hovered, setHovered] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await fetch(`${API_BASE_URL}/mmplaylists/`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setPlaylists(data.results)
      } catch (err: any) {
        setError(err.message || "Unknown error")
        console.error("Failed to fetch playlists:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPlaylists()
  }, [])

  const displayed = showAll ? playlists : playlists.slice(0, 9)

  if (loading) {
    return (
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-2xl mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center bg-red-50 border border-red-200 rounded-3xl p-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to Load Playlists</h3>
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-700 border border-orange-200">
            <Star className="w-4 h-4 mr-2" />
            Burmese Playlist Courses
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-yellow-800 to-orange-800 bg-clip-text text-transparent mb-4"
        >
          Top DevOps & Cloud Playlists in Burmese
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Handpicked Burmese-language video playlists to learn DevOps tools like Docker, Kubernetes, AWS, Terraform, and
          more.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((course, idx) => (
          <motion.div
            key={course.playlist_url}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl"
          >
            {/* Video Container */}
            <div
              className="relative aspect-video bg-black overflow-hidden"
              onMouseEnter={() => setHovered(course.video_id)}
              onMouseLeave={() => setHovered(null)}
            >
              <iframe
                src={`https://www.youtube.com/embed/${course.video_id}?autoplay=${
                  hovered === course.video_id ? 1 : 0
                }&mute=1&loop=1&controls=0&modestbranding=1`}
                title={course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                allowFullScreen
              />

              {/* Play overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center ${
                  hovered === course.video_id ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
              >
                <div className="bg-gradient-to-r from-yellow-500/80 to-orange-500/80 backdrop-blur-sm rounded-full p-4 shadow-2xl">
                  <Play className="w-6 h-6 text-white" fill="currentColor" />
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Language badge */}
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg">
                  🇲🇲 Burmese
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                {course.title}
              </h3>

              <div className="text-sm text-gray-500 mb-4 flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-full border border-yellow-200">
                <Clock className="w-4 h-4 text-yellow-500" />
                Estimated: {course.duration}
              </div>

              <a
                href={course.playlist_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group/btn"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Playlist
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {playlists.length > 9 && (
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {showAll ? "Show Less" : `See All ${playlists.length} Playlists`}
            {showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </motion.button>
        </div>
      )}
    </section>
  )
}
