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
  GraduationCap,
  ChevronLeft,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

const DevOpsCyclingHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const slides = [
    {
      id: "devops",
      title: "Let's Explore DevOps",
      description:
        "Discover how DevOps bridges development and operations teams through automation, continuous integration, and rapid deployment to deliver software faster and more reliably.",
      icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12" />,
      bgPattern: "devops",
      iconGradient: "from-orange-400 to-yellow-400",
      tools: ["Docker", "Jenkins", "AWS", "Terraform", "Ansible"],
    },
    {
      id: "kubernetes",
      title: "Master Kubernetes",
      description:
        "Learn container orchestration with Kubernetes - the industry standard for automating deployment, scaling, and management of containerized applications.",
      icon: <Container className="w-10 h-10 sm:w-12 sm:h-12" />,
      bgPattern: "kubernetes",
      iconGradient: "from-blue-400 to-cyan-400",
      tools: ["Pods", "Services", "Deployments", "Ingress", "ConfigMaps"],
    },
    {
      id: "cicd",
      title: "Understand CI/CD",
      description:
        "Explore Continuous Integration and Continuous Deployment - the practices that enable teams to deliver code changes more frequently and reliably through automated pipelines.",
      icon: <GitBranch className="w-10 h-10 sm:w-12 sm:h-12" />,
      bgPattern: "cicd",
      iconGradient: "from-green-400 to-emerald-400",
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
      title: "Learn Linux Fundamentals",
      description:
        "Build your foundation with Linux - the operating system that powers most servers, containers, and cloud infrastructure in modern DevOps environments.",
      icon: <Terminal className="w-10 h-10 sm:w-12 sm:h-12" />,
      bgPattern: "linux",
      iconGradient: "from-orange-500 to-yellow-500",
      tools: ["Ubuntu", "CentOS", "Red Hat", "Debian", "Alpine"],
    },
    {
      id: "cloud",
      title: "Explore Cloud Computing",
      description:
        "Dive into cloud computing - learn how to leverage scalable, on-demand resources like servers, storage, and applications without managing physical infrastructure.",
      icon: <Box className="w-10 h-10 sm:w-12 sm:h-12" />,
      bgPattern: "cloud",
      iconGradient: "from-sky-400 to-blue-400",
      tools: ["AWS", "Azure", "GCP", "DigitalOcean", "Heroku"],
    },
    {
      id: "containerization",
      title: "Get Started with Containerization",
      description:
        "Understand containerization - how to package applications and dependencies into lightweight, portable containers that run consistently across different environments.",
      icon: <Box className="w-10 h-10 sm:w-12 sm:h-12" />,
      bgPattern: "containerization",
      iconGradient: "from-teal-400 to-green-400",
      tools: ["Docker", "Podman", "containerd", "CRI-O", "LXC"],
    },
    {
      id: "iac",
      title: "Discover Infrastructure as Code",
      description:
        "Master Infrastructure as Code (IaC) - learn to manage and provision computing infrastructure through code for version control and automated deployment.",
      icon: <Code className="w-10 h-10 sm:w-12 sm:h-12" />,
      bgPattern: "iac",
      iconGradient: "from-violet-400 to-purple-400",
      tools: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Chef"],
    },
  ];

  const certifications = [
    {
      title: "AWS Cloud Practitioner",
      logo: "aws1.png",
      organization: "AWS",
    },
    {
      title: "Azure Fundamentals",
      logo: "az900.png",
      organization: "Microsoft",
    },
    {
      title: "AWS Solutions Architect",
      logo: "aws2.webp",
      organization: "AWS",
    },
    {
      title: "GitHub Foundations",
      logo: "git.png",
      organization: "GitHub",
    },
    {
      title: "Docker Certified",
      logo: "docker.png",
      organization: "Docker",
    },
    {
      title: "Kubernetes Administrator",
      logo: "cka.webp",
      organization: "CNCF",
    },
    {
      title: "Terraform Associate",
      logo: "tf.png",
      organization: "HashiCorp",
    },
    {
      title: "Kubernetes Developer",
      logo: "ckad.png",
      organization: "CNCF",
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

  // Handle image error - fallback to devops.png
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    target.src = "/devops.png";
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-2xl overflow-hidden">
      {/* Header Section */}
      <motion.div
        className="absolute top-20 md:top-24 left-0 right-0 z-20 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 relative z-10">
          {/* Chevron with dotted trail */}
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 ml-2" />
          <motion.div
            className="flex items-center gap-1 mt-2 sm:mt-0"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
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
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Mission
          </h2>

          {/* Chevron with dotted trail */}
          <motion.div
            className="flex items-center gap-1 mt-2 sm:mt-0"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
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
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-24 sm:w-32 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full mx-auto relative"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-lg"
            animate={{ x: [0, "5.5rem", 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <p className="text-gray-400 mt-6 text-sm sm:text-base max-w-2xl mx-auto relative z-10 px-2">
          This website is for developers and students in Myanmar who want to
          learn DevOps and boost their careers in modern software development
          and cloud infrastructure.
        </p>
      </motion.div>

      {/* Background Elements */}
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
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-orange-500/20 rounded-lg backdrop-blur-sm border border-orange-400/30 flex items-center justify-center">
                <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-orange-400" />
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
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
                <Container className="w-2 h-2 sm:w-3 sm:h-3 text-blue-400" />
              </div>
            </div>
          ))}
        </div>

        {/* CI/CD Background */}
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
              <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
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
          {floatingPositions.map((pos, i) => (
            <div
              key={`linux-${i}`}
              className="absolute animate-float"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${i * 0.25}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            >
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-400/30 flex items-center justify-center">
                <Terminal className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400" />
              </div>
            </div>
          ))}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={`cmd-${i}`}
                className="absolute animate-pulse"
                style={{
                  left: `${5 + i * 12}%`,
                  top: `${10 + (i % 4) * 25}%`,
                }}
              >
                <div className="w-20 sm:w-24 h-0.5 bg-orange-400/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Cloud Computing Background */}
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
                <div className="w-12 sm:w-16 h-0.5 bg-sky-400/50" />
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
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-teal-500/20 rounded-md backdrop-blur-sm border border-teal-400/30 flex items-center justify-center">
                <Box className="w-2 h-2 sm:w-3 sm:h-3 text-teal-400" />
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
                  <Code className="w-3 h-3 sm:w-4 sm:h-4 text-violet-400" />
                  <div className="w-8 sm:w-12 h-0.5 bg-violet-400/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-48 sm:pt-56 md:pt-40 lg:pt-32">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Animated Icon with Better Spacing */}
          <div className="mt-25 mb-4 md:mb-4 flex justify-center">
            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.iconGradient} rounded-full blur-xl opacity-50 animate-pulse`}
              />
              <div
                className={`relative bg-gradient-to-r ${currentSlideData.iconGradient} rounded-full p-4 sm:p-5 text-white shadow-2xl`}
              >
                {currentSlideData.icon}
              </div>
            </div>
          </div>

          {/* Title with Better Spacing */}
          <div className="mb-6 sm:mb-8 md:mb-8">
            <h1 className="text-3xl sm:text-2xl md:text-5xl lg:text-4xl font-bold text-white">
              <span
                className={`bg-gradient-to-r ${currentSlideData.iconGradient} bg-clip-text text-transparent`}
              >
                {currentSlideData.title}
              </span>
            </h1>
          </div>

          {/* Description with Better Spacing */}
          <div className="mb-8 sm:mb-8 md:mb-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-2 sm:px-4">
              {currentSlideData.description}
            </p>
          </div>

          {/* Tools/Technologies with Better Spacing */}
          <div className="mb-12 sm:mb-16">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              {currentSlideData.tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-white font-medium text-xs sm:text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-1.5 sm:space-x-2 mb-">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? `bg-gradient-to-r ${currentSlideData.iconGradient} scale-125`
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Side Chevrons - Hidden on mobile, shown on larger screens */}
        <div className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            {[...Array(5)].map((_, i) => (
              <ChevronRight
                key={i}
                className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400/50 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        <div className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 rotate-180 hidden lg:block">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            {[...Array(5)].map((_, i) => (
              <ChevronRight
                key={i}
                className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400/50 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Dotted Design Elements - Hidden on mobile */}
        <div className="absolute top-20 left-4 sm:left-20 hidden lg:block">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400/30 rounded-full animate-ping"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-20 right-4 sm:right-20 hidden lg:block">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400/30 rounded-full animate-ping"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
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
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        /* Cross-browser improvements */
        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-2xl {
            background-color: rgba(0, 0, 0, 0.9);
          }
        }
      `}</style>
    </section>
  );
};

export default DevOpsCyclingHero;
