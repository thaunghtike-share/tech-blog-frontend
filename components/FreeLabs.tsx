"use client"

import React, { useState, useEffect } from "react"
import {
  ServerCog,
  ExternalLink,
  Github,
  Terminal,
  Dock,
  Cpu,
  Network,
  Cloud,
  BookOpen,
} from "lucide-react"
import { motion } from "framer-motion"

interface DevOpsLab {
  title: string
  platform: string
  description: string
  url: string
  difficulty?: string
}

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase()
  if (p.includes("docker")) return <Dock className="w-5 h-5" />
  if (p.includes("git")) return <Github className="w-5 h-5" />
  if (p.includes("k8s")) return <Cloud className="w-5 h-5" />
  if (p.includes("linux")) return <Terminal className="w-5 h-5" />
  if (p.includes("terraform")) return <Network className="w-5 h-5" />
  if (p.includes("killercoda")) return <Cpu className="w-5 h-5" />
  return <BookOpen className="w-5 h-5" />
}

const API_BASE_URL = "http://192.168.1.131:8000/api"

export function FreeLabs() {
  const [labs, setLabs] = useState<DevOpsLab[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    fetch(`${API_BASE_URL}/freelabs/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data)
        // If paginated, data.results is array; else data is array
        setLabs(Array.isArray(data) ? data : data.results || [])
      })
      .catch((err) => console.error("Failed to load labs:", err))
  }, [])

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-black text-white mb-3">
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
        {labs.map((lab, idx) => {
          const icon = getPlatformIcon(lab.platform)
          const buttonText = "Launch Lab"
          const buttonColor = "bg-black hover:bg-gray-900"

          return (
            <motion.div
              key={idx}
              initial={isClient ? { opacity: 0, y: 20 } : false}
              animate={isClient ? { opacity: 1, y: 0 } : false}
              transition={isClient ? { delay: idx * 0.1 } : {}}
              whileHover={isClient ? { y: -5 } : {}}
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
                className={`mt-auto inline-flex items-center justify-center w-full px-4 py-2 text-white font-medium rounded-lg transition-colors ${buttonColor}`}
              >
                {buttonText}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}