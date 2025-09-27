"use client";
import { useState, useEffect, useRef } from "react";
import {
  Dock,
  Github,
  Terminal,
  Cpu,
  Network,
  Cloud,
  BookOpen,
  ExternalLink,
  Play,
  Zap,
  Globe,
  FlaskConical,
  ChevronRight,
  ChevronLeft,
  Star,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DevOpsLab {
  title: string;
  platform: string;
  description: string;
  url: string;
  difficulty?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  const commonClass = "w-5 h-5 text-white";
  if (p.includes("docker")) return <Dock className={commonClass} />;
  if (p.includes("git")) return <Github className={commonClass} />;
  if (p.includes("k8s")) return <Cloud className={commonClass} />;
  if (p.includes("linux")) return <Terminal className={commonClass} />;
  if (p.includes("terraform")) return <Network className={commonClass} />;
  if (p.includes("killercoda")) return <Cpu className={commonClass} />;
  return <BookOpen className={commonClass} />;
};

export function FreeLabs() {
  const [labs, setLabs] = useState<DevOpsLab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const labsPerPage = 3;
  const totalPages = Math.ceil(labs.length / labsPerPage);

  useEffect(() => {
    async function fetchLabs() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/freelabs/`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const rawLabs = Array.isArray(data) ? data : data.results;
        if (!Array.isArray(rawLabs)) throw new Error("Invalid data format");
        setLabs(rawLabs);
      } catch (err) {
        setError("Failed to load labs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLabs();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl shadow-lg">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Free DevOps Playgrounds
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl"
            >
              <div className="h-6 w-3/4 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                <div className="h-4 w-16 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <Zap className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-6 text-lg">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Enhanced Header with Animations */}
      <motion.div
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Animated bubble icon */}
          <motion.div
            className="relative p-4 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {/* Bubble effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-yellow-500/30 rounded-full blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <FlaskConical className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Free DevOps Playgrounds
          </h2>

          {/* Chevron with dotted trail */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
            <ChevronRight className="w-6 h-6 text-orange-400 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full mx-auto relative"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Animated dots on the line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{ x: [0, 120, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto relative z-10">
          Explore these practical, free labs and playgrounds to level up your
          DevOps expertise
        </p>
      </motion.div>

      {labs.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center bg-yellow-900/20 rounded-full p-6 mb-6 backdrop-blur-sm border border-yellow-500/30">
            <BookOpen className="w-12 h-12 text-yellow-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            No playgrounds available
          </h3>
          <p className="text-gray-400 mb-8 text-lg">
            Check back later for featured labs
          </p>
        </div>
      ) : (
        <div className="relative">
          {totalPages > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 -ml-6"
              >
                <ChevronLeft className="w-5 h-5 text-orange-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 -mr-6"
              >
                <ChevronRight className="w-5 h-5 text-orange-400" />
              </motion.button>
            </>
          )}

          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {Array.from({ length: totalPages }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                    {labs
                      .slice(
                        slideIndex * labsPerPage,
                        (slideIndex + 1) * labsPerPage
                      )
                      .map((lab, idx) => {
                        const platformIcon = getPlatformIcon(lab.platform);
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative overflow-hidden"
                          >
                            {/* Animated background glow */}
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            />

                            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">

                              {/* Lab Title */}
                              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                                {lab.title}
                              </h3>

                              {/* Lab Description */}
                              <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3 flex-grow">
                                {lab.description}
                              </p>

                              {/* Difficulty */}
                              {lab.difficulty && (
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="flex items-center gap-2 px-3 py-2 bg-orange-900/20 rounded-full border border-orange-500/30">
                                    <div className="p-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                                      <Star className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="font-medium text-orange-400 text-sm">
                                      Difficulty: {lab.difficulty}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Platform Info */}
                              <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                                <span>Platform:</span>
                                <span className="text-orange-400 font-medium">
                                  {lab.platform}
                                </span>
                              </div>

                              {/* Launch Button */}
                              <div className="mt-auto pt-4">
                                <a
                                  href={lab.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:scale-[1.02] hover:shadow-xl border border-orange-400/30 group/btn"
                                >
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 3,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "linear",
                                    }}
                                    className="mr-2"
                                  >
                                    <Play className="w-4 h-4" />
                                  </motion.div>
                                  Launch Playground
                                  <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center mt-8 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-orange-500 to-yellow-600 shadow-lg"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
