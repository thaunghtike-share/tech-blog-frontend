"use client";

import React, { useState } from "react";
import Image from "next/image";

const workflowSteps = [
  {
    id: 1,
    title: "Code Commit",
    description: "Code is pushed to GitHub. This triggers the CI pipeline.",
    tools: "GitHub, Git",
    environment: "Development",
  },
  {
    id: 2,
    title: "Build & Scan",
    description: "Docker image is built, scanned using Trivy, and tested.",
    tools: "Docker, Trivy",
    environment: "CI Pipeline",
  },
  {
    id: 3,
    title: "Push to Registry",
    description: "Secure images are pushed to Azure Container Registry.",
    tools: "Azure ACR",
    environment: "Artifact Repo",
  },
  {
    id: 4,
    title: "GitOps Update",
    description:
      "Image Updater modifies GitOps repo with new tags. Argo CD detects and syncs.",
    tools: "GitHub, Argo CD Image Updater",
    environment: "GitOps",
  },
  {
    id: 5,
    title: "Kubernetes Deployment",
    description: "Argo CD deploys apps to Kubernetes using Helm charts.",
    tools: "Argo CD, Helm",
    environment: "Production",
  },
  {
    id: 6,
    title: "Monitoring & Feedback",
    description:
      "Prometheus and Grafana provide metrics, alerts, and dashboards.",
    tools: "Prometheus, Grafana",
    environment: "Monitoring",
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
  const totalSteps = workflowSteps.length;

  return (
    <section className="bg-white py-20 px-6 lg:px-20 max-w-7xl mx-auto">
      {/* Title and Intro */}
      <div className="text-center mb-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Enterprise DevOps Workflow with GitOps
        </h2>
        <p className="text-lg text-gray-600">
          This CI/CD pipeline was built for a financial client — Mahar Bawga Money — using GitOps and Argo CD to automate Kubernetes application deployment and monitoring.
        </p>
      </div>

      {/* Diagram Image */}
      <div className="relative w-full h-[450px] border-4 border-white rounded-3xl overflow-hidden shadow-2xl mb-20">
        <Image
          src="/mbf.png"
          alt="DevOps workflow diagram"
          fill
          className="object-contain p-4"
          quality={100}
          priority
        />
      </div>

      {/* Steps + Explanation side by side */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        {/* Left: Horizontal Stepper */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">🚀 Workflow Stepper</h3>

          <div className="relative flex justify-between mb-8 select-none">
            {/* Background progress line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 rounded" style={{ zIndex: 0 }} />
            {/* Filled progress line */}
            <div
              className="absolute top-5 left-0 h-1 bg-indigo-600 rounded transition-all duration-300"
              style={{
                width: `${(currentStep / (totalSteps - 1)) * 100}%`,
                zIndex: 1,
              }}
            />

            {workflowSteps.map((step, i) => {
              const isActive = i === currentStep;
              const isCompleted = i < currentStep;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className="relative z-10 flex flex-col items-center focus:outline-none"
                  aria-label={`Go to step ${step.id}: ${step.title}`}
                  type="button"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold cursor-pointer
                    ${isActive ? "bg-indigo-600 shadow-lg scale-110" : isCompleted ? "bg-indigo-400" : "bg-gray-300 hover:bg-indigo-400"}
                    transition-transform duration-300`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`mt-2 max-w-[80px] text-center text-sm font-medium truncate
                    ${isActive ? "text-indigo-700" : "text-gray-600"}`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Step Details */}
          <div className="text-center max-w-xl mx-auto">
            <h4 className="text-xl font-semibold mb-2">{workflowSteps[currentStep].title}</h4>
            <p className="text-gray-700 mb-3">{workflowSteps[currentStep].description}</p>
            <p className="text-sm text-gray-500 tracking-wide">
              <strong>Tools:</strong> {workflowSteps[currentStep].tools} |{" "}
              <strong>Env:</strong> {workflowSteps[currentStep].environment}
            </p>
          </div>
        </div>

        {/* Right: Workflow Explanation */}
        <div className="max-w-lg mx-auto text-left">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📘 Workflow Explained</h3>
          <ul className="list-disc text-gray-700 text-base pl-5 space-y-5">
            <li>
              <strong>Git push:</strong> Developers commit changes to GitHub repo.
            </li>
            <li>
              <strong>CI pipeline:</strong> Code is containerized and scanned using Trivy.
            </li>
            <li>
              <strong>Azure ACR:</strong> Vulnerability-free images are stored securely.
            </li>
            <li>
              <strong>Image Updater:</strong> Automatically updates the GitOps repo.
            </li>
            <li>
              <strong>Argo CD:</strong> Syncs changes from Git to Kubernetes clusters.
            </li>
            <li>
              <strong>Helm charts:</strong> Used for parameterized deployment templates.
            </li>
            <li>
              <strong>Prometheus + Grafana:</strong> Visualize metrics and setup alerts.
            </li>
          </ul>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Tech Stack I Used</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tool) => (
            <span
              key={tool}
              className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}