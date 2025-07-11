"use client"
import { useState } from "react"
import { Zap, Code, Cloud, Cpu, Server, Database, GitBranch, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"

export function MinimalHero() {
  const [expanded, setExpanded] = useState(true)
  const router = useRouter()

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
      className="relative bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 py-12 md:py-20 border-b border-gray-200/50 overflow-hidden"
    >
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Enhanced floating icons with animation */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-blue-300/60 w-10 h-10 hidden md:block"
      >
        <Cloud className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 text-indigo-300/60 w-10 h-10 hidden md:block"
      >
        <Server className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-20 text-purple-300/60 w-8 h-8 hidden md:block"
      >
        <Database className="w-full h-full" />
      </motion.div>
      <motion.div
        animate={{ y: [15, -5, 15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-20 text-blue-300/60 w-8 h-8 hidden md:block"
      >
        <GitBranch className="w-full h-full" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center"
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {/* Enhanced Badge */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-600 text-[11px] md:text-xs font-medium px-4 py-1.5 rounded-full mb-4 shadow-lg border border-blue-100"
        >
          <div className="p-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
            <Zap className="h-3 w-3 text-white" />
          </div>
          <span>DevOps • DevSecOps • IAC</span>
          <div className="p-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full">
            <Code className="h-3 w-3 text-white ml-1" />
          </div>
        </motion.div>

        {/* Heading (title) */}
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
              className="inline-block w-6 h-4 shadow-sm ml-1 rounded"
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-sm sm:text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mb-8"
        >
          A curated DevOps roadmap, tools, and projects — built especially for students, junior developers, and aspiring
          engineers in Myanmar to kickstart their{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
            cloud DevOps and automation journey
          </span>
          .
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
              {/* Enhanced Buttons */}
              <motion.div variants={item} className="flex flex-row flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
                  onClick={() => router.push("/articles")}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 shadow-lg hover:shadow-xl flex items-center transition-all"
                  onClick={() => {
                    const element = document.getElementById("free-labs")
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  <Cloud className="mr-2 h-4 w-4" />
                  Hands-On Labs
                </Button>
              </motion.div>

              {/* Enhanced Tags */}
              <motion.div variants={item} className="flex flex-wrap justify-center gap-4 text-gray-500 text-sm">
                {[
                  { icon: Server, label: "Kubernetes", color: "text-blue-600" },
                  { icon: GitBranch, label: "Terraform", color: "text-green-600" },
                  { icon: Database, label: "MLOps", color: "text-purple-600" },
                  { icon: Cloud, label: "Cloud", color: "text-cyan-600" },
                  { icon: Cpu, label: "DevOps", color: "text-orange-600" },
                ].map((item, index) => (
                  <motion.span
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white/80 transition-all"
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    {item.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Toggle Button */}
        <motion.div variants={item} className="mt-10">
          <Button
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-2 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Minimize Hero Content" : "Expand Hero Content"}
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}