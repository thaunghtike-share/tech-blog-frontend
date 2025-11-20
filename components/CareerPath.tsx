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
    color: "from-sky-500 to-blue-500",
    iconBg: "bg-gradient-to-r from-sky-500 to-blue-500",
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
    color: "from-blue-500 to-purple-500",
    iconBg: "bg-gradient-to-r from-blue-500 to-purple-500",
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
    color: "from-emerald-500 to-teal-500",
    iconBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
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
    <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hidden lg:block lg:w-1/2"></div>

        <div className="w-full lg:w-1/2 lg:text-right">
          <motion.div
            className="h-1 w-24 mb-6 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full ml-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight"
          >
            Explore Your Future in
            <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mt-2">
              DevOps Careers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black-500 dark:text-gray-300 text-lg leading-relaxed max-w-2xl lg:ml-auto"
          >
            Discover the key differences between DevOps roles and find your
            perfect career specialization path
          </motion.p>
        </div>
      </motion.div>

      {roles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-16"
        >
          <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h4 className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-3">
            No roles available
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Please check back later for new career opportunities.
          </p>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-lg transition-all duration-300 -ml-6"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:shadow-lg transition-all duration-300 -mr-6"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
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
                          className="group"
                        >
                          {/* Card Design */}
                          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
                            {/* Top Accent Bar */}
                            <div
                              className={`h-2 bg-gradient-to-r ${role.color}`}
                            />

                            {/* Header */}
                            <div className="p-6 pb-4">
                              <div className="flex items-center gap-4 mb-4">
                                <div
                                  className={`p-3 rounded-xl ${role.iconBg} shadow-sm`}
                                >
                                  <role.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {role.title}
                                  </h3>
                                  <p
                                    className={`text-sm font-medium bg-gradient-to-r ${role.color} bg-clip-text text-transparent mt-1`}
                                  >
                                    {role.focus}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-0 flex-grow flex flex-col space-y-6">
                              {/* Description */}
                              <p className="text-black dark:text-gray-300 text-sm leading-relaxed">
                                {role.description}
                              </p>

                              {/* Key Difference */}
                              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color}`}
                                  />
                                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                    Key Difference
                                  </span>
                                </div>
                                <p className="text-gray-900 dark:text-gray-100 text-sm">
                                  {role.keyDifference}
                                </p>
                              </div>

                              {/* Core Responsibilities */}
                              <div>
                                <div className="flex items-center gap-3 mb-4">
                                  <div
                                    className={`p-2 rounded-lg bg-gradient-to-r ${role.color}`}
                                  >
                                    <Zap className="w-4 h-4 text-white" />
                                  </div>
                                  <h4 className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                                    Core Responsibilities
                                  </h4>
                                </div>
                                <div className="space-y-3">
                                  {role.coreResponsibilities.map((resp, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-3"
                                    >
                                      <div
                                        className={`w-1.5 h-1.5 rounded-full mt-1.5 bg-gradient-to-r ${role.color} flex-shrink-0`}
                                      />
                                      <span className="text-black dark:text-gray-300 text-sm leading-relaxed">
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
            <div className="flex justify-center mt-12 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-sky-500 to-blue-500"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
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