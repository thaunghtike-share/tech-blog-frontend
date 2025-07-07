"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowRight,
  GitCommit,
  Code,
  Shield,
  Package,
  GitPullRequest,
  Server,
  Activity,
  ArrowRightCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const workflowSteps = [
  {
    id: 1,
    title: "Terraform Provisioning",
    description: "Infrastructure provisioned using Terraform scripts",
    tools: ["Terraform", "Terragrunt", "Terraformer"],
    icon: GitPullRequest,
    color: "bg-yellow-100 text-yellow-700",
    iconColor: "bg-yellow-500 text-white",
  },
  {
    id: 2,
    title: "Code Commit",
    description: "Code is pushed to GitHub triggering the CI pipeline",
    tools: ["GitHub", "Git"],
    icon: GitCommit,
    color: "bg-blue-100 text-blue-700",
    iconColor: "bg-blue-500 text-white",
  },
  {
    id: 3,
    title: "Build & Scan",
    description: "Docker image built and scanned using Trivy",
    tools: ["Docker", "Trivy"],
    icon: Shield,
    color: "bg-green-100 text-green-700",
    iconColor: "bg-green-500 text-white",
  },
  {
    id: 4,
    title: "Push to Registry",
    description: "Secure images pushed to Azure Container Registry",
    tools: ["Azure ACR"],
    icon: Package,
    color: "bg-purple-100 text-purple-700",
    iconColor: "bg-purple-500 text-white",
  },
  {
    id: 5,
    title: "Kubernetes Deployment",
    description: "Argo CD deploys apps using Helm charts",
    tools: ["Argo CD", "Helm"],
    icon: Server,
    color: "bg-red-100 text-red-700",
    iconColor: "bg-red-500 text-white",
  },
  {
    id: 6,
    title: "GitOps Update",
    description: "Image Updater modifies GitOps repo with new tags",
    tools: ["GitHub", "Argo CD Image Updater"],
    icon: GitPullRequest,
    color: "bg-orange-100 text-orange-700",
    iconColor: "bg-orange-500 text-white",
  },
  {
    id: 7,
    title: "Monitoring",
    description: "Prometheus and Grafana provide metrics and alerts",
    tools: ["Prometheus", "Grafana"],
    icon: Activity,
    color: "bg-indigo-100 text-indigo-700",
    iconColor: "bg-indigo-500 text-white",
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
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-4">
          <Code className="w-4 h-4 mr-2" />
          Case Study
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Enterprise GitOps Workflow
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          CI/CD pipeline built for Mahar Bawga Money using GitOps and Argo CD
        </p>
      </div>

      {/* Diagram */}
      <div className="relative w-full aspect-video mb-20">
        <Image
          src="/mbf.png"
          alt="DevOps workflow diagram"
          fill
          className="object-contain"
          quality={100}
          priority
        />
      </div>

      {/* Workflow + Tech Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Workflow Stepper */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <ArrowRight className="text-blue-600" />
            Workflow Steps
          </h3>

          {/* Horizontal Stepper with Connectors */}
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide items-center space-x-2">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => setCurrentStep(i)}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap border transition-all
                    ${
                      currentStep === i
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${step.iconColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </motion.button>

                  {/* Connector → except after last step */}
                  {i < workflowSteps.length - 1 && (
                    <ArrowRightCircle className="text-gray-300 w-5 h-5 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={workflowSteps[currentStep].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`${workflowSteps[currentStep].color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
              >
                {React.createElement(workflowSteps[currentStep].icon, { className: "w-6 h-6" })}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {workflowSteps[currentStep].title}
              </h4>
              <p className="text-gray-700 mb-6">
                {workflowSteps[currentStep].description}
              </p>

              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Tools Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {workflowSteps[currentStep].tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tech Stack + Features */}
        <div>
          {/* Tech Stack */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Code className="text-blue-600" />
              Complete Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tool) => (
                <motion.div
                  key={tool}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium text-sm"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" />
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
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="text-green-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}