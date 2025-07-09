"use client";

import React, { useState } from "react";
import { Play, ExternalLink, User, ThumbsUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Channel {
  name: string;
  description: string;
  url: string;
  videoId: string;
  subscribers?: string;
  latestVideoTitle?: string;
  latestVideoDate?: string;
}

const topDevOpsChannels: Channel[] = [
  {
    name: "Hello Cloud",
    description: "မြန်မာဘာသာဖြင့် သင်ကြားပေးသော Cloud Native Education Courses များ",
    url: "https://www.youtube.com/c/HelloCloud",
    videoId: "j7ZkJM1C26o",
    subscribers: "7K",
    latestVideoTitle: "[HKS Session 07] Auto-unseal Vault using Transit Secrets Engine [Burmese Language]",
    latestVideoDate: "2 months ago"
  },
  {
    name: "TechWorld with Nana",
    description: "Clear and practical DevOps and Kubernetes tutorials from a former Google engineer.",
    url: "https://www.youtube.com/c/TechWorldwithNana",
    videoId: "1J2YOV6LcwY",
    subscribers: "235K",
    latestVideoTitle: "Kubernetes Crash Course for Absolute Beginners",
    latestVideoDate: "2 weeks ago"
  },
  {
    name: "Stephane Maarek",
    description: "AWS, DevOps, and Kubernetes tutorials with hands-on labs and real-world examples.",
    url: "https://www.youtube.com/c/StephaneMaarek",
    videoId: "syjdzF2Ut7o",
    subscribers: "121K",
    latestVideoTitle: "Kubernetes Crash Course for Absolute Beginners",
    latestVideoDate: "2 weeks ago"
  },
  {
    name: "Just Me and Open Source",
    description: "Live coding sessions on DevOps tools and infrastructure as code.",
    url: "https://www.youtube.com/@justmeandopensource",
    videoId: "azh8J-RGdZM",
    subscribers: "43K",
    latestVideoTitle: "Building a Kubernetes Cluster from Scratch",
    latestVideoDate: "1 week ago"
  },
  {
    name: "KodeKloud",
    description: "DevOps, Kubernetes, Docker, Terraform and cloud tutorials with hands-on labs.",
    url: "https://www.youtube.com/c/KodeKloud",
    videoId: "HuMREoq7gU0",
    subscribers: "187K",
    latestVideoTitle: "Terraform for Beginners - Full Course",
    latestVideoDate: "1 week ago"
  },
  {
    name: "Bret Fisher Cloud Native DevOps",
    description: "DevOps nd Cloud tutorials with hands-on labs.",
    url: "https://www.youtube.com/c/BretFisherDockerandDevOps",
    videoId: "lAEkK6Cl3Ys",
    subscribers: "87K",
    latestVideoTitle: "Terraform for Beginners - Full Course",
    latestVideoDate: "1 week ago"
  },
  {
    name: "The DevOps Toolkit",
    description: "Hands-on DevOps tooling and cloud-native tech deep dives with real-world examples.",
    url: "https://www.youtube.com/c/DevOpsToolkit",
    videoId: "4N_MWAQEzWg",
    subscribers: "98K",
    latestVideoTitle: "GitOps with ArgoCD - Full Tutorial",
    latestVideoDate: "3 days ago"
  },
  {
    name: "A Cloud Guru",
    description: "Cloud computing and DevOps courses & tutorials from industry experts.",
    url: "https://www.youtube.com/c/ACloudGuru",
    videoId: "4SWsW8V8QV8",
    subscribers: "312K",
    latestVideoTitle: "AWS EKS vs. Self-Managed Kubernetes",
    latestVideoDate: "5 days ago"
  },
  {
    name: "DevOps Directive",
    description: "DevOps, CI/CD, and cloud-native tutorials focusing on best practices.",
    url: "https://www.youtube.com/c/DevOpsDirective",
    videoId: "2T86xAtR6Fo",
    subscribers: "54K",
    latestVideoTitle: "Monitoring with Prometheus & Grafana",
    latestVideoDate: "4 days ago"
  }
];

export function YouTubeTopChannels() {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600 mb-3">
          <Play className="w-4 h-4 mr-2" />
          Video Learning
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Learn DevOps from YouTube Experts
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Subscribe to these top channels for free DevOps tutorials, hands-on labs, and the latest cloud-native trends.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topDevOpsChannels.map((channel, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative group"
          >
            <div className="h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white flex flex-col">
              {/* Video Thumbnail with Play Button */}
              <div 
                className="relative aspect-video bg-gray-900"
                onMouseEnter={() => setHoveredVideo(channel.videoId)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${channel.videoId}?autoplay=${hoveredVideo === channel.videoId ? 1 : 0}&mute=1&loop=1&controls=0&modestbranding=1`}
                  title={`Latest from ${channel.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  allowFullScreen
                />
                <div className={`absolute inset-0 flex items-center justify-center ${hoveredVideo === channel.videoId ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Channel Content */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{channel.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="flex items-center mr-3">
                        <User className="w-3 h-3 mr-1" />
                        {channel.subscribers}
                      </span>
                      <span className="flex items-center">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        Top Rated
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 flex-grow">{channel.description}</p>

                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Clock className="w-3 h-3 mr-2" />
                    Latest Video
                  </div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {channel.latestVideoTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {channel.latestVideoDate}
                  </p>
                </div>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors group"
                >
                  Subscribe
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://www.youtube.com/results?search_query=devops+tutorial"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Explore More DevOps Videos
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </section>
  );
}