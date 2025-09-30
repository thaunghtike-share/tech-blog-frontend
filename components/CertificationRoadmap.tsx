"use client";
import { motion } from "framer-motion";
import { Award, ChevronRight, ExternalLink } from "lucide-react";
import { useState } from "react";

interface CertificationItem {
  title: string;
  logo: string;
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
    logo: "aws1.png",
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
    ],
    examLink:
      "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
  {
    title: "Microsoft Azure Fundamentals",
    logo: "az900.png",
    organization: "Microsoft",
    examDetails: "40-60 questions | 60 minutes | $99",
    preparationTime: "6 weeks",
    difficulty: "Beginner",
    topics: [
      "Cloud concepts",
      "Azure architecture",
      "Governance and compliance",
      "Cost management",
    ],
    examLink:
      "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    title: "AWS Solutions Architect Associate",
    logo: "aws2.webp",
    organization: "Amazon Web Services",
    examDetails: "65 questions | 130 minutes | $150",
    preparationTime: "6-8 weeks",
    difficulty: "Beginner",
    recommended: true,
    topics: [
      "Resilient architectures",
      "Security",
      "Performance",
      "Cost optimization",
    ],
    examLink:
      "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    title: "GitHub Foundations",
    logo: "git.png",
    organization: "GitHub",
    examDetails: "45 questions | 90 minutes | $99",
    preparationTime: "2-3 weeks",
    difficulty: "Beginner",
    recommended: true,
    topics: [
      "GitHub basics",
      "Pull Requests",
      "GitHub Actions",
      "Collaboration workflows",
    ],
    examLink: "https://github.com/certifications/foundations",
  },
  {
    title: "Docker Certified Associate",
    logo: "docker.png",
    organization: "Docker",
    examDetails: "55 questions | 90 minutes | $195",
    preparationTime: "4-6 weeks",
    difficulty: "Beginner",
    topics: ["Image management", "Orchestration", "Networking", "Security"],
    examLink: "https://success.docker.com/certification",
  },
  {
    title: "GitHub Actions Certification",
    logo: "githubaction.svg",
    organization: "GitHub",
    examDetails: "45 questions | 90 minutes | $99",
    preparationTime: "4-6 weeks",
    difficulty: "Intermediate",
    topics: [
      "CI/CD workflows",
      "Automation pipelines",
      "GitHub Actions syntax",
      "Deployment strategies",
    ],
    examLink: "https://github.com/certifications/actions",
  },
  // Intermediate
  {
    title: "Kubernetes Application Developer",
    logo: "ckad.png",
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "6-10 weeks",
    difficulty: "Intermediate",
    recommended: true,
    topics: [
      "Application deployment",
      "Configuration",
      "Observability",
      "Pod design",
    ],
    examLink:
      "https://training.linuxfoundation.org/certification/certified-kubernetes-application-developer-ckad/",
  },
  {
    title: "Certified Kubernetes Administrator",
    logo: "cka.webp",
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: "Intermediate",
    recommended: true,
    topics: [
      "Cluster architecture",
      "Installation",
      "Networking",
      "Troubleshooting",
    ],
    examLink:
      "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
  },
  {
    title: "GitOps with ArgoCD",
    logo: "gitops.png",
    organization: "Codefresh",
    examDetails: "60 questions | 90 minutes | $200",
    preparationTime: "4-6 weeks",
    difficulty: "Intermediate",
    topics: [
      "GitOps principles",
      "Deployment",
      "Sync strategies",
      "Troubleshooting",
    ],
    examLink: "https://codefresh.io/certifications/argocd/",
  },
  {
    title: "Prometheus Certified Associate",
    logo: "PCA.png",
    organization: "Linux Foundation",
    examDetails: "Performance-based | 2 hours | $250",
    preparationTime: "6-8 weeks",
    difficulty: "Intermediate",
    topics: ["Metrics collection", "Alerting", "PromQL", "Service discovery"],
    examLink:
      "https://training.linuxfoundation.org/certification/prometheus-certified-associate/",
  },
  // Advanced
  {
    title: "AWS Solutions Architect Professional",
    logo: "csa.webp",
    organization: "Amazon Web Services",
    examDetails: "75 questions | 180 minutes | $300",
    preparationTime: "12-16 weeks",
    difficulty: "Advanced",
    recommended: true,
    topics: [
      "Enterprise architecture",
      "Migration",
      "Multi-account",
      "Cost management",
    ],
    examLink:
      "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
  },
  {
    title: "AWS DevOps Engineer Professional",
    logo: "aws3.png",
    organization: "Amazon Web Services",
    examDetails: "75 questions | 180 minutes | $300",
    preparationTime: "12-16 weeks",
    difficulty: "Advanced",
    recommended: true,
    topics: [
      "CI/CD pipelines",
      "Monitoring",
      "Infrastructure as Code",
      "Incident response",
    ],
    examLink:
      "https://aws.amazon.com/certification/certified-devops-engineer-professional/",
  },
  {
    title: "Azure DevOps Engineer Expert",
    logo: "azdevops.webp",
    organization: "Microsoft",
    examDetails: "40-60 questions | 150 minutes | $165",
    preparationTime: "12-16 weeks",
    difficulty: "Advanced",
    topics: [
      "Organizational structure",
      "YAML pipelines",
      "Artifact feeds",
      "Azure Policy",
    ],
    examLink:
      "https://learn.microsoft.com/en-us/credentials/certifications/exams/az-400/",
  },
  {
    title: "HashiCorp Terraform Associate",
    logo: "tf.png",
    organization: "HashiCorp",
    examDetails: "57 questions | 60 minutes | $70.50",
    preparationTime: "8 weeks",
    difficulty: "Advanced",
    recommended: true,
    topics: [
      "Terraform CLI",
      "State management",
      "Modules",
      "Cloud provisioning",
    ],
    examLink:
      "https://developer.hashicorp.com/certifications/terraform-associate",
  },
  {
    title: "Certified Kubernetes Security Specialist",
    logo: "cks.png",
    organization: "CNCF",
    examDetails: "Performance-based | 2 hours | $395",
    preparationTime: "8-12 weeks",
    difficulty: "Advanced",
    topics: [
      "Cluster hardening",
      "Security",
      "Vulnerabilities",
      "Supply chain",
    ],
    examLink:
      "https://training.linuxfoundation.org/certification/certified-kubernetes-security-specialist-cks/",
  },
  {
    title: "Istio Certified Expert",
    logo: "istio.avif",
    organization: "Istio Community",
    examDetails: "Performance-based | 90 minutes | $200",
    preparationTime: "5-7 weeks",
    difficulty: "Advanced",
    topics: [
      "Traffic management",
      "Security",
      "Observability",
      "Multi-cluster",
    ],
    examLink: "https://academy.tetrate.io/courses/istio-certified-expert",
  },
];

