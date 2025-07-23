"use client";
import { useState } from "react";
import type React from "react";

import {
  Award,
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
  ArrowRight,
  Sparkles,
  TrendingUp,
  BadgeCheck,
  Github,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface CertificationItem {
  title: string;
  icon: React.ReactNode;
  organization: string;
  examDetails: string;
  preparationTime: string;
  topics: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  recommended?: boolean;
  examLink: string;
}

const certifications: CertificationItem[] = [
  // Beginner
  {
    title: "AWS Cloud Practitioner",
    icon: <Award className="w-6 h-6" />,
    organization: "Amazon Web Services",
    examDetails: "65 questions | 90 minutes | $100",
    preparationTime: "6 weeks",
    difficulty: "Beginner",
    recommended: true,
    topics: [
      "Cloud concepts",
      "Security and compliance",
      "Billing and pricing",
      "AWS core services",
      "AWS Shared Responsibility Model",
      "AWS Global Infrastructure (Regions, AZs)",
      "Well-Architected Framework",
      "IAM basics and MFA",
    ],
    examLink:
      "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    icon: <Award className="w-6 h-6" />,
    organization: "Microsoft",
    examDetails: "40-60 questions | 60 minutes | $99",
    preparationTime: "6 weeks",
    difficulty: "Beginner",
    topics: [
      "Cloud concepts",
      "Azure architecture",
      "Governance and compliance",
      "Cost management",
      "Azure resource hierarchy",
      "Core services (VMs, Blob Storage)",
      "Azure AD and RBAC",
      "Monitoring tools",
    ],
    examLink:
      "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    title: "GitHub Foundations",
    icon: <Github className="w-6 h-6" />, // Assuming you have a GitHub icon component
    organization: "GitHub",
    examDetails: "45 questions | 90 minutes | $99",
    preparationTime: "2-3 weeks",
    difficulty: "Beginner",
    recommended: true,
    topics: [
      "GitHub basics (Repositories, Branches)",
      "Pull Requests and Code Review",
      "GitHub Issues and Projects",
      "GitHub Actions basics",
      "Markdown formatting",
      "Collaboration workflows",
      "GitHub Pages",
      "Security basics (Dependabot)",
    ],
    examLink: "https://github.com/certifications/foundations",
  },
  {
    title: "Linux Foundation Certified System Administrator (LFCS)",
    icon: <Server className="w-6 h-6" />,
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $300",
    preparationTime: "4-6 weeks",
    difficulty: "Beginner",
    topics: [
      "System configuration",
      "User and group management",
      "Storage management",
      "Networking",
      "Bash scripting",
      "Process management (systemd)",
      "Filesystem permissions",
      "Backup/restore (tar, rsync)",
    ],
    examLink:
      "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/",
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
    topics: [
      "Application deployment",
      "Configuration and secrets",
      "Observability",
      "Pod design",
      "Multi-container Pods",
      "Persistent Volumes",
      "Custom Resource Definitions",
      "Helm basics",
    ],
    examLink:
      "https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    icon: <BookOpen className="w-6 h-6" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: "Intermediate",
    recommended: true,
    topics: [
      "Cluster architecture",
      "Installation and configuration",
      "Workloads and scheduling",
      "Networking",
      "ETCD backup/restore",
      "Network policies",
      "RBAC deep dive",
      "Troubleshooting kubelet",
    ],
    examLink:
      "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
  },
  {
    title: "Docker Certified Associate",
    icon: <Dock className="w-6 h-6" />,
    organization: "Docker",
    examDetails: "55 questions | 90 minutes | $195",
    preparationTime: "4-6 weeks",
    difficulty: "Intermediate",
    topics: [
      "Image creation and management",
      "Orchestration basics",
      "Networking and storage",
      "Security best practices",
      "Multi-stage builds",
      "Docker Compose networking",
      "Registry management",
      "Security scanning",
    ],
    examLink: "https://success.docker.com/certification",
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
      "High availability patterns",
      "VPC advanced design",
      "Database services comparison",
      "Serverless architectures",
    ],
    examLink:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    title: "GitOps with ArgoCD",
    icon: <GitMerge className="w-6 h-6" />,
    organization: "Codefresh",
    examDetails: "60 questions | 90 minutes | $200",
    preparationTime: "4-6 weeks",
    difficulty: "Intermediate",
    topics: [
      "GitOps principles",
      "Application deployment",
      "Sync strategies",
      "Troubleshooting",
      "Sync waves/hooks",
      "Custom health checks",
      "RBAC for ArgoCD",
      "Kustomize integration",
    ],
    examLink: "https://codefresh.io/certifications/argocd/",
  },
  {
    title: "Prometheus Associate PCA",
    icon: <Gauge className="w-6 h-6" />,
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $250",
    preparationTime: "6-8 weeks",
    difficulty: "Intermediate",
    topics: [
      "Metrics collection",
      "Alerting rules",
      "PromQL",
      "Service discovery",
      "Recording rules",
      "Alertmanager config",
      "Grafana templating",
      "Thanos basics",
    ],
    examLink:
      "https://training.linuxfoundation.org/certification/prometheus-certified-associate/",
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
    topics: [
      "Enterprise architecture design",
      "Migration planning",
      "Multi-account strategy",
      "Cost management",
      "Multi-region architectures",
      "AWS Organizations (SCPs)",
      "Advanced networking",
      "Migration strategies (6 Rs)",
    ],
    examLink:
      "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
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
      "CodePipeline/CodeBuild",
      "CloudFormation/CDK",
      "CloudWatch Logs Insights",
      "SSM Run Command",
    ],
    examLink:
      "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
  },
  {
    title: "AZ-400 Azure DevOps Engineer",
    icon: <Server className="w-6 h-6" />,
    organization: "Azure DevOps Services",
    examDetails: "40-60 questions | 150 minutes | $165",
    preparationTime: "12-16 weeks",
    difficulty: "Advanced",
    topics: [
      "Configure organizational structure in Azure DevOps",
      "Setup Teams, Areas, Iterations",
      "Customize work item templates and workflows",
      "Integrate communication tools",
      "Manage stakeholder feedback and collaboration",
      "YAML pipelines",
      "Artifact feeds",
      "Azure Policy for DevOps",
    ],
    examLink:
      "https://learn.microsoft.com/en-us/credentials/certifications/exams/az-400/",
  },
  {
    title: "Terraform Associate",
    icon: <GitMerge className="w-6 h-6" />,
    organization: "HashiCorp",
    examDetails: "57 questions | 60 minutes | $70.50",
    preparationTime: "8 weeks",
    difficulty: "Advanced",
    recommended: true,
    topics: [
      "Terraform CLI",
      "State management",
      "Modules and workspaces",
      "Cloud infrastructure provisioning",
      "Dynamic blocks",
      "Terraform Cloud",
      "Provider aliasing",
      "Debugging (TF_LOG)",
    ],
    examLink:
      "https://developer.hashicorp.com/certifications/terraform-associate",
  },
  {
    title: "Kubernetes Security Specialist (CKS)",
    icon: <Lock className="w-6 h-6" />,
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: "Advanced",
    topics: [
      "Cluster hardening",
      "System hardening",
      "Minimize microservice vulnerabilities",
      "Supply chain security",
      "Pod Security Admission",
      "Runtime security (Falco)",
      "CIS Benchmark",
      "Image signing",
    ],
    examLink:
      "https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist-cks/",
  },
  {
    title: "Certified Istio Service Mesh Expert",
    icon: <Gauge className="w-6 h-6" />,
    organization: "Istio Community",
    examDetails: "Performance-based | 90 minutes | $200",
    preparationTime: "5-7 weeks",
    difficulty: "Advanced",
    topics: [
      "Traffic management",
      "Security and policies",
      "Observability",
      "Istio architecture",
      "Telemetry tools",
      "mTLS configuration",
      "Canary deployments",
      "Multi-cluster setups",
    ],
    examLink: "https://academy.tetrate.io/courses/istio-certified-expert",
  },
];

