"use client";

import React, { useState } from "react";
import {
  ServerCog,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Github,
  Terminal,
  Dock,
  Cpu,
  Network,
  Cloud,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

interface DevOpsLab {
  title: string;
  platform: string;
  description: string;
  url: string;
  difficulty?: string;
}

// Icon mapping per platform
const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes("docker")) return <Dock className="w-5 h-5" />;
  if (p.includes("git")) return <Github className="w-5 h-5" />;
  if (p.includes("k8s")) return <Cloud className="w-5 h-5" />;
  if (p.includes("linux")) return <Terminal className="w-5 h-5" />;
  if (p.includes("terraform")) return <Network className="w-5 h-5" />;
  if (p.includes("killercoda")) return <Cpu className="w-5 h-5" />;
  return <BookOpen className="w-5 h-5" />;
};

// Button color and text mapping per platform
const getButtonConfig = (platform: string) => {
  const p = platform.toLowerCase();
  
  if (p.includes("docker")) return {
    color: "bg-sky-600 hover:bg-sky-700",
    text: "Launch Docker Lab"
  };
  if (p.includes("git")) return {
    color: "bg-orange-600 hover:bg-orange-700",
    text: "Practice Git"
  };
  if (p.includes("k8s")) return {
    color: "bg-indigo-600 hover:bg-indigo-700",
    text: "Explore Kubernetes"
  };
  if (p.includes("linux")) return {
    color: "bg-gray-700 hover:bg-gray-800",
    text: "Start Linux Lab"
  };
  if (p.includes("terraform")) return {
    color: "bg-green-700 hover:bg-green-800",
    text: "Try Terraform"
  };
  if (p.includes("killercoda")) return {
    color: "bg-purple-600 hover:bg-purple-700",
    text: "Run Interactive Lab"
  };
  if (p.includes("kodekloud")) return {
    color: "bg-blue-600 hover:bg-blue-700",
    text: "Begin KodeKloud Lab"
  };
  
  return {
    color: "bg-blue-600 hover:bg-blue-700",
    text: "Launch Lab"
  };
};

const allFreeLabs: DevOpsLab[] = [
  {
    title: "KodeKloud",
    platform: "KodeKloud",
    url: "https://studio.kodekloud.com/labs",
    description: "Real tasks, real scenarios, zero BS.",
    difficulty: "Beginner → Advanced"
  },
  {
    title: "Killer Coda",
    platform: "killercodea",
    url: "https://killercoda.com/",
    description: "Quick, no-install browser labs",
    difficulty: "Beginner → Intermediate"
  },
  {
    title: "Kubernetes Lab",
    platform: "lets' play with k8s",
    url: "https://labs.play-with-k8s.com/",
    description: "A simple, interactive and fun playground to learn Kubernetes",
    difficulty: "Intermediate"
  },
  {
    title: "Docker Lab",
    platform: "lets play with docker",
    url: "https://labs.play-with-docker.com",
    description: "A simple, interactive and fun playground to learn Docker",
    difficulty: "Intermediate"
  },
  {
    title: "Git Lab",
    platform: "git branching",
    url: "https://learngitbranching.js.org",
    description: "The most visual and interactive way to learn Git on the web",
    difficulty: "Intermediate"
  },
  {
    title: "Terraform Lab",
    platform: "kodekloud",
    url: "https://kodekloud.com/pages/free-labs/terraform",
    description: "Terraform Free Labs by KodeKloud",
    difficulty: "Beginner"
  },
  {
    title: "Linux Lab",
    platform: "kodekloud",
    url: "https://kodekloud.com/free-labs/linux",
    description: "Linux Free Labs",
    difficulty: "Beginner"
  }
];

export function FreeLabs() {
  const [showAll, setShowAll] = useState(false);
  const labsToShow = showAll ? allFreeLabs : allFreeLabs.slice(0, 7);

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 mb-3">
          <ServerCog className="w-4 h-4 mr-2" />
          Hands-On Labs
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top Free DevOps Labs to Practice Skills
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore these practical, free labs and playgrounds to level up your DevOps expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {labsToShow.map((lab, idx) => {
          const icon = getPlatformIcon(lab.platform);
          const buttonConfig = getButtonConfig(lab.platform);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="border border-gray-200 rounded-lg shadow-sm bg-white p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  {icon}
                  {lab.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Platform:</strong> {lab.platform}
                </p>
                {lab.difficulty && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Difficulty:</strong> {lab.difficulty}
                  </p>
                )}
                <p className="text-gray-700 text-sm mb-4">{lab.description}</p>
              </div>

              <a
                href={lab.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto inline-flex items-center justify-center w-full px-4 py-2 text-white font-medium rounded-lg transition-colors ${buttonConfig.color}`}
              >
                {buttonConfig.text}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-gray-100 transition-colors"
        >
          {showAll ? "Show Less" : "See More"}
          {showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </button>
      </div>
    </section>
  );
}