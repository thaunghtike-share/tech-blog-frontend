"use client"

import React from "react"

const roadmapItems = [
  {
    emoji: "🐳",
    title: "Docker Fundamentals",
    description: "Learn containerization basics, image creation, and management.",
    links: [{ text: "Official Docker Get Started", url: "https://docs.docker.com/get-started/" }],
  },
  {
    emoji: "☸️",
    title: "Kubernetes Basics",
    description: "Understand pods, services, deployments, and cluster management.",
    links: [{ text: "Kubernetes Basics Tutorial", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" }],
  },
  {
    emoji: "⚙️",
    title: "CI/CD Basics",
    description: "Learn pipelines and automation with GitHub Actions and ArgoCD.",
    links: [
      { text: "GitHub Actions Docs", url: "https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions" },
      { text: "ArgoCD Docs", url: "https://argo-cd.readthedocs.io/en/stable/getting_started/" },
    ],
  },
  {
    emoji: "📦",
    title: "Terraform Basics",
    description: "Infrastructure as Code for cloud provisioning and automation.",
    links: [{ text: "Terraform Learn", url: "https://learn.hashicorp.com/terraform" }],
  },
  {
    emoji: "☁️",
    title: "Cloud Fundamentals",
    description: "Basics of Azure, AWS, and Google Cloud for deploying and managing infrastructure.",
    links: [
      { text: "Azure Cloud Basics", url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-cloud-computing/" },
      { text: "AWS Getting Started", url: "https://aws.amazon.com/getting-started/" },
      { text: "GCP Overview", url: "https://cloud.google.com/docs/overview" },
    ],
  },
  {
    emoji: "🚀",
    title: "ArgoCD GitOps",
    description: "Master GitOps continuous delivery with ArgoCD for Kubernetes deployments.",
    links: [{ text: "Official ArgoCD Docs", url: "https://argo-cd.readthedocs.io/en/stable/getting_started/" }],
  },
  {
    emoji: "📊",
    title: "Monitoring & Observability",
    description: "Learn Prometheus, Grafana, Loki, and other tools to monitor and analyze your infrastructure.",
    links: [
      { text: "Prometheus Overview", url: "https://prometheus.io/docs/introduction/overview/" },
      { text: "Grafana Docs", url: "https://grafana.com/docs/grafana/latest/getting-started/" },
    ],
  },
  {
    emoji: "📄",
    title: "YAML Basics",
    description: "Learn YAML syntax for Kubernetes manifests, CI/CD pipelines, and config files.",
    links: [
      { text: "YAML 1.2 Spec", url: "https://yaml.org/spec/1.2/spec.html" },
      { text: "K8s YAML Docs", url: "https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/" },
    ],
  },
  {
    emoji: "🔢",
    title: "JSON Basics",
    description: "Understand JSON structure for API communication, configs, and cloud templates.",
    links: [
      { text: "JSON Official", url: "https://www.json.org/json-en.html" },
      { text: "MDN JSON Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON" },
    ],
  },
  {
    emoji: "🐚",
    title: "Bash Scripting Basics",
    description: "Automate Linux tasks and scripts using Bash shell scripting.",
    links: [
      { text: "GNU Bash Manual", url: "https://www.gnu.org/software/bash/manual/bash.html" },
      { text: "Beginner Bash Tutorial", url: "https://ryanstutorials.net/bash-scripting-tutorial/" },
    ],
  },
  {
    emoji: "📡",
    title: "API Testing with Postman",
    description: "Learn how to test and automate API requests using Postman tool.",
    links: [{ text: "Postman Learning Center", url: "https://learning.postman.com/docs/getting-started/introduction/" }],
  },
]

export function MinimalDevopsRoadmap() {
  return (
    <section className="mt-20 bg-white rounded-xl p-10 border border-gray-100 shadow-sm">
      <h3 className="text-3xl font-bold mb-4 text-gray-900 text-left select-none">
        🗺️ DevOps Learning Roadmap
      </h3>
      <p className="text-gray-700 mb-10 text-left leading-relaxed max-w-4xl">
        Follow this self-paced roadmap to learn essential DevOps skills through curated official docs and trusted resources.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {roadmapItems.map(({ emoji, title, description, links }, idx) => (
          <article
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-start mb-4 space-x-3">
              <div className="text-3xl">{emoji}</div>
              <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            </div>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
              {links.map(({ text, url }, lidx) => (
                <a
                  key={lidx}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                >
                  {text} →
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}