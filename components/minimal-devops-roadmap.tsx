"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Clock, BookOpen, Layers, Shield, Cloud, Code, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RoadmapItem {
  title: string;
  duration: string;
  details: string;
  subtopics: string[];
}

interface RoadmapStage {
  key: string;
  label: string;
  description: string[];
  items: RoadmapItem[];
}

interface ResourceLink {
  text: string;
  url: string;
}

const roadmap: RoadmapStage[] = [  {
    key: "beginner",
    label: "Beginner",
    description: [
      "Start your DevOps journey with foundational tools and concepts.",
      "Best for absolute beginners and career switchers."
    ],
    items: [
      {
        title: "Linux Fundamentals",
        details: "Understand the Linux operating system and shell commands.",
        duration: "2-3 weeks",
        subtopics: [
          "File systems & permissions",
          "Shell navigation",
          "Process management",
          "SSH & remote access"
        ]
      },
      {
        title: "Cloud Fundamentals",
        details: "Grasp basic concepts of cloud computing and major providers.",
        duration: "2-3 weeks",
        subtopics: ["IaaS vs PaaS vs SaaS", "AWS Free Tier", "Azure Basics", "GCP Console"]
      },
      {
        title: "Networking Basics",
        details: "Learn the essentials of computer networking.",
        duration: "2 weeks",
        subtopics: ["IP & Subnets", "Ports", "DNS", "HTTP vs HTTPS"]
      },
      {
        title: "Bash Scripting",
        details: "Automate tasks with bash scripts",
        duration: "2-3 weeks",
        subtopics: ["Bash syntax", "Loops & conditionals"]
      },
      {
        title: "Python Fundamentals",
        details: "Learn Python Programming Fundamentals",
        duration: "10 weeks",
        subtopics: ["Python syntax", "Loops & conditionals"]
      },
      {
        title: "Git & Version Control",
        details: "Track changes and collaborate on code.",
        duration: "2-3 weeks",
        subtopics: ["Git CLI", "Branches & merging", "GitHub usage"]
      },
      {
        title: "Docker Basics",
        details: "Understand containerization and Docker CLI.",
        duration: "2 weeks",
        subtopics: ["Images & containers", "Dockerfile", "Volumes & ports"]
      },
      {
        title: "YAML & JSON",
        details: "Work with common configuration formats.",
        duration: "1 week",
        subtopics: ["YAML syntax", "JSON usage in APIs", "CI/CD configs"]
      }
    ]
  },
  {
    key: "intermediate",
    label: "Intermediate",
    description: [
      "Build upon your foundation with real DevOps tools and practices.",
      "Ideal for those comfortable with scripting and cloud basics."
    ],
    items: [
      {
        title: "AWS Core Services",
        details: "Dive into EC2, IAM, S3, and basic networking.",
        duration: "3-4 weeks",
        subtopics: ["EC2 provisioning", "S3 storage", "IAM roles & policies"]
      },
      {
        title: "Azure Fundamentals",
        details: "Explore Azure resource groups, VMs, and storage.",
        duration: "3-4 weeks",
        subtopics: ["Azure Portal", "VNet & Subnets", "Blob storage"]
      },
      {
        title: "Kubernetes Essentials Part-I",
        details: "Learn to orchestrate containers at scale.",
        duration: "4 weeks",
        subtopics: ["Pods & deployments", "Services & Ingress", "Statefulset", "Resource Usage", "Namespaces"]
      },
      {
        title: "Kubernetes Essentials Part-II",
        details: "Learn to orchestrate containers at scale.",
        duration: "4 weeks",
        subtopics: ["HPA","Volumes","Secrets & Configmap", "Health Check Probes", "KEDA", "PDB"]
      },
      {
        title: "Kubernetes Advanced ",
        details: "Learn to manage kubernetes cluster.",
        duration: "4 weeks",
        subtopics: ["customize", "rancher", "helm", "Lens", "Dashboard", "Sealed Secrets"]
      },
      {
        title: "CICD Fundamentals",
        details: "Automate software delivery using pipelines.",
        duration: "3 weeks",
        subtopics: ["GitHub Actions", "GitLab CI/CD", "Webhooks", "Testing pipelines"]
      },
      {
        title: "Container Services (ECS/EKS)",
        details: "Deploy and manage containers on AWS.",
        duration: "3 weeks",
        subtopics: ["Fargate", "EKS setup", "Service discovery", "Auto-scaling"]
      },
      {
        title: "Monitoring & Observability",
        details: "Monitor app health and metrics effectively.",
        duration: "3 weeks",
        subtopics: ["Prometheus", "Grafana", "CloudWatch", "Loki"]
      }
    ]
  },
  {
    key: "advanced",
    label: "Advanced",
    description: [
      "Work with infrastructure as code, GitOps, and production-grade security.",
      "Perfect for engineers aiming for senior/lead roles."
    ],
    items: [
      {
        title: "Terraform IaC",
        details: "Provision cloud infrastructure with Terraform.",
        duration: "3-4 weeks",
        subtopics: ["HCL basics", "Modules & state", "Providers", "Remote backends"]
      },
      {
        title: "GitOps with ArgoCD",
        details: "Deploy apps declaratively with Git as the source of truth.",
        duration: "2-3 weeks",
        subtopics: ["ArgoCD install", "App manifests", "Sync policies", "Health checks"]
      },
      {
        title: "Vault & Secrets Management",
        details: "Secure sensitive data in apps and pipelines.",
        duration: "2-3 weeks",
        subtopics: ["Vault setup", "Token & policy management", "Kubernetes secrets"]
      },
      {
        title: "Kubernetes Security",
        details: "Enforce security and access control in Kubernetes.",
        duration: "3 weeks",
        subtopics: ["RBAC", "Pod Security Policies", "OPA Gatekeeper", "Network Policies"]
      }
    ]
  }
];

