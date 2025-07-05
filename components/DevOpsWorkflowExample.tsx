"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  GitBranch, 
  ShieldCheck, 
  CloudUpload, 
  Codepen, 
  ShipWheel, 
  Activity,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

const workflowSteps = [
  {
    id: 1,
    title: "Code Commit",
    description: "Developers push code to GitHub repository triggering CI/CD pipeline",
    icon: GitBranch,
    color: "bg-blue-500",
    tools: "GitHub, Git",
    environment: "Development"
  },
  {
    id: 2,
    title: "Build & Scan",
    description: "Container image built, scanned for vulnerabilities with Trivy, and tested",
    icon: ShieldCheck,
    color: "bg-green-500",
    tools: "Docker, Trivy",
    environment: "CI Pipeline"
  },
  {
    id: 3,
    title: "Push to Registry",
    description: "Approved images pushed to Azure Container Registry (ACR)",
    icon: CloudUpload,
    color: "bg-purple-500",
    tools: "Azure ACR",
    environment: "Artifact Repository"
  },
  {
    id: 4,
    title: "Infrastructure Provisioning",
    description: "Terraform/Pulumi provisions cloud resources and Kubernetes clusters",
    icon: Codepen,
    color: "bg-amber-500",
    tools: "Terraform, Pulumi",
    environment: "Cloud Provider"
  },
  {
    id: 5,
    title: "Kubernetes Deployment",
    description: "Helm charts deploy applications to Kubernetes clusters",
    icon: ShipWheel,
    color: "bg-rose-500",
    tools: "Helm, Kubernetes",
    environment: "Production"
  },
  {
    id: 6,
    title: "Monitoring & Validation",
    description: "Prometheus/Grafana monitoring with automated smoke tests",
    icon: Activity,
    color: "bg-indigo-500",
    tools: "Prometheus, Grafana",
    environment: "Monitoring"
  }
];

export function DevOpsWorkflowExample() {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % workflowSteps.length);
      setProgress(0); // Reset progress on step change
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, workflowSteps.length]);

  useEffect(() => {
    if (!autoPlay) return;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + (100 / 30); // 3 second duration (100/30 = ~3.33% per 100ms)
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [autoPlay]);

  const nextStep = () => {
    setCurrentStep(prev => (prev + 1) % workflowSteps.length);
    setAutoPlay(false);
    setProgress(0);
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev - 1 + workflowSteps.length) % workflowSteps.length);
    setAutoPlay(false);
    setProgress(0);
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
    setAutoPlay(false);
    setProgress(0);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-6 sm:px-12 lg:px-20 rounded-2xl shadow-xl border border-gray-100 max-w-7xl mx-auto mb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enterprise-Grade DevOps Workflow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kubernetes-based deployment pipeline implemented for Mahar Bawga Money
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Diagram Section */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0" />
            <div className="relative aspect-[16/10]">
              <Image
                src="/mbf.png"
                alt="DevOps workflow diagram"
                fill
                className="object-contain p-6"
                quality={100}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 text-center">
              <p className="text-sm font-light">End-to-end CI/CD pipeline with security scanning and GitOps</p>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Workflow Steps</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={prevStep}
                    className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button 
                    onClick={nextStep}
                    className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="relative h-96">
                <div 
                  key={workflowSteps[currentStep].id}
                  className={`absolute inset-0 p-6 rounded-3xl border ${workflowSteps[currentStep].color.replace('bg', 'border')} bg-white shadow-lg transition-all duration-500`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`${workflowSteps[currentStep].color} p-3 rounded-xl text-white`}>
                      {React.createElement(workflowSteps[currentStep].icon, { className: "h-8 w-8" })}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500">STEP {currentStep + 1}</span>
                      <h4 className="text-xl font-bold text-gray-900">{workflowSteps[currentStep].title}</h4>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{workflowSteps[currentStep].description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${workflowSteps[currentStep].color}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {currentStep + 1}/{workflowSteps.length}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-500">Tools Used</p>
                        <p className="font-medium">{workflowSteps[currentStep].tools}</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-500">Environment</p>
                        <p className="font-medium">{workflowSteps[currentStep].environment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {workflowSteps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    className={`w-3 h-3 rounded-full transition-all ${currentStep === index ? workflowSteps[currentStep].color + ' opacity-100' : 'bg-gray-300 opacity-50'}`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-5 rounded-2xl transition-transform hover:scale-[1.02]">
                <h4 className="font-bold mb-2">75% Faster Deployments</h4>
                <p className="text-blue-100 text-sm">Automated pipelines reduced deployment time from hours to minutes</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-5 rounded-2xl transition-transform hover:scale-[1.02]">
                <h4 className="font-bold mb-2">Zero Downtime</h4>
                <p className="text-green-100 text-sm">Blue-green deployments ensured 100% uptime during releases</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white p-5 rounded-2xl transition-transform hover:scale-[1.02]">
                <h4 className="font-bold mb-2">99.95% Uptime</h4>
                <p className="text-purple-100 text-sm">Kubernetes clustering and monitoring achieved enterprise SLA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these to your global CSS or in a style tag */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}