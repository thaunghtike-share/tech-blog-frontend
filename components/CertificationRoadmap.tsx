"use client";

import React, { useState } from "react";
import {
  Award,
  ChevronRight,
  Clock,
  BookOpen,
  Zap,
  Check,
  X,
  Dock,
  GitMerge,
  Server,
  Lock,
  Gauge,
  Cloud,
  Rocket,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CertificationItem {
  title: string;
  icon: React.ReactNode;
  organization: string;
  examDetails: string;
  preparationTime: string;
  topics: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  recommended?: boolean;
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
    topics: ["Cloud concepts", "Security and compliance", "Billing and pricing", "AWS core services"]
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    icon: <Award className="w-6 h-6 text-blue-500" />,
    organization: "Microsoft",
    examDetails: "40-60 questions | 60 minutes | $99",
    preparationTime: "3-4 weeks",
    difficulty: 'Beginner',
    topics: ["Cloud concepts", "Azure architecture", "Governance and compliance", "Cost management"]
  },
  {
    title: "Linux Foundation Certified System Administrator (LFCS)",
    icon: <Server className="w-6 h-6 text-gray-500" />,
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $300",
    preparationTime: "4-6 weeks",
    difficulty: 'Beginner',
    topics: ["System configuration", "User and group management", "Storage management", "Networking"]
  },
  {
    title: "Docker Certified Associate",
    icon: <Dock className="w-6 h-6 text-blue-500" />,
    organization: "Docker",
    examDetails: "55 questions | 90 minutes | $195",
    preparationTime: "4-6 weeks",
    difficulty: 'Beginner',
    recommended: true,
    topics: ["Image creation and management", "Orchestration basics", "Networking and storage", "Security best practices"]
  },
  {
    title: "Git Version Control Basics",
    icon: <GitMerge className="w-6 h-6 text-gray-700" />,
    organization: "Open Source Community",
    examDetails: "Self-paced | Free",
    preparationTime: "2-3 weeks",
    difficulty: 'Beginner',
    topics: ["Commits and branches", "Merging and rebasing", "Conflict resolution", "Remote workflows"]
  },

  // Intermediate
  {
    title: "Certified Kubernetes Application Developer (CKAD)",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "6-10 weeks",
    difficulty: 'Intermediate',
    topics: ["Application deployment", "Configuration and secrets", "Observability", "Pod design"]
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    icon: <BookOpen className="w-6 h-6 text-blue-700" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: 'Intermediate',
    recommended: true,
    topics: ["Cluster architecture", "Installation and configuration", "Workloads and scheduling", "Networking"]
  },
  {
    title: "Prometheus Certified Associate",
    icon: <Gauge className="w-6 h-6 text-red-500" />,
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $250",
    preparationTime: "6-8 weeks",
    difficulty: 'Intermediate',
    topics: ["Metrics collection", "Alerting rules", "PromQL", "Service discovery"]
  },
  {
    title: "GitOps with ArgoCD",
    icon: <GitMerge className="w-6 h-6 text-blue-400" />,
    organization: "Codefresh",
    examDetails: "60 questions | 90 minutes | $200",
    preparationTime: "4-6 weeks",
    difficulty: 'Intermediate',
    topics: ["GitOps principles", "Application deployment", "Sync strategies", "Troubleshooting"]
  },
  {
    title: "AWS Certified Solutions Architect - Associate",
    icon: <Server className="w-6 h-6 text-orange-400" />,
    organization: "Amazon Web Services",
    examDetails: "65 questions | 130 minutes | $150",
    preparationTime: "6-8 weeks",
    difficulty: 'Intermediate',
    recommended: true,
    topics: ["Design resilient architectures", "Secure applications", "Performance and cost optimization", "Cloud monitoring"]
  },

  // Advanced
  {
    title: "AWS Certified Solutions Architect - Professional",
    icon: <Server className="w-6 h-6 text-orange-600" />,
    organization: "Amazon Web Services",
    examDetails: "75 questions | 180 minutes | $300",
    preparationTime: "12-16 weeks",
    difficulty: 'Advanced',
    topics: ["Enterprise architecture design", "Migration planning", "Multi-account strategy", "Cost management"]
  },
  {
    title: "AWS Certified DevOps Engineer - Professional",
    icon: <Server className="w-6 h-6 text-orange-500" />,
    organization: "Amazon Web Services",
    examDetails: "75 questions | 180 minutes | $300",
    preparationTime: "12-16 weeks",
    difficulty: 'Advanced',
    recommended: true,
    topics: ["CI/CD pipeline implementation", "Monitoring and logging", "Infrastructure as Code", "Incident and event response"]
  },
  {
    title: "Terraform Associate",
    icon: <GitMerge className="w-6 h-6 text-purple-500" />,
    organization: "HashiCorp",
    examDetails: "57 questions | 60 minutes | $70.50",
    preparationTime: "4-6 weeks",
    difficulty: 'Advanced',
    recommended: true,
    topics: ["Terraform CLI", "State management", "Modules and workspaces", "Cloud infrastructure provisioning"]
  },
  {
    title: "Certified Kubernetes Security Specialist (CKS)",
    icon: <Lock className="w-6 h-6 text-green-600" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: 'Advanced',
    topics: ["Cluster hardening", "System hardening", "Minimize microservice vulnerabilities", "Supply chain security"]
  },
  {
    title: "Istio Service Mesh Expert",
    icon: <Gauge className="w-6 h-6 text-indigo-500" />,
    organization: "Istio Community",
    examDetails: "Performance-based | 90 minutes | $200",
    preparationTime: "5-7 weeks",
    difficulty: 'Advanced',
    topics: ["Traffic management", "Security and policies", "Observability", "Istio architecture"]
  }
];


