"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DevOpsCyclingHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const slides = [
    {
      id: "devops",
      title: "Required Skills To Be DevOps Engineer",
      description:
        "Discover how DevOps bridges development and operations teams through automation, continuous integration, and rapid deployment to deliver software faster and more reliably.",
      bgPattern: "devops",
      iconGradient: "from-orange-400 to-yellow-400",
      tools: ["Docker", "Jenkins", "AWS", "Terraform", "Ansible"],
    },
    {
      id: "linux",
      title: "Learn Linux Fundamentals",
      description:
        "Build your foundation with Linux - the operating system that powers most servers, containers, and cloud infrastructure in modern DevOps environments.",
      bgPattern: "linux",
      iconGradient: "from-orange-500 to-yellow-500",
      tools: ["Ubuntu", "CentOS", "Red Hat", "Debian", "Alpine"],
    },
    {
      id: "network",
      title: "Learn Network Fundamentals",
      description:
        "Understand networking basics - the protocols, architectures, and tools that enable communication between computers, servers, and cloud services in DevOps.",
      bgPattern: "cloud",
      iconGradient: "from-sky-400 to-blue-400",
      tools: ["Ubuntu", "CentOS", "Red Hat", "Debian", "Alpine"],
    },
    {
      id: "cloud",
      title: "Explore Cloud Computing",
      description:
        "Dive into cloud computing - learn how to leverage scalable, on-demand resources like servers, storage, and applications without managing physical infrastructure.",
      bgPattern: "cloud",
      iconGradient: "from-sky-400 to-blue-400",
      tools: ["AWS", "Azure", "GCP", "DigitalOcean", "Heroku"],
    },
    {
      id: "containerization",
      title: "Get Started with Containerization",
      description:
        "Understand containerization - how to package applications and dependencies into lightweight, portable containers that run consistently across different environments.",
      bgPattern: "containerization",
      iconGradient: "from-teal-400 to-green-400",
      tools: ["Docker", "Podman", "containerd", "CRI-O", "LXC"],
    },
    {
      id: "cicd",
      title: "Understand CI/CD",
      description:
        "Explore Continuous Integration and Continuous Deployment - the practices that enable teams to deliver code changes more frequently and reliably through automated pipelines.",
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
      id: "kubernetes",
      title: "Master Kubernetes",
      description:
        "Learn container orchestration with Kubernetes - the industry standard for automating deployment, scaling, and management of containerized applications.",
      bgPattern: "kubernetes",
      iconGradient: "from-blue-400 to-cyan-400",
      tools: ["Pods", "Services", "Deployments", "Ingress", "ConfigMaps"],
    },
    {
      id: "Monitoring",
      title: "Explore Monitoring & Logging",
      description:
        "Understand the importance of monitoring and logging in DevOps - how to track application performance, detect issues, and gain insights through tools like Prometheus, Grafana, and ELK Stack.",
      bgPattern: "containerization",
      iconGradient: "from-teal-400 to-green-400",
      tools: ["Pods", "Services", "Deployments", "Ingress", "ConfigMaps"],
    },
    {
      id: "git",
      title: "Master Git & Version Control",
      description:
        "Learn Git - the distributed version control system that enables collaboration, branching, and code management in modern software development and DevOps workflows.",
      bgPattern: "kubernetes",
      iconGradient: "from-blue-400 to-cyan-400",
    },
    {
      id: "iac",
      title: "Discover Infrastructure as Code",
      description:
        "Master Infrastructure as Code (IaC) - learn to manage and provision computing infrastructure through code for version control and automated deployment.",
      bgPattern: "iac",
      iconGradient: "from-violet-400 to-purple-400",
      tools: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Chef"],
    },
  ];

  const floatingPositions = [
    { left: 20, top: 30 },
    { left: 80, top: 25 },
    { left: 25, top: 70 },
    { left: 85, top: 60 },
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
      {/* Header Section - Improved Vertical Spacing */}
      <motion.div
        className="absolute top-16 md:top-20 left-0 right-0 z-20 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Mission
          </h2>
        </div>

        <motion.div
          className="h-1 w-24 sm:w-32 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full mx-auto relative mb-6"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
        </motion.div>

        {/* Added more vertical spacing here */}
        <div className="mb-2">
          <p className="text-white/85 text-sm sm:text-lg max-w-2xl mx-auto relative z-10 px-2 leading-relaxed">
            This website is for developers and students in Myanmar who want to
            learn DevOps and boost their careers in modern software development
            and cloud infrastructure.
          </p>
        </div>
      </motion.div>

      {/* Background Elements - Minimal Floating Icons */}
      <div className="absolute inset-0">
        {floatingPositions.map((pos, i) => (
          <div
            key={`float-${i}`}
            className="absolute animate-float"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${5 + (i % 2)}s`,
            }}
          >
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500/10 rounded-full backdrop-blur-sm border border-orange-400/20" />
          </div>
        ))}
      </div>

      {/* Main Content - Improved responsive vertical spacing */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-48 sm:pt-56 md:pt-40 lg:pt-32 xl:pt-28 2xl:pt-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-12">
            {/* Left - Further Reduced Size Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-2/5"
            >
              <div className="relative">
                <img
                  src="/new.png"
                  alt="DevOps Learning Platform"
                  className="w-full max-w-xl mx-auto lg:max-w-xl h-auto object-cover"
                  onError={handleImageError}
                />
              </div>
            </motion.div>

            {/* Right - Explore DevOps Content with Better Spacing */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full lg:w-3/5 max-w-2xl"
            >
              {/* Title with better spacing */}
              <div className="mb-5 sm:mb-6 lg:mb-7">
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                  <span
                    className={`bg-gradient-to-r ${currentSlideData.iconGradient} bg-clip-text text-transparent`}
                  >
                    {currentSlideData.title}
                  </span>
                </h1>
              </div>

              {/* Description with better spacing */}
              <div className="mb-8 sm:mb-10 lg:mb-12">
                <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-white/85 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  {currentSlideData.description}
                </p>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center lg:justify-start space-x-1.5 sm:space-x-2">
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
            </motion.div>
          </div>
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

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
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