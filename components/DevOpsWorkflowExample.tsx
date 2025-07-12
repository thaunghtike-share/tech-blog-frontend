"use client"
import React, { useState } from "react"
import Image from "next/image"
import { CheckCircle2, GitCommit, Code, Shield, Package, GitPullRequest, Server, Activity, Settings, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

const workflowSteps = [
  {
    id: 1,
    title: "Terraform Provisioning",
    description: "Infrastructure provisioned using Terraform scripts",
    tools: ["Terraform", "Terragrunt", "Terraformer"],
    icon: GitPullRequest,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 2,
    title: "Code Commit",
    description: "Code is pushed to GitHub triggering the CI pipeline",
    tools: ["GitHub", "Git", "VS Code"],
    icon: GitCommit,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    title: "Build & Scan",
    description: "Docker image built and scanned using Trivy",
    tools: ["Docker", "Trivy", "Docker buildx"],
    icon: Shield,
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    title: "Push to Registry",
    description: "Secure images pushed to Azure Container Registry",
    tools: ["Azure ACR"],
    icon: Package,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    title: "Deploy Apps using GitOps with ArgoCD",
    description: "Argo CD deploys apps using Helm charts",
    tools: ["Argo CD", "Helm"],
    icon: Server,
    color: "bg-red-100 text-red-700",
  },
  {
    id: 6,
    title: "GitOps Update",
    description: "Image Updater modifies GitOps repo with new tags",
    tools: ["GitHub", "Argo CD Image Updater"],
    icon: GitPullRequest,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 7,
    title: "Logging & Monitoring",
    description: "Prometheus and Grafana provide metrics and alerts",
    tools: ["Prometheus", "Grafana", "Loki", "Azure Monitor", "Elastic Cloud"],
    icon: Activity,
    color: "bg-indigo-100 text-indigo-700",
  },
]

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
]

export function DevOpsWorkflowExample() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Case Study
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4"
        >
          Enterprise GitOps Workflow
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          DevOps architecture design built for client's company using GitOps and ArgoCD
        </motion.p>
      </div>

      {/* Enhanced Diagram */}
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

      {/* Enhanced Workflow + Tech Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Enhanced Workflow Stepper */}
        <div className="p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            Workflow Steps
          </h3>

          {/* Enhanced Connected Horizontal Stepper */}
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide items-center">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon
              const isSelected = currentStep === i
              return (
                <React.Fragment key={step.id}>
                  <motion.button
                    onClick={() => setCurrentStep(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all flex-shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110"
                        : "bg-white text-blue-600 border-2 border-blue-300 hover:bg-blue-50 hover:shadow-md"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                  {/* Enhanced Connector Line */}
                  {i < workflowSteps.length - 1 && (
                    <div className="h-0.5 w-5 bg-gradient-to-r from-blue-300 to-indigo-300 mx-1 flex-shrink-0 rounded-full" />
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {/* Enhanced Step Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={workflowSteps[currentStep].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`${workflowSteps[currentStep].color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg`}
              >
                {React.createElement(workflowSteps[currentStep].icon, { className: "w-6 h-6" })}
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3">{workflowSteps[currentStep].title}</h4>
              <p className="text-gray-700 mb-6">{workflowSteps[currentStep].description}</p>

              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Tools Used</h5>
                <div className="flex flex-wrap gap-2">
                  {workflowSteps[currentStep].tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Tech Stack + Features */}
        <div className="space-y-8">
          {/* Enhanced Tech Stack */}
          <div className="p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              Complete Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-purple-100 hover:to-pink-100 text-gray-800 hover:text-purple-800 rounded-lg font-medium text-sm shadow-sm hover:shadow-md transition-all"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Key Features */}
          <div className="p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              Key Features
            </h3>
            <ul className="space-y-4">
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
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-0.5">
                    <CheckCircle2 className="text-white w-4 h-4 flex-shrink-0" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}