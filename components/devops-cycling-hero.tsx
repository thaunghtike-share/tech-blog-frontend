"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const DevOpsCyclingHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  const slides = [
    {
      id: "devops",
      title: "What is DevOps?",
      description:
        "DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and provide continuous delivery with high software quality.",
      iconGradient: "from-orange-600 to-yellow-600",
    },
    {
      id: "linux",
      title: "Master Linux",
      description:
        "Build your foundation with Linux - the operating system that powers most servers, containers, and cloud infrastructure in modern DevOps environments.",
      iconGradient: "from-orange-600 to-yellow-600",
    },
    {
      id: "network",
      title: "Learn Network Basics",
      description:
        "Understand networking basics - the protocols, architectures, and tools that enable communication between computers, servers, and cloud services in DevOps.",
      iconGradient: "from-sky-600 to-blue-600",
    },
    {
      id: "cloud",
      title: "Explore Cloud Basic",
      description:
        "Dive into cloud computing - learn how to leverage scalable, on-demand resources like servers, storage, and applications without managing physical infrastructure.",
      iconGradient: "from-sky-600 to-blue-600",
    },
    {
      id: "git",
      title: "Master Version Control",
      description:
        "Learn Git - the distributed version control system that enables collaboration, branching, and code management in modern software development and DevOps workflows.",
      iconGradient: "from-blue-600 to-cyan-600",
    },
    {
      id: "containerization",
      title: "Learn Containerization",
      description:
        "Understand containerization - how to package applications and dependencies into lightweight, portable containers that run consistently across different environments.",
      iconGradient: "from-pink-600 to-purple-600",
    },
    {
      id: "cicd",
      title: "Understand CI/CD",
      description:
        "Explore Continuous Integration and Continuous Deployment - the practices that enable teams to deliver code changes more frequently and reliably through automated pipelines.",
      iconGradient: "from-orange-600 to-yellow-600",
    },
    {
      id: "kubernetes",
      title: "Master Kubernetes",
      description:
        "Learn container orchestration with Kubernetes - the industry standard for automating deployment, scaling, and management of containerized applications.",
      iconGradient: "from-blue-600 to-cyan-600",
    },
    {
      id: "monitoring",
      title: "Explore Observability",
      description:
        "Understand the importance of monitoring and logging in DevOps - how to track application performance, detect issues, and gain insights through tools like Prometheus, Grafana, and ELK Stack.",
      iconGradient: "from-pink-600 to-purple-600",
    },
    {
      id: "iac",
      title: "Discover IAC",
      description:
        "Master Infrastructure as Code (IaC) - learn to manage and provision computing infrastructure through code for version control and automated deployment.",
      iconGradient: "from-sky-600 to-purple-600",
    },
  ];

  // Floating icons data - using larger size and higher opacity
  const floatingIcons = [
    { icon: "", top: "65%", left: "85%", delay: 2.5, size: "text-2xl" },
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
    <section className="relative min-h-screen bg-white/95 overflow-hidden font-open-sans">
      {/* Floating Background Icons - More visible */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute text-black opacity-30 pointer-events-none ${item.size}`}
          style={{
            top: item.top,
            left: item.left,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 6,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-12 lg:py-20">
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 lg:pr-12 xl:pr-16">
            {/* Mission Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our Mission
              </motion.h2>
              <motion.div
                className="h-1 w-20 bg-gradient-to-r from-sky-600 to-blue-500 rounded-full mb-8"
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              ></motion.div>
              <motion.p
                className="text-lg text-black leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                This website is for developers and students in Myanmar who want
                to learn DevOps and boost their careers in modern software
                development and cloud infrastructure.
              </motion.p>
            </motion.div>

            {/* Slides Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Current Slide - Single line title with 5xl size */}
              <div className="space-y-6">
                <motion.h1
                  key={currentSlide}
                  className="text-5xl font-bold text-black leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span
                    className={`bg-gradient-to-r ${currentSlideData.iconGradient} bg-clip-text text-transparent`}
                  >
                    {currentSlideData.title}
                  </span>
                </motion.h1>

                <motion.p
                  key={`desc-${currentSlide}`}
                  className="text-lg text-black leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentSlideData.description}
                </motion.p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                {slides.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-8 bg-gradient-to-r from-sky-600 to-blue-600"
                        : "w-2 bg-gray-300"
                    }`}
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: index === currentSlide ? 1 : 0.8,
                      opacity: index === currentSlide ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Logo/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-16 lg:mt-0"
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <img
                src="/new.png"
                alt="DevOps Learning Platform"
                className="w-full max-w-2xl h-auto object-contain"
                onError={handleImageError}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DevOpsCyclingHero;
