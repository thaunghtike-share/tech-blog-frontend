"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ServerCog,
  ShieldCheck,
  Cloud,
  ChevronRight,
  ChevronLeft,
  Users,
  Zap,
} from "lucide-react";

const roles = [
  {
    title: "DevOps Engineer",
    icon: ServerCog,
    description:
      "Automates software delivery pipelines and infrastructure. Focuses on CI/CD, automation tools, and bridging development with operations for faster deployments.",
    focus: "Pipeline & Infrastructure Automation",
    keyDifference:
      "Builds and maintains the tools and processes for software delivery",
    coreResponsibilities: [
      "CI/CD pipeline development",
      "Infrastructure as Code",
      "Configuration management",
      "Deployment automation",
    ],
    tools: [
      "Jenkins",
      "GitHub Actions",
      "Terraform",
      "Ansible",
      "Docker",
      "Kubernetes",
    ],
    color: "from-blue-500 to-blue-600",
    iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    title: "Site Reliability Engineer",
    icon: ShieldCheck,
    description:
      "Ensures system reliability, scalability, and performance. Focuses on monitoring, incident response, and maintaining service level objectives (SLOs).",
    focus: "System Reliability & Performance",
    keyDifference: "Ensures systems are reliable and meet performance targets",
    coreResponsibilities: [
      "System monitoring & alerting",
      "Incident management",
      "Performance optimization",
      "Reliability engineering",
    ],
    tools: [
      "Prometheus",
      "Grafana",
      "PagerDuty",
      "Datadog",
      "SLO/SLI",
      "Chaos Engineering",
    ],
    color: "from-pink-500 to-purple-600",
    iconBg: "bg-gradient-to-r from-pink-500 to-purple-600",
  },
  {
    title: "Cloud Engineer",
    icon: Cloud,
    description:
      "Designs, builds, and maintains cloud infrastructure and services. Specializes in cloud platforms, networking, security, and especially in cost optimization.",
    focus: "Cloud Infrastructure & Services",
    keyDifference:
      "Manages and optimizes cloud platform resources and services",
    coreResponsibilities: [
      "Cloud resource management",
      "Network configuration",
      "Security & compliance",
      "Cost optimization",
    ],
    tools: [
      "AWS/Azure/GCP",
      "Terraform",
      "CloudFormation",
      "IAM",
      "VPC",
      "Cloud Security",
    ],
    color: "from-sky-500 to-sky-600",
    iconBg: "bg-gradient-to-r from-sky-500 to-sky-600",
  },
];

export function CareerPath() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const coursesPerView = 3;
  const totalSlides = Math.ceil(roles.length / coursesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-4 relative z-10"
        >
          <motion.div
            className="relative p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-blue-500/30 rounded-full blur-lg"
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
            <Users className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-sans"
          >
            Career Paths
          </motion.h2>

          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
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
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-blue-500 ml-2" />
          </motion.div>
        </motion.div>

        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto relative mb-4"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto relative z-10 font-sans"
        >
          Understand the key differences between DevOps roles and choose your
          specialization path
        </motion.p>
      </div>

      {roles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-8 md:py-12"
        >
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mb-3 md:mb-4 backdrop-blur-sm border border-gray-400">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
          </div>
          <h4 className="text-gray-700 font-medium text-base md:text-lg mb-2 font-sans">
            No roles available
          </h4>
          <p className="text-gray-600 text-sm md:text-base font-sans">
            Please check back later for new career opportunities.
          </p>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-300 flex items-center justify-center hover:shadow-xl hover:border-blue-400 transition-all duration-300 -ml-6"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-300 flex items-center justify-center hover:shadow-xl hover:border-blue-400 transition-all duration-300 -mr-6"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </motion.button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                    {roles
                      .slice(
                        slideIndex * coursesPerView,
                        (slideIndex + 1) * coursesPerView
                      )
                      .map((role, idx) => (
                        <motion.div
                          key={role.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          whileHover={{ y: -4 }}
                          className="group"
                        >
                          {/* Modern Card Design */}
                          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden h-full flex flex-col">
                            {/* Header with Gradient Accent */}
                            <div
                              className={`bg-gradient-to-r ${role.color} p-6 pb-4`}
                            >
                              <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                  <role.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white font-sans">
                                  {role.title}
                                </h3>
                              </div>
                              <div className="bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                                <span className="text-white/90 text-sm font-medium font-sans">
                                  {role.focus}
                                </span>
                              </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex-grow flex flex-col">
                              {/* Description */}
                              <p className="text-gray-700 text-sm leading-relaxed mb-4 font-sans">
                                {role.description}
                              </p>

                              {/* Key Difference - Fixed height container */}
                              <div className="mb-4 p-3 bg-gray-100 rounded-lg border border-gray-200 flex-grow-0 min-h-[80px] flex flex-col">
                                <p className="text-xs font-semibold mb-2 flex items-center gap-1 font-sans">
                                  <span
                                    className={`bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}
                                  >
                                    KEY DIFFERENCE
                                  </span>
                                </p>
                                <p className="text-gray-800 text-sm flex-grow font-sans">
                                  {role.keyDifference}
                                </p>
                              </div>

                              {/* Core Responsibilities - Fixed height container */}
                              <div className="mb-4 flex-grow">
                                <h4 className="text-gray-800 text-sm font-semibold mb-3 flex items-center gap-2 font-sans">
                                  <div
                                    className={`p-1 rounded bg-gradient-to-r ${role.color}`}
                                  >
                                    <Zap className="w-3 h-3 text-white" />
                                  </div>
                                  Core Responsibilities
                                </h4>
                                <div className="space-y-2">
                                  {role.coreResponsibilities.map((resp, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-2"
                                    >
                                      <div
                                        className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${role.color}`}
                                      />
                                      <span className="text-gray-700 text-sm font-sans">
                                        {resp}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-400/50"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default CareerPath;
