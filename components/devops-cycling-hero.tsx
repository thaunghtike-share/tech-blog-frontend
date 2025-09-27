"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Server,
  Container,
  GitBranch,
  Terminal,
  Zap,
  Box,
  Code,
  Globe,
  BookOpen,
  BadgeCheck,
  Rocket,
  ListTodo,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";

const DevOpsCyclingHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const slides = [
    {
      id: "devops",
      title: "What is DevOps?",
      description:
        "DevOps is a cultural and technical movement that bridges development and operations teams. It emphasizes automation, continuous integration, and rapid deployment to deliver software faster and more reliably.",
      icon: <Zap className="w-12 h-12" />,
      bgPattern: "devops",
      tools: ["Docker", "Jenkins", "AWS", "Terraform", "Ansible"],
    },
    {
      id: "kubernetes",
      title: "What is Kubernetes?",
      description:
        "Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications across clusters of hosts.",
      icon: <Container className="w-12 h-12" />,
      bgPattern: "kubernetes",
      tools: ["Pods", "Services", "Deployments", "Ingress", "ConfigMaps"],
    },
    {
      id: "cicd",
      title: "What is CI/CD?",
      description:
        "Continuous Integration/Continuous Deployment is a practice that enables teams to deliver code changes more frequently and reliably through automated testing and deployment pipelines.",
      icon: <GitBranch className="w-12 h-12" />,
      bgPattern: "cicd",
      tools: [
        "GitHub Actions",
        "Jenkins",
        "GitLab CI",
        "CircleCI",
        "Azure DevOps",
      ],
    },
    {
      id: "linux",
      title: "What is Linux?",
      description:
        "Linux is an open-source operating system that powers most servers, containers, and cloud infrastructure. It provides the foundation for modern DevOps practices and tools.",
      icon: <Terminal className="w-12 h-12" />,
      bgPattern: "linux",
      tools: ["Ubuntu", "CentOS", "Red Hat", "Debian", "Alpine"],
    },
    {
      id: "cloud",
      title: "What is Cloud Computing?",
      description:
        "Cloud computing delivers computing services over the internet, enabling scalable, on-demand access to resources like servers, storage, and applications without managing physical infrastructure.",
      icon: <Box className="w-12 h-12" />,
      bgPattern: "cloud",
      tools: ["AWS", "Azure", "GCP", "DigitalOcean", "Heroku"],
    },
    {
      id: "containerization",
      title: "What is Containerization?",
      description:
        "Containerization packages applications and their dependencies into lightweight, portable containers that run consistently across different environments, from development to production.",
      icon: <Box className="w-12 h-12" />,
      bgPattern: "containerization",
      tools: ["Docker", "Podman", "containerd", "CRI-O", "LXC"],
    },
    {
      id: "iac",
      title: "What is IAC?",
      description:
        "Infrastructure as Code (IaC) manages and provisioning computing infrastructure through machine-readable definition files, enabling version control and automated deployment of infrastructure.",
      icon: <Code className="w-12 h-12" />,
      bgPattern: "iac",
      tools: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Chef"],
    },
    {
      id: "tools",
      title: "Essential DevOps Tools",
      description:
        "Modern DevOps relies on a comprehensive toolchain covering version control, CI/CD, containerization, orchestration, monitoring, and infrastructure management.",
      icon: <Server className="w-12 h-12" />,
      bgPattern: "tools",
      tools: ["Docker", "Kubernetes", "Terraform", "Prometheus", "Grafana"],
    },
  ];

  const floatingPositions = [
    { left: 10, top: 20 },
    { left: 80, top: 15 },
    { left: 25, top: 70 },
    { left: 90, top: 60 },
    { left: 5, top: 50 },
    { left: 70, top: 80 },
    { left: 15, top: 35 },
    { left: 85, top: 25 },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length, mounted]);

  const currentSlideData = slides[currentSlide];

  if (!mounted) {
    return (
      <section className="relative min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-2xl overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-6 text-white">
                <Zap className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-black to-gray-900 bg-clip-text text-transparent">
                What is DevOps?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              DevOps is a cultural and technical movement that bridges
              development and operations teams.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-2xl overflow-hidden">
      {/* Header with updated title */}
      <motion.div
        className="absolute top-20 left-0 right-0 z-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background pattern with dotted signs 
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,100,100,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
        */}
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Animated bubble icon */}
          <motion.div
            className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {/* Bubble effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <GraduationCap className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Mission
          </h2>

          {/* Chevron with dotted trail */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
            <ChevronRight className="w-6 h-6 text-blue-400 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto relative"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Animated dots on the line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{ x: [0, 120, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <p className="text-gray-400 mt-4 text-base max-w-2xl mx-auto relative z-10">
          This website is for developers and students in Myanmar who want to
          learn DevOps and boost their careers in modern software development and cloud infrastructure.
        </p>
      </motion.div>

      <div className="absolute inset-0">
        {/* DevOps Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlideData.bgPattern === "devops"
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
          {floatingPositions.map((pos, i) => (
            <div
              key={`devops-${i}`}
              className="absolute animate-float"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + (i % 3)}s`,
              }}
            >
              <div className="w-6 h-6 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
                <Zap className="w-3 h-3 text-blue-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Kubernetes Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlideData.bgPattern === "kubernetes"
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
          {floatingPositions.map((pos, i) => (
            <div
              key={`k8s-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + (i % 2)}s`,
              }}
            >
              <div className="w-6 h-6 bg-cyan-500/20 rounded-full backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center">
                <Container className="w-3 h-3 text-cyan-400" />
              </div>
            </div>
          ))}
        </div>

        {/* CI/CD Background - simplified without git icons */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlideData.bgPattern === "cicd" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
          {[...Array(6)].map((_, i) => (
            <div
              key={`cicd-${i}`}
              className="absolute animate-pulse"
              style={{
                left: `${i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                transform: "rotate(45deg)",
              }}
            >
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
            </div>
          ))}
        </div>

        {/* Linux Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlideData.bgPattern === "linux" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
              {[...Array(400)].map((_, i) => (
                <div
                  key={`linux-${i}`}
                  className={`border border-orange-400/20 ${
                    i % 5 === 0 ? "bg-orange-400/10" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cloud Computing Background - simplified without cloud icons */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlideData.bgPattern === "cloud" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={`cloud-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${10 + i * 10}%`,
                  top: `${15 + (i % 4) * 20}%`,
                }}
              >
                <div className="w-16 h-0.5 bg-sky-400/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Containerization Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlideData.bgPattern === "containerization"
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
          {floatingPositions.map((pos, i) => (
            <div
              key={`container-${i}`}
              className="absolute animate-bounce"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: `${2.5 + (i % 2) * 0.5}s`,
              }}
            >
              <div className="w-6 h-6 bg-teal-500/20 rounded-md backdrop-blur-sm border border-teal-400/30 flex items-center justify-center">
                <Box className="w-3 h-3 text-teal-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Infrastructure as Code Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlideData.bgPattern === "iac" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
          <div className="absolute inset-0 opacity-20">
            {floatingPositions.map((pos, i) => (
              <div
                key={`iac-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <div className="flex items-center space-x-1">
                  <Code className="w-4 h-4 text-violet-400" />
                  <div className="w-12 h-0.5 bg-violet-400/50" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlideData.bgPattern === "tools" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
          {floatingPositions.map((pos, i) => (
            <div
              key={`tools-${i}`}
              className="absolute animate-spin"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.25}s`,
                animationDuration: `${8 + (i % 4)}s`,
              }}
            >
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-400/30 flex items-center justify-center">
                <Server className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Icon */}
          <div className="-mt-65 mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-5 text-white">
                {currentSlideData.icon}
              </div>
            </div>
          </div>

          {/* Title with Animation - reduced font size */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {currentSlideData.title}
            </span>
          </h1>

          {/* Description - reduced font size */}
          <p className="text-lg md:text-lg text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            {currentSlideData.description}
          </p>

          {/* Tools/Technologies */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {currentSlideData.tools.map((tool, index) => (
              <div
                key={tool}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white font-medium animate-fade-in text-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tool}
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Animated Chevrons */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="flex flex-col space-y-4">
              {[...Array(5)].map((_, i) => (
                <ChevronRight
                  key={i}
                  className="w-6 h-6 text-blue-400/50 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 rotate-180 hidden lg:block">
            <div className="flex flex-col space-y-4">
              {[...Array(5)].map((_, i) => (
                <ChevronRight
                  key={i}
                  className="w-6 h-6 text-purple-400/50 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>

          {/* Dotted Design Elements */}
          <div className="absolute top-20 left-20 hidden lg:block">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-400/30 rounded-full animate-ping"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-20 right-20 hidden lg:block">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400/30 rounded-full animate-ping"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default DevOpsCyclingHero;
