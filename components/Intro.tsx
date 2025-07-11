"use client";

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
    initial: { y: 0 },
    hover: { 
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  // Card bg colors
  const cardBgColors = [
    "bg-indigo-50 border-indigo-100",
    "bg-purple-50 border-purple-100",
    "bg-green-50 border-green-100",
  ];

  // Unique colors for each learning step
  const stepColors = [
    "bg-blue-500",    // Roadmap
    "bg-green-500",   // YouTube
    "bg-orange-500",  // Labs
    "bg-red-500",     // Local
    "bg-purple-500"   // Udemy
  ];

  const learningPathItems = [
    { label: "Roadmap", id: "devops-roadmap", desc: "Complete landscape" },
    { label: "YouTube", id: "youtube-playlists", desc: "Expert tutorials" },
    { label: "Labs", id: "free-labs", desc: "Hands-on practice" },
    { label: "Local", id: "myanmar-playlists", desc: "Local resources" },
    { label: "Udemy", id: "free-udemy", desc: "Structured courses" },
  ];

  return (
    <section className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      {/* Intro Header */}
      <div className="mb-12">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 mb-3">
          <BookOpenCheck className="w-3 h-3 mr-1.5" />
          Introduction
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Start Your <span className="text-indigo-600">DevOps</span> Journey
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Learn what DevOps really means, why it matters, and what you need to know before diving in.
        </p>
      </div>

      {/* Three Horizontal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* What is DevOps */}
        <motion.div 
          className={`rounded-lg shadow-md p-6 border hover:shadow-lg ${cardBgColors[0]}`}
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
        >
          <div className="flex justify-center mb-4">
            <div className="p-2.5 rounded-lg text-indigo-600 bg-indigo-100">
              <Rocket className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            What is DevOps?
          </h3>
          <div className="text-sm text-gray-700 text-center space-y-2">
            <p>
              DevOps bridges software development and IT operations to create
              automated pipelines for rapid, reliable software delivery.
            </p>
            <p>
              By breaking down silos between teams, implementing automation, and
              emphasizing continuous feedback, DevOps enables faster deployment
              cycles, improved reliability, and better alignment with business
              objectives.
            </p>
          </div>
        </motion.div>

        {/* Key Principles */}
        <motion.div 
          className={`rounded-lg shadow-md p-6 border hover:shadow-lg ${cardBgColors[1]}`}
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
        >
          <div className="flex justify-center mb-4">
            <div className="p-2.5 rounded-lg text-purple-600 bg-purple-100">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Key Principles
          </h3>
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
                  <span className="bg-gray-50 p-1.5 rounded">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Prerequisites */}
        <motion.div 
          className={`rounded-lg shadow-md p-6 border hover:shadow-lg ${cardBgColors[2]}`}
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
        >
          <div className="flex justify-center mb-4">
            <div className="p-2.5 rounded-lg text-green-600 bg-green-100">
              <Check className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Prerequisites
          </h3>
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
                  <span className="bg-gray-50 p-1.5 rounded">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Learning Guideline */}
      <div className="max-w-4xl mx-auto">
        <h4 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
          <BookOpenCheck className="w-6 h-6 text-indigo-600" />
          <span className="text-gray-900">
            Learning Guideline
          </span>
        </h4>

        <div className="relative">
          {/* Neutral progress line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full z-0" />

          <div className="grid grid-cols-5 gap-2 relative z-10">
            {learningPathItems.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => scrollToSection(step.id)}
                  className="mb-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                >
                  {step.label}
                </button>
                <motion.div
                  onClick={() => scrollToSection(step.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white font-medium cursor-pointer ${stepColors[index]}`}
                >
                  {index + 1}
                </motion.div>
                <div className="mt-1.5 text-xs text-gray-500 text-center">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <motion.button
            onClick={() => scrollToSection("devops-roadmap")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm"
          >
            Start Your Journey
            <ChevronRight className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}