const resourceLinks: Record<string, ResourceLink[]> = {
  "Linux Fundamentals": [
    { text: "Linux Journey", url: "https://linuxjourney.com/" },
    { text: "Ubuntu CLI Basics", url: "https://ubuntu.com/tutorials/command-line-for-beginners" }
  ],
  "Cloud Fundamentals": [
    { text: "AWS Cloud Concepts", url: "https://aws.amazon.com/training/digital/cloud-practitioner/" },
    { text: "Azure Fundamentals", url: "https://learn.microsoft.com/en-us/training/azure/" }
  ],
  "Networking Basics": [
    { text: "Cisco Networking Guide", url: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/networking-fundamentals.html" },
    { text: "Computer Networking Tutorial", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" }
  ],
  "Bash Scripting": [
    { text: "Python Beginner Guide", url: "https://www.python.org/about/gettingstarted/" }
  ],
  "Python Fundamentals": [
    { text: "Python Beginner Guide", url: "https://www.python.org/about/gettingstarted/" }
  ],
  "Git & Version Control": [
    { text: "Git Docs", url: "https://git-scm.com/doc" },
    { text: "Git Branching", url: "https://learngitbranching.js.org/"},
    { text: "GitHub Actions", url: "https://docs.github.com/en/actions" }
  ],
  "Docker Basics": [
    { text: "Docker Getting Started", url: "https://docs.docker.com/get-started/" },
    { text: "Docker Compose", url: "https://docs.docker.com/compose/" }
  ],
  "YAML & JSON": [
    { text: "YAML Tutorial", url: "https://www.tutorialspoint.com/yaml/index.htm" },
    { text: "JSON Guide", url: "https://www.json.org/json-en.html" }
  ],
  "Kubernetes Essentials": [
    { text: "K8s Basics", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
    { text: "Helm Charts", url: "https://helm.sh/docs/" }
  ],
  "CI/CD Fundamentals": [
    { text: "CI/CD Guide", url: "https://about.gitlab.com/topics/ci-cd/" },
    { text: "GitHub Actions", url: "https://docs.github.com/en/actions" }
  ],
  "Monitoring & Observability": [
    { text: "Prometheus Docs", url: "https://prometheus.io/docs/" },
    { text: "Grafana Docs", url: "https://grafana.com/docs/" }
  ],
  "Terraform IaC": [
    { text: "Terraform Basics", url: "https://developer.hashicorp.com/terraform/docs" },
    { text: "Terraform Learn", url: "https://learn.hashicorp.com/terraform" }
  ],
  "GitOps with ArgoCD": [
    { text: "ArgoCD Docs", url: "https://argo-cd.readthedocs.io/en/stable/" },
    { text: "GitOps by WeaveWorks", url: "https://www.weave.works/technologies/gitops/" }
  ],
  "Vault & Secrets Management": [
    { text: "Vault Docs", url: "https://developer.hashicorp.com/vault/docs" },
    { text: "Kubernetes Secrets", url: "https://kubernetes.io/docs/concepts/configuration/secret/" }
  ],
  "Kubernetes Security": [
    { text: "K8s RBAC", url: "https://kubernetes.io/docs/reference/access-authn-authz/rbac/" },
    { text: "OPA Gatekeeper", url: "https://open-policy-agent.github.io/gatekeeper/" }
  ]
};

const getStageIcon = (stageKey: string) => {
  switch (stageKey) {
    case 'beginner':
      return <BookOpen className="w-5 h-5 text-blue-500" />;
    case 'intermediate':
      return <Layers className="w-5 h-5 text-blue-500" />;
    case 'advanced':
      return <Shield className="w-5 h-5 text-blue-500" />;
    default:
      return <Code className="w-5 h-5 text-blue-500" />;
  }
};

export function MinimalDevopsRoadmap() {
  const [selectedStageKey, setSelectedStageKey] = useState(roadmap[0]?.key || "beginner");
  const [selectedTopic, setSelectedTopic] = useState<{title: string, links: ResourceLink[]} | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const selectedStage = roadmap.find((r) => r.key === selectedStageKey) || roadmap[0];

  const toggleExpand = (title: string) => {
    setExpandedTopics((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <>
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 mb-3">
            <Cloud className="w-4 h-4 mr-2" />
            Learning Path
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            DevOps Mastery Roadmap
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A structured learning path from beginner to advanced DevOps concepts and tools.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {roadmap.map((stage) => (
            <button
              key={stage.key}
              onClick={() => setSelectedStageKey(stage.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${selectedStageKey === stage.key 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-black hover:bg-blue-50 border border-gray-200'}`}
            >
              {getStageIcon(stage.key)}
              <span className="font-medium">{stage.label}</span>
              {selectedStageKey === stage.key && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>

        <div className="mb-10 text-center max-w-4xl mx-auto">
          {selectedStage.description?.length > 0 && (
            <>
              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                {selectedStage.description[0]}
              </p>
              {selectedStage.description[1] && (
                <p className="text-gray-600">{selectedStage.description[1]}</p>
              )}
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedStage.items?.map(({ title, details, duration, subtopics }, idx) => {
            const isExpanded = expandedTopics[title];
            const displaySubtopics = isExpanded ? subtopics : subtopics.slice(0, 4);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white flex flex-col">
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
                        {title}
                      </h4>
                      <span className="flex items-center text-xs font-medium bg-blue-50 text-gray-800 px-2.5 py-1 rounded-full border border-gray-200">
                        <Clock className="w-3 h-3 mr-1 text-blue-500" />
                        {duration}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{details}</p>

                    {displaySubtopics?.length > 0 ? (
                      <ul className="mb-3 space-y-3">
                        {displaySubtopics.map((sub, i) => (
                          <li key={i} className="flex items-start">
                            <span className="relative flex-shrink-0 mt-0.5">
                              <span className="absolute inset-0 bg-blue-100 rounded-full opacity-75 animate-pulse"></span>
                              <span className="relative flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                            </span>
                            <span className="ml-3 text-gray-800 text-sm font-medium leading-tight">
                              {sub}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm mb-5">No subtopics listed</p>
                    )}

                    {subtopics.length > 4 && (
                      <button
                        onClick={() => toggleExpand(title)}
                        className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                      >
                        {isExpanded ? "Show Less" : "See More Topics"}
                      </button>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    <button 
                      onClick={() => setSelectedTopic({ title, links: resourceLinks[title] || [] })}
                      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-800 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition-all group"
                    >
                      <span>Explore resources</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Enhanced Resource Popup with Animations */}
      <AnimatePresence>
        {selectedTopic && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden pointer-events-auto border border-gray-200"
              >
                <div className="border-b border-gray-200 p-5 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Resources for {selectedTopic.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Hand-picked learning materials
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedTopic(null)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
                
                <div className="p-5 overflow-y-auto max-h-[60vh]">
                  {selectedTopic.links.length > 0 ? (
                    <div className="space-y-3">
                      {selectedTopic.links.map((link, index) => (
                        <motion.a
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            block p-4 rounded-lg
                            border border-gray-200
                            hover:border-blue-300 hover:bg-blue-50/50
                            transition-all duration-200
                            group
                          "
                        >
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
                              <BookOpen className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
                                {link.text}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 truncate">
                                {new URL(link.url).hostname.replace('www.', '')}
                              </p>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <BookOpen className="w-6 h-6 text-gray-400" />
                      </div>
                      <h4 className="text-gray-700 font-medium">No resources available</h4>
                      <p className="text-gray-500 text-sm mt-1">
                        We'll add resources for this topic soon
                      </p>
                    </motion.div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 p-4 flex justify-end bg-gray-50">
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="
                      px-4 py-2 rounded-lg
                      bg-white hover:bg-gray-100
                      text-gray-700
                      text-sm font-medium
                      border border-gray-300
                      transition-colors
                      shadow-xs
                    "
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}