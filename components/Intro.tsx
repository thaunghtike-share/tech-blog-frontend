"use client"
import {
  BookOpenCheck,
  Rocket,
  ChevronRight,
  Check,
  Terminal,
  GitBranch,
  Cpu,
  Network,
  Shield,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"

export default function Intro() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  }

  // Enhanced card bg colors with gradients
  const cardBgColors = [
    "bg-gradient-to-br from-indigo-50 to-blue-100 border-indigo-200",
    "bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200",
    "bg-gradient-to-br from-green-50 to-emerald-100 border-green-200",
  ]

  // Enhanced colors for each learning step
  const stepColors = [
    "bg-gradient-to-r from-blue-500 to-blue-600", // Roadmap
    "bg-gradient-to-r from-green-500 to-green-600", // YouTube
    "bg-gradient-to-r from-orange-500 to-orange-600", // Labs
    "bg-gradient-to-r from-red-500 to-red-600", // Local
    "bg-gradient-to-r from-purple-500 to-purple-600", // Udemy
  ]

  const learningPathItems = [
    { label: "Roadmap", id: "devops-roadmap", desc: "Complete landscape" },
    { label: "YouTube", id: "youtube-playlists", desc: "Expert tutorials" },
    { label: "Labs", id: "free-labs", desc: "Hands-on practice" },
    { label: "Local", id: "myanmar-playlists", desc: "Local resources" },
    { label: "Udemy", id: "free-udemy", desc: "Structured courses" },
  ]

  return (
    <section className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      {/* Enhanced Intro Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <BookOpenCheck className="w-5 h-5 text-white" />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200">
            <Sparkles className="w-3 h-3 mr-1.5" />
            Introduction
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-gray-900"
        >
          Start Your{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DevOps</span>{" "}
          Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-gray-600 max-w-2xl mx-auto"
        >
          Learn what DevOps really means, why it matters, and what you need to know before diving in.
        </motion.p>
      </div>

      {/* Enhanced Three Horizontal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* What is DevOps */}
        <motion.div
          className={`rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all ${cardBgColors[0]}`}
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
        >
          <div className="flex justify-center mb-4">
            <div className="p-2.5 rounded-xl text-white bg-gradient-to-r from-indigo-500 to-blue-600 shadow-md">
              <Rocket className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">What is DevOps?</h3>
          <div className="text-sm text-gray-700 text-center space-y-2">
            <p>
              DevOps bridges software development and IT operations to create automated pipelines for rapid, reliable
              software delivery.
            </p>
            <p>
              By breaking down silos between teams, implementing automation, and emphasizing continuous feedback, DevOps
              enables faster deployment cycles, improved reliability, and better alignment with business objectives.
            </p>
          </div>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          className={`rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all ${cardBgColors[1]}`}
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
        >
          <div className="flex justify-center mb-4">
            <div className="p-2.5 rounded-xl text-white bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Principles</h3>
          <div className="text-gray-700 text-sm">
            <ul className="space-y-2 flex flex-col items-center">
              {[
                { text: "CI/CD Pipelines", icon: <GitBranch className="w-4 h-4 text-purple-600" /> },
                { text: "Infrastructure as Code", icon: <Terminal className="w-4 h-4 text-purple-600" /> },
                { text: "Monitoring & Logging", icon: <Network className="w-4 h-4 text-purple-600" /> },
                { text: "Microservices", icon: <Cpu className="w-4 h-4 text-purple-600" /> },
                { text: "Collaboration Culture", icon: <Shield className="w-4 h-4 text-purple-600" /> },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 w-fit">
                  <span className="bg-white/80 p-1.5 rounded-lg shadow-sm">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Prerequisites */}
        <motion.div
          className={`rounded-xl shadow-lg p-6 border hover:shadow-xl transition-all ${cardBgColors[2]}`}
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
        >
          <div className="flex justify-center mb-4">
            <div className="p-2.5 rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md">
              <Check className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Prerequisites</h3>
          <div className="text-gray-700 text-sm">
            <ul className="space-y-2 flex flex-col items-center">
              {[
                { text: "Linux & OS Fundamentals", icon: <Terminal className="w-4 h-4 text-green-600" /> },
                { text: "Programming Basics", icon: <GitBranch className="w-4 h-4 text-green-600" /> },
                { text: "Networking Concepts", icon: <Network className="w-4 h-4 text-green-600" /> },
                { text: "Hardware Knowledge", icon: <Cpu className="w-4 h-4 text-green-600" /> },
                { text: "Security Fundamentals", icon: <Shield className="w-4 h-4 text-green-600" /> },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 w-fit">
                  <span className="bg-white/80 p-1.5 rounded-lg shadow-sm">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Learning Guideline */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h4 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <BookOpenCheck className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
              Learning Guideline
            </span>
          </h4>
          <p className="text-gray-600">Follow this structured path to master DevOps</p>
        </motion.div>

        <div className="relative">
          {/* Enhanced progress line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-blue-200 to-purple-200 rounded-full z-0" />

          <div className="grid grid-cols-5 gap-2 relative z-10">
            {learningPathItems.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => scrollToSection(step.id)}
                  className="mb-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline transition-colors"
                >
                  {step.label}
                </button>

                <motion.div
                  onClick={() => scrollToSection(step.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-medium cursor-pointer ${stepColors[index]} hover:shadow-xl transition-all`}
                >
                  {index + 1}
                </motion.div>

                <div className="mt-1.5 text-xs text-gray-500 text-center">{step.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            onClick={() => scrollToSection("devops-roadmap")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Your Journey
            <ChevronRight className="w-4 h-4 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}