"use client";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface RoadmapItem {
  title: string;
  description: string;
  tags: string[];
  image?: string;
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
        tags: [
          "command-line",
          "file-system",
          "permissions",
          "processes",
          "networking",
        ],
        image: "linux.webp",
      },
      {
        title: "Bash Scripting",
        description:
          "Automate tasks with Bash scripting and command-line tools",
        tags: ["variables", "loops", "functions", "automation", "debugging"],
        image: "bash.png",
      },
      {
        title: "CCNA",
        description:
          "Understand networking basics, protocols, and infrastructure",
        tags: ["tcp-ip", "subnetting", "routing", "switching", "vlans"],
        image: "ccna.png",
      },
      {
        title: "AWS Practitioner",
        description:
          "AWS cloud fundamentals, services overview, and basic architecture",
        tags: [
          "cloud-concepts",
          "pricing",
          "support",
          "architecture",
          "security",
        ],
        image: "aws.png",
      },
      {
        title: "Azure Fundamentals",
        description:
          "Microsoft Azure core services, solutions, and management tools",
        tags: [
          "virtualization",
          "scalability",
          "availability",
          "cost-management",
        ],
        image: "azure.png",
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
        title: "Docker Essentials",
        description:
          "Containerize applications and manage container lifecycles",
        tags: ["containers", "images", "dockerfile", "volumes", "networking"],
        image: "docker.png",
      },
      {
        title: "Git & GitHub",
        description:
          "Version control, branching strategies, and collaborative workflows",
        tags: ["branches", "merge", "rebase", "pull-requests", "workflows"],
        image: "git.png",
      },
      {
        title: "CI/CD Pipelines",
        description:
          "Build automated testing and deployment pipelines with Jenkins or GitLab",
        tags: ["jenkins", "gitlab-ci", "stages", "artifacts", "testing"],
        image: "cicd.png",
      },
      {
        title: "Ansible Automation",
        description:
          "Automate configuration management and application deployment",
        tags: ["playbooks", "inventory", "roles", "variables", "modules"],
        image: "ansible.png",
      },
      {
        title: "Packer",
        description:
          "Create machine images for multiple platforms from a single source configuration",
        tags: [
          "images",
          "automation",
          "multi-platform",
          "provisioners",
          "builders",
        ],
        image: "packer.png",
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
        title: "Kubernetes",
        description:
          "Orchestrate containers at scale with K8s clusters and deployments",
        tags: ["pods", "services", "deployments", "configmaps", "helm", "rbac"],
        image: "kubernetes.png",
      },
      {
        title: "Terraform",
        description:
          "Infrastructure as Code for multi-cloud provisioning and management",
        tags: ["modules", "state", "providers", "workspaces", "cdktf"],
        image: "terraform.png",
      },
      {
        title: "Monitoring & Observability",
        description:
          "Implement Prometheus, Grafana, and ELK stack for system insights",
        tags: ["metrics", "logs", "alerts", "dashboards", "tracing"],
        image: "monitoring.png",
      },
      {
        title: "GitOps",
        description:
          "Declarative infrastructure with ArgoCD and Flux for automated deployments",
        tags: ["argocd", "flux", "sync", "rollback", "automation"],
        image: "gitops.png",
      },
      {
        title: "Hashicorp Vault",
        description:
          "Secure sensitive data with Vault, secrets management, and encryption",
        tags: ["vault", "secrets", "encryption", "pki", "authentication"],
        image: "vault.png",
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
  const [expanded, setExpanded] = useState(false);

  const nextStage = () => {
    setCurrentStageIndex((prev) => (prev + 1) % roadmap.length);
    setExpanded(false);
  };

  const prevStage = () => {
    setCurrentStageIndex(
      (prev) => (prev - 1 + roadmap.length) % roadmap.length
    );
    setExpanded(false);
  };

  const currentStage = roadmap[currentStageIndex];
  const currentConfig =
    stageConfig[currentStage.key as keyof typeof stageConfig];

  // Show only first 3 items when not expanded, show all when expanded
  const visibleItems = expanded
    ? currentStage.items
    : currentStage.items.slice(0, 3);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    target.src = "/new.png";
  };

  return (
    <section className="relative min-h-screen bg-white/95 overflow-hidden font-open-sans">
      <div className="relative z-10 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section - Left Aligned like YouTube/Udemy */}
          <motion.div
            className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
              >
                DevOps Roadmap with
                <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Structured Learning Path
                </span>
              </motion.h2>

              <motion.div
                className="h-1 w-32 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 mt-4 text-lg max-w-2xl"
              >
                Follow our comprehensive DevOps roadmap designed to take you
                from complete beginner to advanced practitioner with hands-on
                projects and real-world scenarios
              </motion.p>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
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
                  className={`text-3xl md:text-4xl font-bold bg-clip-text text-black`}
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

                <motion.div
                  key={`logos-${currentStage.key}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  {currentStage.items.map((item, index) => (
                    <motion.div
                      key={`logo-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="relative group flex flex-col items-center gap-2"
                    >
                      <img
                        src={`/${item.image}`}
                        alt={item.title}
                        className="w-24 h-24 object-contain rounded-lg bg-white p-2 shadow-sm border border-gray-200 group-hover:shadow-md transition-all duration-300 group-hover:scale-110"
                        onError={handleImageError}
                      />
                      <span className="text-xs text-gray-700 text-center font-medium max-w-[96px] leading-tight">
                        {item.title}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

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
                  <div className="relative">
                    <div
                      className={`absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b ${currentConfig.gradient}`}
                    />

                    <div className="space-y-6">
                      {visibleItems.map((item, index) => (
                        <motion.div
                          key={`item-${item.title}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="flex items-start gap-6 group"
                        >
                          <div className="flex-shrink-0 relative z-10">
                            <div
                              className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentConfig.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              {index + 1}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-blue-300 group-hover:-translate-y-1">
                              <h3 className="text-lg font-bold text-black mb-2">
                                {item.title}
                              </h3>
                              <div
                                className={`w-12 h-1 bg-gradient-to-r ${currentConfig.gradient} rounded-full mb-3`}
                              ></div>
                              <p className="text-black text-sm leading-relaxed mb-4">
                                {item.description}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${currentConfig.lightBg} border ${currentConfig.border} text-gray-700`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {currentStage.items.length > 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center mt-8"
                      >
                        <button
                          onClick={() => setExpanded(!expanded)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-full ${currentConfig.lightBg} border ${currentConfig.border} text-gray-700 font-medium hover:shadow-md transition-all duration-300 hover:scale-105`}
                        >
                          {expanded ? (
                            <>
                              <Minus className="w-4 h-4" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              Show All {currentStage.items.length} Topics
                            </>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
