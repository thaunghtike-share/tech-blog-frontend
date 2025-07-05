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

  const roadmapItems = [
    {
      emoji: "🐳",
      title: "Docker Fundamentals",
      description: "Learn containerization basics, image creation, and management.",
      links: [
        { text: "Official Docker Get Started", url: "https://docs.docker.com/get-started/" },
      ],
    },
    {
      emoji: "☸️",
      title: "Kubernetes Basics",
      description: "Understand pods, services, deployments, and cluster management.",
      links: [
        { text: "Kubernetes Basics Tutorial", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
      ],
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
      links: [
        { text: "Terraform Learn", url: "https://learn.hashicorp.com/terraform" },
      ],
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
      links: [
        { text: "Official ArgoCD Docs", url: "https://argo-cd.readthedocs.io/en/stable/getting_started/" },
      ],
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
      links: [
        { text: "Postman Learning Center", url: "https://learning.postman.com/docs/getting-started/introduction/" },
      ],
    },
  ]

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
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
          </div>
        </div>

        {/* DevOps Roadmap - Animated Grid */}
        <section className="mt-16 bg-gradient-to-tr from-white/80 to-blue-50/80 rounded-2xl p-8 backdrop-blur-md border border-blue-100 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">🗺️ DevOps Learning Roadmap</h3>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Follow this roadmap inspired by KodeKloud to learn DevOps core topics with official docs and recommended resources.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapItems.map(({ emoji, title, description, links }, idx) => (
              <article
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-default"
              >
                <div className="flex items-center mb-4 space-x-3 select-none">
                  <div className="text-3xl">{emoji}</div>
                  <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">{description}</p>
                <div className="flex flex-wrap gap-3">
                  {links.map(({ text, url }, lidx) => (
                    <a
                      key={lidx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      {text} →
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAQs */}
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
    </div>
  )
}