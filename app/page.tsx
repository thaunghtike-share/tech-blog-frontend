"use client"

import { useState } from "react"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalHero } from "@/components/minimal-hero"
import { MinimalBlogList } from "@/components/minimal-blog-list"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import { MinimalFooter } from "@/components/minimal-footer"

export default function HomePage() {
  const skillCategories = {
    DevOps: ["GitOps", "CICD", "Kubernetes", "Cloud", "Linux", "ArgoCD"],
    Backend: ["Django", "NestJS", "Python", "Node.js", "REST API"],
    Automation: ["Terraform", "Pulumi", "Ansible", "Packer", "n8n"],
    MLOps: ["Kubeflow", "MLflow", "Azure ML", "Airflow"],
  }

  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in DevOps and Automation technologies including Kubernetes, Terraform, Ansible, Azure, AWS, and CI/CD pipelines.",
    },
    {
      question: "Do you offer consulting services?",
      answer: "Yes, I provide DevOps consulting to help organizations improve their infrastructure automation, cloud adoption, and reliability.",
    },
    {
      question: "How can I contact you?",
      answer: "You can reach me via email at thaunghtikeoo.tho1234@gmail.com or connect with me on LinkedIn.",
    },
    {
      question: "Do you work long-term support?",
      answer: "Yes, I provide long-term support and maintenance for infrastructure and automation projects.",
    },
    {
      question: "Can you work in AI/MLOps?",
      answer: "Yes, I am actively exploring and working in AI and MLOps to streamline ML workflows and deployments.",
    },
    {
      question: "Do you make handover if clients hire in-house DevOps team?",
      answer: "Yes, I ensure proper handover and documentation if clients hire in-house DevOps engineers to take over ongoing operations.",
    },
  ]

  const workExperiences = [
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

  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)
  const [showAllFaqs, setShowAllFaqs] = useState(false)
  const [showAllWork, setShowAllWork] = useState(false)

  function toggleFaq(idx: number) {
    setOpenFAQIndex(openFAQIndex === idx ? null : idx)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <MinimalHeader />
      <MinimalHero />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100">
            <MinimalBlogList />
          </div>
          <div className="lg:col-span-1">
            <MinimalSidebar />
          </div>
        </div>

        <div className="bg-gradient-to-r from-white/80 to-blue-50/80 rounded-2xl p-6 mt-10 backdrop-blur-sm border border-blue-100">
          <section className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 sticky top-8 rounded-2xl p-8 shadow-sm">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <div className="h-16 w-16 text-white text-4xl">👨‍💻</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thaung Htike Oo</h3>
                    <p className="text-blue-600 font-semibold mb-2">Senior DevOps Engineer</p>
                    <div className="flex items-center justify-center text-gray-600 mb-2">
                      <span className="text-blue-500 mr-2">📧</span>
                      <a href="mailto:thaunghtikeoo.tho1234@gmail.com" className="hover:underline font-medium">
                        thaunghtikeoo.tho1234@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center justify-center text-gray-600">
                      <span className="text-blue-500 mr-2">📍</span>
                      <span className="font-medium">Yangon, Myanmar</span>
                    </div>
                  </div>
                  <p className="text-gray-600 font-light text-sm mb-8 leading-relaxed">
                    <strong className="text-gray-800">DevOps Engineer</strong> with 5+ years of experience building and automating cloud-native and on-prem infrastructure. Skilled in CI/CD pipelines, Kubernetes, Docker, Terraform, and Ansible. Experienced with Azure and AWS, focused on scalability. Exploring MLOps to streamline ML workflows and deployment.
                  </p>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold">
                    📥 Download CV
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">💼 Work Experience</h3>
                <div className="space-y-6">
                  {(showAllWork ? workExperiences : workExperiences.slice(0, 2)).map((exp, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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

                <div className="mt-16">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">🛠️ Technical Skills</h3>
                  <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0">
                    {Object.entries(skillCategories).map(([category, skills]) => {
                      const icon = category === "DevOps" ? "🛠️" : category === "Automation" ? "⚙️" : category === "MLOps" ? "🤖" : "🧩"
                      const color = category === "DevOps" ? "text-emerald-600" : category === "Automation" ? "text-orange-500" : category === "MLOps" ? "text-purple-600" : "text-pink-600"
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
              </div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-16">
          <div className="lg:col-span-3 bg-white/90 backdrop-blur-md border border-blue-100 rounded-2xl shadow-md p-6">
            <section aria-label="FAQs" className="text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">❓ Frequently Asked Questions</h2>
              <div className="space-y-3">
                {(showAllFaqs ? faqs : faqs.slice(0, 3)).map((faq, idx) => {
                  const isOpen = openFAQIndex === idx
                  return (
                    <div key={idx} className="border border-blue-100 rounded-md overflow-hidden transition-all duration-300 bg-white">
                      <button
                        className="w-full flex justify-between items-center px-4 py-3 text-left text-sm text-blue-800 hover:bg-blue-50"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                      >
                        {faq.question}
                        <svg className={`w-4 h-4 text-blue-600 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className={`px-4 text-gray-700 text-xs transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 py-2" : "max-h-0 py-0"} overflow-hidden`}>
                        {faq.answer}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  {showAllFaqs ? "Show less ▲" : "Show more ▼"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <MinimalFooter />

      {/* Messenger Chat Support Button with Label */}
      <a
        href="https://m.me/learndevopsnowbytho.my"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on Messenger"
        className="fixed bottom-6 right-6 flex flex-col items-center group z-50"
      >
        <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 12a10 10 0 1118.74 5.995L22 22l-3.997-1.285A9.959 9.959 0 012 12z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l4 3 5-4" />
          </svg>
        </div>
        <span className="mt-1 text-xs text-blue-700 font-medium group-hover:underline">
          Chat with me
        </span>
      </a>
    </div>
  )
}