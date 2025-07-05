"use client"

import { useState } from "react"

type WorkExperience = {
  title: string
  company: string
  date: string
  location: string
  description: string
}

const workExperiences: WorkExperience[] = [
  {
    title: "Senior DevOps Engineer",
    company: "Maharbawga Company Ltd",
    date: "📅 Nov 2024 – Present",
    location: "📍 Yangon, Myanmar",
    description:
      "Led Azure infrastructure migration to Terraform with dynamic patterns managing VMs, NSGs, NICs, and AKS. Built reusable modules and CI/CD pipelines with GitHub Actions and ArgoCD. Managed AKS with Azure AD and CNI overlay, optimized NAT gateway, and supported ML workloads.",
  },
  {
    title: "Senior DevOps Engineer",
    company: "Dinger Company Ltd",
    date: "📅 Jun 2022 – Aug 2024",
    location: "📍 Yangon, Myanmar",
    description:
      "Designed and maintained AKS/EKS infrastructure with GitHub Actions, ArgoCD, and Istio. Released MTB Pay wallet and optimized cloud cost/performance. Setup CI/CD, service mesh, and monitoring with Prometheus, Grafana, and Loki.",
  },
  {
    title: "DevOps Engineer",
    company: "OpsZero",
    date: "📅 Dec 2021 – Jun 2023",
    location: "📍 Remote",
    description:
      "Automated AWS infrastructure with Terraform and managed EKS clusters. Built CI/CD with GitHub and GitLab. Developed Python/Django features and secured secrets using Vault and Packer.",
  },
  {
    title: "Junior DevOps Engineer",
    company: "Frontiir (Myanmar Net)",
    date: "📅 Dec 2020 – Dec 2021",
    location: "📍 Yangon, Myanmar",
    description:
      "Developed CI/CD pipelines using GitHub/GitLab. Managed hybrid Kubernetes clusters, integrated ArgoCD, and monitored with Grafana and Elasticsearch. Automated deployments with Ansible and Bash.",
  },
]

export function MinimalWorkExperience() {
  const [showAllWork, setShowAllWork] = useState(false)

  return (
    <section>
      <h3 className="text-2xl font-bold mb-8 text-gray-900">💼 Work Experience</h3>
      <div className="space-y-6">
        {(showAllWork ? workExperiences : workExperiences.slice(0, 3)).map((exp, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between mb-3">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-1">{exp.title}</h4>
                <p className="text-blue-600 font-semibold mb-1">{exp.company}</p>
              </div>
              <div className="text-sm text-gray-600 text-right font-medium">
                <div>{exp.date}</div>
                <div>{exp.location}</div>
              </div>
            </div>
            <p className="text-gray-600 font-light text-sm">{exp.description}</p>
          </div>
        ))}
        <button
          onClick={() => setShowAllWork(!showAllWork)}
          className="text-sm text-blue-600 hover:underline mt-2 font-medium"
        >
          {showAllWork ? "Show less ▲" : "Show more ▼"}
        </button>
      </div>
    </section>
  )
}