const difficultyColors = {
  'Beginner': 'bg-blue-100 text-blue-800',
  'Intermediate': 'bg-green-100 text-green-800',
  'Advanced': 'bg-purple-100 text-purple-800'
};

export function CertificationRoadmap() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  const filteredCerts = certifications.filter((cert) => cert.difficulty === filter);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 mb-3">
            <Cloud className="w-4 h-4 mr-2" />
            Learning Path
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            DevOps Certification Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Validate your skills with industry-recognized certifications
          </p>
        </div>

        {/* Filter Buttons with Icons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setFilter('Beginner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'Beginner'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Rocket className="w-4 h-4" />
            Beginner
          </button>

          <button
            onClick={() => setFilter('Intermediate')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'Intermediate'
                ? 'bg-green-100 text-green-800'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Gauge className="w-4 h-4" />
            Intermediate
          </button>

          <button
            onClick={() => setFilter('Advanced')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'Advanced'
                ? 'bg-purple-100 text-purple-800'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Shield className="w-4 h-4" />
            Advanced
          </button>
        </div>

        {/* Certifications Grid */}
        {filteredCerts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-gray-50 mr-4">
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900">
                          {cert.title}
                        </h3>
                        {cert.recommended && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{cert.organization}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{cert.preparationTime}</span>
                    <span className="mx-2">•</span>
                    <span>{cert.examDetails}</span>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[cert.difficulty]}`}
                    >
                      {cert.difficulty}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Topics Covered
                    </h4>
                    <ul className="space-y-2">
                      {cert.topics.slice(0, 3).map((topic, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="flex-shrink-0 h-4 w-4 text-green-500 mt-0.5 mr-2" />
                          <span className="text-sm text-gray-700">{topic}</span>
                        </li>
                      ))}
                      {cert.topics.length > 3 && (
                        <li className="text-xs text-gray-500">
                          +{cert.topics.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="mt-6 w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span>View details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
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

      {/* Keep your existing modal code here */}
    </div>
  );
}