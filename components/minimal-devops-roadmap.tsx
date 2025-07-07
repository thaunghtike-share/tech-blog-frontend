"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Clock, BookOpen, Layers, Shield, Cloud, Code } from "lucide-react";

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

const roadmap: RoadmapStage[] = [
  {
    key: "beginner",
    label: "Beginner",
    description: [
      "Get started with foundational DevOps topics like Linux, Git, and scripting.",
      "Perfect for newcomers aiming to build strong technical basics.",
    ],
    items: [
      {
        title: "Linux & Networking",
        details: "Learn essential system and network skills.",
        duration: "2-3 weeks",
        subtopics: [
          "Basic CLI commands",
          "Permissions & file systems",
          "SSH setup",
          "IP, DNS, and ports",
        ],
      },
      {
        title: "Bash/Python Scripting",
        details: "Automate tasks using simple scripts.",
        duration: "2 weeks",
        subtopics: ["Bash syntax", "Conditional logic", "Loops", "Python basics"],
      },
      {
        title: "Git & GitOps",
        details: "Version control and GitOps workflows.",
        duration: "3 weeks",
        subtopics: [
          "Git branches & pull requests",
          "GitHub Actions basics",
          "Intro to ArgoCD",
          "Declarative deployments",
        ],
      },
      {
        title: "YAML & JSON",
        details: "Understand config formats used in DevOps.",
        duration: "1 week",
        subtopics: ["YAML syntax", "JSON structures", "Common use in CI/CD"],
      },
    ],
  },
  {
    key: "intermediate",
    label: "Intermediate",
    description: [
      "Build on your foundation with containers, pipelines, and cloud infrastructure.",
      "Suitable if you already know scripting and version control.",
    ],
    items: [
      {
        title: "Docker & Containers",
        details: "Package and run applications in containers.",
        duration: "2-3 weeks",
        subtopics: [
          "Docker CLI",
          "Dockerfile & images",
          "Volumes & networks",
          "docker-compose",
        ],
      },
      {
        title: "Kubernetes",
        details: "Orchestrate containers at scale.",
        duration: "4 weeks",
        subtopics: [
          "Pods & deployments",
          "Services & ingress",
          "ConfigMaps & secrets",
          "Helm basics",
        ],
      },
      {
        title: "CI/CD Pipelines",
        details: "Automate app delivery workflows.",
        duration: "3 weeks",
        subtopics: [
          "GitHub Actions",
          "Jenkins pipelines",
          "Triggers & webhooks",
          "Testing/staging environments",
        ],
      },
      {
        title: "Terraform",
        details: "Provision infrastructure using code.",
        duration: "3 weeks",
        subtopics: [
          "Terraform syntax",
          "Providers & resources",
          "Modules & state",
          "Azure/AWS basics",
        ],
      },
      {
        title: "Cloud Providers",
        details: "Learn core cloud services.",
        duration: "4 weeks",
        subtopics: ["AWS EC2/S3/IAM", "Azure RG/VNet/VM", "GCP basics"],
      },
    ],
  },
  {
    key: "advanced",
    label: "Advanced",
    description: [
      "Focus on scaling, security, and real projects with GitOps and observability.",
      "For those ready to operate production-grade systems.",
    ],
    items: [
      {
        title: "GitOps (ArgoCD)",
        details: "Declarative delivery with Git as the source of truth.",
        duration: "2 weeks",
        subtopics: [
          "ArgoCD setup",
          "Sync policies",
          "App manifests in Git",
          "Health/status checks",
        ],
      },
      {
        title: "Monitoring & Observability",
        details: "Track metrics, logs, and app performance.",
        duration: "3 weeks",
        subtopics: [
          "Prometheus metrics",
          "Grafana dashboards",
          "Loki logs",
          "ELK stack overview",
        ],
      },
      {
        title: "Security & Secrets",
        details: "Protect systems & data in production.",
        duration: "3 weeks",
        subtopics: [
          "Vault for secrets",
          "Kubernetes RBAC",
          "Pod security policies",
          "OPA/Gatekeeper",
        ],
      },
      {
        title: "Cost Optimization",
        details: "Reduce cloud costs effectively.",
        duration: "2 weeks",
        subtopics: [
          "Spot instances",
          "Auto-scaling",
          "Tagging strategies",
          "Rightsizing",
        ],
      },
      {
        title: "Certs & Real Projects",
        details: "Practice and prep for interviews & certs.",
        duration: "Varies",
        subtopics: [
          "Build infra with IaC",
          "Mock interviews",
          "CKA, Terraform, AWS certs",
        ],
      },
    ],
  },
];


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
  const selectedStage = roadmap.find((r) => r.key === selectedStageKey) || roadmap[0];

  if (!selectedStage) {
    return <div className="p-8 text-black">Error: No roadmap data available</div>;
  }

  return (
    <section className="mt-20 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <div className="w-full">
        <div className="flex items-center gap-3 mb-2">
          <Cloud className="w-6 h-6 text-blue-500" />
          <span className="text-sm font-medium text-black bg-blue-50 px-3 py-1 rounded-full">
            DevOps Learning Path
          </span>
        </div>
        
        <h2 className="text-4xl font-bold mb-6 text-black">
          Step-by-Step Roadmap
        </h2>

        {/* Stage selector tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-6">
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

        {/* Stage description with fallback */}
        <div className="mb-10">
          {selectedStage.description?.length > 0 ? (
            <>
              <p className="text-black text-lg leading-relaxed mb-4">
                {selectedStage.description[0]}
              </p>
              {selectedStage.description.length > 1 && (
                <p className="text-gray-700">{selectedStage.description[1]}</p>
              )}
            </>
          ) : (
            <p className="text-gray-500 italic">No description available for this stage</p>
          )}
        </div>

        {/* Cards with enhanced list styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {selectedStage.items?.map(({ title, details, duration, subtopics }, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md transition-all hover:border-blue-200 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl font-semibold text-black group-hover:text-blue-600 transition">
                  {title}
                </h4>
                <span className="flex items-center text-xs font-medium bg-blue-50 text-black px-2.5 py-1 rounded-full border border-gray-200">
                  <Clock className="w-3 h-3 mr-1 text-blue-500" />
                  {duration}
                </span>
              </div>
              
              <p className="text-gray-700 text-sm mb-4">{details}</p>
              
              {subtopics?.length > 0 ? (
                <ul className="mb-5 space-y-3">
                  {subtopics.map((sub, i) => (
                    <li key={i} className="flex items-start">
                      <span className="relative flex-shrink-0 mt-0.5">
                        <span className="absolute inset-0 bg-blue-100 rounded-full opacity-75 animate-pulse"></span>
                        <span className="relative flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </span>
                      <span className="ml-3 text-black text-sm font-medium leading-tight">
                        {sub}
                        <span className="block text-xs text-gray-500 font-normal mt-0.5">
                          Learn more about this topic
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm mb-5">No subtopics listed</p>
              )}
              
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition group-hover:underline">
                Explore resources
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}