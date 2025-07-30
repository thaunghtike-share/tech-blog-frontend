"use client";
import Image from "next/image";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  Dock,
  ShieldCheck,
  Cloud,
  Server,
  Activity,
  ExternalLink,
  Code,
  FileText,
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
  Terminal,
  Scale,
  Scan,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MonolithicToCloudNativePage() {
  const listItemStyle =
    "flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all duration-300 group";
  const iconWrapperStyle = (color: string) =>
    `p-2 bg-${color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`;
  const iconStyle = (color: string) => `w-4 h-4 text-${color}-600`;
  const titleStyle = "font-bold text-sm md:text-base text-gray-900 mb-1";
  const descStyle = "text-xs md:text-sm text-gray-600 leading-relaxed";

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm36 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      {/* Enhanced Visibility Messenger Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Messenger Support"
        className="fixed top-[70%] right-1 z-50 group"
      >
        <div className="flex items-center gap-2 relative">
          {/* Glow effect (more subtle) */}
          <div className="absolute -inset-1 bg-[#5e2ced]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Main button container */}
          <div className="flex items-center gap-3 bg-white/75 border border-gray-200 shadow-[0_5px_20px_-5px_rgba(94,44,237,0.3)] px-4 py-2.5 rounded-full cursor-pointer transition-all duration-400 hover:scale-[1.03] hover:shadow-[0_8px_25px_-5px_rgba(94,44,237,0.4)]">
            {/* Enhanced icon container */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Halo effect */}
              <div className="absolute w-full h-full bg-[#5e2ced] rounded-full opacity-10 group-hover:opacity-15 group-hover:scale-110 transition-all duration-500"></div>

              {/* Larger, clearer icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 240 240"
                className="w-8 h-8 relative z-10" // Increased from w-7 h-7
              >
                {/* Solid purple circle with better contrast */}
                <circle cx="120" cy="120" r="120" fill="#5e2ced" />
                {/* Larger white message icon */}
                <path
                  fill="#fff"
                  d="M158.8 80.2l-37.8 44.3-19.2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z"
                  transform="scale(1.05)" // Slightly larger message icon
                />
              </svg>
            </div>

            {/* Text label */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#5e2ced] font-medium text-sm tracking-wider">
              Chat?
            </span>

            {/* Arrow indicator */}
            <div className="ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Animated dots - now more visible */}
          <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#5e2ced] rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: "0 0 4px rgba(94,44,237,0.5)",
                }}
              />
            ))}
          </div>
        </div>
      </a>
      <MinimalHeader />
      <main className="-mt-9 md:mt-1 max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 px-3 py-1 bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Rocket className="w-4 h-4 mr-2" />
              Cloud Migration Service
            </Badge>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Seamless Monolithic to Cloud-Native
              <span className="block text-transparent bg-gradient-to-r from-teal-600 to-blue-700 bg-clip-text">
                Transformation
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-10 leading-relaxed max-w-4xl mx-auto">
              Empower your business with scalable, resilient, and cost-efficient
              cloud solutions through modern DevOps practices and infrastructure
              automation.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge className="px-3 py-1 text-xs md:px-4 md:py-2 text-sm md:text-sm bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Cloud className="w-4 h-4 mr-2" />
                Cloud-Native
              </Badge>
              <Badge className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-base bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Layers className="w-4 h-4 mr-2" />
                Microservices
              </Badge>
              <Badge className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-base bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Zap className="w-4 h-4 mr-2" />
                Automation
              </Badge>
              <Badge className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-base bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </Badge>
            </div>
          </div>
        </section>
        {/* Architecture Overview */}
        <section className="mb-12 relative min-h-[550px] bg-gray-50 overflow-hidden">
          <div className="relative z-10 text-center -mb-0">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
              End-to-End DevOps Architecture
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
              Our comprehensive solution covers every aspect of your cloud
              journey, from infrastructure provisioning to continuous delivery
              and robust monitoring.
            </p>
          </div>
          {/* Updated dinger.png container with soft border */}
          <Card className="mb-6 overflow-hidden duration-500 border bg-white/50 border-gray-300 shadow-sm ">
            <CardContent className="p-4">
              <div className="h-[250px] md:h-[700px] w-full relative">
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
          {/* Explanation of dinger.png */}
          <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                Understanding the Architecture
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-gray-600">
                A detailed breakdown of our cloud-native solution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                The diagram above illustrates the end-to-end DevOps architecture
                we implement for our clients, ensuring a robust, scalable, and
                secure cloud-native environment. Here's a breakdown of each key
                component:
              </p>
              <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                {[
                  {
                    icon: GitBranch,
                    title: "Source Control (GitHub)",
                    desc: "All application code, infrastructure as code (Terraform),and Kubernetes manifests are stored in GitHub repositories, serving as the single source of truth for version control and collaboration.",
                    color: "blue",
                  },
                  {
                    icon: Code,
                    title: "Infrastructure as Code (Terraform)",
                    desc: "Terraform is used to declaratively define and provision all cloud infrastructure resources, including Azure Kubernetes Service (AKS), Virtual Networks, Container Registries, and databases.",
                    color: "green",
                  },
                  {
                    icon: Zap,
                    title: "CI/CD Pipeline (GitHub Actions)",
                    desc: "Automated workflows in GitHub Actions handle continuous integration (building, testing, security scanning) and continuous delivery (deploying applications to AKS).",
                    color: "orange",
                  },
                  {
                    icon: Dock,
                    title: "Containerization (Docker)",
                    desc: "Applications are containerized using Docker, ensuring consistency across different environments and simplifying deployment.",
                    color: "purple",
                  },
                  {
                    icon: Database,
                    title: "Container Registry (ACR)",
                    desc: "Azure Container Registry (ACR) securely stores and manages Docker images, integrated with the CI/CD pipeline for automated image pushes.",
                    color: "red",
                  },
                  {
                    icon: Server,
                    title: "Kubernetes Orchestration (AKS)",
                    desc: "Azure Kubernetes Service (AKS) provides a managed Kubernetes environment for deploying, managing, and scaling containerized applications.",
                    color: "teal",
                  },
                  {
                    icon: Layers,
                    title: "GitOps (ArgoCD)",
                    desc: "ArgoCD implements GitOps principles, continuously synchronizing the desired state of applications defined in Git with the actual state in the AKS cluster, ensuring automated and declarative deployments.",
                    color: "blue",
                  },
                  {
                    icon: RefreshCw,
                    title: "Image Updates (ArgoCD Image Updater)",
                    desc: "ArgoCD Image Updater automatically detects new image versions in ACR and updates the Kubernetes manifests in Git, triggering seamless application rollouts.",
                    color: "green",
                  },
                  {
                    icon: Activity,
                    title:
                      "Monitoring (Prometheus, Grafana, Loki, Azure Monitor)",
                    desc: "A unified observability stack provides real-time insights: Prometheus for metrics, Loki for logs, Grafana for dashboards, and Azure Monitor for comprehensive cloud resource monitoring.",
                    color: "orange",
                  },
                  {
                    icon: BellRing,
                    title: "Alerting & Notifications",
                    desc: "Configurable alerts from Prometheus Alertmanager are sent to communication channels like Google Chat and Slack for proactive incident management.",
                    color: "purple",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Security (Trivy, RBAC, Network Policies)",
                    desc: "Security is integrated at every layer, including container image scanning with Trivy, Role-Based Access Control (RBAC) for least privilege, and network policies for secure communication.",
                    color: "red",
                  },
                  {
                    icon: Scale,
                    title: "Autoscaling (HPA, VPA, KEDA)",
                    desc: "Dynamic autoscaling ensures optimal performance and cost-efficiency, with Horizontal Pod Autoscaler (HPA), Vertical Pod Autoscaler (VPA), and Kubernetes Event-driven Autoscaling (KEDA).",
                    color: "teal",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={cn(listItemStyle, "min-w-[380px] flex-shrink-0")}
                  >
                    <div className={iconWrapperStyle(item.color)}>
                      <item.icon className={iconStyle(item.color)} />
                    </div>
                    <div>
                      <h4 className={titleStyle}>{item.title}</h4>
                      <p className={descStyle}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed mt-4">
                This integrated approach ensures that your applications are not
                only deployed efficiently but also maintained with high
                availability, security, and cost-effectiveness, reflecting our
                proven success in cloud-native transformations.
              </p>
            </CardContent>
          </Card>
          {/* Quick Stats */}
          <div className="flex flex-nowrap bg-gray-50 overflow-x-auto gap-6 pt-6 pb-4 md:grid md:grid-cols-4 mt-10">
            {[
              {
                value: "99.9%",
                label: "Uptime SLA",
                color: "teal",
                icon: CheckCircle2,
              },
              {
                value: "50%",
                label: "Cost Reduction",
                color: "green",
                icon: ArrowRight,
              },
              {
                value: "10x",
                label: "Faster Deployments",
                color: "purple",
                icon: Zap,
              },
              {
                value: "24/7",
                label: "Monitoring",
                color: "orange",
                icon: Activity,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group p-4 rounded-lg bg-gray-50 hover:bg-white transition-colors duration-300 min-w-[180px] flex-shrink-0"
              >
                <div className="mb-3">
                  <stat.icon
                    className={`w-7 h-7 mx-auto text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <div
                  className={`text-xl md:text-2xl font-bold text-${stat.color}-700 mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Step 1: Terraform Infrastructure */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-teal-500 to-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">1</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                Infrastructure as Code with Terraform
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Automated, reproducible cloud infrastructure provisioning
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {/* Why Choose Terraform Section */}
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-teal-100 rounded-lg shadow-sm">
                    <Sparkles className="w-5 h-5 text-teal-600" />
                  </div>
                  Why Choose Terraform?
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  The industry standard for Infrastructure as Code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                  {[
                    {
                      icon: Code,
                      title: "Infrastructure as Code",
                      desc: "Version-controlled, repeatable infrastructure deployments with GitOps workflows.",
                      color: "green",
                    },
                    {
                      icon: Cloud,
                      title: "Multi-Cloud Excellence",
                      desc: "Deploy seamlessly across Azure, AWS, GCP with consistent workflows and best practices.",
                      color: "purple",
                    },
                    {
                      icon: ShieldCheck,
                      title: "State Management",
                      desc: "Advanced state management with remote backends and state locking for team collaboration.",
                      color: "orange",
                    },
                    {
                      icon: Zap,
                      title: "Cost Optimization",
                      desc: "Right-size resources, implement auto-scaling, and optimize costs with intelligent resource management.",
                      color: "blue",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        listItemStyle,
                        "min-w-[350px] flex-shrink-0"
                      )}
                    >
                      <div className={iconWrapperStyle(item.color)}>
                        <item.icon className={iconStyle(item.color)} />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{item.title}</h4>
                        <p className={descStyle}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
              {/* Terraform Modules Section */}
              <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                      <Code className="w-5 h-5 text-purple-600" />
                    </div>
                    My Production-Ready Terraform Modules
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Battle-tested, enterprise-grade infrastructure modules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="group p-4 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        {/* Changed to flex-col on mobile */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <div className="p-2 bg-blue-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Cloud className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm md:text-base text-gray-900 mb-1">
                              Azure Infrastructure Module
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600 mb-2">
                              Complete Azure setup with AKS, ACR, VNet, and
                              monitoring.
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                AKS
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                ACR
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                VNet
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full md:w-auto group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 border-blue-300 text-blue-700 hover:border-blue-500 bg-transparent"
                          onClick={() =>
                            window.open(
                              "https://github.com/thaunghtike-share/terraform-azure",
                              "_blank"
                            )
                          }
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Module
                        </Button>
                      </div>
                    </div>
                    <div className="group p-4 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        {/* Changed to flex-col on mobile */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <div className="p-2 bg-orange-500 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Server className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm md:text-base text-gray-900 mb-1">
                              AWS EKS Spot Instance Module
                            </h4>
                            <p className="text-xs md:text-sm text-gray-600 mb-2">
                              Cost-effective EKS cluster with spot instances and
                              auto-scaling.
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                EKS
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                Spot Instances
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium"
                              >
                                Auto-scaling
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full md:w-auto group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 border-orange-300 text-orange-700 hover:border-orange-500 bg-transparent"
                          onClick={() =>
                            window.open(
                              "https://github.com/thaunghtike-share/terraform-aws-kubespot",
                              "_blank"
                            )
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
              <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-indigo-100 rounded-lg shadow-sm">
                      <Server className="w-5 h-5 text-indigo-600" />
                    </div>
                    Resources Deployed
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Complete infrastructure stack with security and monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-nowrap overflow-x-auto gap-3 pb-4 md:grid md:grid-cols-2">
                    {[
                      { icon: Server, label: "AKS Cluster", color: "blue" },
                      {
                        icon: Dock,
                        label: "Container Registry",
                        color: "green",
                      },
                      {
                        icon: Cloud,
                        label: "Virtual Networks",
                        color: "purple",
                      },
                      {
                        icon: Activity,
                        label: "Monitoring Stack",
                        color: "orange",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Security Policies",
                        color: "red",
                      },
                      { icon: Database, label: "Databases", color: "yellow" },
                    ].map((resource, index) => (
                      <div
                        key={index}
                        className={cn(
                          `flex items-center gap-2 p-3 bg-${resource.color}-50 rounded-lg border border-${resource.color}-200 hover:shadow-md transition-all duration-300 group cursor-pointer`,
                          "min-w-[150px] flex-shrink-0"
                        )}
                      >
                        <resource.icon
                          className={`w-4 h-4 text-${resource.color}-600 group-hover:scale-110 transition-transform duration-300`}
                        />
                        <span className="text-sm font-semibold text-gray-800">
                          {resource.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Step 2: GitHub Actions CI/CD */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">2</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                CI/CD Pipeline with GitHub Actions
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Automated build, test, and deployment workflows
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {/* Complete CI/CD Workflow */}
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-green-100 rounded-lg shadow-sm">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  Complete CI/CD Workflow
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  From code commit to production deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 sm:grid sm:grid-cols-3 lg:grid-cols-6">
                  {/* Workflow Steps - Horizontal Layout */}
                  {[
                    {
                      step: "1",
                      title: "Code Push",
                      desc: "Developer pushes code to Git repository.",
                      color: "blue",
                      icon: Code,
                    },
                    {
                      step: "2",
                      title: "Docker Build",
                      desc: "Multi-platform container builds with environment-specific configurations.",
                      color: "indigo",
                      icon: Dock,
                    },
                    {
                      step: "3",
                      title: "Push to ACR",
                      desc: "Secure image storage in Azure Container Registry with automated tagging.",
                      color: "green",
                      icon: Database,
                    },
                    {
                      step: "4",
                      title: "Security Scan",
                      desc: "Trivy vulnerability scanning for HIGH and CRITICAL security issues.",
                      color: "red",
                      icon: ShieldCheck,
                    },
                    {
                      step: "5",
                      title: "ArgoCD Deploy",
                      desc: "GitOps-based deployment with automated sync and verification.",
                      color: "purple",
                      icon: Rocket,
                    },
                    {
                      step: "6",
                      title: "Health Verify",
                      desc: "Automated deployment verification and rollback on failure.",
                      color: "orange",
                      icon: CheckCircle2,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all duration-300 group min-w-[220px] flex-shrink-0"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 mb-2">
                        {item.step}
                      </div>
                      <div
                        className={`p-2 bg-${item.color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mb-2`}
                      >
                        <item.icon
                          className={`w-4 h-4 text-${item.color}-600`}
                        />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{item.title}</h4>
                        <p className={descStyle}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
              {/* Self-hosted Runners Explanation */}
              <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                      <Terminal className="w-5 h-5 text-blue-600" />
                    </div>
                    Self-hosted Runners in CI/CD
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Leveraging custom infrastructure for faster and more
                    controlled builds
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    Self-hosted runners allow you to run your CI/CD jobs on your
                    own infrastructure, whether it's Kubernetes clusters or
                    Azure VMs. This provides several benefits:
                  </p>
                  <div className="flex flex-nowrap overflow-x-auto gap-3 pb-4 md:grid md:grid-cols-1">
                    {[
                      {
                        icon: Zap,
                        title: "Faster Builds",
                        desc: "Utilize powerful machines with specific configurations, reducing build times.",
                        color: "blue",
                      },
                      {
                        icon: Code,
                        title: "Custom Environments",
                        desc: "Install custom software, tools, and dependencies not available on cloud-hosted runners.",
                        color: "green",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Security & Compliance",
                        desc: "Keep sensitive data and build artifacts within your network boundaries.",
                        color: "orange",
                      },
                      {
                        icon: Database,
                        title: "Cost Optimization",
                        desc: "Potentially reduce costs for high-volume builds by optimizing resource utilization.",
                        color: "purple",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={cn(
                          listItemStyle,
                          "min-w-[350px] flex-shrink-0"
                        )}
                      >
                        <div className={iconWrapperStyle(item.color)}>
                          <item.icon className={iconStyle(item.color)} />
                        </div>
                        <div>
                          <h4 className={titleStyle}>{item.title}</h4>
                          <p className={descStyle}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    We configure self-hosted runners as Kubernetes deployments
                    or Azure VM Scale Sets, ensuring scalability and high
                    availability for your CI/CD workloads.
                  </p>
                </CardContent>
              </Card>
              {/* Pipeline Workflow Animation */}
              <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    Pipeline Workflow Visualization
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Automated deployment pipeline in action
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Workflow Steps */}
                    <div className="relative">
                      {[
                        { icon: Code, label: "Code Push", status: "completed" },
                        {
                          icon: Dock,
                          label: "Docker Build",
                          status: "completed",
                        },
                        {
                          icon: Database,
                          label: "Push to ACR",
                          status: "completed",
                        },
                        {
                          icon: ShieldCheck,
                          label: "Security Scan",
                          status: "running",
                        },
                        {
                          icon: Cloud,
                          label: "Deploy to AKS",
                          status: "pending",
                        },
                        {
                          icon: CheckCircle2,
                          label: "Verify Health",
                          status: "pending",
                        },
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
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
              {/* Key Features */}
              <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-orange-100 rounded-lg shadow-sm">
                      <Star className="w-5 h-5 text-orange-600" />
                    </div>
                    Key Pipeline Features
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Enterprise-grade CI/CD capabilities for robust deployments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-nowrap overflow-x-auto gap-3 pb-4 md:grid md:grid-cols-1">
                    {[
                      {
                        icon: Zap,
                        label: "Self-hosted Runners",
                        desc: "Faster builds with dedicated infrastructure.",
                        color: "blue",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Security First",
                        desc: "Trivy scanning & secret management for secure pipelines.",
                        color: "green",
                      },
                      {
                        icon: Activity,
                        label: "Real-time Monitoring",
                        desc: "Integrated monitoring and Google Chat notifications.",
                        color: "purple",
                      },
                      {
                        icon: Rocket,
                        label: "Zero Downtime",
                        desc: "Blue-green deployments with automated rollback on failure.",
                        color: "orange",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className={cn(
                          listItemStyle,
                          "min-w-[350px] flex-shrink-0"
                        )}
                      >
                        <div className={iconWrapperStyle(feature.color)}>
                          <feature.icon className={iconStyle(feature.color)} />
                        </div>
                        <div>
                          <h4 className={titleStyle}>{feature.label}</h4>
                          <p className={descStyle}>{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Branch Strategy */}
              <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-indigo-100 rounded-lg shadow-sm">
                      <Code className="w-5 h-5 text-indigo-600" />
                    </div>
                    Multi-Environment Strategy
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Automated deployments across development lifecycle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        branch: "main",
                        env: "Production",
                        color: "red",
                        desc: "Stable production releases.",
                      },
                      {
                        branch: "dev",
                        env: "Development",
                        color: "blue",
                        desc: "Feature development and testing environment.",
                      },
                      {
                        branch: "uat",
                        env: "UAT",
                        color: "orange",
                        desc: "User acceptance testing environment for final validation.",
                      },
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
                            <span className="text-sm md:text-base font-bold text-gray-900">
                              {item.branch}
                            </span>
                            <span className="text-xs text-gray-500">→</span>
                            <span className="text-sm md:text-base font-semibold text-gray-800">
                              {item.env}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600">
                            {item.desc}
                          </p>
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
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">3</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                GitOps with ArgoCD for AKS Deployments
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Declarative, automated deployments to Azure Kubernetes Service
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {/* What is GitOps and ArgoCD? */}
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                    <GitBranch className="w-5 h-5 text-purple-600" />
                  </div>
                  What is GitOps and ArgoCD?
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  Declarative, automated deployments to Azure Kubernetes Service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  GitOps is a software engineering practice that uses a Git
                  repository as its single source of truth. Teams commit
                  declarative configurations into Git, and these configurations
                  are used to create environments needed for the continuous
                  delivery process. There is no manual setup of environments and
                  no use of standalone scripts—everything is defined through the
                  Git repository.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  A basic part of the GitOps process is a pull request. New
                  versions of a configuration are introduced via pull request,
                  merged with the main branch in the Git repository, and then
                  the new version is automatically deployed. The Git repository
                  contains a full record of all changes, including all details
                  of the environment at every stage of the process. Argo CD
                  handles the latter stages of the GitOps process, ensuring that
                  new configurations are correctly deployed to a Kubernetes
                  cluster.
                </p>
              </CardContent>
            </Card>
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
              {/* How ArgoCD Works in Kubernetes */}
              <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                      <Layers className="w-5 h-5 text-blue-600" />
                    </div>
                    How ArgoCD Works in Kubernetes
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Automated synchronization of desired state from Git
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    Argo CD is a Kubernetes-native continuous deployment (CD)
                    tool. Unlike external CD tools that only enable push-based
                    deployments, Argo CD can pull updated code from Git
                    repositories and deploy it directly to Kubernetes resources.
                    It enables developers to manage both infrastructure
                    configuration and application updates in one system.
                  </p>
                  <div className="relative h-[250px] w-full bg-gray-50 rounded-xl border border-gray-100">
                    <Image
                      src="/howargocdwork.png"
                      alt="ArgoCD Sync Diagram"
                      fill
                      className="object-contain p-4"
                      quality={100}
                    />
                  </div>
                  <div className="flex flex-nowrap overflow-x-auto gap-3 pb-4 md:grid md:grid-cols-1">
                    {[
                      {
                        icon: CheckCircle2,
                        title: "Declarative Deployments",
                        desc: "Define application state in Git, ArgoCD ensures cluster matches.",
                        color: "blue",
                      },
                      {
                        icon: RefreshCw,
                        title: "Automated Sync",
                        desc: "Continuously monitors Git repos and automatically syncs changes to AKS.",
                        color: "green",
                      },
                      {
                        icon: ArrowRight,
                        title: "Rollback & Health Checks",
                        desc: "Easy rollbacks to previous versions and automated health monitoring.",
                        color: "orange",
                      },
                      {
                        icon: Code,
                        title: "Helm Chart Support",
                        desc: "Manages deployments using Helm charts for complex applications.",
                        color: "purple",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className={cn(
                          listItemStyle,
                          "min-w-[350px] flex-shrink-0"
                        )}
                      >
                        <div className={iconWrapperStyle(item.color)}>
                          <item.icon className={iconStyle(item.color)} />
                        </div>
                        <div>
                          <h4 className={titleStyle}>{item.title}</h4>
                          <p className={descStyle}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* ArgoCD Admin Portal */}
              <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                    <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                      <LayoutDashboard className="w-5 h-5 text-blue-600" />
                    </div>
                    ArgoCD Admin Portal
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm text-gray-600">
                    Centralized management and visualization of your
                    applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[250px] w-full bg-gray-50 rounded-xl border border-gray-100">
                    <Image
                      src="/argocd.png"
                      alt="ArgoCD Admin Portal Screenshot"
                      fill
                      className="object-contain p-4"
                      quality={100}
                    />
                  </div>
                  <p className="text-sm md:text-base text-gray-700 mt-4 leading-relaxed">
                    The ArgoCD UI provides a comprehensive overview of your
                    applications, their health, and synchronization status. You
                    can easily drill down into individual resources, view logs,
                    and perform manual syncs or rollbacks.
                  </p>
                  <p className="text-sm md:text-base text-gray-700 mt-4 leading-relaxed">
                    The ArgoCD UI provides a comprehensive overview of your
                    applications, their health, and synchronization status. You
                    can easily drill down into individual resources, view logs,
                    and perform manual syncs or rollbacks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Step 4: ArgoCD Image Updater */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">4</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                Automated Image Updates with ArgoCD Image Updater
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Keep your applications up-to-date with the latest container
                images
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {/* What is ArgoCD Image Updater? */}
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-orange-100 rounded-lg shadow-sm">
                    <RefreshCw className="w-5 h-5 text-orange-600" />
                  </div>
                  What is ArgoCD Image Updater?
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  Seamless Image Rollouts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  ArgoCD Image Updater is a tool that automatically updates the
                  image tags in your Kubernetes manifests (managed by ArgoCD)
                  whenever a new image is pushed to your container registry.
                  This ensures your applications are always running the latest
                  versions without manual intervention.
                </p>
                <div className="relative h-[300px] w-full bg-gray-50 rounded-xl border border-gray-100">
                  <Image
                    src="/argoimageupdater.png?height=250&width=400"
                    alt="ArgoCD Image Updater Workflow"
                    fill
                    className="object-contain p-4"
                    quality={100}
                  />
                </div>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                  {[
                    {
                      icon: Dock,
                      title: "Container Registry Integration",
                      desc: "Monitors Docker Hub, ACR, ECR, GCR for new image tags.",
                      color: "blue",
                    },
                    {
                      icon: GitBranch,
                      title: "Git Commit Automation",
                      desc: "Automatically updates image tags in Git and triggers ArgoCD sync.",
                      color: "green",
                    },
                    {
                      icon: Zap,
                      title: "Zero-Touch Updates",
                      desc: "Eliminates manual intervention for image updates, reducing human error.",
                      color: "purple",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Version Pinning",
                      desc: "Supports various update strategies (e.g., latest, semver) for controlled rollouts.",
                      color: "orange",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        listItemStyle,
                        "min-w-[350px] flex-shrink-0"
                      )}
                    >
                      <div className={iconWrapperStyle(item.color)}>
                        <item.icon className={iconStyle(item.color)} />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{item.title}</h4>
                        <p className={descStyle}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Step 5: Comprehensive Monitoring */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">5</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                Comprehensive Monitoring
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Real-time insights into your cloud-native applications and
                infrastructure
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {/* Unified Observability Stack */}
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-red-100 rounded-lg shadow-sm">
                    <Activity className="w-5 h-5 text-red-600" />
                  </div>
                  Unified Observability Stack
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  Prometheus, Grafana, Loki, and Azure Monitor for full
                  visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                  {[
                    {
                      icon: Activity,
                      title: "Prometheus for Metrics",
                      desc: "Collects and stores time-series data from Kubernetes and applications, providing a powerful query language (PromQL).",
                      color: "blue",
                    },
                    {
                      icon: MessageSquare,
                      title: "Loki for Logs",
                      desc: "Centralized log aggregation system optimized for cost-effectiveness and easy troubleshooting, integrated with Grafana.",
                      color: "green",
                    },
                    {
                      icon: LayoutDashboard,
                      title: "Grafana Dashboards",
                      desc: "Visualize metrics and logs with custom, interactive dashboards for real-time insights into application and infrastructure performance.",
                      color: "purple",
                    },
                    {
                      icon: Cloud,
                      title: "Azure Monitor Integration",
                      desc: "Leverage Azure's native monitoring capabilities for comprehensive insights into cloud resources, services, and application health.",
                      color: "orange",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        listItemStyle,
                        "min-w-[350px] flex-shrink-0"
                      )}
                    >
                      <div className={iconWrapperStyle(item.color)}>
                        <item.icon className={iconStyle(item.color)} />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{item.title}</h4>
                        <p className={descStyle}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Step 6: Proactive Alerting & Incident Management */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">6</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                Proactive Alerting & Incident Management
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Instant notifications and automated responses for critical
                events
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {/* Configurable Alert Manager Rules */}
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                    <BellRing className="w-5 h-5 text-purple-600" />
                  </div>
                  Configurable Alert Manager Rules
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  Define custom alerts for critical infrastructure and
                  application events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Our alerting system, powered by Prometheus Alertmanager,
                  allows for highly customizable rules to detect anomalies and
                  critical states within your Kubernetes cluster and
                  applications. These rules ensure that your team is immediately
                  notified of issues, enabling rapid response and minimizing
                  downtime.
                </p>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                  {[
                    {
                      icon: Zap,
                      title: "Pod Failure Alerts",
                      desc: "Triggered when a Kubernetes pod repeatedly crashes or fails to start, indicating application instability.",
                      color: "red",
                    },
                    {
                      icon: RefreshCw,
                      title: "Pod Restart Alerts",
                      desc: "Notifies on unexpected pod restarts, which can be a symptom of underlying resource constraints or bugs.",
                      color: "orange",
                    },
                    {
                      icon: Cpu,
                      title: "Node OOM Error Alerts",
                      desc: "Alerts when a node experiences an Out-Of-Memory (OOM) event, potentially impacting multiple pods.",
                      color: "blue",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Security Scan Alerts",
                      desc: "Integrates with Trivy to alert on newly detected HIGH or CRITICAL vulnerabilities in container images.",
                      color: "green",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        listItemStyle,
                        "min-w-[350px] flex-shrink-0"
                      )}
                    >
                      <div className={iconWrapperStyle(item.color)}>
                        <item.icon className={iconStyle(item.color)} />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{item.title}</h4>
                        <p className={descStyle}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Proactive Alerting with Google Chat & Slack */}
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-green-100 rounded-lg shadow-sm">
                    <BellRing className="w-5 h-5 text-green-600" />
                  </div>
                  Proactive Alerting with Google Chat & Slack
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  Instant notifications for critical events across your
                  preferred communication channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-nowrap overflow-x-auto gap-3 pb-4 md:grid md:grid-cols-2">
                  {[
                    {
                      icon: Zap,
                      label: "Pod Failure Alerts",
                      desc: "Receive immediate notifications when a Kubernetes pod fails or crashes.",
                      color: "red",
                    },
                    {
                      icon: RefreshCw,
                      label: "Pod Restart Alerts",
                      desc: "Get alerts for unexpected pod restarts, indicating potential issues.",
                      color: "orange",
                    },
                    {
                      icon: ShieldCheck,
                      label: "Security Alerts",
                      desc: "Notify on security vulnerabilities detected by Trivy or other scanners.",
                      color: "purple",
                    },
                    {
                      icon: Cloud,
                      label: "Resource Exceeded Alerts",
                      desc: "Alerts when CPU/memory limits are approached or exceeded for pods/nodes.",
                      color: "blue",
                    },
                  ].map((alert, index) => (
                    <div
                      key={index}
                      className={cn(
                        listItemStyle,
                        "min-w-[350px] flex-shrink-0"
                      )}
                    >
                      <div className={iconWrapperStyle(alert.color)}>
                        <alert.icon className={iconStyle(alert.color)} />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{alert.label}</h4>
                        <p className={descStyle}>{alert.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Step 7: Centralized Logging & Analytics */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">7</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                Centralized Logging & Analytics
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Gain deep insights into application behavior and system health
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {/* Key Logging Solutions */}
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  Key Logging Solutions
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  Leveraging industry-standard tools for comprehensive log
                  management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Centralized logging is crucial for monitoring,
                  troubleshooting, and auditing cloud-native applications. We
                  integrate various logging solutions to provide a unified view
                  of your system's behavior.
                </p>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                  {[
                    {
                      icon: MessageSquare,
                      title: "Loki for Kubernetes Logs",
                      desc: "Loki is a horizontally scalable, highly available, multi-tenant log aggregation system inspired by Prometheus. It's designed to be very cost-effective by indexing only metadata (labels) rather than the full log content. This makes it ideal for storing and querying large volumes of logs from Kubernetes clusters, allowing for efficient log analysis and troubleshooting.",
                      color: "green",
                    },
                    {
                      icon: Cloud,
                      title: "Azure Monitor for Cloud Logs",
                      desc: "Azure's native monitoring solution that collects, analyzes, and acts on telemetry from your Azure and on-premises environments. It provides comprehensive logging for all Azure resources.",
                      color: "blue",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        listItemStyle,
                        "min-w-[350px] flex-shrink-0"
                      )}
                    >
                      <div className={iconWrapperStyle(item.color)}>
                        <item.icon className={iconStyle(item.color)} />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{item.title}</h4>
                        <p className={descStyle}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Step 8: Autoscaling for Kubernetes */}
        <section className="mb-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">8</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                Dynamic Autoscaling for Kubernetes
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Ensure optimal performance and cost-efficiency with intelligent
                scaling
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
                    <Scale className="w-5 h-5 text-blue-600" />
                  </div>
                  Intelligent Scaling Strategies
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  Automated scaling at node and pod levels for peak performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  To handle varying workloads and optimize resource utilization,
                  we implement a multi-faceted autoscaling strategy within your
                  Kubernetes environment. This ensures your applications remain
                  responsive and cost-effective under any load.
                </p>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                  {[
                    {
                      icon: Server,
                      title: "Node Pool Autoscaling",
                      desc: "Automatically adjusts the number of nodes in your Kubernetes cluster based on resource demand, ensuring your cluster has enough capacity.",
                      color: "teal",
                    },
                    {
                      icon: Cpu,
                      title: "Horizontal Pod Autoscaler (HPA)",
                      desc: "Scales the number of pod replicas up or down based on observed CPU utilization or other custom metrics.",
                      color: "green",
                    },
                    {
                      icon: MemoryStick,
                      title: "Vertical Pod Autoscaler (VPA)",
                      desc: "Automatically adjusts the CPU and memory requests/limits for containers in a pod based on historical usage, optimizing resource allocation.",
                      color: "purple",
                    },
                    {
                      icon: Zap,
                      title: "KEDA (Kubernetes Event-driven Autoscaling)",
                      desc: "Extends Kubernetes autoscaling capabilities to scale applications based on external events like message queue length, Kafka topics, or custom metrics.",
                      color: "orange",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        listItemStyle,
                        "min-w-[350px] flex-shrink-0"
                      )}
                    >
                      <div className={iconWrapperStyle(item.color)}>
                        <item.icon className={iconStyle(item.color)} />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{item.title}</h4>
                        <p className={descStyle}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Step 9: Comprehensive Security */}
        <section className="mb-9">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">9</span>
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                Comprehensive Security Measures
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Protecting your applications and infrastructure at every layer
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg md:text-xl font-semibold text-gray-800">
                  <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  Multi-Layered Security Approach
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-gray-600">
                  From code to cloud, ensuring robust protection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Security is paramount in cloud-native environments. Our
                  approach integrates security practices throughout the entire
                  DevOps lifecycle, from continuous scanning to strict access
                  controls.
                </p>
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                  {[
                    {
                      icon: Scan,
                      title: "Container Image Scanning",
                      desc: "Automated vulnerability scanning of container images using tools like Trivy in the CI/CD pipeline to prevent insecure images from reaching production.",
                      color: "red",
                    },
                    {
                      icon: Cloud,
                      title: "Cloud-Level Security",
                      desc: "Implementing best practices for cloud provider security, including network segmentation (VNet/VPC), firewall rules, and security groups.",
                      color: "blue",
                    },
                    {
                      icon: Dock,
                      title: "Container-Level Security",
                      desc: "Applying security contexts, limiting privileges, and using read-only file systems for containers to minimize attack surface.",
                      color: "green",
                    },
                    {
                      icon: Users,
                      title: "RBAC (Role-Based Access Control)",
                      desc: "Strictly defining roles and permissions for users and services within Kubernetes and cloud environments to enforce least privilege.",
                      color: "orange",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        listItemStyle,
                        "min-w-[350px] flex-shrink-0"
                      )}
                    >
                      <div className={iconWrapperStyle(item.color)}>
                        <item.icon className={iconStyle(item.color)} />
                      </div>
                      <div>
                        <h4 className={titleStyle}>{item.title}</h4>
                        <p className={descStyle}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="mb-4 md:mb-10">
          <Card className="relative rounded-xl md:rounded-2xl overflow-hidden p-6 md:p-10 text-center border-0 shadow-none bg-transparent">
            <div className="absolute inset-0 bg-gray-50 opacity-60 rounded-xl md:rounded-2xl"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-1 md:gap-2 bg-gradient-to-r from-teal-100 to-blue-100 px-3 md:px-4 py-1 rounded-full mb-3 md:mb-4 text-sm md:text-sm font-semibold text-gray-700">
                <Sparkles className="w-4 h-4 md:w-4 md:h-4 mr-1 text-blue-600" />
                Ready to Transform?
              </div>
              <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-4 md:mb-4 leading-tight">
                Accelerate Your Journey to Cloud-Native
              </h2>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 md:mb-8">
                Partner with us to seamlessly migrate your monolithic
                applications and unlock the full potential of scalable,
                resilient, and cost-efficient cloud solutions.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border-0"
              >
                <Rocket className="w-4 h-4 md:w-4 md:h-4 mr-1 md:mr-2" />
                Schedule a Free Consultation
              </Button>

              {/* Trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10 pt-4 md:pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-green-100 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-sm">
                    Proven Success
                  </h4>
                  <p className="text-sm text-gray-600">
                    100% successful migrations
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-100 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-sm">
                    Rapid Deployment
                  </h4>
                  <p className="text-sm text-gray-600">
                    2-4 week average timeline
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-purple-100 rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2">
                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-sm">
                    Enterprise-Grade Security
                  </h4>
                  <p className="text-sm text-gray-600">
                    Built-in security from day one
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
      <div className="-mt-4 md:-mt-14">
        {" "}
        {/* Further reduced negative margin for footer */}
        <MinimalFooter />
      </div>
    </div>
  );
}
