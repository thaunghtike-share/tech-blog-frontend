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
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface DevOpsLab {
  title: string;
  platform: string;
  description: string;
  url: string;
  difficulty?: string;
}

const API_BASE_URL = "http://172.20.10.6:8000/api";

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  const commonClass = "w-5 h-5 text-white"; // ⬅️ Uniform icon sizing
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
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const labsToShow = showAll ? labs : labs.slice(0, 6);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-12 px-4">
      {loading && (
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
      )}
      {error && (
        <div className="text-center bg-red-50 border border-red-200 rounded-3xl p-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Failed to Load Labs
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
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl shadow-md">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border border-orange-200">
                <Zap className="w-4 h-4 mr-2" /> Hands-On Labs
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-orange-700 to-amber-700 bg-clip-text text-transparent mb-4"
            >
              Top Free DevOps Labs to Practice Skills
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Explore these practical, free labs and playgrounds to level up
              your DevOps expertise.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labsToShow.map((lab, idx) => {
              const platformIcon = getPlatformIcon(lab.platform);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white rounded-xl shadow-lg border-l-4 border-orange-500 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-5 flex flex-col h-full relative">
                    <div className="absolute top-3 right-3">
                      <Badge className="px-3 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-medium rounded-full shadow-sm border border-gray-200">
                        Free Lab
                      </Badge>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl shadow-md mb-4">
                      {platformIcon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-gray-700 flex-grow text-sm mb-4">
                      {lab.description}
                    </p>
                    {lab.difficulty && (
                      <div className="mt-auto text-sm text-gray-600">
                        <strong>Difficulty:</strong> {lab.difficulty}
                      </div>
                    )}
                    <a
                      href={lab.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] group/btn"
                    >
                      <Play className="w-4 h-4 mr-2" /> Launch Lab
                      <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {labs.length > 6 && (
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
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {showAll ? "See Less" : `See More Labs`}
              </motion.button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
