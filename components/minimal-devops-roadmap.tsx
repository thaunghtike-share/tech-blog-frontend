"use client";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  BookOpen,
  Layers,
  Shield,
  Cloud,
  Code,
  X,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge"; // Ensure Badge is imported

interface RoadmapItem {
  title: string;
  duration: string;
  details: string;
  subtopics: string[];
  // Removed prerequisites from RoadmapItem as it will now be a separate stage
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

const roadmap: RoadmapStage[] = [
  {
    key: "prerequisite",
    label: "Prerequisite",
    description: [
      "Build a strong foundation with essential concepts before starting your DevOps journey.",
      "Crucial for absolute beginners and those new to IT fundamentals.",
    ],
    items: [
      {
        title: "Python Programming Basic",
        details:
          "Learn the core syntax, data types, control structures, functions, and basic programming concepts in Python.",
        duration: "12 weeks",
        subtopics: [
          "Variables and Data Types",
          "Operators and Expressions",
          "Control Flow (if, for, while)",
          "Functions and Scope",
          "Lists, Tuples, and Dictionaries",
          "Input/Output and File Handling",
          "Error Handling (try/except)",
          "Basic Modules and Packages",
        ],
      },
      {
        title: "Networking Fundamentals",
        details:
          "Learn core networking concepts including protocols, addressing, and how devices communicate across networks.",
        duration: "4 weeks",
        subtopics: [
          "Network Types (LAN, WAN, PAN, MAN)",
          "OSI & TCP/IP Models",
          "IP Addressing & Subnetting",
          "Ports & Protocols (TCP/UDP)",
          "DNS & DHCP",
          "MAC Addressing & ARP",
          "Switches, Routers, and Firewalls",
          "HTTP vs HTTPS",
        ],
      },
      {
        title: "Operating System Basics",
        details:
          "Understand how operating systems manage resources, processes, memory, and file systems.",
        duration: "2 weeks",
        subtopics: [
          "Processes and Threads",
          "Memory Management",
          "File Systems",
          "User vs Kernel Mode",
          "Basic Linux & Windows CLI",
        ],
      },
      {
        title: "Computer Fundamentals",
        details:
          "Understand the basics of computers including hardware, software, operating systems, and basic internet concepts.",
        duration: "6 weeks",
        subtopics: [
          "Computer hardware basics",
          "Operating system concepts",
          "File management",
          "Basic software usage",
          "Internet fundamentals",
        ],
      },
      {
        title: "Virtualization",
        details:
          "Learn the fundamentals of virtualization technology, types, and its role in modern IT infrastructure.",
        duration: "Ongoing",
        subtopics: [
          "Types of virtualization (hardware, software, network, storage)",
          "Hypervisors (Type 1 and Type 2)",
          "Virtual Machines (VMs) and Containers",
          "Benefits and use cases of virtualization",
          "Basic troubleshooting and management",
        ],
      },
    ],
  },
  {
    key: "beginner",
    label: "Beginner",
    description: [
      "Start your DevOps journey with foundational tools and concepts.",
      "Best for absolute beginners and career switchers.",
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
          "SSH & remote access",
        ],
      },
      {
        title: "Cloud Fundamentals",
        details: "Grasp basic concepts of cloud computing and major providers.",
        duration: "2-3 weeks",
        subtopics: [
          "IaaS vs PaaS vs SaaS",
          "AWS Free Tier",
          "Azure Basics",
          "GCP Console",
        ],
      },
      {
        title: "Linux Bash Scripting",
        details: "Automate tasks with bash scripts",
        duration: "2-3 weeks",
        subtopics: ["Bash syntax", "Loops & conditionals"],
      },
      {
        title: "Docker Fundamentals",
        details: "Understand containerization and Docker CLI.",
        duration: "2 weeks",
        subtopics: ["Images & containers", "Dockerfile", "Volumes & ports"],
      },
      {
        title: "YAML & JSON",
        details: "Work with common configuration formats.",
        duration: "1 week",
        subtopics: ["YAML syntax", "JSON usage in APIs", "CI/CD configs"],
      },
    ],
  },
  {
    key: "intermediate",
    label: "Intermediate",
    description: [
      "Build upon your foundation with real DevOps tools and practices.",
      "Ideal for those comfortable with scripting and cloud basics.",
    ],
    items: [
      {
        title: "AWS Core Services",
        details: "Dive into EC2, IAM, S3, and basic networking.",
        duration: "3-4 weeks",
        subtopics: ["EC2 provisioning", "S3 storage", "IAM roles & policies"],
      },
      {
        title: "Azure Fundamentals",
        details: "Explore Azure resource groups, VMs, and storage.",
        duration: "3-4 weeks",
        subtopics: ["Azure Portal", "VNet & Subnets", "Blob storage"],
      },
      {
        title: "Git & Version Control",
        details: "Track changes and collaborate on code.",
        duration: "2-3 weeks",
        subtopics: ["Git CLI", "Branches & merging", "GitHub usage"],
      },
      {
        title: "Kubernetes Essentials Part-I",
        details: "Learn to orchestrate containers at scale.",
        duration: "4 weeks",
        subtopics: [
          "Pods & deployments",
          "Services & Ingress",
          "Statefulset",
          "Resource Usage",
          "Namespaces",
        ],
      },
      {
        title: "Kubernetes Essentials Part-II",
        details: "Learn to orchestrate containers at scale.",
        duration: "4 weeks",
        subtopics: [
          "HPA",
          "Volumes",
          "Secrets & Configmap",
          "Health Check Probes",
          "KEDA",
          "PDB",
        ],
      },
      {
        title: "Kubernetes Advanced",
        details: "Learn to manage kubernetes cluster.",
        duration: "4 weeks",
        subtopics: [
          "customize",
          "rancher",
          "helm",
          "Lens",
          "Dashboard",
          "Sealed Secrets",
        ],
      },
      {
        title: "CICD Fundamentals",
        details: "Automate software delivery using pipelines.",
        duration: "3 weeks",
        subtopics: [
          "GitHub Actions",
          "GitLab CI/CD",
          "Webhooks",
          "Testing pipelines",
        ],
      },
      {
        title: "Container Services (ECS/EKS)",
        details: "Deploy and manage containers on AWS.",
        duration: "3 weeks",
        subtopics: [
          "Fargate",
          "EKS setup",
          "Service discovery",
          "Auto-scaling",
        ],
      },
      {
        title: "Monitoring & Observability",
        details: "Monitor app health and metrics effectively.",
        duration: "3 weeks",
        subtopics: ["Prometheus", "Grafana", "CloudWatch", "Loki"],
      },
    ],
  },
  {
    key: "advanced",
    label: "Advanced",
    description: [
      "Work with infrastructure as code, GitOps, and production-grade security.",
      "Perfect for engineers aiming for senior/lead roles.",
    ],
    items: [
      {
        title: "Terraform IaC",
        details: "Provision cloud infrastructure with Terraform.",
        duration: "3-4 weeks",
        subtopics: [
          "HCL basics",
          "Modules & state",
          "Providers",
          "Remote backends",
        ],
      },
      {
        title: "GitOps with ArgoCD",
        details: "Deploy apps declaratively with Git as the source of truth.",
        duration: "2-3 weeks",
        subtopics: [
          "ArgoCD install",
          "App manifests",
          "Sync policies",
          "Health checks",
        ],
      },
      {
        title: "Vault & Secrets Management",
        details: "Secure sensitive data in apps and pipelines.",
        duration: "2-3 weeks",
        subtopics: [
          "Vault setup",
          "Token & policy management",
          "Kubernetes secrets",
        ],
      },
      {
        title: "Kubernetes Security",
        details: "Enforce security and access control in Kubernetes.",
        duration: "3 weeks",
        subtopics: [
          "RBAC",
          "Pod Security Policies",
          "OPA Gatekeeper",
          "Network Policies",
        ],
      },
    ],
  },
];

