"use client";

import React, { useState } from "react";
import {
  Award,
  ChevronRight,
  Clock,
  BookOpen,
  Check,
  GraduationCap,
  Dock,
  GitMerge,
  Server,
  Lock,
  Gauge,
  Rocket,
  Shield,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

interface CertificationItem {
  title: string;
  icon: React.ReactNode;
  organization: string;
  examDetails: string;
  preparationTime: string;
  topics: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  recommended?: boolean;
  examLink: string;
}

const certifications: CertificationItem[] = [
  // Beginner
  {
    title: "AWS Cloud Practitioner",
    icon: <Award className="w-6 h-6 text-yellow-500" />,
    organization: "Amazon Web Services",
    examDetails: "65 questions | 90 minutes | $100",
    preparationTime: "3-4 weeks",
    difficulty: 'Beginner',
    recommended: true,
    topics: ["Cloud concepts", "Security and compliance", "Billing and pricing", "AWS core services"],
    examLink: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    icon: <Award className="w-6 h-6 text-blue-500" />,
    organization: "Microsoft",
    examDetails: "40-60 questions | 60 minutes | $99",
    preparationTime: "3-4 weeks",
    difficulty: 'Beginner',
    topics: ["Cloud concepts", "Azure architecture", "Governance and compliance", "Cost management"],
    examLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/"
  },
  {
    title: "Linux Foundation Certified System Administrator (LFCS)",
    icon: <Server className="w-6 h-6 text-gray-500" />,
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $300",
    preparationTime: "4-6 weeks",
    difficulty: 'Beginner',
    topics: ["System configuration", "User and group management", "Storage management", "Networking"],
    examLink: "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/"
  },
  {
    title: "Docker Certified Associate",
    icon: <Dock className="w-6 h-6 text-blue-500" />,
    organization: "Docker",
    examDetails: "55 questions | 90 minutes | $195",
    preparationTime: "4-6 weeks",
    difficulty: 'Beginner',
    recommended: true,
    topics: ["Image creation and management", "Orchestration basics", "Networking and storage", "Security best practices"],
    examLink: "https://success.docker.com/certification"
  },
  {
    title: "Git Version Control Basics",
    icon: <GitMerge className="w-6 h-6 text-gray-700" />,
    organization: "Open Source Community",
    examDetails: "Self-paced | Free",
    preparationTime: "2-3 weeks",
    difficulty: 'Beginner',
    topics: ["Commits and branches", "Merging and rebasing", "Conflict resolution", "Remote workflows"],
    examLink: "https://learngitbranching.js.org/"
  },

  // Intermediate
  {
    title: "Certified Kubernetes Application Developer (CKAD)",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "6-10 weeks",
    difficulty: 'Intermediate',
    topics: ["Application deployment", "Configuration and secrets", "Observability", "Pod design"],
    examLink: "https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/"
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    icon: <BookOpen className="w-6 h-6 text-blue-700" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: 'Intermediate',
    recommended: true,
    topics: ["Cluster architecture", "Installation and configuration", "Workloads and scheduling", "Networking"],
    examLink: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/"
  },
  {
    title: "Prometheus Certified Associate",
    icon: <Gauge className="w-6 h-6 text-red-500" />,
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $250",
    preparationTime: "6-8 weeks",
    difficulty: 'Intermediate',
    topics: ["Metrics collection", "Alerting rules", "PromQL", "Service discovery"],
    examLink: "https://training.linuxfoundation.org/certification/prometheus-certified-associate/"
  },
  {
    title: "GitOps with ArgoCD",
    icon: <GitMerge className="w-6 h-6 text-blue-400" />,
    organization: "Codefresh",
    examDetails: "60 questions | 90 minutes | $200",
    preparationTime: "4-6 weeks",
    difficulty: 'Intermediate',
    topics: ["GitOps principles", "Application deployment", "Sync strategies", "Troubleshooting"],
    examLink: "https://codefresh.io/certifications/argocd/"
  },
  {
    title: "AWS Certified Solutions Architect - Associate",
    icon: <Server className="w-6 h-6 text-orange-400" />,
    organization: "Amazon Web Services",
    examDetails: "65 questions | 130 minutes | $150",
    preparationTime: "6-8 weeks",
    difficulty: 'Intermediate',
    recommended: true,
    topics: ["Design resilient architectures", "Secure applications", "Performance and cost optimization", "Cloud monitoring"],
    examLink: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
  },

  // Advanced
  {
    title: "AWS Certified Solutions Architect - Professional",
    icon: <Server className="w-6 h-6 text-orange-600" />,
    organization: "Amazon Web Services",
    examDetails: "75 questions | 180 minutes | $300",
    preparationTime: "12-16 weeks",
    difficulty: 'Advanced',
    topics: ["Enterprise architecture design", "Migration planning", "Multi-account strategy", "Cost management"],
    examLink: "https://aws.amazon.com/certification/certified-solutions-architect-professional/"
  },
  {
    title: "AWS Certified DevOps Engineer - Professional",
    icon: <Server className="w-6 h-6 text-orange-500" />,
    organization: "Amazon Web Services",
    examDetails: "75 questions | 180 minutes | $300",
    preparationTime: "12-16 weeks",
    difficulty: 'Advanced',
    recommended: true,
    topics: ["CI/CD pipeline implementation", "Monitoring and logging", "Infrastructure as Code", "Incident and event response"],
    examLink: "https://aws.amazon.com/certification/certified-devops-engineer-professional/"
  },
  {
    title: "Terraform Associate",
    icon: <GitMerge className="w-6 h-6 text-purple-500" />,
    organization: "HashiCorp",
    examDetails: "57 questions | 60 minutes | $70.50",
    preparationTime: "4-6 weeks",
    difficulty: 'Advanced',
    recommended: true,
    topics: ["Terraform CLI", "State management", "Modules and workspaces", "Cloud infrastructure provisioning"],
    examLink: "https://developer.hashicorp.com/certifications/terraform-associate"
  },
  {
    title: "Certified Kubernetes Security Specialist (CKS)",
    icon: <Lock className="w-6 h-6 text-green-600" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: 'Advanced',
    topics: ["Cluster hardening", "System hardening", "Minimize microservice vulnerabilities", "Supply chain security"],
    examLink: "https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist-cks/"
  },
  {
    title: "Istio Service Mesh Expert",
    icon: <Gauge className="w-6 h-6 text-indigo-500" />,
    organization: "Istio Community",
    examDetails: "Performance-based | 90 minutes | $200",
    preparationTime: "5-7 weeks",
    difficulty: 'Advanced',
    topics: ["Traffic management", "Security and policies", "Observability", "Istio architecture"],
    examLink: "https://academy.tetrate.io/courses/istio-certified-expert"
  }
];

const difficultyColors = {
  'Beginner': 'bg-blue-100 text-blue-800',
  'Intermediate': 'bg-green-100 text-green-800',
  'Advanced': 'bg-purple-100 text-purple-800'
};

const difficultyIcons = {
  'Beginner': <Rocket className="w-4 h-4" />,
  'Intermediate': <Gauge className="w-4 h-4" />,
  'Advanced': <Shield className="w-4 h-4" />
};

export function CertificationRoadmap() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  const filteredCerts = certifications.filter((cert) => cert.difficulty === filter);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-blue-600 shadow-sm border border-blue-100 mb-4"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Certificate Roadmap
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            DevOps Certification Roadmap
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
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
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm ${
                filter === level
                  ? `${difficultyColors[level as keyof typeof difficultyColors]} shadow-md`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {difficultyIcons[level as keyof typeof difficultyIcons]}
              {level}
            </button>
          ))}
        </motion.div>

        {filteredCerts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className={`p-3 rounded-xl ${filter === cert.difficulty ? difficultyColors[cert.difficulty] : 'bg-gray-100'} mr-4`}>
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900">
                          {cert.title}
                        </h3>
                        {cert.recommended && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{cert.organization}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium">{cert.preparationTime} prep</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span>{cert.examDetails}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[cert.difficulty]}`}
                    >
                      {difficultyIcons[cert.difficulty as keyof typeof difficultyIcons]}
                      <span className="ml-1">{cert.difficulty}</span>
                    </span>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Topics Covered
                    </h4>
                    <ul className="space-y-2.5">
                      {cert.topics.slice(0, 6).map((topic, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2" />
                          <span className="text-sm text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <a
                      href={cert.examLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between px-4 py-3 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors hover:shadow-sm"
                    >
                      <span>View Exam Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm mt-12">
            Select a difficulty level to view certifications.
          </p>
        )}
      </div>
    </div>
  );
}