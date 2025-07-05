"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const workflowSteps = [
  { id: 1, title: "Code Commit", description: "Code is pushed to GitHub. This triggers the CI pipeline.", tools: "GitHub, Git", environment: "Development" },
  { id: 2, title: "Build & Scan", description: "Docker image is built, scanned using Trivy, and tested.", tools: "Docker, Trivy", environment: "CI Pipeline" },
  { id: 3, title: "Push to Registry", description: "Secure images are pushed to Azure Container Registry.", tools: "Azure ACR", environment: "Artifact Repo" },
  { id: 4, title: "GitOps Update", description: "Image Updater modifies GitOps repo with new tags. Argo CD detects and syncs.", tools: "GitHub, Argo CD Image Updater", environment: "GitOps" },
  { id: 5, title: "Kubernetes Deployment", description: "Argo CD deploys apps to Kubernetes using Helm charts.", tools: "Argo CD, Helm", environment: "Production" },
  { id: 6, title: "Monitoring & Feedback", description: "Prometheus and Grafana provide metrics, alerts, and dashboards.", tools: "Prometheus, Grafana", environment: "Monitoring" },
];

const techStack = [
  "GitHub", "Docker", "Trivy", "Azure ACR", "Argo CD", "Helm", "Kubernetes", "Prometheus", "Grafana", "Image Updater", "Terraform",
];

const workflowExplainedItems = [
  "Developers commit changes to GitHub repo.",
  "Code is containerized and scanned using Trivy.",
  "Vulnerability-free images are stored securely in Azure ACR.",
  "Image Updater automatically updates the GitOps repo.",
  "Argo CD syncs changes from Git to Kubernetes clusters.",
  "Helm charts are used for parameterized deployment templates.",
  "Prometheus and Grafana visualize metrics and setup alerts.",
];

export function DevOpsWorkflowExample() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="bg-white py-20 px-6 lg:px-20 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Enterprise DevOps Workflow with GitOps
        </h2>
        <p className="text-lg text-gray-600">
          This CI/CD pipeline was built for a financial client — Mahar Bawga Money — using GitOps and Argo CD to automate Kubernetes application deployment and monitoring.
        </p>
      </div>

      {/* Diagram */}
      <div className="relative w-full h-[700px] border-4 border-white rounded-3xl overflow-hidden shadow-2xl mb-20">
        <Image
          src="/mbf.png"
          alt="DevOps workflow diagram"
          fill
          className="object-contain p-4"
          quality={100}
          priority
        />
      </div>

      {/* Stepper + Explanation */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Stepper */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">🚀 Workflow Stepper</h3>

          {/* Step Circles */}
          <div className="relative flex justify-between mb-8 select-none">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 rounded" />
            <div
              className="absolute top-5 left-0 h-1 bg-indigo-600 rounded transition-all duration-300"
              style={{ width: `${(currentStep / (workflowSteps.length - 1)) * 100}%` }}
            />
            {workflowSteps.map((step, i) => {
              const isActive = i === currentStep;
              const isCompleted = i < currentStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className="relative z-10 flex flex-col items-center focus:outline-none"
                  type="button"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                    ${isActive ? "bg-indigo-600 shadow-lg animate-pulse" : isCompleted ? "bg-indigo-400" : "bg-gray-300 hover:bg-indigo-400"}
                    transition duration-300 transform`}
                  >
                    {step.id}
                  </div>
                  <span className={`mt-2 max-w-[80px] text-center text-sm font-medium truncate ${isActive ? "text-indigo-700" : "text-gray-600"}`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated Step Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={workflowSteps[currentStep].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-xl mx-auto mb-10"
            >
              <h4 className="text-xl font-semibold mb-2">
                {workflowSteps[currentStep].title}
              </h4>
              <p className="text-gray-700 mb-3">{workflowSteps[currentStep].description}</p>
              <p className="text-sm text-gray-500 tracking-wide">
                <strong>Tools:</strong> {workflowSteps[currentStep].tools}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Tech Stack */}
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-9">🛠️ Tech Stack I Used</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tool) => (
                <motion.div
                  key={tool}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 bg-white text-indigo-600 rounded-full px-4 py-1 font-semibold shadow-md text-sm cursor-default"
                >
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Explanation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="max-w-lg mx-auto text-left"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📘 Workflow Explained</h3>
          <div className="space-y-4">
            {workflowExplainedItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition"
              >
                <CheckCircle2 className="text-indigo-600 w-6 h-6 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}