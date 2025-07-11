"use client";

import React, { useEffect, useState } from "react";
import { Play, ExternalLink, Clock, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface Playlist {
  title: string;
  video_id: string;
  playlist_url: string;
  duration: string;
}

const API_BASE_URL = "http://192.168.1.131:8000/api"; // <-- your API base URL here

export function YouTubePlaylistsMM() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await fetch(`${API_BASE_URL}/mmplaylists/`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPlaylists(data.results); // Extract playlists from paginated response
      } catch (err: any) {
        setError(err.message || "Unknown error");
        console.error("Failed to fetch playlists:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylists();
  }, []);

  const displayed = showAll ? playlists : playlists.slice(0, 9);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading playlists...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  }

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 mb-3">
          <Globe className="w-4 h-4 mr-2" />
          Burmese Playlist Courses
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top DevOps & Cloud Playlists in Burmese
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Handpicked Burmese-language video playlists to learn DevOps tools like Docker, Kubernetes, AWS, Terraform, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((course, idx) => (
          <motion.div
            key={course.playlist_url}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white flex flex-col">
              <div
                className="relative aspect-video bg-black"
                onMouseEnter={() => setHovered(course.video_id)}
                onMouseLeave={() => setHovered(null)}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${course.video_id}?autoplay=${
                    hovered === course.video_id ? 1 : 0
                  }&mute=1&loop=1&controls=0&modestbranding=1`}
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  allowFullScreen
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    hovered === course.video_id ? "opacity-0" : "opacity-100"
                  } transition-opacity`}
                >
                  <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>

                <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  Estimated: {course.duration}
                </div>

                <a
                  href={course.playlist_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors group"
                >
                  Watch Playlist
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {playlists.length > 9 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-yellow-600 bg-white hover:bg-gray-100 transition-colors"
          >
            {showAll ? "Show Less" : "See More"}
            {showAll ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}
