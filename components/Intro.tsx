"use client";

import {
  Puzzle,
  Cpu,
  Cloud,
  Rocket,
  Sparkles,
  ListTodo,
  ClipboardList,
  GitPullRequest,
  GitCommit,
  Code,
  Server,
  Globe,
  BookOpen,
  BadgeCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { Play } from "next/font/google";

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
    {
      label: "Roadmap",
      id: "devops-roadmap",
      desc: "See Roadmap",
      icon: ListTodo,
      color: "bg-gradient-to-r from-yellow-600 to-orange-600",
    },
    {
      label: "YouTube",
      id: "youtube-playlists",
      desc: "Expert tutorials",
      icon: Globe,
      color: "bg-gradient-to-r from-red-600 to-red-600",
    },
    {
      label: "Udemy",
      id: "free-udemy",
      desc: "Structured Courses",
      icon: BookOpen,
      color: "bg-gradient-to-r from-blue-600 to-blue-600",
    },
    {
      label: "Certificate",
      id: "cert",
      desc: "Get Certificates",
      icon: BadgeCheck,
      color: "bg-gradient-to-r from-purple-600 to-purple-600",
    },
    {
      label: "Jobs",
      id: "career",
      desc: "Get Jobs",
      icon: Rocket,
      color: "bg-gradient-to-r from-red-600 to-red-600",
    },
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
      <div className="md:mt-15 mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-300">
              <BookOpen className="w-4 h-4 mr-1.5" /> Introduction
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-3xl font-bold font-['Inter'] bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4 tracking-normal"
          >
            Learn{" "}
            <span className="font-['Inter'] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DevOps
            </span>{" "}
            Now
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
        className="my-4 md:my-8"
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
                className="group relative w-80 flex-shrink-0 min-w-[320px]"
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

      {/* Learning Guideline - Workflow Style */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h4 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <ListTodo className="w-6 h-6 text-white" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200">
              <BadgeCheck className="w-3 h-3 mr-1.5" /> Guideline
            </span>
          </h4>
          <p className="text-gray-700 text-center">
            Follow this structured path to master DevOps
          </p>
        </motion.div>

        {/* Workflow Step Navigation - Fixed */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 scrollbar-hide items-center justify-center">
            <div className="flex items-center justify-center px-2">
              {learningPathItems.map((step, i) => (
                <React.Fragment key={step.id}>
                  {/* Button with icon + label in vertical stack */}
                  <div className="flex flex-col items-center mx-1 md:mx-3">
                    {" "}
                    {/* Tighter spacing on mobile */}
                    <button
                      onClick={() => scrollToSection(step.id)}
                      className="flex flex-col items-center focus:outline-none"
                    >
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${step.color}`}
                      >
                        <step.icon className="w-5 h-5" />
                      </motion.div>

                      {/* Label under icon */}
                      <span className="mt-2 text-xs font-medium text-gray-700 text-center">
                        {step.label}
                      </span>
                    </button>
                  </div>

                  {/* Connecting line (centered with icon only, not the label) */}
                  {i < learningPathItems.length - 1 && (
                    <div className="self-center mt-[-20px] md:mt-0">
                      <div className="h-1 w-4 md:w-12 bg-gradient-to-r from-gray-400 to-gray-500 mx-1 md:mx-2 rounded-full" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
