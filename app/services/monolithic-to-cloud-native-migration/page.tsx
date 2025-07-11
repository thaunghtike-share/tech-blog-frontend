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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
                    <pre className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800 border border-slate-200 p-6 rounded-xl overflow-x-auto text-xs leading-relaxed shadow-inner font-mono">
                      {`# main.tf - Complete Azure Infrastructure
module "infra" {
  source = "./terraform-azurerm"
  
  # Resource Groups Configuration
  resource_groups = {
    dev = {
      location = "southeastasia"
    }
  }
  
  # Virtual Network Setup
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
  
  # Azure Container Registry
  acr_registries = {
    myacrk8s12345 = {
      create              = true
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
  
  # Tags for resource management
  tags = {
    Environment = "development"
    Project     = "cloud-migration"
    Owner       = "devops-team"
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