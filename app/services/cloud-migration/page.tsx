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
  GitCompare,
  Container,
  Workflow,
  Play,
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
  const features = [
    {
      icon: Workflow,
      title: "End-to-End DevOps",
      description: "Complete automation from code to production",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      description: "Built-in security at every layer",
    },
    {
      icon: Scale,
      title: "Auto Scaling",
      description: "Intelligent resource optimization",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "10x faster deployment cycles",
    },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime SLA", icon: CheckCircle2 },
    { value: "50%", label: "Cost Reduction", icon: ArrowRight },
    { value: "10x", label: "Faster Deployments", icon: Zap },
    { value: "24/7", label: "Monitoring", icon: Activity },
  ];

  const handleEmailClick = () => {
    window.location.href =
      "mailto:thaunghtikeoo.tho1234@gmail.com?subject=Free Consultation - Cloud Native Transformation&body=Hi, I'm interested in learning more about your cloud native transformation services.";
  };

  const handleCaseStudiesClick = () => {
    window.open(
      "https://github.com/thaunghtike-share/DevOps-Projects",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-white/95 dark:bg-[#0A0A0A] relative overflow-x-hidden transition-colors duration-300">
      {/* Messenger Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Messenger Support"
        className="fixed top-[70%] right-4 z-50 group"
      >
        <div className="flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg rounded-full px-4 py-3 cursor-pointer transition-all duration-400 hover:scale-105 hover:shadow-xl">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-sm font-medium text-black dark:text-white">
            Chat Now
          </span>
        </div>
      </a>

      <MinimalHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {/* Hero Section - Left Aligned */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-6"></div>

            {/* Main Title - Left Aligned */}
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-6 leading-tight text-left">
              From Monolithic to
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Cloud Native
              </span>
            </h1>

            {/* Description - Left Aligned */}
            <p className="text-xl text-black dark:text-gray-300 mb-12 leading-relaxed max-w-3xl text-left">
              Transform your legacy applications into scalable, resilient
              cloud-native systems with our complete DevOps automation platform.
            </p>

            {/* Feature Grid - Left Aligned */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-left group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-black dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons - Left Aligned */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start">
              <Button
                onClick={handleEmailClick}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Free Consultation
              </Button>
              <Button
                variant="outline"
                onClick={handleCaseStudiesClick}
                className="px-8 py-3 rounded-xl text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 text-black dark:text-white"
              >
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-black dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-black dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Architecture Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Complete DevOps Architecture
            </h2>
            <p className="text-xl text-black dark:text-gray-300 max-w-2xl mx-auto">
              Our proven architecture handles everything from infrastructure to
              monitoring
            </p>
          </div>

          {/* Architecture Diagram */}
          <Card className="mb-8 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="h-[400px] md:h-[700px] w-full relative bg-gradient-to-br from-slate-50 to-blue-50">
                <Image
                  src="/dinger.png"
                  alt="Complete DevOps Architecture"
                  fill
                  className="object-contain p-8"
                  quality={100}
                  priority
                />
              </div>
            </CardContent>
          </Card>

          {/* Architecture Explanation */}
          <Card className="border-0 shadow-lg rounded-3xl mb-8">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black dark:text-white">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                Understanding the Architecture
              </CardTitle>
              <CardDescription className="text-black dark:text-gray-300 text-lg">
                A detailed breakdown of our cloud-native solution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-black dark:text-gray-300 leading-relaxed text-lg">
                The diagram above illustrates the end-to-end DevOps architecture
                we implement for our clients, ensuring a robust, scalable, and
                secure cloud-native environment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: GitBranch,
                    title: "Source Control (GitHub)",
                    desc: "All application code, infrastructure as code (Terraform), and Kubernetes manifests stored in GitHub repositories.",
                    color: "blue",
                  },
                  {
                    icon: Code,
                    title: "Infrastructure as Code",
                    desc: "Terraform for declarative cloud infrastructure provisioning across Azure, AWS, GCP.",
                    color: "green",
                  },
                  {
                    icon: Zap,
                    title: "CI/CD Pipeline",
                    desc: "GitHub Actions for automated build, test, and deployment workflows.",
                    color: "orange",
                  },
                  {
                    icon: Dock,
                    title: "Containerization",
                    desc: "Docker for consistent application packaging and deployment.",
                    color: "purple",
                  },
                  {
                    icon: Server,
                    title: "Kubernetes Orchestration",
                    desc: "AKS/EKS/GKE for managed Kubernetes with auto-scaling.",
                    color: "teal",
                  },
                  {
                    icon: Layers,
                    title: "GitOps (ArgoCD)",
                    desc: "Declarative deployments with automated synchronization.",
                    color: "indigo",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 group"
                  >
                    <div
                      className={`p-3 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon
                        className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white mb-2 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-black dark:text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Step 1: Terraform Infrastructure */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                1
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                  Infrastructure as Code with Terraform
                </h2>
                <p className="text-xl text-black dark:text-gray-300 mt-2">
                  Automated, reproducible cloud infrastructure provisioning
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Why Terraform */}
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black dark:text-white">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  Why Choose Terraform?
                </CardTitle>
                <CardDescription className="text-black dark:text-gray-300 text-lg">
                  The industry standard for Infrastructure as Code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      desc: "Deploy seamlessly across Azure, AWS, GCP with consistent workflows.",
                      color: "blue",
                    },
                    {
                      icon: ShieldCheck,
                      title: "State Management",
                      desc: "Advanced state management for team collaboration.",
                      color: "orange",
                    },
                    {
                      icon: Zap,
                      title: "Cost Optimization",
                      desc: "Right-size resources and implement auto-scaling.",
                      color: "purple",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                    >
                      <div
                        className={`p-3 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-xl flex-shrink-0`}
                      >
                        <item.icon
                          className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-black dark:text-white mb-2 text-lg">
                          {item.title}
                        </h4>
                        <p className="text-black dark:text-gray-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Terraform Modules */}
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black dark:text-white">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  Production-Ready Terraform Modules
                </CardTitle>
                <CardDescription className="text-black dark:text-gray-300 text-lg">
                  Battle-tested, enterprise-grade infrastructure modules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Azure Module */}
                <div className="group p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                        <Cloud className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-black dark:text-white text-xl mb-2">
                          Azure Infrastructure Module
                        </h4>
                        <p className="text-black dark:text-gray-300 mb-3">
                          Complete Azure setup with AKS, ACR, VNet, and
                          monitoring. Production-ready with security best
                          practices.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                            AKS
                          </Badge>
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-0">
                            ACR
                          </Badge>
                          <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-0">
                            VNet
                          </Badge>
                          <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-0">
                            Monitoring
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                      onClick={() =>
                        window.open(
                          "https://github.com/thaunghtike-share/terraform-azure",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Module
                    </Button>
                  </div>
                </div>

                {/* AWS Module */}
                <div className="group p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl border border-orange-200 dark:border-orange-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                        <Server className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-black dark:text-white text-xl mb-2">
                          AWS EKS Spot Instance Module
                        </h4>
                        <p className="text-black dark:text-gray-300 mb-3">
                          Cost-effective EKS cluster with spot instances and
                          auto-scaling. Optimized for production workloads.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-0">
                            EKS
                          </Badge>
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-0">
                            Spot Instances
                          </Badge>
                          <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-0">
                            Auto-scaling
                          </Badge>
                          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-0">
                            Cost Optimized
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                      onClick={() =>
                        window.open(
                          "https://github.com/thaunghtike-share/terraform-aws-kubespot",
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Module
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Step 2: CI/CD Pipeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                2
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                  CI/CD Pipeline with GitHub Actions
                </h2>
                <p className="text-xl text-black dark:text-gray-300 mt-2">
                  Automated build, test, and deployment workflows
                </p>
              </div>
            </div>
          </div>

          {/* CI/CD Workflow */}
          <Card className="border-0 shadow-lg rounded-3xl mb-8">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black dark:text-white">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                Complete CI/CD Workflow
              </CardTitle>
              <CardDescription className="text-black dark:text-gray-300 text-lg">
                From code commit to production deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    step: "1",
                    title: "Code Push",
                    desc: "Developer pushes code to Git repository",
                    icon: Code,
                    color: "blue",
                  },
                  {
                    step: "2",
                    title: "Docker Build",
                    desc: "Multi-platform container builds",
                    icon: Dock,
                    color: "indigo",
                  },
                  {
                    step: "3",
                    title: "Push to Registry",
                    desc: "Secure image storage with automated tagging",
                    icon: Database,
                    color: "green",
                  },
                  {
                    step: "4",
                    title: "Security Scan",
                    desc: "Trivy vulnerability scanning",
                    icon: ShieldCheck,
                    color: "red",
                  },
                  {
                    step: "5",
                    title: "ArgoCD Deploy",
                    desc: "GitOps-based deployment",
                    icon: Rocket,
                    color: "purple",
                  },
                  {
                    step: "6",
                    title: "Health Verify",
                    desc: "Automated verification and rollback",
                    icon: CheckCircle2,
                    color: "orange",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                  >
                    <div
                      className={`p-3 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-xl mb-4 mx-auto w-16 h-16 flex items-center justify-center`}
                    >
                      <item.icon
                        className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`}
                      />
                    </div>
                    <h4 className="font-bold text-black dark:text-white mb-2 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-black dark:text-gray-300 text-sm">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Self-hosted Runners */}
          <Card className="border-0 shadow-lg rounded-3xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black dark:text-white">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                Self-hosted Runners in CI/CD
              </CardTitle>
              <CardDescription className="text-black dark:text-gray-300 text-lg">
                Leveraging custom infrastructure for faster and more controlled
                builds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Faster Builds",
                    desc: "Utilize powerful machines with specific configurations, reducing build times significantly.",
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
                    desc: "Keep sensitive data and build artifacts within your network boundaries for enhanced security.",
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
                    className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700"
                  >
                    <div
                      className={`p-3 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-xl flex-shrink-0`}
                    >
                      <item.icon
                        className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white mb-2 text-lg">
                        {item.title}
                      </h4>
                      <p className="text-black dark:text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Step 3: ArgoCD GitOps */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                3
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
                  GitOps with ArgoCD
                </h2>
                <p className="text-xl text-black dark:text-gray-300 mt-2">
                  Declarative, automated deployments to Kubernetes
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What is GitOps */}
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black dark:text-white">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <GitBranch className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  What is GitOps?
                </CardTitle>
                <CardDescription className="text-black dark:text-gray-300 text-lg">
                  Modern approach to continuous delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-black dark:text-gray-300 leading-relaxed text-lg mb-4">
                  GitOps is a software engineering practice that uses Git
                  repositories as the single source of truth for infrastructure
                  and application deployment. Teams commit declarative
                  configurations into Git, and these configurations are
                  automatically applied to the target environments.
                </p>
                <p className="text-black dark:text-gray-300 leading-relaxed text-lg">
                  Argo CD handles the deployment process, ensuring that new
                  configurations are correctly deployed to Kubernetes clusters
                  while maintaining a full audit trail of all changes.
                </p>
              </CardContent>
            </Card>

            {/* ArgoCD Benefits */}
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-black dark:text-white">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  How ArgoCD Works
                </CardTitle>
                <CardDescription className="text-black dark:text-gray-300 text-lg">
                  Automated synchronization from Git to Kubernetes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: CheckCircle2,
                      title: "Declarative Deployments",
                      desc: "Define application state in Git, ArgoCD ensures cluster matches exactly.",
                      color: "blue",
                    },
                    {
                      icon: RefreshCw,
                      title: "Automated Sync",
                      desc: "Continuously monitors Git repos and automatically syncs changes.",
                      color: "green",
                    },
                    {
                      icon: ArrowRight,
                      title: "Rollback & Health Checks",
                      desc: "Easy rollbacks to previous versions with automated health monitoring.",
                      color: "orange",
                    },
                    {
                      icon: Code,
                      title: "Helm Chart Support",
                      desc: "Manages deployments using Helm charts for complex applications.",
                      color: "purple",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`p-2 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg flex-shrink-0 mt-1`}
                      >
                        <item.icon
                          className={`w-4 h-4 text-${item.color}-600 dark:text-${item.color}-400`}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-black dark:text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-black dark:text-gray-300 text-sm">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12 text-center text-white">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Transform Your Infrastructure?
                </h2>
                <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 leading-relaxed">
                  Join dozens of successful companies who've modernized their
                  stack with our cloud-native platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    onClick={handleEmailClick}
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Free Consultation
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleCaseStudiesClick}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300"
                  >
                    View Case Studies
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-blue-500">
                  {[
                    {
                      icon: CheckCircle2,
                      label: "30-Day Implementation",
                      desc: "Rapid deployment",
                    },
                    {
                      icon: ShieldCheck,
                      label: "Enterprise Grade",
                      desc: "Production ready",
                    },
                    {
                      icon: Zap,
                      label: "Cost Optimized",
                      desc: "50% savings guaranteed",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <item.icon className="w-8 h-8 mb-3 text-white" />
                      <h4 className="font-semibold mb-2">{item.label}</h4>
                      <p className="text-blue-200 dark:text-blue-300 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <MinimalFooter />
    </div>
  );
}
