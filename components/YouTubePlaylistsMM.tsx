"use client";

import React, { useState } from "react";
import { Play, ExternalLink, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface Playlist {
  title: string;
  videoId: string;
  playlistUrl: string;
  updated?: string;
  duration?: string;
}

const burmesePlaylists: Playlist[] = [
  {
    title: "Python Fundamentals by Sayar Thet Khine",
    videoId: "DP3AIYK-HR8",
    playlistUrl: "https://www.youtube.com/playlist?list=PLVhJW4jnAwFQ-E62y9MPJY8t33E8RThPy",
    updated: "Apr 2015",
  },
  {
    title: "Basic Networking Tutorials By RHC Technologies",
    videoId: "DhJ4kL2HbuA",
    playlistUrl: "https://www.youtube.com/watch?v=DhJ4kL2HbuA&list=PLuMzkmyfR9LY64pZl4zhYehlpXXAtGwZ",
    updated: "Apr 2024",
  },
  {
    title: "Basic Networking Lessons By WalkTechVlogs by Uphyo",
    videoId: "PYqqykoMB1Y",
    playlistUrl: "https://www.youtube.com/watch?v=PYqqykoMB1Y&list=PL6jybr6k2wfqVgPv-kqlKoK2g2HJb3niX",
    updated: "Apr 2022" 
  },
  {
    title: "Linux Foundation Certified System Administrator (LFCS) - by HelloCloud",
    videoId: "qJnZGcL4jkQ",
    playlistUrl: "https://www.youtube.com/playlist?list=PLvzWOIc1IOtf9x079XNlEgyiCv-XwxXxG",
    updated: "Mar 2024",
  },
  {
    title: "Hello Docker - Tutorial Series - by HelloCloud",
    videoId: "9qsWPKZH9PE",
    playlistUrl: "https://www.youtube.com/playlist?list=PLvzWOIc1IOtc07cVn3OXFiaIYXnDx5pDf",
    updated: "Feb 2024",
  },
  {
    title: "AWS Essentials by DevKTOps",
    videoId: "W3jTLLA4tCg",
    playlistUrl: "https://www.youtube.com/playlist?list=PLSKzuxf9q42Fu5nunaTbH0nFVt1GqDgMW",
    updated: "Feb 2024",
  },
  {
    title: "AWS Fundamentals by Myanmar Tech Academy ",
    videoId: "Dn5B-qliqyk",
    playlistUrl: "https://www.youtube.com/playlist?list=PLfFA9b_Mlfz4H8wn2KnPI-u5a3F9UNNVz",
    updated: "Jan 2024",
  },
  {
    title: "Linux By Myanmar Tech Academy",
    videoId: "22Lc-1wg1aQ",
    playlistUrl: "https://www.youtube.com/playlist?list=PLfFA9b_Mlfz59dNMjdMyA0LmQtqRNRPU0",
    updated: "Dec 2023",
  },
  {
    title: "Git Basic Course By Myanmar Data Science",
    videoId: "22Lc-1wg1aQ",
    playlistUrl: "https://www.youtube.com/watch?v=DB_MEZZdiIs&list=PLD_eiqVVLZDge73nM5J-LyPgbfVL6vnDc",
    updated: "Dec 2022",
  },
  {
    title: "Terraform Tutorial Series- by HelloCloud",
    videoId: "v4X3D4YlyHc",
    playlistUrl: "https://www.youtube.com/playlist?list=PLvzWOIc1IOtdufeA0ab5mKycSJgq5Bi57",
    updated: "Mar 2024",
  },
];

export function YouTubePlaylistsMM() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? burmesePlaylists : burmesePlaylists.slice(0, 10);

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
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white flex flex-col">
              <div
                className="relative aspect-video bg-black"
                onMouseEnter={() => setHovered(course.videoId)}
                onMouseLeave={() => setHovered(null)}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${course.videoId}?autoplay=${
                    hovered === course.videoId ? 1 : 0
                  }&mute=1&loop=1&controls=0&modestbranding=1`}
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  allowFullScreen
                />
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    hovered === course.videoId ? "opacity-0" : "opacity-100"
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
                  Updated {course.updated}
                </div>

                <a
                  href={course.playlistUrl}
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

      {burmesePlaylists.length > 10 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-100 transition-colors"
          >
            {showAll ? "Show Less" : "Show More Burmese Playlists"}
          </button>
        </div>
      )}
    </section>
  );
}