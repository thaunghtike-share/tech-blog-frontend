"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Github,
  Terminal,
  Dock,
  Cpu,
  Network,
  Cloud,
  BookOpen,
  ServerCog,
} from "lucide-react"
import { useIsClient } from "usehooks-ts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DevOpsLab {
  title: string
  platform: string
  description: string
  url: string
  difficulty?: string
}

interface FreeLabCardProps {
  lab: DevOpsLab
  buttonText: string
}

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase()
  const commonClass = "w-4 h-4 text-emerald-600"  // add your color class here

  if (p.includes("docker")) return <Dock className={commonClass} />
  if (p.includes("git")) return <Github className={commonClass} />
  if (p.includes("k8s")) return <Cloud className={commonClass} />
  if (p.includes("linux")) return <Terminal className={commonClass} />
  if (p.includes("terraform")) return <Network className={commonClass} />
  if (p.includes("killercoda")) return <Cpu className={commonClass} />
  return <BookOpen className={commonClass} />
}

const FreeLabCard: React.FC<FreeLabCardProps> = ({ lab, buttonText }) => {
  const isClient = useIsClient()
  const icon = getPlatformIcon(lab.platform)

  return (
    <motion.div
      initial={isClient ? { opacity: 0, y: 20 } : false}
      animate={isClient ? { opacity: 1, y: 0 } : false}
      transition={isClient ? { delay: 0.1 } : {}}
      whileHover={isClient ? { y: -3 } : {}}
      className="flex flex-col justify-between"
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            {icon}
            <span className="text-emerald-600">{lab.title}</span>
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 mt-1">
            <strong>Platform:</strong> {lab.platform}
          </CardDescription>
          {lab.difficulty && (
            <CardDescription className="text-sm text-gray-600">
              <strong>Difficulty:</strong> {lab.difficulty}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-1 text-gray-700 text-base">{lab.description}</CardContent>
        <CardFooter className="pt-4">
          <a
            href={lab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function FreeLabs() {
  const [labs, setLabs] = useState<DevOpsLab[]>([])
  const API_BASE_URL = "http://192.168.100.7:8000/api"

  useEffect(() => {
    fetch(`${API_BASE_URL}/freelabs/`)
      .then((res) => res.json())
      .then((data) => {
        setLabs(Array.isArray(data) ? data : data.results || [])
      })
      .catch((err) => console.error("Failed to load labs:", err))
  }, [])

  const buttonText = "Launch Lab"

  return (
    <section className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-sm mb-3">
          <ServerCog className="w-4 h-4 mr-2 text-white" />
          Hands-On Labs
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Top Free DevOps Labs to Practice Skills
        </h2>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Explore these practical, free labs and playgrounds to level up your DevOps expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab, idx) => (
          <FreeLabCard key={idx} lab={lab} buttonText={buttonText} />
        ))}
      </div>
    </section>
  )
}
