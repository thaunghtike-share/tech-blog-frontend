"use client";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Server,
  GitBranch,
  Monitor,
  Container,
  Settings,
  Terminal,
  Cloud,
} from "lucide-react";

export default function Intro() {
  const [currentToolIndex, setCurrentToolIndex] = useState(0);

  const devopsTools = [
    { name: "Docker", icon: Container, color: "from-blue-500 to-cyan-500" },
    {
      name: "Kubernetes",
      icon: Settings,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Jenkins",
      icon: GitBranch,
      color: "from-green-500 to-emerald-500",
    },
    { name: "Linux", icon: Terminal, color: "from-orange-500 to-red-500" },
    { name: "AWS", icon: Cloud, color: "from-yellow-500 to-amber-500" },
    { name: "Monitoring", icon: Monitor, color: "from-indigo-500 to-blue-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToolIndex((prev) => (prev + 1) % devopsTools.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const FloatingTool = ({
    tool,
    index,
    delay,
  }: {
    tool: any;
    index: number;
    delay: number;
  }) => {
    const Icon = tool.icon;
    return (
      <div
        className={`absolute animate-float opacity-20 hover:opacity-40 transition-all duration-500`}
        style={{
          left: `${10 + ((index * 15) % 80)}%`,
          top: `${20 + ((index * 20) % 60)}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${4 + (index % 3)}s`,
        }}
      >
        <div
          className={`p-3 rounded-full bg-gradient-to-r ${tool.color} shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background Pattern - matching header */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,100,100,0.1)_50%,transparent_75%)] bg-[length:4px_4px]" />

      {/* Floating DevOps Tools */}
      {devopsTools.map((tool, index) => (
        <FloatingTool
          key={tool.name}
          tool={tool}
          index={index}
          delay={index * 0.5}
        />
      ))}

      {/* Animated Dotted Lines */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              left: "10%",
              right: "10%",
              animationDelay: `${i * 0.8}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Main Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            DevOps Learning Path for Beginners
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DevOps
            </span>
            <br />
            From Zero to Hero
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Start your DevOps journey with comprehensive guides, hands-on
            tutorials, and real-world projects. Learn the tools and practices
            that power modern software delivery.
          </p>

          {/* Animated Chevron with Current Tool */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full">
              <div
                className={`p-2 rounded-full bg-gradient-to-r ${devopsTools[currentToolIndex].color}`}
              >
                {(() => {
                  const Icon = devopsTools[currentToolIndex].icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
              <span className="text-white font-medium">
                Currently Learning: {devopsTools[currentToolIndex].name}
              </span>
              <ChevronRight className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Learning Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {/* What is DevOps */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  What is DevOps?
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                DevOps is a cultural and technical movement that bridges
                development and operations teams. It emphasizes automation,
                continuous integration, and rapid deployment to deliver software
                faster and more reliably.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  Automated CI/CD pipelines
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Infrastructure as Code (IaC)
                </div>
                <div className="flex items-center gap-2 text-sm text-green-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Monitoring and observability
                </div>
              </div>
            </div>
          </div>

          {/* What is Kubernetes */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  What is Kubernetes?
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Kubernetes (K8s) is an open-source container orchestration
                platform that automates deployment, scaling, and management of
                containerized applications across clusters of hosts.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-purple-300">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Container orchestration
                </div>
                <div className="flex items-center gap-2 text-sm text-pink-300">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  Auto-scaling & load balancing
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  Service discovery & networking
                </div>
              </div>
            </div>
          </div>

          {/* What is CI/CD */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <GitBranch className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">What is CI/CD?</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                CI/CD stands for Continuous Integration and Continuous
                Deployment. It's a practice that enables development teams to
                deliver code changes more frequently and reliably through
                automated pipelines.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Automated testing & builds
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Continuous deployment
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  Faster feedback loops
                </div>
              </div>
            </div>
          </div>

          {/* What is Linux */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">What is Linux?</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Linux is an open-source operating system that powers most
                servers, containers, and cloud infrastructure. It's essential
                for DevOps engineers to master Linux command line and system
                administration.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-orange-300">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  Command line mastery
                </div>
                <div className="flex items-center gap-2 text-sm text-red-300">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                  System administration
                </div>
                <div className="flex items-center gap-2 text-sm text-yellow-300">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  Shell scripting & automation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DevOps Tools & Technologies */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Essential DevOps Tools & Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master these industry-standard tools to become a successful DevOps
            engineer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Docker",
              desc: "Containerization platform",
              icon: Container,
              color: "from-blue-500 to-cyan-500",
            },
            {
              name: "Kubernetes",
              desc: "Container orchestration",
              icon: Settings,
              color: "from-purple-500 to-pink-500",
            },
            {
              name: "Jenkins",
              desc: "CI/CD automation server",
              icon: GitBranch,
              color: "from-green-500 to-emerald-500",
            },
            {
              name: "AWS/Azure/GCP",
              desc: "Cloud platforms",
              icon: Cloud,
              color: "from-yellow-500 to-amber-500",
            },
            {
              name: "Terraform",
              desc: "Infrastructure as Code",
              icon: Server,
              color: "from-indigo-500 to-purple-500",
            },
            {
              name: "Prometheus",
              desc: "Monitoring & alerting",
              icon: Monitor,
              color: "from-red-500 to-pink-500",
            },
          ].map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={tool.name} className="group relative">
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${tool.color} rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300`}
                />
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full hover:transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${tool.color} rounded-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {tool.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{tool.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 w-20" />
            <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all cursor-pointer">
              Start Your DevOps Journey Today
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 w-20" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