const resourceLinks: Record<string, ResourceLink[]> = {
  "Python Programming Basic": [
    {
      text: "The official Python tutorial for beginners",
      url: "https://docs.python.org/3/tutorial/index.html",
    },
    {
      text: " In-depth articles and tutorials on Python best practices",
      url: "https://realpython.com/",
    },
  ],
  "Networking Fundamentals": [
    {
      text: "Networking Basics - Cisco Networking Academy",
      url: "https://skillsforall.com/course/networking-basics",
    },
    {
      text: "CompTIA Network+ Study Guide – Professor Messer",
      url: "https://www.professormesser.com/network-plus/n10-008/n10-008-training-course/",
    },
  ],
  "Operating System Basics": [
    {
      text: "Operating System Tutorial – GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/operating-systems/operating-systems/",
    },
  ],
  "Computer Fundamentals": [
    {
      text: "Computer Fundamentals – TutorialsPoint",
      url: "https://www.tutorialspoint.com/computer_fundamentals/index.htm",
    },
    {
      text: "Computer Basics – GCFGlobal",
      url: "https://edu.gcfglobal.org/en/computerbasics/",
    },
  ],
  Virtualization: [
    {
      text: "Virtualization Explained – Red Hat",
      url: "https://www.redhat.com/en/topics/virtualization",
    },
    {
      text: "Virtualization Concepts – IBM Cloud",
      url: "https://www.ibm.com/cloud/learn/virtualization-a-complete-guide",
    },
  ],
  "Linux Fundamentals": [
    { text: "Linux Journey", url: "https://linuxjourney.com/" },
    {
      text: "Ubuntu CLI Basics",
      url: "https://ubuntu.com/tutorials/command-line-for-beginners",
    },
  ],
  "Cloud Fundamentals": [
    {
      text: "AWS Cloud Concepts",
      url: "https://aws.amazon.com/training/digital/cloud-practitioner/",
    },
    {
      text: "Azure Fundamentals",
      url: "https://learn.microsoft.com/en-us/training/azure/",
    },
  ],
  "Networking Basics": [
    {
      text: "Cisco Networking Guide",
      url: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/networking-fundamentals.html",
    },
    {
      text: "Computer Networking Tutorial",
      url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
    },
  ],
  "Bash Scripting": [
    {
      text: "Python Beginner Guide",
      url: "https://www.python.org/about/gettingstarted/",
    },
  ],
  "Python Fundamentals": [
    {
      text: "Python Beginner Guide",
      url: "https://www.python.org/about/gettingstarted/",
    },
  ],
  "Git & Version Control": [
    { text: "Git Docs", url: "https://git-scm.com/doc" },
    { text: "Git Branching", url: "https://learngitbranching.js.org/" },
    { text: "GitHub Actions", url: "https://docs.github.com/en/actions" },
  ],
  "Docker Basics": [
    {
      text: "Docker Getting Started",
      url: "https://docs.docker.com/get-started/",
    },
    { text: "Docker Compose", url: "https://docs.docker.com/compose/" },
  ],
  "YAML & JSON": [
    {
      text: "YAML Tutorial",
      url: "https://www.tutorialspoint.com/yaml/index.htm",
    },
    { text: "JSON Guide", url: "https://www.json.org/json-en.html" },
  ],
  "Kubernetes Essentials": [
    {
      text: "K8s Basics",
      url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
    },
    { text: "Helm Charts", url: "https://helm.sh/docs/" },
  ],
  "CI/CD Fundamentals": [
    { text: "CI/CD Guide", url: "https://about.gitlab.com/topics/ci-cd/" },
    { text: "GitHub Actions", url: "https://docs.github.com/en/actions" },
  ],
  "Monitoring & Observability": [
    { text: "Prometheus Docs", url: "https://prometheus.io/docs/" },
    { text: "Grafana Docs", url: "https://grafana.com/docs/" },
  ],
  "Terraform IaC": [
    {
      text: "Terraform Basics",
      url: "https://developer.hashicorp.com/terraform/docs",
    },
    { text: "Terraform Learn", url: "https://learn.hashicorp.com/terraform" },
  ],
  "GitOps with ArgoCD": [
    { text: "ArgoCD Docs", url: "https://argo-cd.readthedocs.io/en/stable/" },
    {
      text: "GitOps by WeaveWorks",
      url: "https://www.weave.works/technologies/gitops/",
    },
  ],
  "Vault & Secrets Management": [
    { text: "Vault Docs", url: "https://developer.hashicorp.com/vault/docs" },
    {
      text: "Kubernetes Secrets",
      url: "https://kubernetes.io/docs/concepts/configuration/secret/",
    },
  ],
  "Kubernetes Security": [
    {
      text: "K8s RBAC",
      url: "https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    },
    {
      text: "OPA Gatekeeper",
      url: "https://open-policy-agent.github.io/gatekeeper/",
    },
  ],
};

// New stage configuration for consistent styling
const stageConfig = {
  prerequisite: {
    gradient: "from-gray-500 to-slate-600",
    text: "text-gray-700",
    border: "border-gray-500",
    iconBg: "bg-gray-100",
    iconText: "text-gray-600",
  },
  beginner: {
    gradient: "from-green-500 to-emerald-600",
    text: "text-green-700",
    border: "border-green-500",
    iconBg: "bg-green-100",
    iconText: "text-green-600",
  },
  intermediate: {
    gradient: "from-blue-500 to-indigo-600",
    text: "text-blue-700",
    border: "border-blue-500",
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
  },
  advanced: {
    gradient: "from-purple-500 to-pink-600",
    text: "text-purple-700",
    border: "border-purple-500",
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
  },
};

const getStageIcon = (stageKey: string) => {
  switch (stageKey) {
    case "prerequisite":
      return <Lightbulb className="w-5 h-5" />;
    case "beginner":
      return <BookOpen className="w-5 h-5" />;
    case "intermediate":
      return <Layers className="w-5 h-5" />;
    case "advanced":
      return <Shield className="w-5 h-5" />;
    default:
      return <Code className="w-5 h-5" />;
  }
};

export function MinimalDevopsRoadmap() {
  const [selectedStageKey, setSelectedStageKey] = useState(
    roadmap[0]?.key || "prerequisite"
  );
  const [selectedTopic, setSelectedTopic] = useState<{
    title: string;
    links: { text: string; url: string }[];
  } | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  );
  const [showAllTopics, setShowAllTopics] = useState(false);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const selectedStage =
    roadmap.find((r) => r.key === selectedStageKey) || roadmap[0];
  const currentStageConfig =
    stageConfig[selectedStageKey as keyof typeof stageConfig];

  const toggleExpand = (title: string) => {
    setExpandedTopics((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const displayedItems = showAllTopics
    ? selectedStage.items
    : selectedStage.items.slice(0, 6);

  return (
    <>
      <section
        ref={roadmapRef}
        className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Cloud className="w-4 h-4 text-white" />
            </div>
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-4 h-4 mr-2" /> Learning Path
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4"
          >
            DevOps Mastery Roadmap
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            A structured learning path from prerequisite to advanced DevOps
            concepts and tools.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {roadmap.map((stage, index) => (
            <motion.button
              key={stage.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedStageKey(stage.key);
                setShowAllTopics(false); // reset showAll when switching stages
                setExpandedTopics({});
              }}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                selectedStageKey === stage.key
                  ? `bg-gradient-to-r ${
                      stageConfig[stage.key as keyof typeof stageConfig]
                        .gradient
                    } text-white shadow-lg scale-105`
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 shadow-md hover:shadow-lg hover:scale-105"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl ${
                  selectedStageKey === stage.key
                    ? "bg-white/20"
                    : `bg-gradient-to-r ${
                        stageConfig[stage.key as keyof typeof stageConfig]
                          .gradient
                      } text-white`
                }`}
              >
                {getStageIcon(stage.key)}
              </div>
              <div className="text-left">
                <span className="font-medium text-sm">{stage.label}</span>
                <div className="text-xs opacity-80">
                  {stage.items.length} topics
                </div>
              </div>
              {selectedStageKey === stage.key && (
                <motion.div
                  layoutId="selected-indicator"
                  className="absolute inset-0 rounded-2xl border-2 border-white/30"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        <motion.div
          key={selectedStageKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center max-w-4xl mx-auto"
        >
          {selectedStage.description?.length > 0 && (
            <div className="">
              <p className="text-gray-800 text-lg leading-relaxed mb-4 font-medium">
                {selectedStage.description[0]}
              </p>
              {selectedStage.description[1] && (
                <p className="text-gray-800">{selectedStage.description[1]}</p>
              )}
            </div>
          )}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map(
            ({ title, details, duration, subtopics }, idx) => {
              const isExpanded = expandedTopics[title];
              const displaySubtopics = isExpanded
                ? subtopics
                : subtopics.slice(0, 4);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative group h-full bg-white rounded-xl shadow-lg border-l-4 ${currentStageConfig.border} overflow-hidden transition-all duration-300 hover:shadow-xl`} // New: Left border for stage
                >
                  <div className="p-5 relative">
                    {" "}
                    {/* Adjusted padding */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        className={`px-3 py-1 bg-white/90 backdrop-blur-sm ${currentStageConfig.text} text-xs font-medium rounded-full shadow-sm border border-gray-200`}
                      >
                        {selectedStage.label}
                      </Badge>
                    </div>
                    <h4 className="text-lg font-bold leading-tight text-gray-900 mb-2">
                      {title}
                    </h4>
                    <span className="flex items-center text-xs font-medium text-gray-600 mb-4">
                      <Clock className="w-3 h-3 mr-1 text-gray-500" />{" "}
                      {duration}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {details}
                    </p>
                  </div>
                  <div className="p-5 flex-grow">
                    {" "}
                    {/* Adjusted padding */}
                    {displaySubtopics?.length > 0 ? (
                      <ul className="space-y-3 mb-4">
                        {displaySubtopics.map((sub, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start group/item"
                          >
                            <span className="relative flex-shrink-0 mt-1">
                              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></span>
                              <span
                                className={`relative flex items-center justify-center w-5 h-5 ${currentStageConfig.iconBg} rounded-full shadow-sm`} // Use iconBg
                              >
                                <svg
                                  className={`w-3 h-3 ${currentStageConfig.iconText}`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  {" "}
                                  {/* Use iconText */}
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                            </span>
                            <span className="ml-3 text-gray-800 text-sm font-medium leading-tight group-hover/item:text-blue-600 transition-colors">
                              {sub}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 text-sm mb-6">
                        No subtopics listed
                      </p>
                    )}
                    {subtopics.length > 4 && (
                      <button
                        onClick={() => toggleExpand(title)}
                        className="text-blue-600 text-sm font-medium hover:text-blue-800 focus:outline-none transition-colors flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronDown className="w-4 h-4" /> Show Less
                          </>
                        ) : (
                          <>
                            <ChevronRight className="w-4 h-4" /> See{" "}
                            {subtopics.length - 4} More Topics
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="p-5 pt-0">
                    {" "}
                    {/* Adjusted padding */}
                    <button
                      onClick={() =>
                        setSelectedTopic({
                          title,
                          links: resourceLinks[title] || [],
                        })
                      }
                      className={`w-full bg-gradient-to-r ${currentStageConfig.gradient} hover:shadow-lg text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center justify-between transition-all duration-300 group/btn shadow-md hover:shadow-xl`} // New button style
                    >
                      <span>Explore Resources</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
        {selectedStage.items.length > 6 && (
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={() => {
                if (showAllTopics) {
                  setShowAllTopics(false);
                  roadmapRef.current?.scrollIntoView({ behavior: "smooth" });
                } else {
                  setShowAllTopics(true);
                }
              }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold transition-shadow shadow-md hover:shadow-lg bg-gradient-to-r ${currentStageConfig.gradient}`}
            >
              {showAllTopics ? (
                <>
                  <ChevronDown className="w-5 h-5" /> See Less
                </>
              ) : (
                <>
                  <ChevronRight className="w-5 h-5" /> See All Topics
                </>
              )}
            </motion.button>
          </div>
        )}
      </section>
      <AnimatePresence>
        {selectedTopic && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTopic(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden pointer-events-auto border border-gray-200"
              >
                <div
                  className={`bg-gradient-to-r ${currentStageConfig.gradient} p-6 text-white`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {selectedTopic.title}
                      </h3>
                      <p className="text-green-100">
                        Curated learning resources
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedTopic(null)}
                      className="p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {selectedTopic.links.length > 0 ? (
                    <div className="space-y-4">
                      {selectedTopic.links.map((link, index) => (
                        <motion.a
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group flex items-start"
                        >
                          <div
                            className={`bg-gradient-to-r ${currentStageConfig.gradient} p-3 rounded-xl mr-4 group-hover:shadow-lg transition-shadow flex-shrink-0`}
                          >
                            <BookOpen className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                              {link.text}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {new URL(link.url).hostname.replace("www.", "")}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors mt-1" />
                        </motion.a>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="mx-auto w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-gray-700 font-medium text-lg mb-2">
                        No resources available
                      </h4>
                      <p className="text-gray-500">
                        We're working on adding resources for this topic
                      </p>
                    </motion.div>
                  )}
                </div>
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="w-full px-6 py-3 rounded-2xl bg-white hover:bg-gray-100 text-gray-700 text-sm font-medium border border-gray-300 transition-colors shadow-sm hover:shadow-md"
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
