"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const DevOpsCyclingHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const slides = [
    {
      id: "devops",
      title: "DevOps Fundamental Skills",
      description:
        "Discover how DevOps bridges development and operations teams through automation, continuous integration, and rapid deployment to deliver software faster and more reliably.",
      bgPattern: "devops",
      iconGradient: "from-orange-600 to-yellow-600",
    },
    {
      id: "linux",
      title: "Learn Linux Fundamentals",
      description:
        "Build your foundation with Linux - the operating system that powers most servers, containers, and cloud infrastructure in modern DevOps environments.",
      bgPattern: "linux",
      iconGradient: "from-orange-600 to-yellow-600",
    },
    {
      id: "network",
      title: "Learn Network Basic",
      description:
        "Understand networking basics - the protocols, architectures, and tools that enable communication between computers, servers, and cloud services in DevOps.",
      bgPattern: "cloud",
      iconGradient: "from-sky-600 to-blue-600",
    },
    {
      id: "cloud",
      title: "Explore Cloud Computing",
      description:
        "Dive into cloud computing - learn how to leverage scalable, on-demand resources like servers, storage, and applications without managing physical infrastructure.",
      bgPattern: "cloud",
      iconGradient: "from-sky-600 to-blue-600",
    },
    {
      id: "containerization",
      title: "Explore Containerization",
      description:
        "Understand containerization - how to package applications and dependencies into lightweight, portable containers that run consistently across different environments.",
      bgPattern: "containerization",
      iconGradient: "from-pink-600 to-purple-600",
    },
    {
      id: "cicd",
      title: "Understand CI/CD",
      description:
        "Explore Continuous Integration and Continuous Deployment - the practices that enable teams to deliver code changes more frequently and reliably through automated pipelines.",
      bgPattern: "cicd",
      iconGradient: "from-orange-600 to-yellow-600",
    },
    {
      id: "kubernetes",
      title: "Master Kubernetes",
      description:
        "Learn container orchestration with Kubernetes - the industry standard for automating deployment, scaling, and management of containerized applications.",
      bgPattern: "kubernetes",
      iconGradient: "from-blue-600 to-cyan-600",
    },
    {
      id: "Monitoring",
      title: "Explore Observability",
      description:
        "Understand the importance of monitoring and logging in DevOps - how to track application performance, detect issues, and gain insights through tools like Prometheus, Grafana, and ELK Stack.",
      bgPattern: "containerization",
      iconGradient: "from-pink-600 to-purple-600",
    },
    {
      id: "git",
      title: "Master Git & Version Control",
      description:
        "Learn Git - the distributed version control system that enables collaboration, branching, and code management in modern software development and DevOps workflows.",
      bgPattern: "kubernetes",
      iconGradient: "from-blue-600 to-cyan-600",
    },
    {
      id: "iac",
      title: "Discover IAC",
      description:
        "Master Infrastructure as Code (IaC) - learn to manage and provision computing infrastructure through code for version control and automated deployment.",
      bgPattern: "iac",
      iconGradient: "from-sky-600 to-purple-600",
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

  const scrollToRoadmap = () => {
    const roadmapElement = document.getElementById("roadmap");
    if (roadmapElement) {
      roadmapElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-r from-gray-50 via-white to-gray-100 overflow-hidden font-open-sans">
      {/* Header Section - Increased vertical spacing */}
      <motion.div
        className="absolute top-16 md:top-20 left-0 right-0 z-20 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-sky-800 to-blue-800 bg-clip-text text-transparent">
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
                className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
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
            <ChevronRight className="w-6 h-6 text-sky-600 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-24 sm:w-32 bg-gradient-to-r from-sky-600 to-blue-500 rounded-full mx-auto relative mb-6"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>

        {/* Mission description with increased bottom margin - Changed to black text */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          {" "}
          {/* Increased from mb-2 */}
          <p className="text-black text-base sm:text-xl max-w-2xl mx-auto relative z-10 px-2 leading-relaxed">
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
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-400/20 rounded-full backdrop-blur-sm border border-orange-300/30" />
          </div>
        ))}
      </div>

      {/* Main Content - Increased top padding to create more space between mission and content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-64 sm:pt-72 md:pt-56 lg:pt-48 xl:pt-44 2xl:pt-40">
        {" "}
        {/* Increased pt values */}
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
              {/* Title with better spacing - Made font bold */}
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                  <span
                    className={`bg-gradient-to-r ${currentSlideData.iconGradient} bg-clip-text text-transparent font-bold`}
                  >
                    {currentSlideData.title}
                  </span>
                </h1>
              </div>

              {/* Description with better spacing - Changed to black text */}
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <p className="text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl text-black leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  {currentSlideData.description}
                </p>
              </div>

              {/* Buttons Section - Replaced tools with the two buttons */}
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={scrollToRoadmap}
                    className="px-8 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    See Roadmap
                  </button>
                  <Link
                    href="/articles"
                    className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
                  >
                    Read Articles
                  </Link>
                </div>
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
                        : "bg-gray-400 hover:bg-gray-500"
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
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400/40 rounded-full animate-ping"
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
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400/40 rounded-full animate-ping"
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
      `}</style>
    </section>
  );
};

export default DevOpsCyclingHero;
