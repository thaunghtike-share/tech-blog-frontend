"use client";

import React, { useEffect, useState } from "react";
import { Github, Code } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id?: number;
  name: string;
  description: string;
  url: string;
  tags: string[];
}

const API_BASE_URL = "http://192.168.100.7:8000/api";

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
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        console.log("Raw API data:", data);  // <-- Log raw data for debugging

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

  if (loading) return <p className="text-center py-12 text-gray-500">Loading projects...</p>;
  if (error) return <p className="text-center py-12 text-red-600">{error}</p>;

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mb-3">
          <Code className="w-4 h-4 mr-2" />
          Open Source
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured DevOps Projects
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Practical implementations from cloud infrastructure to full-stack development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id ?? idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://github.com/thaunghtike-share"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <Github className="w-5 h-5 mr-2" />
          View All Projects
        </a>
      </div>
    </section>
  );
}