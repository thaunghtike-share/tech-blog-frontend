"use client";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  Code,
  Cloud,
  ShieldCheck,
  Zap,
  GitBranch,
  RefreshCw,
  CheckCircle2,
  Rocket,
  Scale,
  Users,
  FileText,
  BookOpen,
  Lightbulb,
  Workflow,
  Terminal,
  Server,
  Database,
  Layers,
  Cpu,
  MemoryStick,
  Scan,
  Sparkles,
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

export default function InfraAsCodePage() {
  const listItemStyle =
    "flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all duration-300 group";
  const iconWrapperStyle = (color: string) =>
    `p-2 bg-${color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`;
  const iconStyle = (color: string) => `w-4 h-4 text-${color}-600`;
  const titleStyle = "font-bold text-gray-900 mb-1 text-base";
  const descStyle = "text-gray-600 leading-relaxed text-sm";

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
      <MinimalHeader />
      <main className="mt-4 max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Code className="w-4 h-4 mr-2" />
              Infrastructure as Code
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Automating Infrastructure with
              <span className="block text-transparent bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text">
                Infrastructure as Code (IaC)
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-4xl mx-auto">
              As an expert in Infrastructure as Code (IaC), I transform your
              infrastructure management from manual processes to automated,
              version-controlled, and reproducible deployments, ensuring
              efficiency and reliability.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge className="px-4 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Code className="w-4 h-4 mr-2" />
                Automation
              </Badge>
              <Badge className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <GitBranch className="w-4 h-4 mr-2" />
                Version Control
              </Badge>
              <Badge className="px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Consistency
              </Badge>
              <Badge className="px-4 py-2 bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Zap className="w-4 h-4 mr-2" />
                Efficiency
              </Badge>
            </div>
          </div>
        </section>
        {/* What is IaC? */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">?</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What is Infrastructure as Code (IaC)?
              </h2>
              <p className="text-lg text-gray-600">
                Defining and managing infrastructure resources using
                configuration files
              </p>
            </div>
          </div>
          <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 text-base leading-relaxed">
                Infrastructure as Code (IaC) is the management of infrastructure
                (networks, virtual machines, load balancers, and connection
                topology) in a descriptive model, using the same versioning as
                DevOps team uses for source code. Like the principle of source
                code, IaC uses files that contain specifications for your
                infrastructure, making it easier to edit, distribute, and
                version control.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Instead of manually configuring hardware devices or using
                interactive tools, IaC allows you to define your infrastructure
                in human-readable configuration files (e.g., YAML, JSON, HCL).
                These files are then executed by IaC tools to provision and
                manage your infrastructure automatically.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Code,
                    title: "Declarative vs. Imperative",
                    desc: "IaC can be declarative (describing the desired state) or imperative (describing steps to reach a state).",
                    color: "blue",
                  },
                  {
                    icon: GitBranch,
                    title: "Version Control",
                    desc: "Infrastructure configurations are stored in version control systems (e.g., Git), enabling tracking, collaboration, and rollbacks.",
                    color: "green",
                  },
                ].map((item, index) => (
                  <div key={index} className={listItemStyle}>
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
        </section>
        {/* Importance of IaC */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">!</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Why is IaC Important?
              </h2>
              <p className="text-lg text-gray-600">
                Key benefits for modern cloud environments
              </p>
            </div>
          </div>
          <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Consistency & Reproducibility",
                    desc: "Eliminates configuration drift and ensures identical environments across development, staging, and production.",
                    color: "green",
                  },
                  {
                    icon: Zap,
                    title: "Speed & Efficiency",
                    desc: "Automates provisioning, reducing manual effort and accelerating deployment cycles.",
                    color: "blue",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Reduced Risk & Errors",
                    desc: "Minimizes human error through automation and allows for testing infrastructure changes before deployment.",
                    color: "red",
                  },
                  {
                    icon: Users,
                    title: "Collaboration & Visibility",
                    desc: "Infrastructure definitions are shared and version-controlled, fostering team collaboration and transparency.",
                    color: "purple",
                  },
                  {
                    icon: Rocket,
                    title: "Cost Optimization",
                    desc: "Prevents over-provisioning and allows for dynamic scaling, leading to better resource utilization and cost savings.",
                    color: "orange",
                  },
                  {
                    icon: RefreshCw,
                    title: "Disaster Recovery",
                    desc: "Enables rapid rebuilding of infrastructure in case of failures, significantly improving recovery time objectives (RTO).",
                    color: "teal",
                  },
                ].map((item, index) => (
                  <div key={index} className={listItemStyle}>
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
        </section>
        {/* IaC in Real-World Usage */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                IaC in Real-World Scenarios
              </h2>
              <p className="text-lg text-gray-600">
                Practical applications across various industries
              </p>
            </div>
          </div>
          <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Cloud,
                    title: "Cloud Provisioning",
                    desc: "Automating the setup of virtual machines, networks, databases, and other cloud resources on AWS, Azure, GCP.",
                    color: "blue",
                  },
                  {
                    icon: Layers,
                    title: "Environment Replication",
                    desc: "Creating identical development, testing, and production environments quickly and consistently.",
                    color: "purple",
                  },
                  {
                    icon: RefreshCw,
                    title: "Disaster Recovery",
                    desc: "Rapidly spinning up a new infrastructure stack in a different region in case of a primary region failure.",
                    color: "orange",
                  },
                  {
                    icon: Workflow,
                    title: "CI/CD Integration",
                    desc: "Integrating infrastructure changes directly into continuous integration and continuous delivery pipelines.",
                    color: "green",
                  },
                  {
                    icon: Scan,
                    title: "Security & Compliance",
                    desc: "Enforcing security policies and compliance standards by defining them as code and automating their deployment.",
                    color: "red",
                  },
                  {
                    icon: Scale,
                    title: "Scalability & Elasticity",
                    desc: "Automatically scaling infrastructure up or down based on demand, optimizing performance and cost.",
                    color: "teal",
                  },
                ].map((item, index) => (
                  <div key={index} className={listItemStyle}>
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
        </section>
        {/* Step-by-Step IaC Implementation */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Step-by-Step IaC Implementation
              </h2>
              <p className="text-lg text-gray-600">
                A typical workflow for managing infrastructure with code
              </p>
            </div>
          </div>
          <Card className="border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Define Infrastructure",
                    desc: "Write declarative configuration files (e.g., HCL, YAML) specifying desired infrastructure state.",
                    icon: FileText,
                    color: "blue",
                  },
                  {
                    step: "2",
                    title: "Version Control",
                    desc: "Store IaC files in a Git repository, enabling collaboration, history tracking, and rollbacks.",
                    icon: GitBranch,
                    color: "green",
                  },
                  {
                    step: "3",
                    title: "Plan & Apply",
                    desc: "Use IaC tools to preview changes (plan) and then provision/update infrastructure (apply).",
                    icon: Rocket,
                    color: "purple",
                  },
                  {
                    step: "4",
                    title: "Monitor & Maintain",
                    desc: "Continuously monitor infrastructure health and update IaC as requirements evolve.",
                    icon: RefreshCw,
                    color: "orange",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 mb-2">
                      {item.step}
                    </div>
                    <div
                      className={`p-2 bg-${item.color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mb-2`}
                    >
                      <item.icon className={`w-4 h-4 text-${item.color}-600`} />
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
        </section>
        {/* IaC Tools Deep Dive */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                IaC Tools: A Deep Dive
              </h2>
              <p className="text-lg text-gray-600">
                Exploring popular tools and their applications
              </p>
            </div>
          </div>
          {/* Terraform */}
          <Card className="mb-8 border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-purple-100 rounded-lg shadow-sm">
                  <Cloud className="w-5 h-5 text-purple-600" />
                </div>
                Terraform (HashiCorp)
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Declarative infrastructure provisioning across multiple cloud
                providers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                Terraform is an open-source IaC tool that allows you to define
                and provision datacenter infrastructure using a declarative
                configuration language called HashiCorp Configuration Language
                (HCL). It supports a vast ecosystem of providers for various
                cloud platforms (AWS, Azure, GCP) and on-premises solutions.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Layers,
                    title: "Multi-Cloud Support",
                    desc: "Manage infrastructure across diverse cloud environments from a single workflow.",
                    color: "blue",
                  },
                  {
                    icon: GitBranch,
                    title: "State Management",
                    desc: "Keeps track of the real-world state of your infrastructure, enabling safe and predictable changes.",
                    color: "green",
                  },
                  {
                    icon: Code,
                    title: "Modularity with Terragrunt",
                    desc: "Enhances Terraform with DRY (Don't Repeat Yourself) principles and remote state management.",
                    color: "orange",
                  },
                  {
                    icon: RefreshCw,
                    title: "Import Existing Infra with Terraformer",
                    desc: "Generates Terraform configuration from existing infrastructure, useful for adopting IaC on legacy systems.",
                    color: "purple",
                  },
                ].map((item, index) => (
                  <div key={index} className={listItemStyle}>
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
          {/* Ansible */}
          <Card className="mb-8 border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-green-100 rounded-lg shadow-sm">
                  <Terminal className="w-5 h-5 text-green-600" />
                </div>
                Ansible (Red Hat)
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Automation engine for configuration management, application
                deployment, and orchestration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                Ansible is an open-source automation tool that automates
                software provisioning, configuration management, and application
                deployment. It's agentless, meaning it communicates with managed
                nodes over standard SSH or WinRM, requiring no special software
                on the client side.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Zap,
                    title: "Agentless Architecture",
                    desc: "Simplifies setup and maintenance as no agents are required on target machines.",
                    color: "green",
                  },
                  {
                    icon: FileText,
                    title: "YAML Playbooks",
                    desc: "Uses human-readable YAML files (playbooks) to define automation tasks.",
                    color: "blue",
                  },
                  {
                    icon: Users,
                    title: "Idempotency",
                    desc: "Ensures that running a playbook multiple times will result in the same system state, preventing unintended side effects.",
                    color: "purple",
                  },
                  {
                    icon: RefreshCw,
                    title: "Orchestration",
                    desc: "Manages complex multi-tier application deployments and orchestrates IT processes.",
                    color: "orange",
                  },
                ].map((item, index) => (
                  <div key={index} className={listItemStyle}>
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
          {/* Pulumi */}
          <Card className="mb-8 border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-teal-100 rounded-lg shadow-sm">
                  <Code className="w-5 h-5 text-teal-600" />
                </div>
                Pulumi
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                IaC using familiar programming languages (TypeScript, Python,
                Go, C#).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                Pulumi is an open-source IaC tool that allows developers and
                operations teams to define, deploy, and manage cloud
                infrastructure using general-purpose programming languages. This
                approach enables the use of familiar tools, testing frameworks,
                and IDEs for infrastructure management.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Code,
                    title: "Polyglot Support",
                    desc: "Write IaC in TypeScript, Python, Go, C#, Java, or YAML.",
                    color: "teal",
                  },
                  {
                    icon: Cloud,
                    title: "Multi-Cloud & Kubernetes",
                    desc: "Supports AWS, Azure, GCP, Kubernetes, and many other cloud services.",
                    color: "blue",
                  },
                  {
                    icon: Layers,
                    title: "Component Reusability",
                    desc: "Create reusable components and abstractions using standard programming constructs.",
                    color: "purple",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Policy as Code",
                    desc: "Define and enforce security and compliance policies using code.",
                    color: "red",
                  },
                ].map((item, index) => (
                  <div key={index} className={listItemStyle}>
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
          {/* AWS CloudFormation */}
          <Card className="mb-8 border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-orange-100 rounded-lg shadow-sm">
                  <Cloud className="w-5 h-5 text-orange-600" />
                </div>
                AWS CloudFormation
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                AWS-native service for provisioning and managing AWS resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                AWS CloudFormation is an AWS service that helps you model and
                set up your Amazon Web Services resources so that you can spend
                less time managing those resources and more time focusing on
                your applications that run in AWS. You create a template that
                describes all the AWS resources that you want (like Amazon EC2
                instances or Amazon RDS DB instances), and CloudFormation takes
                care of provisioning and configuring those resources for you.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Server,
                    title: "Stack Management",
                    desc: "Manages collections of AWS resources as a single unit (stacks).",
                    color: "orange",
                  },
                  {
                    icon: FileText,
                    title: "YAML/JSON Templates",
                    desc: "Defines infrastructure using declarative templates in YAML or JSON format.",
                    color: "blue",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Drift Detection",
                    desc: "Identifies when the actual configuration of resources differs from their defined state in the CloudFormation template.",
                    color: "green",
                  },
                  {
                    icon: RefreshCw,
                    title: "Change Sets",
                    desc: "Allows you to preview how proposed changes to your stack might impact your running resources.",
                    color: "purple",
                  },
                ].map((item, index) => (
                  <div key={index} className={listItemStyle}>
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
          {/* AWS Boto3 */}
          <Card className="mb-8 border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-red-100 rounded-lg shadow-sm">
                  <Database className="w-5 h-5 text-red-600" />
                </div>
                AWS Boto3 (Python SDK)
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Python SDK for programmatic interaction with AWS services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                Boto3 is the Amazon Web Services (AWS) SDK for Python. It allows
                Python developers to write software that makes use of AWS
                services like Amazon S3, Amazon EC2, and more. While not a
                declarative IaC tool like Terraform or CloudFormation, Boto3 is
                essential for scripting complex automation tasks, managing AWS
                resources programmatically, and building custom tools that
                interact with AWS APIs.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: Code,
                    title: "Programmatic Control",
                    desc: "Directly interact with AWS APIs using Python code for fine-grained control.",
                    color: "red",
                  },
                  {
                    icon: Workflow,
                    title: "Custom Automation",
                    desc: "Build custom scripts for complex automation workflows, data processing, and resource management.",
                    color: "orange",
                  },
                  {
                    icon: Cpu,
                    title: "Event-Driven Architectures",
                    desc: "Integrate with AWS Lambda and other services to create event-driven automation.",
                    color: "blue",
                  },
                  {
                    icon: MemoryStick,
                    title: "Data Management",
                    desc: "Automate data operations on S3, DynamoDB, and other storage services.",
                    color: "purple",
                  },
                ].map((item, index) => (
                  <div key={index} className={listItemStyle}>
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
        </section>
        {/* Call to Action */}
        <section className="mb-12">
          <Card className="relative border border-gray-200 shadow-lg bg-white rounded-2xl overflow-hidden p-8 md:p-10 text-center">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gray-50 opacity-60 rounded-2xl"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-blue-100 px-4 py-1.5 rounded-full mb-4 text-sm font-semibold text-gray-700">
                <Sparkles className="w-4 h-4 mr-1 text-blue-600" />
                Ready to Transform?
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Accelerate Your Journey to Cloud-Native
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                Partner with us to seamlessly migrate your monolithic
                applications and unlock the full potential of scalable,
                resilient, and cost-efficient cloud solutions.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border-0"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Schedule a Free Consultation
              </Button>
              {/* Trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-6 border-t border-gray-100">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                    Proven Success
                  </h4>
                  <p className="text-xs text-gray-600">
                    100% successful migrations
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                    Rapid Deployment
                  </h4>
                  <p className="text-xs text-gray-600">
                    2-4 week average timeline
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-2">
                    <ShieldCheck className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                    Enterprise-Grade Security
                  </h4>
                  <p className="text-xs text-gray-600">
                    Built-in security from day one
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
      <MinimalFooter />
    </div>
  );
}