const difficultyConfig = {
  Beginner: {
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    textColor: "text-green-800",
    icon: <Rocket className="w-5 h-5" />,
    iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
    iconText: "text-white",
    border: "border-green-500",
  },
  Intermediate: {
    gradient: "from-orange-500 to-yellow-600", // Changed from blue/indigo
    bgGradient: "from-orange-50 to-yellow-50", // Changed from blue/indigo
    textColor: "text-orange-800", // Changed from blue
    icon: <Gauge className="w-5 h-5" />,
    iconBg: "bg-gradient-to-r from-orange-500 to-yellow-600", // Changed from blue/indigo
    iconText: "text-white",
    border: "border-orange-500", // Changed from blue
  },
  Advanced: {
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50",
    textColor: "text-purple-800",
    icon: <Shield className="w-5 h-5" />,
    iconBg: "bg-gradient-to-r from-purple-500 to-pink-600",
    iconText: "text-white",
    border: "border-purple-500",
  },
};

export function CertificationRoadmap() {
  const [filter, setFilter] = useState<
    "Beginner" | "Intermediate" | "Advanced"
  >("Beginner");
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  ); // State to manage expanded topics per card

  const filteredCerts = certifications.filter(
    (cert) => cert.difficulty === filter
  );

  const toggleTopics = (title: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="mt-22 sm:mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-3 sm:mb-4"
          >
            <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
              <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="inline-flex items-center px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 border border-emerald-200">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />{" "}
              Certification
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-yellow-800 to-orange-800 bg-clip-text text-transparent mb-2 sm:mb-4"
          >
            DevOps Certification Roadmap
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Validate your skills with industry-recognized DevOps certifications
            that showcase your cloud, automation, and infrastructure expertise.
          </motion.p>
        </div>

        {/* Filter Buttons - Now always visible and horizontally scrollable */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex overflow-x-auto flex-nowrap justify-start sm:justify-center gap-3 mb-8 sm:mb-12 pb-4"
        >
          {["Beginner", "Intermediate", "Advanced"].map((level, index) => {
            const config =
              difficultyConfig[level as keyof typeof difficultyConfig];
            const isActive = filter === level;
            return (
              <motion.button
                key={level}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setFilter(level as any)}
                className={`group relative flex-shrink-0 flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isActive
                    ? `bg-gradient-to-r ${config.gradient} text-white scale-105`
                    : `bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md`
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl ${
                    isActive
                      ? "bg-white/20"
                      : `${config.iconBg} ${config.iconText}`
                  }`}
                >
                  {config.icon}
                </div>
                <span className={isActive ? "text-white" : "text-gray-800"}>
                  {level}
                </span>
                <span
                  className={`text-xs ${
                    isActive ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {/* Removed cert count as it's not directly used in the design */}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {filteredCerts.length > 0 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-4 lg:grid lg:grid-cols-3 lg:gap-8">
            {filteredCerts.map((cert, index) => {
              const config = difficultyConfig[cert.difficulty];
              const isTopicsExpanded = expandedTopics[cert.title];
              const topicsToShow = isTopicsExpanded
                ? cert.topics
                : cert.topics.slice(0, 4);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`flex-shrink-0 w-[85vw] snap-center sm:w-auto group bg-white rounded-xl shadow-lg border-l-4 ${config.border} overflow-hidden transition-all duration-500 hover:shadow-xl flex flex-col`}
                >
                  <div className="p-5 relative">
                    <div className="absolute top-3 right-3">
                      {cert.recommended && (
                        <Badge className="px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-medium rounded-full shadow-sm border border-yellow-500">
                          <TrendingUp className="w-3 h-3 mr-1" /> Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl shadow-lg inline-flex mb-4">
                      {cert.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 leading-tight text-gray-900 group-hover:text-orange-700 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-gray-700 text-sm font-medium">
                      {cert.organization}
                    </p>
                  </div>
                  <div className="p-5 flex-grow">
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                          {cert.preparationTime}
                        </span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-3 font-medium">
                        {cert.examDetails}
                      </p>
                    </div>
                    <div className="mb-8">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Topics Covered
                      </h4>
                      <ul className="space-y-3">
                        {topicsToShow.map((topic, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start group/topic"
                          >
                            <div
                              className={`flex-shrink-0 mt-0.5 mr-3 w-4 h-4 ${config.iconBg} rounded-full flex items-center justify-center shadow-sm`}
                            >
                              <Check
                                className={`w-2.5 h-2.5 ${config.iconText}`}
                              />
                            </div>
                            <span className="text-sm text-gray-700 font-medium leading-tight group-hover/topic:text-blue-600 transition-colors">
                              {topic}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                      {cert.topics.length > 4 && (
                        <p className="text-sm text-gray-500 mt-3">
                          <button
                            onClick={() => toggleTopics(cert.title)}
                            className="font-medium text-blue-600 cursor-pointer hover:underline focus:outline-none"
                          >
                            {isTopicsExpanded
                              ? "See less topics"
                              : "See more topics"}
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <a
                      href={cert.examLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-between px-6 py-3 bg-gradient-to-r ${config.gradient} text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] group/btn`}
                    >
                      <span>View Exam Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No certifications found
            </h3>
            <p className="text-gray-500">
              Select a difficulty level to view available certifications.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
