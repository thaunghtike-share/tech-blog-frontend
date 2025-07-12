"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalFooter } from "@/components/minimal-footer"
import {
  Dock,
  ShieldCheck,
  Cloud,
  Server,
  Activity,
  ExternalLink,
  Code,
  Zap,
  Lock,
  Layers,
  Sparkles,
  Database,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Star,
  GitBranch,
  RefreshCw,
  BellRing,
  MessageSquare,
  Cpu,
  MemoryStick,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function MonolithicToCloudNativePage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-x-hidden">
      {/* Messenger Floating Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on Messenger"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-2 cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none" className="w-8 h-8 rounded-full">
          <defs>
            <linearGradient id="messengerGradient" x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E1306C" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="120" fill="url(#messengerGradient)" />
          <path fill="#fff" d="M158.8 80.2l-37.8 44.3-19-2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z" />
        </svg>
        <span className="font-medium text-gray-900 select-none text-sm whitespace-nowrap">Chat?</span>
      </a>

      <MinimalHeader />

      <main className="mt-4 max-w-7xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Rocket className="w-4 h-4 mr-2" />
              Cloud Migration Service
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              Monolithic to Cloud-Native Migration
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-4xl mx-auto">
              Transform your legacy monolithic applications into scalable, cloud-native solutions using modern DevOps
              practices and infrastructure automation.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Cloud className="w-4 h-4 mr-2" />
                Cloud-Native
              </Badge>
              <Badge className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Layers className="w-4 h-4 mr-2" />
                Microservices
              </Badge>
              <Badge className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Zap className="w-4 h-4 mr-2" />
                DevOps Automation
              </Badge>
              <Badge className="px-4 py-2 bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Lock className="w-4 h-4 mr-2" />
                Security First
              </Badge>
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Complete DevOps Architecture</h2>
            <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our end-to-end solution covers infrastructure provisioning, CI/CD automation, container orchestration, and
              comprehensive monitoring with enterprise-grade security.
            </p>
          </div>
          <Card className="overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-8">
              <div className="relative h-[500px] w-full bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <Image
                  src="/dinger.png"
                  alt="Complete DevOps Architecture Diagram"
                  fill
                  className="object-contain p-4"
                  quality={100}
                  priority
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: "99.9%", label: "Uptime SLA", color: "blue", icon: CheckCircle2 },
              { value: "50%", label: "Cost Reduction", color: "green", icon: ArrowRight },
              { value: "10x", label: "Faster Deployments", color: "purple", icon: Zap },
              { value: "24/7", label: "Monitoring", color: "orange", icon: Activity },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mb-3">
                  <stat.icon
                    className={`w-6 h-6 mx-auto text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 1: Terraform Infrastructure */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">1</span>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Infrastructure as Code with Terraform
              </h2>
              <p className="text-base text-gray-600">Automated, reproducible cloud infrastructure provisioning</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {/* Why Terraform Section */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    Why Choose Terraform?
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    The industry standard for Infrastructure as Code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      {
                        icon: Code,
                        title: "Infrastructure as Code",
                        desc: "Version-controlled, repeatable infrastructure deployments with GitOps workflows",
                        color: "green",
                      },
                      {
                        icon: Cloud,
                        title: "Multi-Cloud Excellence",
                        desc: "Deploy seamlessly across Azure, AWS, GCP with consistent workflows and best practices",
                        color: "purple",
                      },
                      {
                        icon: ShieldCheck,
                        title: "State Management",
                        desc: "Advanced state management with remote backends and state locking for team collaboration",
                        color: "orange",
                      },
                      {
                        icon: Zap,
                        title: "Cost Optimization",
                        desc: "Right-size resources, implement auto-scaling, and optimize costs with intelligent resource management",
                        color: "blue",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white/80 rounded-xl backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300 group"
                      >
                        <div
                          className={`p-2 bg-${item.color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Terraform Modules Section */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    My Production-Ready Terraform Modules
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Battle-tested, enterprise-grade infrastructure modules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="group p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Cloud className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">Azure Infrastructure Module</h4>
                            <p className="text-gray-600 mb-2 text-sm">
                              Complete Azure setup with AKS, ACR, VNet, and monitoring
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs font-medium">
                                AKS
                              </Badge>
                              <Badge variant="secondary" className="text-xs font-medium">
                                ACR
                              </Badge>
                              <Badge variant="secondary" className="text-xs font-medium">
                                VNet
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 border-blue-300 text-blue-700 hover:border-blue-500 bg-transparent"
                          onClick={() => window.open("https://github.com/thaunghtike-share/terraform-azure", "_blank")}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Module
                        </Button>
                      </div>
                    </div>

                    <div className="group p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Server className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1">AWS EKS Spot Instance Module</h4>
                            <p className="text-gray-600 mb-2 text-sm">
                              Cost-effective EKS cluster with spot instances and auto-scaling
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs font-medium">
                                EKS
                              </Badge>
                              <Badge variant="secondary" className="text-xs font-medium">
                                Spot Instances
                              </Badge>
                              <Badge variant="secondary" className="text-xs font-medium">
                                Auto-scaling
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 border-orange-300 text-orange-700 hover:border-orange-500 bg-transparent"
                          onClick={() =>
                            window.open("https://github.com/thaunghtike-share/terraform-aws-kubespot", "_blank")
                          }
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Module
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources Deployed */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
                      <Server className="w-5 h-5 text-white" />
                    </div>
                    Resources Deployed
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Complete infrastructure stack with security and monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Server, label: "AKS Cluster", color: "blue" },
                      { icon: Dock, label: "Container Registry", color: "green" },
                      { icon: Cloud, label: "Virtual Networks", color: "purple" },
                      { icon: Activity, label: "Monitoring Stack", color: "orange" },
                      { icon: ShieldCheck, label: "Security Policies", color: "red" },
                      { icon: Database, label: "Databases", color: "yellow" },
                    ].map((resource, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-3 bg-${resource.color}-50 rounded-lg border border-${resource.color}-200 hover:shadow-md transition-all duration-300 group cursor-pointer`}
                      >
                        <resource.icon
                          className={`w-4 h-4 text-${resource.color}-600 group-hover:scale-110 transition-transform duration-300`}
                        />
                        <span className="text-sm font-semibold text-gray-800">{resource.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Usage Example */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    Real-World Usage Example
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Deploy complete Azure infrastructure with a single module call
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 border border-slate-200 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed shadow-inner font-mono">
                      {`# main.tf - Complete Azure Infrastructure
module "infra" {
  source = "./terraform-azurerm"
  
  vnets = {
    myvnet = {
      name                = "myvnet"
      location            = "southeastasia"
      resource_group_name = "dev"
      address_space       = ["10.100.0.0/16"]
      subnets = {
        default = {
          resource_group_name = "dev"
          address_prefix      = "10.100.1.0/24"
        }
      }
    }
  }
  
  acr_registries = {
    myacrk8s12345 = {
      create               = true
      resource_group_name = "dev"
      location            = "southeastasia"
      sku                 = "Basic"
      admin_enabled       = true
    }
  }
  
  # AKS Cluster Configuration
  aks_clusters = {
    dev-cluster = {
      resource_group_name = "dev"
      location            = "southeastasia"
      dns_prefix          = "devaks"
      default_node_pool = {
        name       = "default"
        node_count = 2
        vm_size    = "Standard_D2_v2"
      }
      # Enable monitoring and security
      enable_monitoring = true
      enable_rbac      = true
    }
  }
  
  tags = {
    Environment = "development"
  }
}`}
                    </pre>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-100 text-green-800 border border-green-200 shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        Production Ready
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 2: GitHub Actions CI/CD */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">2</span>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">CI/CD Pipeline with GitHub Actions</h2>
              <p className="text-base text-gray-600">Automated build, test, and deployment workflows</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {/* Pipeline Overview */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    Complete CI/CD Workflow
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    From code commit to production deployment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      {
                        step: "1",
                        title: "Docker Build & Push",
                        desc: "Multi-platform container builds with environment-specific configurations",
                        color: "blue",
                        icon: Dock,
                      },
                      {
                        step: "2",
                        title: "Push to ACR",
                        desc: "Secure image storage in Azure Container Registry with automated tagging",
                        color: "indigo",
                        icon: Database,
                      },
                      {
                        step: "3",
                        title: "Security Scanning",
                        desc: "Trivy vulnerability scanning for HIGH and CRITICAL security issues",
                        color: "red",
                        icon: ShieldCheck,
                      },
                      {
                        step: "4",
                        title: "ArgoCD Deployment",
                        desc: "GitOps-based deployment with automated sync and verification",
                        color: "purple",
                        icon: Rocket,
                      },
                      {
                        step: "5",
                        title: "Health Verification",
                        desc: "Automated deployment verification and rollback on failure",
                        color: "green",
                        icon: CheckCircle2,
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-white/80 rounded-xl backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                            {item.step}
                          </div>
                          <div
                            className={`p-2 bg-${item.color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Branch Strategy */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    Multi-Environment Strategy
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Automated deployments across development lifecycle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { branch: "main", env: "Production", color: "red", desc: "Stable production releases" },
                      { branch: "dev", env: "Development", color: "blue", desc: "Feature development and testing" },
                      { branch: "uat", env: "UAT", color: "orange", desc: "User acceptance testing environment" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 bg-${item.color}-50 rounded-lg border border-${item.color}-200 hover:shadow-md transition-all duration-300 group cursor-pointer`}
                      >
                        <div
                          className={`p-2 bg-${item.color}-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Code className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">{item.branch}</span>
                            <span className="text-xs text-gray-500">→</span>
                            <span className="text-sm font-semibold text-gray-800">{item.env}</span>
                          </div>
                          <p className="text-xs text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Workflow Animation */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    Pipeline Workflow
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Automated deployment pipeline visualization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Workflow Steps */}
                    <div className="relative">
                      {[
                        { icon: Code, label: "Code Push", status: "completed" },
                        { icon: Dock, label: "Docker Build", status: "completed" },
                        { icon: Database, label: "Push to ACR", status: "completed" },
                        { icon: ShieldCheck, label: "Security Scan", status: "running" },
                        { icon: Cloud, label: "Deploy to AKS", status: "pending" },
                        { icon: CheckCircle2, label: "Verify Health", status: "pending" },
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center gap-3 p-3 rounded-lg"
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              step.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : step.status === "running"
                                  ? "bg-blue-100 text-blue-600 animate-pulse"
                                  : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            <step.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span
                              className={`text-sm font-medium ${
                                step.status === "completed"
                                  ? "text-green-700"
                                  : step.status === "running"
                                    ? "text-blue-700"
                                    : "text-gray-500"
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              step.status === "completed"
                                ? "bg-green-500"
                                : step.status === "running"
                                  ? "bg-blue-500 animate-pulse"
                                  : "bg-gray-300"
                            }`}
                          />
                        </motion.div>
                      ))}
                      {/* Connecting Line */}
                      <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    Pipeline Features
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Enterprise-grade CI/CD capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { icon: Zap, label: "Self-hosted Runners", desc: "Faster builds with dedicated infrastructure" },
                      { icon: ShieldCheck, label: "Security First", desc: "Trivy scanning & secret management" },
                      { icon: Activity, label: "Real-time Monitoring", desc: "Google Chat notifications & alerts" },
                      { icon: Rocket, label: "Zero Downtime", desc: "Blue-green deployments with rollback" },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="p-1.5 bg-orange-100 rounded-lg flex-shrink-0">
                          <feature.icon className="w-3 h-3 text-orange-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm mb-1">{feature.label}</h5>
                          <p className="text-gray-600 text-xs leading-relaxed">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 3: ArgoCD & AKS Sync */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">3</span>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                GitOps with ArgoCD for AKS Deployments
              </h2>
              <p className="text-base text-gray-600">Declarative, automated deployments to Azure Kubernetes Service</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {/* ArgoCD Overview */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                      <GitBranch className="w-5 h-5 text-white" />
                    </div>
                    ArgoCD: The GitOps Way
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Automated synchronization of desired state from Git
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      {
                        icon: GitBranch,
                        title: "Declarative Deployments",
                        desc: "Define application state in Git, ArgoCD ensures cluster matches",
                        color: "blue",
                      },
                      {
                        icon: RefreshCw,
                        title: "Automated Sync",
                        desc: "Continuously monitors Git repos and automatically syncs changes to AKS",
                        color: "green",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Rollback & Health Checks",
                        desc: "Easy rollbacks to previous versions and automated health monitoring",
                        color: "orange",
                      },
                      {
                        icon: Layers,
                        title: "Helm Chart Support",
                        desc: "Manages deployments using Helm charts for complex applications",
                        color: "purple",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white/80 rounded-xl backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300 group"
                      >
                        <div
                          className={`p-2 bg-${item.color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ArgoCD Admin Portal */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                      <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    ArgoCD Admin Portal
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Centralized management and visualization of your applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[300px] w-full bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                    <Image
                      src="/argocd.png?height=300&width=500"
                      alt="ArgoCD Admin Portal Screenshot"
                      fill
                      className="object-contain p-4"
                      quality={100}
                    />
                  </div>
                  <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                    The ArgoCD UI provides a comprehensive overview of your applications, their health, and
                    synchronization status. You can easily drill down into individual resources, view logs, and perform
                    manual syncs or rollbacks.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* ArgoCD Helm Repo Example */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    ArgoCD Application Definition (Helm)
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Example of an ArgoCD Application resource for a Helm chart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 border border-slate-200 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed shadow-inner font-mono">
                      {`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: exchange-backend-dev
  namespace: argocd
  annotations:
    argocd-image-updater.argoproj.io/image-list: myalias=mahar.azurecr.io/exchange-backend-dev
    argocd-image-updater.argoproj.io/myalias.update-strategy: latest
    argocd-image-updater.argoproj.io/write-back-method: git
    argocd-image-updater.argoproj.io/git-branch: dev
    argocd-image-updater.argoproj.io/myalias.force-update: "true"
spec:
  destination:
    namespace: dev
    name: in-cluster
  project: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: false
    syncOptions:
      - CreateNamespace=true
      - ApplyOutOfSyncOnly=true
  source:
    path: helm_charts/exchange-backend-dev
    repoURL: git@github.com:MarharbawgaMoney/kubernetes.git
    targetRevision: dev
`}
                    </pre>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-100 text-purple-800 border border-purple-200 shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        GitOps Ready
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ArgoCD Application Design */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    What is GitOps and ArgoCD? 
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                  <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                    GitOps is a software engineering practice that uses a Git repository as its single source of truth. Teams commit declarative configurations into Git, and these configurations are used to create environments needed for the continuous delivery process. There is no manual setup of environments and no use of standalone scripts—everything is defined through the Git repository. 
                  </p>
                  <p className="text-gray-700 text-sm mt-4 leading-relaxed">  
                    A basic part of the GitOps process is a pull request. New versions of a configuration are introduced via pull request, merged with the main branch in the Git repository, and then the new version is automatically deployed. The Git repository contains a full record of all changes, including all details of the environment at every stage of the process. Argo CD handles the latter stages of the GitOps process, ensuring that new configurations are correctly deployed to a Kubernetes cluster.
                  </p></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[300px] w-full bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                    <Image
                      src="/argo.png?height=300&width=500"
                      alt="ArgoCD Application View Screenshot"
                      fill
                      className="object-contain p-4"
                      quality={100}
                    />
                  </div>
                  <p className="text-gray-700 text-sm mt-4 leading-relaxed">
                   Argo CD is a Kubernetes-native continuous deployment (CD) tool. Unlike external CD tools that only enable push-based deployments, Argo CD can pull updated code from Git repositories and deploy it directly to Kubernetes resources. It enables developers to manage both infrastructure configuration and application updates in one system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 4: ArgoCD Image Updater */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">4</span>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Automated Image Updates with ArgoCD Image Updater
              </h2>
              <p className="text-base text-gray-600">
                Keep your applications up-to-date with the latest container images
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {/* Image Updater Overview */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
                      <RefreshCw className="w-5 h-5 text-white" />
                    </div>
                    Seamless Image Rollouts
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Automated updates for container images in your GitOps workflow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      {
                        icon: Dock,
                        title: "Container Registry Integration",
                        desc: "Monitors Docker Hub, ACR, ECR, GCR for new image tags",
                        color: "blue",
                      },
                      {
                        icon: GitBranch,
                        title: "Git Commit Automation",
                        desc: "Automatically updates image tags in Git and triggers ArgoCD sync",
                        color: "green",
                      },
                      {
                        icon: Zap,
                        title: "Zero-Touch Updates",
                        desc: "Eliminates manual intervention for image updates, reducing human error",
                        color: "purple",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Version Pinning",
                        desc: "Supports various update strategies (e.g., latest, semver) for controlled rollouts",
                        color: "orange",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white/80 rounded-xl backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300 group"
                      >
                        <div
                          className={`p-2 bg-${item.color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Image Updater Config Example */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    ArgoCD Image Updater Configuration
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Example of image update configuration in ArgoCD Application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 border border-slate-200 p-6 rounded-xl overflow-x-auto text-sm leading-relaxed shadow-inner font-mono">
                      {`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  annotations:
    argocd-image-updater.argoproj.io/image-list: my-image=myregistry/my-image
    argocd-image-updater.argoproj.io/my-image.update-strategy: latest
    argocd-image-updater.argoproj.io/my-image.allow-tags: regexp:^v\\d{1}\\.\\d{1}\\.\\d{1}$
    argocd-image-updater.argoproj.io/write-back-method: git
    argocd-image-updater.argoproj.io/git-branch: main
spec:
  project: default
  source:
    repoURL: https://github.com/my-org/my-gitops-repo.git
    targetRevision: HEAD
    path: apps/my-app
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  # ... other syncPolicy, etc.
`}
                    </pre>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-100 text-orange-800 border border-orange-200 shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        Automated
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Step 5: Monitoring and Logging */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">5</span>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Comprehensive Monitoring & Alerting</h2>
              <p className="text-base text-gray-600">
                Real-time insights and proactive notifications for your cloud-native applications
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {/* Monitoring Stack Overview */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    Unified Observability Stack
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Prometheus, Grafana, Loki, and Azure Monitor for full visibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    {[
                      {
                        icon: Activity,
                        title: "Prometheus for Metrics",
                        desc: "Collects and stores time-series data from Kubernetes and applications",
                        color: "blue",
                      },
                      {
                        icon: MessageSquare,
                        title: "Loki for Logs",
                        desc: "Centralized log aggregation for easy troubleshooting and analysis",
                        color: "green",
                      },
                      {
                        icon: LayoutDashboard,
                        title: "Grafana Dashboards",
                        desc: "Visualize metrics and logs with custom dashboards for real-time insights",
                        color: "purple",
                      },
                      {
                        icon: Cloud,
                        title: "Azure Monitor Integration",
                        desc: "Leverage Azure's native monitoring for cloud resources and services",
                        color: "orange",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white/80 rounded-xl backdrop-blur-sm border border-white/50 hover:bg-white/90 transition-all duration-300 group"
                      >
                        <div
                          className={`p-2 bg-${item.color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className={`w-4 h-4 text-${item.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h4>
                          <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Grafana Dashboards Example */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                      <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    Grafana Dashboards for Key Metrics
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Visualize performance and resource utilization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Cpu,
                        label: "Azure SQL CPU Usage",
                        desc: "Monitor CPU utilization of your Azure SQL Database instances",
                        color: "blue",
                        image: "/placeholder.svg?height=150&width=300",
                      },
                      {
                        icon: MemoryStick,
                        label: "Kubernetes Pod CPU/Memory",
                        desc: "Track resource consumption for individual pods and deployments",
                        color: "green",
                        image: "/placeholder.svg?height=150&width=300",
                      },
                      {
                        icon: Server,
                        label: "Node Resource Usage",
                        desc: "Overview of CPU, memory, and disk usage across AKS nodes",
                        color: "purple",
                        image: "/placeholder.svg?height=150&width=300",
                      },
                    ].map((metric, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-1.5 bg-blue-100 rounded-lg flex-shrink-0">
                            <metric.icon className="w-3 h-3 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900 text-sm mb-1">{metric.label}</h5>
                            <p className="text-gray-600 text-xs leading-relaxed">{metric.desc}</p>
                          </div>
                        </div>
                        <div className="relative h-[150px] w-full bg-white rounded-lg border border-gray-100 overflow-hidden">
                          <Image
                            src={metric.image || "/placeholder.svg"}
                            alt={`${metric.label} Dashboard`}
                            layout="fill"
                            objectFit="contain"
                            quality={100}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Google Chat Alerts */}
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                      <BellRing className="w-5 h-5 text-white" />
                    </div>
                    Proactive Alerting with Google Chat
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Instant notifications for critical events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Zap,
                        label: "Pod Failure Alerts",
                        desc: "Receive immediate notifications when a Kubernetes pod fails or crashes",
                        color: "red",
                      },
                      {
                        icon: RefreshCw,
                        label: "Pod Restart Alerts",
                        desc: "Get alerts for unexpected pod restarts, indicating potential issues",
                        color: "orange",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Security Alerts",
                        desc: "Notify on security vulnerabilities detected by Trivy or other scanners",
                        color: "purple",
                      },
                      {
                        icon: Cloud,
                        label: "Resource Exceeded Alerts",
                        desc: "Alerts when CPU/memory limits are approached or exceeded for pods/nodes",
                        color: "blue",
                      },
                    ].map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="p-1.5 bg-green-100 rounded-lg flex-shrink-0">
                          <alert.icon className="w-3 h-3 text-green-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm mb-1">{alert.label}</h5>
                          <p className="text-gray-600 text-xs leading-relaxed">{alert.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-12">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl transform -rotate-1"></div>

            {/* Main content */}
            <Card className="relative border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-10 lg:p-12">
                <div className="max-w-4xl mx-auto text-center">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full mb-4">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Ready to Get Started?</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      Transform Your Application
                      <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                        Into the Cloud
                      </span>
                    </h2>
                    <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                      Let's migrate your monolithic application to a modern, scalable, cloud-native architecture with
                      our proven methodology and expert guidance.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Schedule Free Consultation
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 bg-white"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      View Success Stories
                    </Button>
                  </div>

                  {/* Trust indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">100% Success Rate</h4>
                      <p className="text-xs text-gray-600">All migrations completed successfully</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">2-4 Week Timeline</h4>
                      <p className="text-xs text-gray-600">Fast, efficient migration process</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                        <ShieldCheck className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">Enterprise Security</h4>
                      <p className="text-xs text-gray-600">Bank-level security standards</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <MinimalFooter />
    </div>
  )
}
