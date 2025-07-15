"use client";

import {
  Puzzle,
  Cpu,
  Cloud,
  Code2,
  Server,
  GitMerge,
  Wrench,
  ShieldCheck,
  ListTodo,
  ArrowRight,
  Rocket,
  BookOpenCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Intro() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cardVariants = {
    initial: { y: 0, boxShadow: "0 0 rgba(0,0,0,0)" },
    hover: {
      y: -8,
      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
      transition: { duration: 0.3 },
    },
  };

  const learningPathItems = [
    { label: "Roadmap", id: "devops-roadmap", desc: "Complete landscape" },
    { label: "YouTube", id: "youtube-playlists", desc: "Expert tutorials" },
    { label: "Labs", id: "free-labs", desc: "Hands-on practice" },
    { label: "Local", id: "myanmar-playlists", desc: "Local resources" },
    { label: "Udemy", id: "free-udemy", desc: "Structured courses" },
  ];

  const stepColors = [
    "bg-gradient-to-r from-green-500 to-emerald-600",
    "bg-gradient-to-r from-red-500 to-red-600",
    "bg-gradient-to-r from-orange-500 to-amber-600",
    "bg-gradient-to-r from-red-500 to-red-600",
    "bg-gradient-to-r from-purple-500 to-blue-600",
  ];

  const conceptCards = [
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "What is DevOps?",
      description:
        "A collaborative approach combining software development (Dev) and IT operations (Ops) to shorten the development lifecycle.",
      color: "bg-blue-500",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Core Practices",
      description:
        "CICD, Containerization, Version Control, Orchestration, Infrastructure As Code, Monitoring & Logging, and Incident Response",
      color: "bg-purple-500",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Native",
      description:
        "Cloud-native is a way of building and running applications that fully leverage the cloud model — scalable, resilient, flexible, and automated.",
      color: "bg-amber-500",
    },
  ];

  const toolCategories = [
    {
      name: "Prerequisites",
      icon: <Code2 className="w-5 h-5" />,
      tools: [
        "Programming Basics",
        "Networking Basics",
        "Operating System",
        "Computer Fundamentals",
        "Virtualization"
      ],
      color: "bg-blue-100 text-blue-800",
      frameColor: "bg-blue-500",
    },
    {
      name: "Beginner",
      icon: <Server className="w-5 h-5" />,
      tools: [
        "Linux Server Administration",
        "Linux Bash Scripting",
        "CCNA Networking",
        "Cloud Fundamentals",
        "Docker",
      ],
      color: "bg-purple-100 text-purple-800",
      frameColor: "bg-purple-500",
    },
    {
      name: "Intermediate",
      icon: <GitMerge className="w-5 h-5" />,
      tools: [
        "Containerization",
        "AWS Services",
        "Version Control",
        "Kubernetes Fundamentals",
        "CICD Pipeline",
      ],
      color: "bg-green-100 text-green-800",
      frameColor: "bg-green-500",
    },
    {
      name: "Advanced",
      icon: <ShieldCheck className="w-5 h-5" />,
      tools: ["Infrastructure as Code", "Configuration Management", "Security", "GitOps", "Monitoring & Logging"],
      color: "bg-red-100 text-red-800",
      frameColor: "bg-red-500",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* ✅ Hero Section */}
      <section className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6 select-text"
          >
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg select-text">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200 select-text">
              <Sparkles className="w-3 h-3 mr-1.5" /> Introduction
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4"
          >
            Start Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DevOps
            </span>{" "}
            Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-gray-700 max-w-2xl mx-auto text-sm sm:text-base select-text"
          >
            Learn what DevOps really means, why it matters, and what you need to
            know before diving in.
          </motion.p>
        </div>
      </section>

      {/* Concept Cards */}
      <motion.div
        className="mb-8 overflow-x-auto pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-6 w-max px-4 mx-auto">
          {conceptCards.map((card, i) => (
            <div
              key={i}
              className="w-72 flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className={`h-2 ${card.color}`}></div>
              <div className="p-6">
                <div
                  className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* DevOps Learning Levels */}
      <div className="mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 select-text flex items-center justify-center gap-3"
        >
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow select-text">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200 select-text">
            <Sparkles className="w-3 h-3 mr-1.5" /> DevOps Learning Levels
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 text-gray-700 max-w-2xl mx-auto text-sm sm:text-base select-text text-center mb-10"
        >
          Explore DevOps from foundational knowledge to advanced infrastructure
          practices through structured stages.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toolCategories.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className={`h-2 ${category.frameColor}`} />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div
                    className={`p-2 ${category.color.split(" ")[0]} ${
                      category.color.split(" ")[1]
                    } rounded-lg mr-3`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.tools.map((tool, j) => (
                    <li
                      key={j}
                      className="flex items-center text-gray-700 text-sm"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Learning Guideline */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 select-text"
        >
          <h4 className="text-2xl font-bold text-gray-900 mb-5 flex items-center justify-center gap-2 select-text">
            <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg select-text">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200 select-text">
              <Sparkles className="w-3 h-3 mr-1.5" /> Guideline
            </span>
          </h4>
          <p className="text-gray-700 text-center">
            Follow this structured path to master DevOps
          </p>
        </motion.div>

        <div className="relative">
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
                <div className="mt-2 text-xs text-gray-500 text-center">
                  {step.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}