const difficultyConfig = {
  Beginner: {
    labelColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    glowColor: "hover:shadow-green-500/20",
  },
  Intermediate: {
    labelColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    glowColor: "hover:shadow-blue-500/20",
  },
  Advanced: {
    labelColor: "bg-gradient-to-r from-gray-600 to-gray-800",
    glowColor: "hover:shadow-gray-500/20",
  },
};

// Handle image error - fallback to devops.png
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  target.src = "/devops.png";
};

export function CertificationRoadmap() {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  const handleCertClick = (examLink: string) => {
    window.open(examLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header with green theme */}
      <div className="text-center mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-4 relative z-10"
        >
          {/* Animated bubble icon */}
          <motion.div
            className="relative p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-2xl"
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
              className="absolute -inset-2 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-full blur-lg"
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

          {/* Chevron with dotted trail */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
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
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-green-400 ml-2" />
          </motion.div>
        </motion.div>

        {/* Animated line */}
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto relative mb-4"
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
          Validate your skills with industry-recognized certifications that
          showcase your DevOps expertise.
        </motion.p>
      </div>

      {/* Certification Logos - 8 per row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6"
      >
        {certifications.map((cert, index) => {
          const config = difficultyConfig[cert.difficulty];
          const isHovered = hoveredCert === cert.title;

          return (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center group"
            >
              {/* Logo Container with Full Rounded Difficulty Badge */}
              <motion.div
                className="relative cursor-pointer"
                onHoverStart={() => setHoveredCert(cert.title)}
                onHoverEnd={() => setHoveredCert(null)}
                onClick={() => handleCertClick(cert.examLink)}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                {/* Main Card Container */}
                <motion.div
                  className={`
                    bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-gray-700 
                    transition-all duration-300 relative overflow-hidden
                    group-hover:shadow-2xl group-hover:border-gray-500
                    ${config.glowColor}
                  `}
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Hover Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  {/* External Link Icon on Hover */}
                  <motion.div
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={false}
                    animate={{
                      scale: isHovered ? 1 : 0.8,
                    }}
                  >
                    <ExternalLink className="w-4 h-4 text-white/80" />
                  </motion.div>

                  {/* Logo */}
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto"
                    whileHover={{
                      scale: 1.1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={`/logos/${cert.logo}`}
                      alt={cert.title}
                      className="w-full h-full object-contain"
                      onError={handleImageError}
                    />
                  </motion.div>

                  {/* Pulse Animation on Hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 border-2 border-green-400/30 rounded-xl"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 1.1, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  )}
                </motion.div>

                {/* Full Rounded Difficulty Badge */}
                <motion.div
                  className={`absolute -top-2 -right-2 px-3 py-1 ${config.labelColor} text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {cert.difficulty}
                </motion.div>

                {/* Recommended Badge */}
                {cert.recommended && (
                  <motion.div
                    className="absolute -top-2 -left-2 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      rotate: isHovered ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{
                      rotate: {
                        duration: 0.5,
                        repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "loop",
                        ease: "easeInOut",
                      },
                      scale: { type: "spring", stiffness: 400 },
                    }}
                  >
                    ★
                  </motion.div>
                )}
              </motion.div>

              {/* Certification Title */}
              <motion.div
                className="text-center mt-3"
                animate={{ y: isHovered ? 2 : 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <h3 className="text-xs md:text-sm font-semibold text-white line-clamp-2 leading-tight min-h-[2.5rem] flex items-center justify-center group-hover:text-green-200 transition-colors duration-300">
                  {cert.title}
                </h3>

                {/* Organization on Hover */}
                <motion.p
                  className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  {cert.organization}
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Instruction Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <p className="text-gray-500 text-sm">
          💡 Click on any certification to visit the official exam page
        </p>
      </motion.div>
    </section>
  );
}
