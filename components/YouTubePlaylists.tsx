"use client";
import { useState, useEffect, useRef } from "react";
import {
  Globe,
  ExternalLink,
  Clock,
  ChevronDown,
  ChevronUp,
  Play,
  Users,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component

interface Playlist {
  id: number;
  title: string;
  videoId: string;
  playlistUrl: string;
  channel: string;
  difficulty: "Prerequisite" | "Beginner" | "Intermediate" | "Advanced"; // Updated to include Prerequisite
  estDuration: string;
}

// IMPORTANT: For production, replace this with your actual API endpoint.
// If this is a local IP, it will only work if the client can reach it.
const API_BASE_URL = "http://172.20.10.6:8000/api";

const difficultyConfig = {
  Prerequisite: {
    color: "from-gray-500 to-slate-600",
    text: "text-gray-700",
    border: "border-gray-500",
    iconBg: "bg-gray-100",
    iconText: "text-gray-600",
    icon: <Lightbulb className="w-4 h-4" />, // Added icon for Prerequisite
  },
  Beginner: {
    color: "from-green-500 to-emerald-600",
    text: "text-green-700",
    border: "border-green-500",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    icon: <Play className="w-4 h-4" />, // Added icon for Beginner
  },
  Intermediate: {
    color: "from-blue-500 to-indigo-600",
    text: "text-blue-700",
    border: "border-blue-500",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    icon: <Play className="w-4 h-4" />, // Added icon for Intermediate
  },
  Advanced: {
    color: "from-purple-500 to-pink-600",
    text: "text-purple-700",
    border: "border-purple-500",
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    icon: <Play className="w-4 h-4" />, // Added icon for Advanced
  },
};

export function YouTubePlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "Prerequisite" | "Beginner" | "Intermediate" | "Advanced"
  >("Prerequisite"); // Default to Prerequisite
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/playlists/`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const rawPlaylists = Array.isArray(data) ? data : data.results;
        if (!Array.isArray(rawPlaylists)) {
          throw new Error("Invalid data format received from API");
        }
        const mapped: Playlist[] = rawPlaylists.map((pl: any) => ({
          id: pl.id,
          title: pl.title,
          videoId: pl.video_id,
          playlistUrl: pl.playlist_url,
          channel: pl.channel,
          // IMPORTANT: Assuming your API returns a 'difficulty' field that matches
          // "Prerequisite", "Beginner", "Intermediate", or "Advanced".
          // If not, you might need to map or hardcode 'Prerequisite' items.
          difficulty: pl.difficulty,
          estDuration: pl.duration,
        }));
        setPlaylists(mapped);
        // Set initial selected difficulty to the first available, or default to "Prerequisite"
        if (
          mapped.length > 0 &&
          !mapped.some((pl) => pl.difficulty === selectedDifficulty)
        ) {
          setSelectedDifficulty(mapped[0].difficulty);
        }
      } catch (err) {
        setError("Failed to fetch playlists.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlaylists();
  }, []);

  const filteredPlaylists = playlists.filter(
    (pl) => pl.difficulty === selectedDifficulty
  );
  const displayedPlaylists = showAll
    ? filteredPlaylists
    : filteredPlaylists.slice(0, 9); // Show up to 9 initially for selected difficulty

  const allDifficulties: (
    | "Prerequisite"
    | "Beginner"
    | "Intermediate"
    | "Advanced"
  )[] = ["Prerequisite", "Beginner", "Intermediate", "Advanced"];

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      {loading && (
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
      )}
      {error && (
        <div className="text-center bg-red-50 border border-red-200 rounded-3xl p-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Failed to Load Playlists
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200">
                <Play className="w-4 h-4 mr-2" /> DevOps Playlist Courses
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-pink-800 bg-clip-text text-transparent mb-4"
            >
              Learn DevOps on Youtube
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Recommended video playlists to learn DevOps tools like Linux,
              Docker, Kubernetes, AWS, Terraform, and more.
            </motion.p>
          </div>

          {/* Difficulty Selection Buttons - New Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12 justify-center"
          >
            {allDifficulties.map((difficultyKey, index) => {
              const config = difficultyConfig[difficultyKey];
              const isActive = selectedDifficulty === difficultyKey;
              return (
                <motion.button
                  key={difficultyKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedDifficulty(difficultyKey);
                    setShowAll(false); // Reset showAll when switching difficulties
                  }}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                    isActive
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg scale-105`
                      : `bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md`
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-full ${
                      isActive
                        ? "bg-white/20"
                        : `${config.iconBg} ${config.iconText}`
                    }`}
                  >
                    {config.icon}{" "}
                    {/* Use the specific icon for each difficulty */}
                  </div>
                  <span
                    className={`${isActive ? "text-white" : "text-gray-800"}`}
                  >
                    {difficultyKey}
                  </span>
                  <span
                    className={`text-xs ${
                      isActive ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    (
                    {
                      playlists.filter((pl) => pl.difficulty === difficultyKey)
                        .length
                    }
                    )
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="selected-playlist-indicator"
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {filteredPlaylists.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-gray-700 font-medium text-lg mb-2">
                No playlists available for this difficulty
              </h4>
              <p className="text-gray-500">
                Please select another difficulty or check back later.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedPlaylists.map((pl, idx) => {
                const config = difficultyConfig[pl.difficulty];
                return (
                  <motion.div
                    key={pl.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group bg-white rounded-xl shadow-lg border-l-4 ${config.border} overflow-hidden transition-all duration-300 hover:shadow-xl`} // New: Left border for difficulty
                  >
                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${pl.videoId}?modestbranding=1&rel=0`}
                        title={pl.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-3 right-3">
                        <Badge
                          className={`px-3 py-1 bg-white/90 backdrop-blur-sm ${config.text} text-xs font-medium rounded-full shadow-sm border border-gray-200`}
                        >
                          {pl.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">
                        {pl.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>
                          <strong>{pl.channel}</strong>
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-5">
                        <Clock className="w-4 h-4 mr-1 text-red-500" />
                        <span>
                          Estimated: <strong>{pl.estDuration}</strong>
                        </span>
                      </div>
                      <a
                        href={pl.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${config.color} text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] group/btn`}
                      >
                        <Play className="w-4 h-4 mr-2" /> Watch Playlist{" "}
                        <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {filteredPlaylists.length > 9 && (
            <div className="mt-10 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const newState = !showAll;
                  setShowAll(newState);
                  if (!newState && sectionRef.current) {
                    sectionRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${difficultyConfig[selectedDifficulty].color} text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {showAll
                  ? "Show Less"
                  : `See All ${selectedDifficulty} Playlists`}
                {showAll ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </motion.button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
