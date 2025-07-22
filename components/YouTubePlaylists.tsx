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
  Rocket,
  Gauge,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Playlist {
  id: number;
  title: string;
  videoId: string;
  playlistUrl: string;
  channel: string;
  difficulty: "Prerequisite" | "Beginner" | "Intermediate" | "Advanced";
  estDuration: string;
  is_burmese?: boolean;
}

const API_BASE_URL = "http://192.168.1.131:8000/api";

const difficultyConfig = {
  Prerequisite: {
    color: "from-gray-500 to-slate-600",
    text: "text-gray-700",
    border: "border-white-500",
    iconBg: "bg-gradient-to-r from-gray-500 to-slate-600",
    iconText: "text-white",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  Beginner: {
    color: "from-green-500 to-emerald-600",
    text: "text-green-700",
    border: "border-green-500",
    iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
    iconText: "text-white",
    icon: <Rocket className="w-5 h-5" />,
  },
  Intermediate: {
    color: "from-blue-500 to-indigo-600",
    text: "text-blue-700",
    border: "border-blue-500",
    iconBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
    iconText: "text-white",
    icon: <Gauge className="w-5 h-5" />,
  },
  Advanced: {
    color: "from-purple-500 to-pink-600",
    text: "text-purple-700",
    border: "border-purple-500",
    iconBg: "bg-gradient-to-r from-purple-500 to-pink-600",
    iconText: "text-white",
    icon: <Shield className="w-5 h-5" />,
  },
};

interface YouTubePlaylistsProps {
  showAll?: boolean;
  setShowAll?: (show: boolean) => void;
}

type DifficultyLevel = keyof typeof difficultyConfig;

export function YouTubePlaylists({
  showAll,
  setShowAll,
}: YouTubePlaylistsProps) {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel>("Prerequisite");
  const [internalShowAll, setInternalShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const actualShowAll = showAll !== undefined ? showAll : internalShowAll;
  const actualSetShowAll =
    setShowAll !== undefined ? setShowAll : setInternalShowAll;

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
          difficulty: pl.difficulty,
          estDuration: pl.duration,
          is_burmese: pl.is_burmese,
        }));
        setPlaylists(mapped);
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
  }, [selectedDifficulty]);

  const filteredPlaylists = playlists
    .filter((pl) => pl.difficulty === selectedDifficulty)
    .sort((a, b) => a.title.localeCompare(b.title));

  const displayedPlaylists = actualShowAll
    ? filteredPlaylists
    : filteredPlaylists.slice(0, 6);

  const allDifficulties: DifficultyLevel[] = [
    "Prerequisite",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      {loading && (
        <div className="text-center mb-8 md:mb-12">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl mx-auto mb-3 md:mb-4 animate-pulse"></div>
          <div className="h-6 md:h-8 bg-gray-200 rounded-lg w-48 md:w-64 mx-auto mb-3 md:mb-4 animate-pulse"></div>
          <div className="h-3 md:h-4 bg-gray-200 rounded w-64 md:w-96 mx-auto animate-pulse"></div>
        </div>
      )}

      {error && (
        <div className="text-center bg-red-50 border border-red-200 rounded-3xl p-6 md:p-12">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <Globe className="w-5 h-5 md:w-8 md:h-8 text-red-600" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-red-800 mb-2">
            Failed to Load Playlists
          </h3>
          <p className="text-red-600 text-sm md:text-base">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Header */}
          <div className="text-center mb-6 md:mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-4"
            >
              <div className="p-2 md:p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg">
                <Globe className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <span className="inline-flex items-center px-2 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-medium bg-red-100 text-red-700 border border-red-200">
                <Play className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Youtube
                Playlists
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-pink-800 bg-clip-text text-transparent mb-4 md:mb-4"
            >
              Learn DevOps on Youtube
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Recommended video playlists to learn DevOps tools like Linux,
              Docker, Kubernetes, AWS, Terraform, and more.
            </motion.p>
          </div>

          {/* Mobile Dropdown - Matching CertificationRoadmap style */}
          <div className="sm:hidden mb-7 relative">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 shadow-md bg-white border ${difficultyConfig[selectedDifficulty].border}`}
            >
              <div className="flex items-center justify-center w-full gap-2">
                <div
                  className={`p-1.5 rounded-full ${difficultyConfig[selectedDifficulty].iconBg} ${difficultyConfig[selectedDifficulty].iconText}`}
                >
                  {difficultyConfig[selectedDifficulty].icon}
                </div>
                <span>{selectedDifficulty}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200"
              >
                {allDifficulties.map((level) => {
                  const config = difficultyConfig[level];
                  const count = playlists.filter(
                    (pl) => pl.difficulty === level
                  ).length;
                  return (
                    <button
                      key={level}
                      onClick={() => {
                        setSelectedDifficulty(level);
                        setMobileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center hover:bg-gray-50 ${
                        selectedDifficulty === level ? "bg-gray-100" : ""
                      }`}
                    >
                      <div
                        className={`w-7 h-7 flex items-center justify-center rounded-full ${config.iconBg} ${config.iconText}`}
                      >
                        {config.icon}
                      </div>
                      <span>{level}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Desktop Difficulty Buttons - Updated to match CertificationRoadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex flex-wrap gap-3 mb-8 md:mb-10 justify-center"
          >
            {allDifficulties.map((difficultyKey, index) => {
              const config = difficultyConfig[difficultyKey];
              const isActive = selectedDifficulty === difficultyKey;
              const count = playlists.filter(
                (pl) => pl.difficulty === difficultyKey
              ).length;

              return (
                <motion.button
                  key={difficultyKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedDifficulty(difficultyKey);
                    actualSetShowAll(false);
                  }}
                  className={`group relative flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isActive
                      ? `bg-gradient-to-r ${config.color} text-white scale-105`
                      : `bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md`
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-xl ${
                      isActive
                        ? "bg-white/20"
                        : `${config.iconBg} ${config.iconText}`
                    }`}
                  >
                    {config.icon}
                  </div>
                  <span className={isActive ? "text-white" : "text-gray-800"}>
                    {difficultyKey}
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

          {/* Playlists */}
          {filteredPlaylists.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 md:py-12"
            >
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <Play className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h4 className="text-gray-700 font-medium text-base md:text-lg mb-2">
                No playlists available for this difficulty
              </h4>
              <p className="text-gray-500 text-sm md:text-base">
                Please select another difficulty or check back later.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayedPlaylists.map((pl, idx) => {
                const config = difficultyConfig[pl.difficulty];
                return (
                  <motion.div
                    key={pl.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group bg-white rounded-xl shadow-lg border-l-4 ${config.border} overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col`}
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
                    </div>
                    <div className="p-4 md:p-5 flex-grow">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-700 transition-colors flex items-center gap-2">
                        {pl.title}
                        {pl.is_burmese && (
                          <span
                            role="img"
                            aria-label="Burmese"
                            className="text-xl select-none"
                            title="Burmese"
                          >
                            🇲🇲
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 mb-2 text-xs md:text-sm text-gray-600">
                        <Users className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
                        <span>
                          <strong>{pl.channel}</strong>
                        </span>
                      </div>
                      <div className="flex items-center text-xs md:text-sm text-gray-500 mb-4 md:mb-5">
                        <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1 text-red-500" />
                        <span>
                          Estimated: <strong>{pl.estDuration}</strong>
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-5 pt-0">
                      <a
                        href={pl.playlistUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${config.color} text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] text-sm md:text-base`}
                      >
                        <Play className="w-3 h-3 md:w-4 md:h-4 mr-2" /> Watch
                        Playlist{" "}
                        <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Show More/Less Button */}
          {filteredPlaylists.length > 6 && (
            <div className="mt-8 md:mt-10 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const newState = !actualShowAll;
                  actualSetShowAll(newState);
                  if (!newState && sectionRef.current) {
                    sectionRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`inline-flex items-center px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r ${difficultyConfig[selectedDifficulty].color} text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base`}
              >
                {actualShowAll
                  ? "Show Less"
                  : `See All ${selectedDifficulty} Playlists`}
                {actualShowAll ? (
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
