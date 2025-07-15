"use client";
import { useEffect, useState } from "react";
import { Github, Code, ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"; // Ensure Badge is imported

interface Project {
  id?: number;
  name: string;
  description: string;
  url: string;
  tags: string[];
}

const API_BASE_URL = "http://192.168.1.131:8000/api";

export function MinimalFeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/projects/`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        let projectsData: Project[];
        if (Array.isArray(data)) {
          projectsData = data;
        } else if (data.results && Array.isArray(data.results)) {
          projectsData = data.results;
        } else {
          throw new Error("Invalid data format received from API");
        }
        setProjects(projectsData);
      } catch (err: any) {
        setError(err.message || "Failed to load projects.");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-slate-600 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center bg-red-50 border border-red-200 rounded-3xl p-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Failed to Load Projects
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-gray-800 to-slate-700 rounded-2xl shadow-lg">
            <Code className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-gray-50 to-slate-50 text-gray-800 border border-gray-200">
            <Github className="w-4 h-4 mr-2" /> Open Source
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-slate-800 to-gray-700 bg-clip-text text-transparent mb-4"
        >
          Featured DevOps Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Practical implementations from cloud infrastructure to full-stack
          development.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id ?? idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group bg-white rounded-xl shadow-lg border-l-4 border-gray-500 overflow-hidden transition-all duration-300 hover:shadow-xl" // New: Left border
          >
            <div className="p-5 relative">
              {" "}
              {/* Adjusted padding */}
              <div className="absolute top-3 right-3">
                <Badge className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full shadow-sm border border-gray-200">
                  <Star className="w-3 h-3 mr-1" /> Featured
                </Badge>
              </div>
              <div className="p-3 bg-gradient-to-r from-gray-800 to-slate-700 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow inline-flex mb-4">
                {" "}
                {/* Icon moved and styled */}
                <Github className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors mb-2">
                {project.name}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-200 transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5 pt-0">
              {" "}
              {/* Adjusted padding */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-900 to-slate-800 hover:from-gray-800 hover:to-slate-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] group/btn" // New button style
              >
                <Github className="w-4 h-4 mr-2" /> View on GitHub
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://github.com/thaunghtike-share"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-slate-800 hover:from-gray-800 hover:to-slate-700 text-white font-medium rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <Github className="w-6 h-6 mr-3" /> View All Projects
          <ExternalLink className="w-5 h-5 ml-2" />
        </motion.a>
      </div>
    </section>
  );
}
