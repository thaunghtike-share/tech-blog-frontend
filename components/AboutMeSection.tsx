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

const skillCategories = {
  DevOps: ["GitOps", "CICD", "Kubernetes", "Cloud", "Linux", "ArgoCD"],
  Backend: ["Django", "NestJS", "Python", "Node.js", "REST API"],
  Automation: ["Terraform", "Pulumi", "Ansible", "Packer", "n8n"],
  MLOps: ["Kubeflow", "MLflow", "Azure ML", "Airflow"],
}

export function AboutMeSection() {
  const [showAllWork, setShowAllWork] = useState(false)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 p-10 gap-10 max-w-7xl mx-auto px-4 py-20">
      {/* Profile / About */}
      <aside className="lg:col-span-1 sticky top-8 self-start bg-white rounded-2xl shadow-md p-8 border border-gray-200">
        <div className="flex flex-col items-center text-center mb-8">
          {/* Gradient border around profile pic */}
          <div className="rounded-full p-1 bg-gradient-to-r from-blue-500 to-indigo-600">
            <img
              src="/me.png"
              alt="Thaung Htike Oo"
              className="w-32 h-32 rounded-full object-cover mb-4 shadow-lg border-4 border-white"
            />
          </div>

          <h3 className="text-3xl font-extrabold text-gray-900 tracking-wide mb-1">
            Thaung Htike Oo
          </h3>
          <p className="text-blue-600 font-semibold text-lg tracking-wide mb-6">
            Senior DevOps Engineer
          </p>

          {/* Contact info with circle icons - MOVED UP here */}
          <div className="mb-8 space-y-4 w-full text-left">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0">
                📧
              </div>
              <a
                href="mailto:thaunghtikeoo.tho1234@gmail.com"
                className="text-gray-700 hover:text-blue-600 transition-colors break-all"
              >
                thaunghtikeoo.tho1234@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0">
                📍
              </div>
              <span className="text-gray-700">Yangon, Myanmar</span>
            </div>
          </div>

          {/* About paragraphs */}
          <div className="text-gray-700 text-sm leading-relaxed mb-8 text-left space-y-5">
            <p>
              I'm a DevOps engineer with 5+ years of experience architecting scalable cloud infrastructure and enabling developer productivity through automation.
            </p>
            <p>
              From Kubernetes and CI/CD pipelines to Infrastructure as Code, I bridge the gap between development and operations — building secure, observable, and resilient systems on Azure and AWS.
            </p>
            <p>
              I'm currently diving deep into MLOps — making machine learning models production-ready through GitOps, containers, and GPU workloads.
            </p>
          </div>
        </div>

        {/* Download CV button with icon */}
        <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 px-5 rounded-lg font-semibold shadow-lg transition-transform transform active:scale-95">
          <span className="text-2xl select-none">📥</span> Download CV
        </button>
      </aside>

      {/* Work Experience + Technical Skills */}
      <main className="lg:col-span-2 space-y-16">
        {/* Work Experience */}
        <section>
          <h3 className="text-3xl font-bold mb-8 text-gray-900">💼 Work Experience</h3>
          <div className="relative border-l-2 border-gray-300 ml-2">
            {(showAllWork ? workExperiences : workExperiences.slice(0, 3)).map((exp, idx) => (
              <article
                key={idx}
                className="mb-10 ml-8 relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Timeline dot */}
                <span className="absolute -left-5 top-8 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></span>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{exp.title}</h4>
                  <div className="inline-block mt-1 mb-3 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full select-text">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap text-sm text-gray-500 space-x-4 mb-4">
                  <div>{exp.date}</div>
                  <div>{exp.location}</div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </article>
            ))}
          </div>

          <button
            onClick={() => setShowAllWork(!showAllWork)}
            className="mt-2 text-sm text-blue-600 font-medium hover:underline block mx-auto"
          >
            {showAllWork ? "Show less ▲" : "Show more ▼"}
          </button>
        </section>

        {/* Technical Skills */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">🛠️ Technical Skills</h3>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0">
              {Object.entries(skillCategories).map(([category, skills]) => {
                const icon =
                  category === "DevOps"
                    ? "🛠️"
                    : category === "Automation"
                    ? "⚙️"
                    : category === "MLOps"
                    ? "🤖"
                    : "🧩"
                const color =
                  category === "DevOps"
                    ? "text-emerald-600"
                    : category === "Automation"
                    ? "text-orange-500"
                    : category === "MLOps"
                    ? "text-purple-600"
                    : "text-pink-600"
                return (
                  <div key={category} className="flex-1">
                    <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2 ${color}`}>
                      <span>{icon}</span>
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span
                          key={skill}
                          className="text-xs bg-gray-200 text-gray-800 rounded-full px-3 py-1 shadow-sm border border-gray-300 hover:bg-gray-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </section>
  )
}