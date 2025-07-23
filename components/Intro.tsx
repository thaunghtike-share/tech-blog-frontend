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
  BarChart3,
  ListChecks,
  ClipboardList,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Intro() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: -8,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const learningPathItems = [
    { label: "Roadmap", id: "devops-roadmap", desc: "See Roadmap" },
    { label: "Udemy", id: "free-udemy", desc: "Structured Courses" },
    { label: "YouTube", id: "youtube-playlists", desc: "Expert tutorials" },
    { label: "Certificate", id: "cert", desc: "Get Certificates" },
    { label: "Jobs", id: "career", desc: "Get Jobs" },
  ];

  const stepColors = [
    "bg-gradient-to-r from-green-600 to-emerald-600",
    "bg-gradient-to-r from-purple-600 to-pink-600",
    "bg-gradient-to-r from-red-600 to-pink-600",
    "bg-gradient-to-r from-purple-600 to-blue-600",
    "bg-gradient-to-r from-purple-600 to-pink-600",
  ];

  const conceptCards = [
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "What is DevOps?",
      description:
        "A collaborative approach combining software development (Dev) and IT operations (Ops) to shorten the development lifecycle.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Core Practices",
      description:
        "Core practices include continuous integration and delivery, containerization, version control, orchestration, infrastructure as code, monitoring, and incident response.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Native",
      description:
        "Cloud-native is a way of building and running applications that fully leverage the cloud model — scalable, resilient, flexible, and automated.",
      color: "from-amber-400 to-amber-600",
    },
  ];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200">
              <Sparkles className="w-3 h-3 mr-1.5" /> Intro
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-extrabold font-sans bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 tracking-tight"
          >
            learn{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DevOps
            </span>{" "}
            now
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-gray-700 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Unlock DevOps: Learn the concepts transforming modern tech teams and
            the practical skills you need to boost your IT career
          </motion.p>
        </div>
      </div>

      {/* Concept Cards - Horizontal scroll on mobile */}
      <motion.div
        className="my-12 md:my-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto hidden">
          {conceptCards.map((card, i) => (
            <motion.div
              key={i}
              className="group relative w-[360px] min-h-[200px]"
              initial="initial"
              whileHover="hover"
              variants={cardVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-br rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
              <div className="relative h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-transparent">
                <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                <div className="p-6">
                  <div
                    className={`bg-gradient-to-r ${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile horizontal scroll version */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex space-x-4 w-max min-w-full px-4">
            {conceptCards.map((card, i) => (
              <motion.div
                key={i}
                className="group relative w-72 flex-shrink-0"
                initial="initial"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-br rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                <div className="relative h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-transparent">
                  <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                  <div className="p-6">
                    <div
                      className={`bg-gradient-to-r ${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Learning Guideline */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h4 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200">
              <ClipboardList className="w-3 h-3 mr-1.5" /> Guideline
            </span>
          </h4>
          <p className="text-gray-700 text-center">
            Follow this structured path to master DevOps
          </p>
        </motion.div>

        {/* Desktop version */}
        <div className="relative hidden md:block">
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

        {/* Mobile horizontal scroll version */}
        <div className="md:hidden relative">
          <div className="absolute top-5 left-0 right-4 h-1 bg-gradient-to-r from-gray-200 via-blue-200 to-purple-200 rounded-full z-0" />
          <div className="overflow-x-auto pb-6 -mx-4 px-4">
            <div className="flex space-x-5 w-max min-w-full px-4 relative z-10">
              {learningPathItems.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex flex-col items-center w-16 flex-shrink-0"
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
      </div>
    </div>
  );
}
