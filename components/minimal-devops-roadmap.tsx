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
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge"; // Ensure Badge is imported

interface RoadmapItem {
  title: string;
  duration: string;
  details: string; // Now includes the content previously in subtopics
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
        title: "Computer Fundamentals",
        details:
          "Gain a solid understanding of computer basics including hardware components, software types, operating system fundamentals, file organization, and essential internet concepts to build your foundational IT knowledge.",
        duration: "4 weeks",
      },
      {
        title: "Operating System Basics",
        details:
          "Explore how operating systems manage hardware resources, processes, memory, and files. Learn about process lifecycle, threading, user and kernel modes, and get hands-on experience with basic Linux and Windows command-line interfaces.",
        duration: "2 weeks",
      },
      {
        title: "Networking Fundamentals",
        details:
          "Learn how computers communicate over networks by studying different network types (LAN, WAN, PAN, MAN), the OSI and TCP/IP models, IP addressing and subnetting, ports and protocols like TCP/UDP, DNS and DHCP services, and network devices including switches, routers, and firewalls. Understand secure web protocols such as HTTP and HTTPS.",
        duration: "4 weeks",
      },
      {
        title: "Python Programming Basic",
        details:
          "Develop fundamental Python programming skills, covering variables, data types, operators, control flow structures (if statements, loops), functions, data collections like lists and dictionaries, file handling, error management with try/except, and an introduction to Python modules and packages.",
        duration: "12 weeks",
      },
      {
        title: "Virtualization",
        details:
          "Understand virtualization technologies, including different types such as hardware, software, network, and storage virtualization. Learn about hypervisors (Type 1 and Type 2), how virtual machines and containers work, their benefits in IT infrastructure, and basic management and troubleshooting techniques.",
        duration: "2 weeks",
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
        details:
          "Learn to navigate and manage Linux systems by understanding file systems and permissions, mastering shell navigation, process management, secure remote access via SSH, essential Linux commands, and user/group administration.",
        duration: "8 weeks",
      },
      {
        title: "Bash Scripting",
        details:
          "Automate repetitive tasks using bash scripting. Topics include bash syntax, variables, loops, conditionals, functions for modularity, input/output redirection, basic debugging, and scheduling scripts with cron jobs.",
        duration: "6 weeks",
      },
      {
        title: "CCNA",
        details:
          "Prepare for Cisco's CCNA certification by mastering core networking concepts such as OSI and TCP/IP models, IP addressing and subnetting, configuring Cisco devices through CLI, routing protocols like RIP and OSPF, VLAN and switching technologies, and implementing access control lists for network security.",
        duration: "10 weeks",
      },
      {
        title: "Cloud Fundamentals",
        details:
          "Understand cloud computing basics, including service models like IaaS, PaaS, SaaS, and explore major cloud providers (AWS, Azure, GCP). Learn to navigate cloud portals, grasp cloud regions and availability zones, and get introduced to cloud security essentials.",
        duration: "6 weeks",
      },
      {
        title: "Docker Fundamentals",
        details:
          "Get familiar with containerization concepts using Docker. Learn about container images and containers, how to write Dockerfiles, managing data with volumes, defining multi-container applications with Docker Compose, basic container networking, and container lifecycle management.",
        duration: "3 weeks",
      },
      {
        title: "YAML & JSON",
        details:
          "Work effectively with configuration file formats YAML and JSON. Learn their syntax and structure, how they are used in CI/CD pipelines, parsing techniques, key differences, and best practices to avoid common pitfalls.",
        duration: "1 week",
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
        title: "AWS DevOps Services",
        details:
          "Gain hands-on experience with AWS core services used in DevOps, including provisioning and managing EC2 instances, operating with S3 storage buckets, setting up IAM users and roles for secure access, understanding VPC networking fundamentals, monitoring with CloudWatch, and managing infrastructure via the AWS CLI.",
        duration: "6 weeks",
      },
      {
        title: "Azure DevOps Services",
        details:
          "Explore Azure’s DevOps capabilities by learning resource group management, provisioning virtual machines, configuring virtual networks and subnets, utilizing blob storage, and applying role-based access control (RBAC) for security.",
        duration: "6 weeks",
      },
      {
        title: "Version Control",
        details:
          "Master version control with Git by learning essential CLI commands, branching and merging workflows, creating and reviewing pull requests, collaborating on GitHub, resolving conflicts through rebasing, and managing release versions with tags.",
        duration: "3 weeks",
      },
      {
        title: "CICD Fundamentals",
        details:
          "Automate software delivery processes with continuous integration and continuous deployment. Understand the concepts of CI/CD, set up GitHub Actions and GitLab pipelines, integrate webhooks, implement unit testing within pipelines, and manage build artifacts for deployment.",
        duration: "4 weeks",
      },
      {
        title: "Kubernetes Essentials Part-I",
        details:
          "Learn container orchestration basics with Kubernetes by understanding pods and ReplicaSets, deploying and rolling out applications, networking concepts within clusters, configuring ingress controllers, managing namespaces and access control (RBAC), and setting resource limits and requests for workloads.",
        duration: "6 weeks",
      },
      {
        title: "Kubernetes Essentials Part-II",
        details:
          "Advance your Kubernetes skills with concepts such as horizontal pod autoscaling, managing persistent storage with volumes and claims, using secrets and config maps for configuration management, implementing liveness and readiness probes for health checks, event-driven autoscaling (KEDA), and maintaining availability with Pod Disruption Budgets.",
        duration: "6 weeks",
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
        title: "Logging & Monitoring",
        details:
          "Build comprehensive observability for your systems by learning Prometheus for metrics collection, Grafana for dashboard visualization, AlertManager for alerting, Loki for log aggregation, comparing ELK and EFK logging stacks, and distributed tracing using OpenTelemetry.",
        duration: "6 weeks",
      },
      {
        title: "Ansible",
        details:
          "Automate and manage infrastructure configuration using Ansible. Learn YAML syntax for playbooks, writing tasks, managing inventories and variables, organizing reusable roles, securing secrets with Ansible Vault, and running ad-hoc commands while ensuring idempotency.",
        duration: "10 weeks",
      },
      {
        title: "Terraform",
        details:
          "Provision and manage cloud infrastructure declaratively with Terraform. Understand HCL syntax, create reusable modules, configure providers and resources, manage Terraform state effectively, use remote backends (S3, Azure Blob, GCS), and organize environments with workspaces.",
        duration: "10 weeks",
      },
      {
        title: "GitOps with ArgoCD",
        details:
          "Implement GitOps workflows by deploying applications declaratively using ArgoCD. Learn how to install and configure ArgoCD, manage app lifecycles through Git repositories, integrate Helm charts, utilize sync and self-healing features, monitor application health, and configure RBAC for multi-tenant setups.",
        duration: "4 weeks",
      },
      {
        title: "Vault & Secrets Management",
        details:
          "Secure sensitive data in your infrastructure and pipelines by understanding Vault architecture, using secrets engines and dynamic secrets, managing access policies and tokens, integrating with Kubernetes using Vault Agent, enabling audit logging and lease management, and differentiating between KV secrets engine versions.",
        duration: "4 weeks",
      },
      {
        title: "Kubernetes Security",
        details:
          "Enhance security posture of Kubernetes clusters by mastering role-based access control (RBAC), enforcing Pod Security Standards, implementing network policies with tools like Calico or Cilium, configuring admission controllers, applying OPA Gatekeeper policies, and securing runtimes with technologies such as Seccomp and AppArmor.",
        duration: "10 weeks",
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
    {
      text: "W3 Schools",
      url: "https://www.w3schools.com/python/",
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
    {
      text: "Operating System Basic",
      url: "https://www.netacad.com/courses/operating-systems-basics?courseLang=en-US",
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
      text: "Ubuntu Command Line Basics",
      url: "https://ubuntu.com/tutorials/command-line-for-beginners",
    },
    {
      text: "TryHackMe | Linux Foundation",
      url: "https://tryhackme.com/module/linux-fundamentals",
    },
  ],
  "Cloud Fundamentals": [
    {
      text: "AWS Cloud Practitioner Essentials",
      url: "https://skillbuilder.aws/learn/94T2BEN85A/aws-cloud-practitioner-essentials/8D79F3AVR7",
    },
    {
      text: "Azure Fundamentals Learning Path",
      url: "https://learn.microsoft.com/en-us/training/azure/",
    },
  ],
  "Bash Scripting": [
    {
      text: "Bash Beginner Tutorial",
      url: "https://ryanstutorials.net/bash-scripting-tutorial/",
    },
    {
      text: "Linux Shell Scripting Tutorial",
      url: "https://linuxconfig.org/bash-scripting-tutorial-for-beginners",
    },
  ],
  "Docker Fundamentals": [
    {
      text: "Docker Get Started Guide",
      url: "https://docs.docker.com/get-started/",
    },
    {
      text: "Docker Compose Overview",
      url: "https://docs.docker.com/compose/",
    },
  ],
  "YAML & JSON": [
    {
      text: "YAML Tutorial",
      url: "https://www.tutorialspoint.com/yaml/index.htm",
    },
    {
      text: "JSON Official Guide",
      url: "https://www.json.org/json-en.html",
    },
  ],
  CCNA: [
    {
      text: "Cisco CCNA Introduction",
      url: "https://www.netacad.com/courses/ccna-introduction-networks?courseLang=en-US",
    },
    {
      text: "Study CCNA",
      url: "https://study-ccna.com/",
    },
    {
      text: "Cisco Packet Tracer Tutorials",
      url: "https://www.netacad.com/courses/packet-tracer",
    },
  ],
  "AWS DevOps Services": [
    {
      text: "AWS DevOps Learning Plan",
      url: "https://skillbuilder.aws/learning-plan/FMP175FCDT/devops-engineer-learning-plan-includes-labs/P8E3Q12Q6H",
    },
    {
      text: "AWS EC2 Essentials",
      url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
    },
    {
      text: "IAM Best Practices",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html",
    },
    {
      text: "AWS S3 Documentation",
      url: "https://docs.aws.amazon.com/s3/index.html",
    },
  ],
  "Azure DevOps Services": [
    {
      text: "Azure Fundamentals Learning Path",
      url: "https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/",
    },
    {
      text: "Azure Resource Manager Overview",
      url: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview",
    },
    {
      text: "Azure Storage Documentation",
      url: "https://learn.microsoft.com/en-us/azure/storage/",
    },
    {
      text: "Azure Virtual Network",
      url: "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview",
    },
  ],
  "Version Control": [
    {
      text: "Git Official Docs",
      url: "https://git-scm.com/doc",
    },
    {
      text: "Learn Git Branching (Interactive)",
      url: "https://learngitbranching.js.org/",
    },
    {
      text: "GitHub Docs",
      url: "https://docs.github.com/en/get-started",
    },
    {
      text: "Pro Git Book (Free)",
      url: "https://git-scm.com/book/en/v2",
    },
  ],
  "Kubernetes Essentials Part-I": [
    {
      text: "Kubernetes Basics (Interactive)",
      url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
    },
    {
      text: "Pods and Deployments",
      url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
    },
    {
      text: "Kubernetes Services and Networking",
      url: "https://kubernetes.io/docs/concepts/services-networking/service/",
    },
    {
      text: "Ingress Overview",
      url: "https://kubernetes.io/docs/concepts/services-networking/ingress/",
    },
  ],
  "Kubernetes Essentials Part-II": [
    {
      text: "Kubernetes HPA",
      url: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
    },
    {
      text: "ConfigMaps and Secrets",
      url: "https://kubernetes.io/docs/concepts/configuration/secret/",
    },
    {
      text: "Volumes and Persistent Volumes",
      url: "https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
    },
    {
      text: "KEDA Autoscaling",
      url: "https://keda.sh/docs/",
    },
  ],
  "CICD Fundamentals": [
    {
      text: "GitHub Actions Docs",
      url: "https://docs.github.com/en/actions",
    },
    {
      text: "GitLab CI/CD Pipelines",
      url: "https://docs.gitlab.com/ee/ci/",
    },
  ],
  Terraform: [
    {
      text: "Terraform Getting Started",
      url: "https://developer.hashicorp.com/terraform/tutorials",
    },
    {
      text: "Terraform Docs",
      url: "https://developer.hashicorp.com/terraform/docs",
    },
    {
      text: "Terraform Best Practices",
      url: "https://www.terraform-best-practices.com/",
    },
  ],
  "GitOps with ArgoCD": [
    {
      text: "ArgoCD Official Docs",
      url: "https://argo-cd.readthedocs.io/en/stable/",
    },
    {
      text: "ArgoCD Helm Integration",
      url: "https://argo-cd.readthedocs.io/en/stable/user-guide/helm/",
    },
    {
      text: "ArgoCD RBAC",
      url: "https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/",
    },
  ],
  "Vault & Secrets Management": [
    {
      text: "Vault Official Learn Guides",
      url: "https://developer.hashicorp.com/vault/tutorials",
    },
    {
      text: "Vault Docs",
      url: "https://developer.hashicorp.com/vault/docs",
    },
    {
      text: "Vault Kubernetes Integration",
      url: "https://developer.hashicorp.com/vault/docs/platform/k8s",
    },
    {
      text: "Vault Dynamic Secrets",
      url: "https://developer.hashicorp.com/vault/docs/secrets",
    },
  ],
  "Kubernetes Security": [
    {
      text: "Kubernetes Security Overview",
      url: "https://kubernetes.io/docs/concepts/security/overview/",
    },
    {
      text: "Pod Security Standards (PSS)",
      url: "https://kubernetes.io/docs/concepts/security/pod-security-standards/",
    },
    {
      text: "OPA Gatekeeper Docs",
      url: "https://open-policy-agent.github.io/gatekeeper/website/docs/",
    },
    {
      text: "Kubernetes Network Policies",
      url: "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
    },
  ],
  "Logging & Monitoring": [
    {
      text: "Prometheus Docs",
      url: "https://prometheus.io/docs/introduction/overview/",
    },
    {
      text: "Grafana Dashboards",
      url: "https://grafana.com/docs/grafana/latest/dashboards/",
    },
    {
      text: "Loki for Logging",
      url: "https://grafana.com/docs/loki/latest/",
    },
    {
      text: "OpenTelemetry",
      url: "https://opentelemetry.io/docs/",
    },
  ],
  Ansible: [
    {
      text: "Ansible Getting Started",
      url: "https://docs.ansible.com/ansible/latest/getting_started/index.html",
    },
    {
      text: "Ansible Docs",
      url: "https://docs.ansible.com/",
    },
    {
      text: "Ansible Vault",
      url: "https://docs.ansible.com/ansible/latest/user_guide/vault.html",
    },
    {
      text: "Ansible Best Practices",
      url: "https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html",
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
  const className = "w-4 h-4 md:w-5 md:h-5";
  switch (stageKey) {
    case "prerequisite":
      return <Lightbulb className={className} />;
    case "beginner":
      return <BookOpen className={className} />;
    case "intermediate":
      return <Layers className={className} />;
    case "advanced":
      return <Shield className={className} />;
    default:
      return <Code className={className} />;
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
  const [showAllTopics, setShowAllTopics] = useState(false);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const selectedStage =
    roadmap.find((r) => r.key === selectedStageKey) || roadmap[0];
  const currentStageConfig =
    stageConfig[selectedStageKey as keyof typeof stageConfig];

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
            className="text-xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4"
          >
            DevOps Mastery Roadmap
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto"
          >
            A structured learning path from prerequisite to advanced DevOps
            concepts and tools.
          </motion.p>
        </div>
        {/* Mobile Dropdown - show only on mobile, hide md+ */}
        <div className="mb-8 px-4 md:hidden">
          <div className="relative">
            <motion.div
              className={`w-full rounded-2xl border-2 ${currentStageConfig.border} bg-white shadow-md overflow-hidden`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex items-center justify-center">
                {/* Left icon */}
                <div
                  className={`absolute left-4 p-1 rounded-lg ${currentStageConfig.iconBg}`}
                >
                  {getStageIcon(selectedStageKey)}
                </div>

                {/* Select element */}
                <select
                  className="w-full appearance-none bg-transparent py-4 pl-12 pr-12 text-center text-gray-700 text-base font-medium focus:outline-none"
                  value={selectedStageKey}
                  onChange={(e) => {
                    setSelectedStageKey(e.target.value);
                    setShowAllTopics(false);
                  }}
                >
                  {roadmap.map((stage) => (
                    <option
                      key={stage.key}
                      value={stage.key}
                      className="text-center"
                    >
                      {stage.label} ({stage.items.length} topics)
                    </option>
                  ))}
                </select>

                {/* Right chevron */}
                <ChevronDown
                  className={`absolute right-4 w-5 h-5 ${currentStageConfig.text} pointer-events-none`}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Stage Buttons - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex flex-wrap gap-2 mb-8 justify-center"
        >
          {roadmap.map((stage, index) => (
            <motion.button
              key={stage.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setSelectedStageKey(stage.key);
                setShowAllTopics(false);
              }}
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-2xl -mt-4 md:-mt-4 transition-all duration-300 ${
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
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-4 font-medium">
                {selectedStage.description[0]}
              </p>
              {selectedStage.description[1] && (
                <p className="text-gray-600 text-xs md:text-base">
                  {selectedStage.description[1]}
                </p>
              )}
            </div>
          )}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map(({ title, details, duration }, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative group h-full bg-white rounded-xl shadow-lg border-l-4 ${currentStageConfig.border} overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col`} // Added flex flex-col
              >
                <div className="p-5 relative flex-grow">
                  {" "}
                  {/* Added flex-grow */}
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
                    <Clock className="w-3 h-3 mr-1 text-gray-500" /> {duration}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {details}
                  </p>
                </div>
                <div className="p-5">
                  {" "}
                  {/* Changed pt-0 to p-5 for consistent padding */}
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
          })}
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
