"use client";

import {
  BookOpenCheck,
  Rocket,
  ChevronRight,
  Terminal,
  GitBranch,
  Cpu,
  Network,
  Shield,
  Sparkles,
  Code,
  Database,
  Workflow,
  Box,
  LayoutGrid,
  Activity,
  Cloud,
  Lightbulb,
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
    "bg-gradient-to-r from-purple-500 to-blue-600",
    "bg-gradient-to-r from-red-500 to-red-600",
    "bg-gradient-to-r from-emerald-500 to-emerald-600",
    "bg-gradient-to-r from-red-500 to-red-600",
    "bg-gradient-to-r from-purple-500 to-blue-600",
  ];

  const devOpsConcepts = [
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "What is DevOps?",
      description:
        "A culture and practice that bridges development and operations teams to deliver software rapidly and reliably.",
      color: "from-indigo-500 to-blue-600",
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Key Principles",
      items: [
        "CI/CD Pipelines",
        "Infrastructure as Code",
        "Monitoring & Logging",
        "Microservices Architecture",
        "Collaboration Culture",
      ],
      color: "from-purple-500 to-indigo-600",
    },
    {
      icon: <BookOpenCheck className="w-5 h-5" />,
      title: "Prerequisites",
      items: [
        "Linux Fundamentals",
        "Programming Basics",
        "Networking Concepts",
        "Cloud Basics",
        "Security Fundamentals",
      ],
      color: "from-green-500 to-emerald-600",
    },
  ];

  const devOpsTools = [
    {
      icon: <GitBranch className="w-5 h-5" />,
      title: "Version Control",
      tools: ["Git", "GitHub", "GitLab"],
      color: "bg-blue-100 text-blue-800",
    },
    {
      icon: <Workflow className="w-5 h-5" />,
      title: "CI/CD",
      tools: ["Jenkins", "GitHub Actions", "CircleCI"],
      color: "bg-purple-100 text-purple-800",
    },
    {
      icon: <Box className="w-5 h-5" />,
      title: "Containerization",
      tools: ["Docker", "Containerd", "Podman"],
      color: "bg-green-100 text-green-800",
    },
    {
      icon: <LayoutGrid className="w-5 h-5" />,
      title: "Orchestration",
      tools: ["Kubernetes", "Swarm", "Nomad"],
      color: "bg-red-100 text-red-800",
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Infrastructure as Code",
      tools: ["Terraform", "Ansible", "Pulumi"],
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Monitoring",
      tools: ["Prometheus", "Grafana", "Datadog"],
      color: "bg-teal-100 text-teal-800",
    },
  ];

  return (
    <section className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      {/* Header */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6 select-text"
        >
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg select-text">
            <BookOpenCheck className="w-5 h-5 text-white" />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border border-indigo-200 select-text">
            <Sparkles className="w-3 h-3 mr-1.5" /> Introduction
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug select-text"
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

      {/* Three Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {devOpsConcepts.map((concept, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-100 select-text shadow-sm"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            style={{ cursor: "default" }}
          >
            <div
              className={`flex justify-center mb-4 p-2 w-12 h-12 mx-auto rounded-lg bg-gradient-to-r ${concept.color} text-white`}
            >
              {concept.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 select-text text-center">
              {concept.title}
            </h3>

            {concept.description ? (
              <p className="text-sm text-gray-700 select-text">
                {concept.description}
              </p>
            ) : (
              <ul className="flex flex-col items-center space-y-2 text-sm text-gray-700 select-text">
                {concept.items?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 select-text justify-center"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      {/* Essential Tools Section */}
      <div className="mb-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-6 select-text"
        >
          <span className="bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent select-text">
            Essential DevOps Tools
          </span>
        </motion.h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {devOpsTools.map((tool, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 select-text"
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              style={{ cursor: "default" }}
            >
              <div
                className={`flex justify-center mb-2 p-2 w-10 h-10 mx-auto rounded-lg ${
                  tool.color.split(" ")[0]
                } ${tool.color.split(" ")[1]}`}
              >
                {tool.icon}
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2 select-text">
                {tool.title}
              </h4>
              <div className="flex flex-wrap justify-center gap-1 select-text">
                {tool.tools.map((t, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 rounded-md ${tool.color}`}
                  >
                    {t}
                  </span>
                ))}
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
          className="mb-8 select-text"
        >
          <h4 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2 select-text">
            <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg select-text">
              <BookOpenCheck className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent select-text">
              Learning Guideline
            </span>
          </h4>
          <p className="text-gray-700 select-text">
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
                className="flex flex-col items-center select-text"
              >
                <button
                  onClick={() => scrollToSection(step.id)}
                  className="mb-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline transition-colors select-text"
                >
                  {step.label}
                </button>
                <motion.div
                  onClick={() => scrollToSection(step.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-medium cursor-pointer ${stepColors[index]} hover:shadow-xl transition-all select-text`}
                >
                  {index + 1}
                </motion.div>
                <div className="mt-1.5 text-xs text-gray-500 text-center select-text">
                  {step.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex justify-center"
        ></motion.div>
      </div>
    </section>
  );
}