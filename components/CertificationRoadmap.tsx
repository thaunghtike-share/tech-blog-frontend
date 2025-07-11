"use client"
import type React from "react"
import { useState } from "react"
import { Award, Clock, BookOpen, Check, GraduationCap, Dock, GitMerge, Server, Lock, Gauge, Rocket, Shield, ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import { motion } from "framer-motion"

interface CertificationItem {
  title: string
  icon: React.ReactNode
  organization: string
  examDetails: string
  preparationTime: string
  topics: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  recommended?: boolean
  examLink: string
}

const certifications: CertificationItem[] = [
  // Beginner
  {
    title: "AWS Cloud Practitioner",
    icon: <Award className="w-6 h-6" />,
    organization: "Amazon Web Services",
    examDetails: "65 questions | 90 minutes | $100",
    preparationTime: "3-4 weeks",
    difficulty: "Beginner",
    recommended: true,
    topics: ["Cloud concepts", "Security and compliance", "Billing and pricing", "AWS core services"],
    examLink: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    icon: <Award className="w-6 h-6" />,
    organization: "Microsoft",
    examDetails: "40-60 questions | 60 minutes | $99",
    preparationTime: "3-4 weeks",
    difficulty: "Beginner",
    topics: ["Cloud concepts", "Azure architecture", "Governance and compliance", "Cost management"],
    examLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    title: "Linux Foundation Certified System Administrator (LFCS)",
    icon: <Server className="w-6 h-6" />,
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $300",
    preparationTime: "4-6 weeks",
    difficulty: "Beginner",
    topics: ["System configuration", "User and group management", "Storage management", "Networking"],
    examLink: "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/",
  },
  {
    title: "Docker Certified Associate",
    icon: <Dock className="w-6 h-6" />,
    organization: "Docker",
    examDetails: "55 questions | 90 minutes | $195",
    preparationTime: "4-6 weeks",
    difficulty: "Beginner",
    topics: [
      "Image creation and management",
      "Orchestration basics",
      "Networking and storage",
      "Security best practices",
    ],
    examLink: "https://success.docker.com/certification",
  },
  // Intermediate
  {
    title: "Certified Kubernetes Application Developer (CKAD)",
    icon: <BookOpen className="w-6 h-6" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "6-10 weeks",
    difficulty: "Intermediate",
    recommended: true,
    topics: ["Application deployment", "Configuration and secrets", "Observability", "Pod design"],
    examLink: "https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    icon: <BookOpen className="w-6 h-6" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: "Intermediate",
    recommended: true,
    topics: ["Cluster architecture", "Installation and configuration", "Workloads and scheduling", "Networking"],
    examLink: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
  },
  {
    title: "AWS Certified Solutions Architect - Associate",
    icon: <Server className="w-6 h-6" />,
    organization: "Amazon Web Services",
    examDetails: "65 questions | 130 minutes | $150",
    preparationTime: "6-8 weeks",
    difficulty: "Intermediate",
    recommended: true,
    topics: [
      "Design resilient architectures",
      "Secure applications",
      "Performance and cost optimization",
      "Cloud monitoring",
    ],
    examLink: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    title: "GitOps with ArgoCD",
    icon: <GitMerge className="w-6 h-6" />,
    organization: "Codefresh",
    examDetails: "60 questions | 90 minutes | $200",
    preparationTime: "4-6 weeks",
    difficulty: "Intermediate",
    topics: ["GitOps principles", "Application deployment", "Sync strategies", "Troubleshooting"],
    examLink: "https://codefresh.io/certifications/argocd/",
  },
  {
    title: "Prometheus Associate PCA",
    icon: <Gauge className="w-6 h-6" />,
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $250",
    preparationTime: "6-8 weeks",
    difficulty: "Intermediate",
    topics: ["Metrics collection", "Alerting rules", "PromQL", "Service discovery"],
    examLink: "https://training.linuxfoundation.org/certification/prometheus-certified-associate/",
  },
  // Advanced
  {
    title: "AWS SA - Professional",
    icon: <Server className="w-6 h-6" />,
    organization: "Amazon Web Services",
    examDetails: "75 questions | 180 minutes | $300",
    preparationTime: "12-16 weeks",
    difficulty: "Advanced",
    recommended: true,
    topics: ["Enterprise architecture design", "Migration planning", "Multi-account strategy", "Cost management"],
    examLink: "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
  },
  {
    title: "AWS Certified DevOps Engineer",
    icon: <Server className="w-6 h-6" />,
    organization: "Amazon Web Services",
    examDetails: "75 questions | 180 minutes | $300",
    preparationTime: "12-16 weeks",
    difficulty: "Advanced",
    recommended: true,
    topics: [
      "CI/CD pipeline implementation",
      "Monitoring and logging",
      "Infrastructure as Code",
      "Incident and event response",
    ],
    examLink: "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
  },
  {
    title: "Terraform Associate",
    icon: <GitMerge className="w-6 h-6" />,
    organization: "HashiCorp",
    examDetails: "57 questions | 60 minutes | $70.50",
    preparationTime: "4-6 weeks",
    difficulty: "Advanced",
    recommended: true,
    topics: ["Terraform CLI", "State management", "Modules and workspaces", "Cloud infrastructure provisioning"],
    examLink: "https://developer.hashicorp.com/certifications/terraform-associate",
  },
  {
    title: "Kubernetes Security Specialist (CKS)",
    icon: <Lock className="w-6 h-6" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: "Advanced",
    topics: ["Cluster hardening", "System hardening", "Minimize microservice vulnerabilities", "Supply chain security"],
    examLink: "https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist-cks/",
  },
  {
    title: "Certified Istio Service Mesh Expert",
    icon: <Gauge className="w-6 h-6" />,
    organization: "Istio Community",
    examDetails: "Performance-based | 90 minutes | $200",
    preparationTime: "5-7 weeks",
    difficulty: "Advanced",
    topics: ["Traffic management", "Security and policies", "Observability", "Istio architecture"],
    examLink: "https://academy.tetrate.io/courses/istio-certified-expert",
  },
]

const difficultyConfig = {
  Beginner: {
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    textColor: "text-green-800",
    icon: <Rocket className="w-4 h-4" />,
  },
  Intermediate: {
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    textColor: "text-blue-800",
    icon: <Gauge className="w-4 h-4" />,
  },
  Advanced: {
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    textColor: "text-purple-800",
    icon: <Shield className="w-4 h-4" />,
  },
}

export function CertificationRoadmap() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null)
  const [filter, setFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("Beginner")

  const filteredCerts = certifications.filter((cert) => cert.difficulty === filter)

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-700 border border-orange-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Certificate Roadmap
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-yellow-800 to-orange-800 bg-clip-text text-transparent mb-4"
          >
            DevOps Certification Roadmap
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Validate your skills with industry-recognized certifications
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {["Beginner", "Intermediate", "Advanced"].map((level, index) => {
            const config = difficultyConfig[level as keyof typeof difficultyConfig]
            const isActive = filter === level
            const certCount = certifications.filter((cert) => cert.difficulty === level).length

            return (
              <motion.button
                key={level}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setFilter(level as any)}
                className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isActive
                    ? `bg-gradient-to-r ${config.gradient} text-white scale-105`
                    : `bg-gradient-to-r ${config.bgGradient} ${config.textColor} hover:scale-105 border border-gray-200`
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl ${
                    isActive ? "bg-white/20" : `bg-gradient-to-r ${config.gradient} text-white`
                  }`}
                >
                  {config.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium">{level}</div>
                  <div className="text-xs opacity-80">{certCount} certs</div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 rounded-2xl border-2 border-white/30"
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {filteredCerts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((cert, index) => {
              const config = difficultyConfig[cert.difficulty]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl"
                >
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-r ${config.gradient} text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                          <div className="text-white">{cert.icon}</div>
                        </div>
                        {cert.recommended && (
                          <div className="flex items-center gap-1 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                            <TrendingUp className="w-3 h-3" />
                            Recommended
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2 leading-tight">{cert.title}</h3>
                      <p className="text-white/90 text-sm font-medium">{cert.organization}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{cert.preparationTime}</span>
                      </div>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bgGradient} ${config.textColor} border border-gray-200`}
                      >
                        {config.icon}
                        <span className="ml-1">{cert.difficulty}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-3 font-medium">{cert.examDetails}</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Topics Covered
                      </h4>
                      <ul className="space-y-3">
                        {cert.topics.slice(0, 6).map((topic, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start group/topic"
                          >
                            <div
                              className={`flex-shrink-0 mt-0.5 mr-3 w-4 h-4 bg-gradient-to-r ${config.gradient} rounded-full flex items-center justify-center shadow-md`}
                            >
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className="text-sm text-gray-700 font-medium leading-tight group-hover/topic:text-blue-600 transition-colors">
                              {topic}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={cert.examLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-between px-6 py-4 bg-gradient-to-r ${config.gradient} text-white rounded-2xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group/btn`}
                    >
                      <span>View Exam Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No certifications found</h3>
            <p className="text-gray-500">Select a difficulty level to view available certifications.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
