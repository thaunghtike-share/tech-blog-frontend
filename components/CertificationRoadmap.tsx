"use client";
import { useState, useRef } from "react";
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
  TrendingUp,
  BadgeCheck,
  Github,
  ChevronRight,
  ChevronLeft,
  Play,
  ExternalLink,
  ChevronDown,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    icon: <Github className="w-6 h-6" />,
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
    color: "from-yellow-500 to-orange-600",
    text: "text-yellow-400",
    border: "border-yellow-500",
    iconBg: "bg-gradient-to-r from-yellow-500 to-orange-600",
    iconText: "text-white",
    icon: <Rocket className="w-5 h-5" />,
  },
  Intermediate: {
    color: "from-orange-500 to-red-600",
    text: "text-orange-400",
    border: "border-orange-500",
    iconBg: "bg-gradient-to-r from-orange-500 to-red-600",
    iconText: "text-white",
    icon: <Gauge className="w-5 h-5" />,
  },
  Advanced: {
    color: "from-red-500 to-pink-600",
    text: "text-red-400",
    border: "border-red-500",
    iconBg: "bg-gradient-to-r from-red-500 to-pink-600",
    iconText: "text-white",
    icon: <Shield className="w-5 h-5" />,
  },
};

type DifficultyLevel = keyof typeof difficultyConfig;

export function CertificationRoadmap() {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyLevel>("Beginner");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const coursesPerView = 3;

  const filteredCerts = certifications.filter(
    (cert) => cert.difficulty === selectedDifficulty
  );

  const totalSlides = Math.ceil(filteredCerts.length / coursesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentCourses = () => {
    const startIndex = currentIndex * coursesPerView;
    return filteredCerts.slice(startIndex, startIndex + coursesPerView);
  };

  const getDifficultyStats = (difficulty: DifficultyLevel) => {
    const certs = certifications.filter((cert) => cert.difficulty === difficulty);
    const totalWeeks = certs.reduce((acc, cert) => {
      const weeks = Number.parseInt(cert.preparationTime.split(' ')[0]) || 1;
      return acc + weeks;
    }, 0);
    return {
      count: certs.length,
      totalWeeks,
      avgWeeks: Math.round(totalWeeks / certs.length),
    };
  };

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header with matching YouTube playlists theme */}
      <div className="text-center mb-6 md:mb-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-4 md:mb-4 relative z-10"
        >
          {/* Animated bubble icon matching YouTube playlists */}
          <motion.div
            className="relative p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {/* Bubble effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <Award className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          {/* Title text beside the icon */}
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            DevOps Certification Roadmap
          </motion.h2>

          {/* Chevron with dotted trail matching YouTube playlists */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 ml-2" />
          </motion.div>
        </motion.div>

        {/* Animated line matching YouTube playlists */}
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mx-auto relative mb-4"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{ x: [0, 90, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto relative z-10"
        >
          Validate your skills with industry-recognized certifications that showcase your DevOps expertise.
        </motion.p>
      </div>

      {/* Difficulty Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4 md:mb-8 flex justify-center"
      >
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-6 py-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 min-w-[280px]"
          >
            <div
              className={`p-2 rounded-xl ${difficultyConfig[selectedDifficulty].iconBg} shadow-lg`}
            >
              <div className={difficultyConfig[selectedDifficulty].iconText}>
                {difficultyConfig[selectedDifficulty].icon}
              </div>
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm text-gray-400">Difficulty Level</div>
              <div
                className={`font-semibold ${difficultyConfig[selectedDifficulty].text}`}
              >
                {selectedDifficulty}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 right-0 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700 overflow-hidden z-50"
              >
                {(
                  ["Beginner", "Intermediate", "Advanced"] as DifficultyLevel[]
                ).map((difficultyKey) => {
                  const config = difficultyConfig[difficultyKey];
                  const hasCerts = certifications.some(
                    (cert) => cert.difficulty === difficultyKey
                  );
                  const stats = getDifficultyStats(difficultyKey);

                  if (!hasCerts) return null;

                  return (
                    <motion.button
                      key={difficultyKey}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      onClick={() => {
                        setSelectedDifficulty(difficultyKey);
                        setIsDropdownOpen(false);
                        setCurrentIndex(0);
                      }}
                      className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-700/50 transition-colors duration-200 border-b border-gray-700 last:border-b-0"
                    >
                      <div
                        className={`p-2 rounded-xl ${config.iconBg} shadow-lg`}
                      >
                        <div className={config.iconText}>{config.icon}</div>
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${config.text}`}>
                          {difficultyKey}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stats.count} certifications • {stats.avgWeeks} weeks avg
                        </div>
                      </div>
                      {selectedDifficulty === difficultyKey && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {filteredCerts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-8 md:py-12"
        >
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-3 md:mb-4 backdrop-blur-sm border border-gray-600">
            <Award className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </div>
          <h4 className="text-gray-300 font-medium text-base md:text-lg mb-2">
            No certifications available for this difficulty
          </h4>
          <p className="text-gray-500 text-sm md:text-base">
            Please select another difficulty or check back later.
          </p>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-yellow-500/50 transition-all duration-300 -ml-6"
              >
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-yellow-500/50 transition-all duration-300 -mr-6"
              >
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </motion.button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                    {filteredCerts
                      .slice(
                        slideIndex * coursesPerView,
                        (slideIndex + 1) * coursesPerView
                      )
                      .map((cert, idx) => {
                        const config = difficultyConfig[cert.difficulty];
                        return (
                          <motion.div
                            key={cert.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative overflow-hidden"
                          >
                            {/* Background glow effect */}
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                              animate={{
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                            />

                            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:border-yellow-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
                              {/* Header Section */}
                              <div className="p-6 pb-4">
                                <div className="flex items-start justify-between mb-4">
                                  <div className={`p-3 rounded-xl ${config.iconBg} shadow-lg`}>
                                    {cert.icon}
                                  </div>
                                  {cert.recommended && (
                                    <div className="px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-medium rounded-full shadow-sm border border-yellow-500">
                                      <TrendingUp className="w-3 h-3 mr-1 inline" />
                                      Recommended
                                    </div>
                                  )}
                                </div>
                                
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                                  {cert.title}
                                </h3>
                                
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <Users className="w-4 h-4 text-gray-500" />
                                  <span className="font-medium text-gray-300">
                                    {cert.organization}
                                  </span>
                                </div>
                              </div>

                              {/* Content Section */}
                              <div className="p-6 pt-0 flex-grow">
                                <div className="space-y-3 mb-4">
                                  <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span>
                                      Preparation:{" "}
                                      <span className="font-medium text-gray-300">
                                        {cert.preparationTime}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    <span className="font-medium text-gray-300">
                                      {cert.examDetails}
                                    </span>
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" /> 
                                    Key Topics
                                  </h4>
                                  <ul className="space-y-2">
                                    {cert.topics.slice(0, 4).map((topic, i) => (
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
                                          <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm text-gray-300 font-medium leading-tight">
                                          {topic}
                                        </span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                  {cert.topics.length > 4 && (
                                    <p className="text-sm text-gray-500 mt-2">
                                      +{cert.topics.length - 4} more topics
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Footer Section */}
                              <div className="p-6 pt-0">
                                <a
                                  href={cert.examLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r ${config.color} text-white font-semibold rounded-xl transition-all duration-200 text-sm md:text-base hover:shadow-lg hover:scale-105 group border border-transparent hover:border-white/20`}
                                >
                                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:scale-110 transition-transform" />
                                  View Exam Details
                                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? `bg-gradient-to-r ${difficultyConfig[selectedDifficulty].color} shadow-lg`
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}