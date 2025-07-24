"use client";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  Users,
  Lightbulb,
  Scale,
  Zap,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Target,
  BellRing,
  Workflow,
  Code,
  Activity,
  Dock,
  Database,
  RefreshCw,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StepCard from "@/components/StepCard"; // Import the new StepCard component
import { cn } from "@/lib/utils"; // Ensure cn utility is imported

export default function PartTimeDevOpsSupportPage() {
  const listItemStyle =
    "flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all duration-300 group";
  const iconWrapperStyle = (color: string) =>
    `p-2 bg-${color}-100 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`;
  const iconStyle = (color: string) => `w-4 h-4 text-${color}-600`;
  const titleStyle = "font-bold text-sm md:text-base text-gray-900 mb-1"; // Adjusted for mobile
  const descStyle = "text-xs md:text-sm text-gray-600 leading-relaxed"; // Adjusted for mobile

  const steps = [
    {
      step: "1",
      title: "Initial Consultation",
      desc: "Discuss your current challenges, project goals, and desired outcomes.",
      icon: Users,
      color: "blue",
    },
    {
      step: "2",
      title: "Scope Definition",
      desc: "Work together to define the project scope, deliverables, and timeline.",
      icon: BookOpen,
      color: "green",
    },
    {
      step: "3",
      title: "Execution & Reporting",
      desc: "Our experts perform the work, providing regular progress updates and detailed reports.",
      icon: Code,
      color: "purple",
    },
    {
      step: "4",
      title: "Ongoing Support",
      desc: "Continuous assistance, maintenance, and optimization as your needs evolve.",
      icon: RefreshCw,
      color: "orange",
    },
  ];

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
      <main className="-mt-9 md:mt-1 max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <div className="max-w-5xl mx-auto">
            <Badge className="mb-4 px-3 py-1 text-xs md:px-4 md:py-2 md:text-base bg-gradient-to-r from-green-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Users className="w-4 h-4 mr-2" />
              DevOps Support
            </Badge>
            <h1 className="text-xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
              Flexible Part-Time DevOps Support
              <span className="block text-transparent bg-gradient-to-r from-green-600 to-blue-700 bg-clip-text">
                Customized to Your Requirements
              </span>
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-10 leading-relaxed max-w-4xl mx-auto">
              Gain access to experienced DevOps professionals on demand without
              the expense of a full-time hire. Our flexible support plans help
              you optimize infrastructure, streamline processes, and swiftly
              resolve critical issues.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge className="px-3 py-1 text-sm md:px-4 md:py-2 md:text-base bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Scale className="w-4 h-4 mr-2" />
                Flexibility
              </Badge>
              <Badge className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-base bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Lightbulb className="w-4 h-4 mr-2" />
                Expertise
              </Badge>
              <Badge className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-base bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <Zap className="w-4 h-4 mr-2" />
                Cost-Effective
              </Badge>
              <Badge className="px-3 py-1 text-xs md:px-4 md:py-2 md:text-base bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition-all duration-300 hover:scale-105 cursor-pointer">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Proactive
              </Badge>
            </div>
          </div>
        </section>
        {/* What is Part-Time DevOps Support? */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">?</span>
            </div>
            <div>
              <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-2">
                What is Part-Time DevOps Support?
              </h2>
              <p className="text-sm md:text-lg text-gray-600">
                Expert DevOps assistance whenever you need it
              </p>
            </div>
          </div>
          <Card className="-mt-4 border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Part-time DevOps support connects your organization with skilled
                DevOps engineers on a flexible, as-needed basis. Perfect for
                projects requiring specialized expertise, temporary resource
                gaps, or ongoing maintenance without the cost of full-time
                staff. Benefit from expert help with pipeline optimization,
                cloud cost control, infrastructure automation, incident
                management, and more to keep your operations efficient and
                reliable.
              </p>
              <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                {[
                  {
                    icon: Users,
                    title: "On-Demand Expertise",
                    desc: "Access experienced DevOps professionals exactly when you need them.",
                    color: "blue",
                  },
                  {
                    icon: Scale,
                    title: "Cost-Effective",
                    desc: "Only pay for the support you need, avoiding full-time salary expenses.",
                    color: "green",
                  },
                  {
                    icon: RefreshCw,
                    title: "Flexible Engagement",
                    desc: "Customize support hours and project scopes to your specific needs.",
                    color: "orange",
                  },
                  {
                    icon: BookOpen,
                    title: "Strategic Guidance",
                    desc: "Receive expert advice to improve your DevOps maturity and cloud strategy.",
                    color: "purple",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={cn(listItemStyle, "min-w-[350px] flex-shrink-0")}
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
        </section>
        {/* Why Choose Part-Time DevOps Support? */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="font-bold text-lg">!</span>
            </div>
            <div>
              <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-2">
                Why Choose Part-Time DevOps Support?
              </h2>
              <p className="text-sm md:text-lg text-gray-600">
                Save costs and boost efficiency with expert, flexible support
              </p>
            </div>
          </div>
          <Card className="-mt-4 border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Scale,
                    title: "Cost Savings",
                    desc: "Lower operational expenses compared to hiring full-time DevOps staff.",
                    color: "green",
                  },
                  {
                    icon: Sparkles,
                    title: "Access to Top Talent",
                    desc: "Work with highly skilled professionals who stay current on industry trends.",
                    color: "blue",
                  },
                  {
                    icon: Zap,
                    title: "Increased Agility",
                    desc: "Adapt quickly to changing project demands with on-demand support.",
                    color: "orange",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Reduced Overhead",
                    desc: "Avoid recruitment, onboarding, and benefits costs of permanent hires.",
                    color: "red",
                  },
                  {
                    icon: Target,
                    title: "Focus on Core Business",
                    desc: "Let your internal teams focus on product development while we handle DevOps.",
                    color: "purple",
                  },
                  {
                    icon: BellRing,
                    title: "Proactive Problem Solving",
                    desc: "Prevent costly outages with proactive monitoring and issue resolution.",
                    color: "teal",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={cn(listItemStyle, "min-w-[350px] flex-shrink-0")}
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
        </section>
        {/* Key Services Offered */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Workflow className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-2">
                Key Services Offered
              </h2>
              <p className="text-sm md:text-lg text-gray-600">
                Comprehensive support across your entire DevOps lifecycle
              </p>
            </div>
          </div>
          <Card className="-mt-4 border border-gray-100 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2">
                {[
                  {
                    icon: Zap,
                    title: "CI/CD Pipeline Optimization",
                    desc: "Streamline and automate build, test, and deployment workflows for faster releases.",
                    color: "blue",
                  },
                  {
                    icon: Code,
                    title: "Infrastructure Automation",
                    desc: "Implement Infrastructure as Code using tools like Terraform, Ansible, or Pulumi.",
                    color: "green",
                  },
                  {
                    icon: Scale,
                    title: "Cloud Cost Optimization",
                    desc: "Analyze and reduce your AWS, Azure, or GCP cloud spending to save money.",
                    color: "purple",
                  },
                  {
                    icon: Activity,
                    title: "Monitoring & Alerting Setup",
                    desc: "Deploy monitoring solutions (Prometheus, Grafana) and configure alerts for proactive management.",
                    color: "orange",
                  },
                  {
                    icon: Dock,
                    title: "Kubernetes Management",
                    desc: "Assist with deployment, scaling, and troubleshooting of Kubernetes clusters (AKS, EKS, GKE).",
                    color: "teal",
                  },
                  {
                    icon: Database,
                    title: "Database & Storage Support",
                    desc: "Manage cloud databases, backups, and storage to ensure performance and reliability.",
                    color: "red",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={cn(listItemStyle, "min-w-[350px] flex-shrink-0")}
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
        </section>
        {/* How It Works (Steps with animation) */}
        <section className="mb-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-2">
                How It Works
              </h2>
              <p className="text-sm md:text-lg text-gray-600">
                A straightforward 4-step process to get you started
              </p>
            </div>
          </div>
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 lg:grid lg:grid-cols-4">
            {steps.map(({ step, title, desc, icon, color }) => (
              <StepCard
                key={step}
                step={step}
                title={title}
                desc={desc}
                icon={icon}
                color={color}
                className="-mt-4 min-w-[220px] flex-shrink-0" // Apply min-width for horizontal scroll
              />
            ))}
          </div>
        </section>
        {/* Call to Action */}
        <section className="text-center mb-7 md:mb-13">
          {" "}
          {/* Reduced mb-16 to mb-12 */}
          <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Enhance Your DevOps Capability?
          </h3>
          <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto mb-8">
            Contact me today for a personalized consultation and a flexible
            support plan tailored to your business needs.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-green-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a
              href="thaunghtikeoo.tho1234@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </Button>
        </section>
      </main>
      <div className="-mt-4 md:-mt-14">
        <MinimalFooter />
      </div>
    </div>
  );
}