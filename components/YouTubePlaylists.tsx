"use client";

import React, { useState, useEffect } from "react";
import { Globe, ExternalLink, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface Playlist {
  id: number;
  title: string;
  videoId: string;
  playlistUrl: string;
  channel: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estDuration: string;
}

const API_BASE_URL = "http://192.168.1.131:8000/api";

export function YouTubePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/playlists/`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Check if paginated response with 'results' key
        const rawPlaylists = Array.isArray(data) ? data : data.results;

        if (!Array.isArray(rawPlaylists)) {
          throw new Error("Invalid data format received from API");
        }

        // Map snake_case keys to camelCase keys expected by Playlist interface
        const mapped: Playlist[] = rawPlaylists.map((pl: any) => ({
          id: pl.id,
          title: pl.title,
          videoId: pl.video_id,
          playlistUrl: pl.playlist_url,
          channel: pl.channel,
          difficulty: pl.difficulty,
          estDuration: pl.duration,
        }));

        setPlaylists(mapped);
      } catch (err) {
        setError("Failed to fetch playlists.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylists();
  }, []);

  if (loading) return <p className="text-center py-12">Loading playlists...</p>;
  if (error) return <p className="text-center py-12 text-red-600">{error}</p>;

  const displayed = showAll ? playlists : playlists.slice(0, 9);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 mb-3">
          <Globe className="w-4 h-4 mr-2" />
          DevOps Playlist Courses
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top DevOps & Cloud Playlists
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Recommended video playlists to learn DevOps tools like Linux, Docker, Kubernetes, AWS, Terraform, and more.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((pl, idx) => (
          <motion.div
            key={pl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="border rounded-xl shadow hover:shadow-lg p-6 bg-white flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-3">{pl.title}</h3>
            <div className="aspect-video mb-4 rounded overflow-hidden shadow-sm">
              <iframe
                src={`https://www.youtube.com/embed/${pl.videoId}?modestbranding=1&rel=0`}
                title={pl.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
              <span>Channel: <strong>{pl.channel}</strong></span>
              <span>Difficulty: <strong>{pl.difficulty}</strong></span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Clock className="w-4 h-4 mr-1" />
              <span>Estimated: {pl.estDuration}</span>
            </div>
            <a
              href={pl.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
            >
              Watch Playlist
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        ))}
      </div>

      {playlists.length > 9 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-red-600 bg-white hover:bg-gray-100 transition-colors"
          >
            {showAll ? "Show Less" : "See More"}
            {showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </button>
        </div>
      )}
    </section>
  );
}
