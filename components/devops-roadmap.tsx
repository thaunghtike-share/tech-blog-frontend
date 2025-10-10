"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface RoadmapItem {
  title: string;
  description: string;
}

interface RoadmapStage {
  key: string;
  label: string;
  description: string[];
  items: RoadmapItem[];
}

const roadmap: RoadmapStage[] = [
  {
    key: "beginner",
    label: "Beginner",
    description: [
      "Start your DevOps journey with foundational tools and concepts",
      "Best for absolute beginners and career switchers",
    ],
    items: [
      {
        title: "Linux Fundamentals",
        description:
          "Master command line, file systems, and shell scripting fundamentals",
      },
      {
        title: "Bash Scripting",
        description:
          "Automate tasks with Bash scripting and command-line tools",
      },
      {
        title: "CCNA",
        description:
          "Understand networking basics, protocols, and infrastructure",
      },
      {
        title: "Cloud Computing",
        description:
          "Learn cloud computing concepts and service models (IaaS, PaaS, SaaS)",
      },
      {
        title: "Docker Essentials",
        description:
          "Containerize applications and manage container lifecycles",
      },
    ],
  },
  {
    key: "intermediate",
    label: "Intermediate",
    description: [
      "Build real DevOps workflows and automation",
      "Infrastructure as code and CI/CD pipelines",
    ],
    items: [
      {
        title: "AWS Core Services",
        description:
          "Master EC2, S3, RDS, Lambda, and essential AWS infrastructure",
      },
      {
        title: "Ansible Automation",
        description:
          "Automate configuration management and application deployment",
      },
      {
        title: "Git & GitHub",
        description:
          "Version control, branching strategies, and collaborative workflows",
      },
      {
        title: "CI/CD Pipelines",
        description:
          "Build automated testing and deployment pipelines with Jenkins or GitLab",
      },
      {
        title: "Kubernetes",
        description:
          "Orchestrate containers at scale with K8s clusters and deployments",
      },
    ],
  },
  {
    key: "advanced",
    label: "Advanced",
    description: [
      "Master production-grade DevOps and GitOps",
      "Kubernetes, infrastructure as code, and security",
    ],
    items: [
      {
        title: "Terraform",
        description:
          "Infrastructure as Code for multi-cloud provisioning and management",
      },
      {
        title: "Monitoring & Observability",
        description:
          "Implement Prometheus, Grafana, and ELK stack for system insights",
      },
      {
        title: "GitOps",
        description:
          "Declarative infrastructure with ArgoCD and Flux for automated deployments",
      },
      {
        title: "Secrets Management",
        description:
          "Secure sensitive data with Vault, AWS Secrets Manager, and encryption",
      },
      {
        title: "Kubernetes Security",
        description:
          "Implement RBAC, network policies, and security best practices",
      },
    ],
  },
];

const stageConfig = {
  beginner: {
    gradient: "from-sky-600 to-blue-600",
    color: "sky",
    bgGradient: "from-sky-600 to-blue-600",
    lightBg: "bg-sky-400/20",
    border: "border-sky-300/30",
  },
  intermediate: {
    gradient: "from-blue-500 to-purple-600",
    color: "blue",
    bgGradient: "from-blue-500 to-purple-600",
    lightBg: "bg-blue-400/20",
    border: "border-blue-300/30",
  },
  advanced: {
    gradient: "from-green-500 to-emerald-600",
    color: "green",
    bgGradient: "from-green-500 to-emerald-600",
    lightBg: "bg-green-400/20",
    border: "border-green-300/30",
  },
};

export function MinimalDevopsRoadmap() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const nextStage = () => {
    setCurrentStageIndex((prev) => (prev + 1) % roadmap.length);
  };

  const prevStage = () => {
    setCurrentStageIndex(
      (prev) => (prev - 1 + roadmap.length) % roadmap.length
    );
  };

  const currentStage = roadmap[currentStageIndex];
  const currentConfig =
    stageConfig[currentStage.key as keyof typeof stageConfig];

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-gray-50 via-white to-gray-100 overflow-hidden font-open-sans">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[
          { left: 10, top: 20 },
          { left: 90, top: 15 },
          { left: 15, top: 80 },
          { left: 95, top: 70 },
        ].map((pos, i) => (
          <div
            key={`float-${i}`}
            className="absolute animate-float"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 2)}s`,
            }}
          >
            <div
              className={`w-3 h-3 sm:w-4 sm:h-4 ${currentConfig.lightBg} rounded-full backdrop-blur-sm border ${currentConfig.border}`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
            <motion.div
              className="relative p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-sky-400/30 to-blue-500/30 rounded-full blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <ChevronRight className="w-10 h-10 text-white relative z-10" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-800 to-blue-800 bg-clip-text text-transparent">
              DevOps Roadmap
            </h2>

            <motion.div
              className="flex items-center gap-1"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
              <ChevronRight className={`w-6 h-6 text-sky-600 ml-2`} />
            </motion.div>
          </div>

          <motion.div
            className={`h-1 w-32 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full mx-auto relative mb-6`}
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <p className="text-black text-lg max-w-3xl mx-auto relative z-10">
            A structured learning path to master DevOps from fundamentals to
            advanced concepts
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
            {/* Left Side - Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-2/5"
            >
              <div className="space-y-6">
                <motion.h3
                  key={currentStage.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${currentConfig.gradient} bg-clip-text text-transparent`}
                >
                  {currentStage.label}
                </motion.h3>

                <motion.div
                  key={`desc-${currentStage.key}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  {currentStage.description.map((desc, index) => (
                    <p
                      key={index}
                      className="text-black text-lg leading-relaxed"
                    >
                      {desc}
                    </p>
                  ))}
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={prevStage}
                    className="p-3 rounded-full bg-white hover:bg-gray-50 text-gray-600 transition-all duration-300 hover:scale-110 border border-gray-200 shadow-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div className="flex space-x-2">
                    {roadmap.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentStageIndex
                            ? `bg-gradient-to-r ${
                                stageConfig[
                                  roadmap[index].key as keyof typeof stageConfig
                                ].gradient
                              } scale-125`
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextStage}
                    className="p-3 rounded-full bg-white hover:bg-gray-50 text-gray-600 transition-all duration-300 hover:scale-110 border border-gray-200 shadow-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Modern Timeline Roadmap */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full lg:w-3/5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStage.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  {/* Modern Timeline */}
                  <div className="relative">
                    {/* Vertical Line */}
                    <div
                      className={`absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b ${currentConfig.gradient}`}
                    />

                    {/* Roadmap Items */}
                    <div className="space-y-6">
                      {currentStage.items.map((item, index) => (
                        <motion.div
                          key={`item-${item.title}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="flex items-start gap-6 group"
                        >
                          {/* Step Circle */}
                          <div className="flex-shrink-0 relative z-10">
                            <div
                              className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentConfig.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              {index + 1}
                            </div>
                          </div>

                          {/* Content Card */}
                          <div className="flex-1 min-w-0">
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-blue-300 group-hover:-translate-y-1">
                              <h3 className="text-lg font-bold text-black mb-2">
                                {item.title}
                              </h3>
                              <div
                                className={`w-12 h-1 bg-gradient-to-r ${currentConfig.gradient} rounded-full mb-3`}
                              ></div>
                              <p className="text-black text-sm leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Dots */}
      <div className="absolute top-20 left-4 sm:left-20 hidden lg:block">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${currentConfig.lightBg} rounded-full animate-ping`}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 right-4 sm:right-20 hidden lg:block">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${currentConfig.lightBg} rounded-full animate-ping`}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
