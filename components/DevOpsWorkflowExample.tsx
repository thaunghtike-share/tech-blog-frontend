"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  GitCommit,
  Code,
  Star,
  Shield,
  Package,
  GitPullRequest,
  Server,
  Activity,
  Settings,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const workflowSteps = [
  {
    id: 1,
    title: "Terraform Provisioning",
    description: "Infrastructure provisioned using Terraform scripts",
    tools: [
      {
        name: "Terraform",
        desc: "Used for defining infrastructure as code (IaC).",
      },
      {
        name: "Terragrunt",
        desc: "Manages Terraform configurations across environments.",
      },
      {
        name: "Terraformer",
        desc: "Helps import existing resources into Terraform code.",
      },
    ],
    icon: GitPullRequest,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 2,
    title: "Code Commit",
    description: "Code is pushed to GitHub triggering the CI pipeline",
    tools: [
      { name: "GitHub", desc: "Source code hosting and CI trigger." },
      { name: "Git", desc: "Version control system for managing source code." },
      {
        name: "VS Code",
        desc: "Developer IDE for writing and committing code.",
      },
    ],
    icon: GitCommit,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    title: "Build & Scan",
    description: "Docker image built and scanned using Trivy",
    tools: [
      { name: "Docker", desc: "Used for containerizing the application." },
      { name: "Trivy", desc: "Scans images for vulnerabilities." },
      { name: "Docker buildx", desc: "Builds multi-platform Docker images." },
    ],
    icon: Shield,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    title: "Push to Registry",
    description: "Secure images pushed to Azure Container Registry",
    tools: [
      { name: "Azure ACR", desc: "Private container image registry in Azure." },
    ],
    icon: Package,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    title: "Deploy Apps using GitOps with ArgoCD",
    description: "Argo CD deploys apps using Helm charts",
    tools: [
      { name: "Argo CD", desc: "Automates Kubernetes deployments using Git." },
      { name: "Helm", desc: "Manages Kubernetes applications via charts." },
    ],
    icon: Server,
    color: "bg-red-100 text-red-700",
  },
  {
    id: 6,
    title: "GitOps Update",
    description: "Image Updater modifies GitOps repo with new tags",
    tools: [
      { name: "GitHub", desc: "Hosts the GitOps repository." },
      {
        name: "Argo CD Image Updater",
        desc: "Automatically updates image tags in Git.",
      },
    ],
    icon: GitPullRequest,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 7,
    title: "Logging & Monitoring",
    description: "Prometheus and Grafana provide metrics and alerts",
    tools: [
      {
        name: "Prometheus",
        desc: "Monitors application and infrastructure metrics.",
      },
      {
        name: "Grafana",
        desc: "Visualizes metrics and alerts from Prometheus.",
      },
      { name: "Loki", desc: "Centralized logging solution." },
      {
        name: "Azure Monitor",
        desc: "Cloud-based monitoring for Azure resources.",
      },
      {
        name: "Elastic Cloud",
        desc: "Managed Elasticsearch, Kibana, and more.",
      },
    ],
    icon: Activity,
    color: "bg-indigo-100 text-indigo-700",
  },
];

const techStack = [
  "GitHub",
  "Docker",
  "Trivy",
  "Azure ACR",
  "Argo CD",
  "Helm",
  "Kubernetes",
  "Prometheus",
  "Grafana",
  "Image Updater",
  "Terraform",
];

export function DevOpsWorkflowExample() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs md:text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-4 h-4 mr-2" /> Case Study
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4"
        >
          Enterprise GitOps Workflow
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto"
        >
          DevOps architecture design built for client's company using GitOps and
          IAC
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="relative w-full aspect-video mb-16 rounded-2xl overflow-hidden shadow-xl"
      >
        <Image
          src="/dinger.png"
          alt="DevOps workflow diagram"
          fill
          className="object-contain"
          quality={100}
          priority
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Workflow Steps Section */}
        <div className="p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-2">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            Workflow Steps
          </h3>
          <div className="flex overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-hide items-center">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon;
              const isSelected = currentStep === i;
              return (
                <React.Fragment key={step.id}>
                  <motion.button
                    onClick={() => setCurrentStep(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all flex-shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110"
                        : "bg-white text-blue-600 border-2 border-blue-300 hover:bg-blue-50 hover:shadow-md"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                  {i < workflowSteps.length - 1 && (
                    <div className="h-0.5 w-4 sm:w-5 bg-gradient-to-r from-blue-300 to-indigo-300 mx-1 flex-shrink-0 rounded-full" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={workflowSteps[currentStep].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`${workflowSteps[currentStep].color} w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg`}
              >
                {React.createElement(workflowSteps[currentStep].icon, {
                  className: "w-5 h-5 sm:w-6 sm:h-6",
                })}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                {workflowSteps[currentStep].title}
              </h4>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                {workflowSteps[currentStep].description}
              </p>
              <h5 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                Tools Used
              </h5>
              <ul className="space-y-3 sm:space-y-4">
                {workflowSteps[currentStep].tools.map((tool, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-0.5">
                      <Code className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-white" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-gray-800">
                        {tool.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {tool.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Complete Tech Stack Section */}
          <div className="p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              Complete Tech Stack
            </h3>
            {/* Changed to flex-wrap for mobile, removed horizontal scroll classes */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pb-4">
              {techStack.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  // Removed w-[45vw] and flex-shrink-0 for mobile wrapping
                  className="px-2 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-purple-100 hover:to-pink-100 text-gray-800 hover:text-purple-800 rounded-md font-medium text-xs sm:text-sm shadow-sm hover:shadow-md transition-all"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Features Section */}
          <div className="p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              Key Features
            </h3>
            {/* Changed to flex-wrap for mobile, removed horizontal scroll classes */}
            <div className="flex flex-wrap gap-2 sm:gap-4 pb-4">
              {[
                "End-to-end automated deployment pipeline",
                "Security scanning integrated in CI",
                "GitOps approach for declarative infrastructure",
                "Helm charts for templated deployments",
                "Comprehensive monitoring and alerting",
                "Infrastructure as Code with Terraform",
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  // Removed w-[85vw] and flex-shrink-0 for mobile wrapping
                  className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors list-none text-sm sm:text-base"
                >
                  <div className="p-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-0.5">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
