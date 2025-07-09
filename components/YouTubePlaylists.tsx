"use client";

import React, { useState } from "react";
import { Play, Globe, ExternalLink, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react"; // make sure this is imported

interface Playlist {
  title: string;
  videoId: string; // for preview embed
  playlistUrl: string;
  channel: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estDuration: string; // e.g. "2-4 weeks"
}

const playlists: Playlist[] = [
  {
    title: "AWS Cloud Computing For Beginners",
    videoId: "3XFODda6YXo",
    playlistUrl: "https://www.youtube.com/playlist?list=PLEiEAq2VkUULlNtIFhEQHo8gacvme35rz",
    channel: "Simplilearn",
    difficulty: "Beginner",
    estDuration: "3-4 weeks",
  },
  {
    title: "AWS Course Certification",
    videoId: "YqWuL3an-5o",
    playlistUrl: "https://www.youtube.com/watch?v=YqWuL3an-5ohttps://www.youtube.com/watch?v=YqWuL3an-5o",
    channel: "Intellipaat",
    difficulty: "Beginner",
    estDuration: "3-4 weeks",
  },
  {
    title: "Azure (AZ-900) Full Course",
    videoId: "NPEsD6n9A_I",
    playlistUrl: "https://www.youtube.com/playlist?list=PLGjZwEtPN7j-Q59JYso3L4_yoCjj2syrM",
    channel: "Adam Marczak - Azure for Everyone",
    difficulty: "Beginner",
    estDuration: "3-5 weeks",
  },
  {
    title: "AZ-900 Azure Fundamentals",
    videoId: "IUCEFBmYIog",
    playlistUrl: "https://www.youtube.com/playlist?list=PLlVtbbG169nED0_vMEniWBQjSoxTsBYS3",
    channel: "John Savill's Technical Training",
    difficulty: "Beginner",
    estDuration: "2-3 weeks",
  },
  {
    title: "Linux System Administration",
    videoId: "Wgi-OfbP2Gw",
    playlistUrl: "https://www.youtube.com/watch?v=Wgi-OfbP2Gw&list=PL9ooVrP1hQOH3SvcgkC4Qv2cyCebvs0Ik",
    channel: "Edureka",
    difficulty: "Intermediate",
    estDuration: "3-5 weeks",
  },
  {
    title: "Linux Command Line Tutorials",
    videoId: "2PGnYjbYuUo",
    playlistUrl: "https://www.youtube.com/watch?v=2PGnYjbYuUo",
    channel: "Geek's Lesson",
    difficulty: "Intermediate",
    estDuration: "3-5 weeks",
  },
  {
    title: "Docker Crash Course Tutorial",
    videoId: "31ieHmcTUOk",
    playlistUrl: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9hxjeEtdHFNYMtCpjNBm3h7",
    channel: "Net Ninja",
    difficulty: "Intermediate",
    estDuration: "2-3 weeks",
  },
  {
    title: "Docker Tutorial",
    videoId: "zJ6WbK9zFpI",
    playlistUrl: "https://www.youtube.com/watch?v=zJ6WbK9zFpI&t=11s",
    channel: "Kode Kloud",
    difficulty: "Intermediate",
    estDuration: "2-3 weeks",
  },
  {
    title: "Certified Kubernetes Administrator Course",
    videoId: "6_gMoe7Ik8k",
    playlistUrl: "https://www.youtube.com/playlist?list=PLl4APkPHzsUUOkOv3i62UidrLmSB8DcGC",
    channel: "Tech Tutorials with Piyush",
    difficulty: "Advanced",
    estDuration: "2-3 weeks",
  },
  {
    title: "CI/CD Tutorials",
    videoId: "R8_veQiYBjI",
    playlistUrl: "https://www.youtube.com/playlist?list=PLy7NrYWoggjzSIlwxeBbcgfAdYoxCIrM2",
    channel: "TechWorld with Nana ",
    difficulty: "Intermediate",
    estDuration: "3-5 weeks",
  },
  {
    title: "Github Action Tutorials",
    videoId: "-hVG9z0fCac",
    playlistUrl: "https://www.youtube.com/watch?v=-hVG9z0fCac&list=PLArH6NjfKsUhvGHrpag7SuPumMzQRhUKY",
    channel: "glich stream",
    difficulty: "Intermediate",
    estDuration: "3-5 weeks",
  },
  {
    title: "Learn Git – Full Course for Beginners",
    videoId: "zTjRZNkhiEU",
    playlistUrl: "https://www.youtube.com/watch?v=zTjRZNkhiEU",
    channel: "freeCodeCamp.org",
    difficulty: "Intermediate",
    estDuration: "3-5 weeks",
  },
  {
    title: "Terraform Full Course For Beginners",
    videoId: "j0mfH_7sR7k",
    playlistUrl: "https://www.youtube.com/playlist?list=PLl4APkPHzsUUHlbhuq9V02n9AMLPySoEQ",
    channel: "Tech Tutorials with Piyush",
    difficulty: "Advanced",
    estDuration: "3-4 weeks",
  },
  {
    title: "Getting started with Ansible",
    videoId: "3RiVKs8GHYQ",
    playlistUrl: "https://www.youtube.com/playlist?list=PLT98CRl2KxKEUHie1m24-wkyHpEsa4Y70",
    channel: "Learn Linux TV",
    difficulty: "Intermediate",
    estDuration: "4-5 weeks",
  },
  {
    title: "Ansible Zero to Hero [FULL Course in 3+ Hours)- TechWorld With Murali",
    videoId: "aT69WlNi8EA",
    playlistUrl: "https://www.youtube.com/playlist?list=PL0lvsZ5ieQicXHPMNNg7qXJJoO2AnE8ej",
    channel: "TechWorld with Murali",
    difficulty: "Intermediate",
    estDuration: "3-4 weeks",
  },
];

export function YouTubePlaylists() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? playlists : playlists.slice(0, 9);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 mb-3">
          <Globe className="w-4 h-4 mr-2" />
          DevOps Playlist Courses
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top DevOps & Cloud Playlists
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Handpicked Burmese-language video playlists to learn DevOps tools like Docker, Kubernetes, AWS, Terraform, and more.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((pl, idx) => (
          <motion.div
            key={pl.playlistUrl} // unique key
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="border rounded-xl shadow hover:shadow-lg p-6 bg-white flex flex-col"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold mb-3">{pl.title}</h3>

            {/* YouTube preview iframe */}
            <div className="aspect-video mb-4 rounded overflow-hidden shadow-sm">
              <iframe
                src={`https://www.youtube.com/embed/${pl.videoId}?modestbranding=1&rel=0`}
                title={pl.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Channel and Difficulty */}
            <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
              <span>Channel: <strong>{pl.channel}</strong></span>
              <span>Difficulty: <strong>{pl.difficulty}</strong></span>
            </div>

            {/* Estimated learning time */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Clock className="w-4 h-4 mr-1" />
              <span>Estimated: {pl.estDuration}</span>
            </div>

            {/* Watch Playlist Button */}
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

      {/* Show More / See Less Button */}
      {playlists.length > 9 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-red-600 bg-white hover:bg-gray-100 transition-colors"
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