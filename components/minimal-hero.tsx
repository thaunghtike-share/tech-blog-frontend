"use client"

import { useState } from "react"
import {
  Zap,
  Code,
  Cloud,
  Cpu,
  Server,
  Database,
  GitBranch,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

export function MinimalHero() {
  const [expanded, setExpanded] = useState(true)

  const container = {
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.4 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.section
      key="hero"
      initial="hidden"
      animate="show"
      exit="exit"
      variants={container}
      className="relative bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-emerald-50/80 py-12 md:py-20 border-b border-gray-200/50 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Floating icons */}
      <Cloud className="absolute top-20 left-10 text-blue-200/60 w-10 h-10 hidden md:block" />
      <Server className="absolute bottom-20 right-10 text-indigo-200/60 w-10 h-10 hidden md:block" />
      <Database className="absolute top-1/3 right-20 text-emerald-200/60 w-8 h-8 hidden md:block" />
      <GitBranch className="absolute bottom-1/4 left-20 text-blue-200/60 w-8 h-8 hidden md:block" />

      {/* Hero Content */}
      <motion.div
        className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center"
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {/* Badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 bg-white text-blue-600 text-[11px] md:text-xs font-medium px-4 py-1.5 rounded-full mb-4 shadow-sm border border-gray-200/50"
        >
          <Zap className="h-3 w-3" />
          <span>DevOps • DevSecOps • IAC</span>
          <Code className="h-3 w-3 ml-1" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-sm sm:text-base md:text-3xl font-semibold text-gray-900 mb-4 tracking-tight"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-flex items-center justify-center flex-wrap gap-2">
            <span className="text-gray-800 whitespace-nowrap">Learn DevOps Now —</span>
            <span className="whitespace-nowrap">For IT Students in Myanmar</span>
            <img
              src="/myanmar-flag.svg"
              alt="Myanmar"
              className="inline-block w-6 h-4 shadow-sm ml-1"
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mb-8"
        >
          A curated DevOps roadmap, tools, and projects — built especially for
          students, junior developers, and aspiring engineers in Myanmar
          to kickstart their cloud devops and automation journey.
        </motion.p>

        {/* Expandable Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col items-center gap-10"
            >
              {/* Buttons */}
              <motion.div
                variants={item}
                className="flex flex-row flex-wrap justify-center gap-3"
              >
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all"
                >
                  <Code className="mr-2 h-4 w-4" />
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 bg-white/50 hover:bg-white text-gray-700 shadow-sm flex items-center"
                >
                  <Cloud className="mr-2 h-4 w-4" />
                  View Projects
                </Button>
              </motion.div>

              {/* Tags */}
              <motion.div
                variants={item}
                className="flex flex-wrap justify-center gap-4 text-gray-500 text-sm"
              >
                <span className="flex items-center">
                  <Server className="w-4 h-4 mr-1" /> Kubernetes
                </span>
                <span className="flex items-center">
                  <GitBranch className="w-4 h-4 mr-1" /> Terraform
                </span>
                <span className="flex items-center">
                  <Database className="w-4 h-4 mr-1" /> MLOps
                </span>
                <span className="flex items-center">
                  <Cloud className="w-4 h-4 mr-1" /> Cloud
                </span>
                <span className="flex items-center">
                  <Cpu className="w-4 h-4 mr-1" /> DevOps
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.div variants={item} className="mt-10">
          <Button
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2 hover:from-blue-700 hover:to-indigo-700 shadow"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Minimize Hero Content" : "Expand Hero Content"}
          >
            {expanded ? (
              <Minus className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}