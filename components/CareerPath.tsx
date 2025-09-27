"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ServerCog,
  ShieldCheck,
  Cloud,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Users,
  BookOpen,
} from "lucide-react";

const roles = [
  {
    title: "Junior DevOps Engineer",
    icon: ServerCog,
    responsibilities: [
      "Build and maintain CI/CD pipelines (Jenkins, GitHub Actions)",
      "Automate infrastructure provisioning (Terraform, Ansible)",
      "Collaborate with developers and operations teams",
      "Ensure configuration management with tools like Ansible or Puppet",
      "Monitor application deployments and logs",
    ],
    skills: [
      "Linux",
      "Containerization",
      "Git",
      "CICD",
      "Infrastructure as Code",
      "Bash Script",
      "Cloud",
      "Monitoring",
    ],
    color: "from-yellow-500 to-orange-600",
    borderColor: "border-yellow-500",
    iconBg: "bg-gradient-to-r from-yellow-500 to-orange-600",
    iconColor: "text-white",
  },
  {
    title: "Junior Site Reliability Engineer (SRE)",
    icon: ShieldCheck,
    responsibilities: [
      "Monitor system and application health using tools like Prometheus",
      "Manage alerting and incident response",
      "Analyze system reliability and implement improvements",
      "Automate repetitive operational tasks",
      "Define and track Service Level Objectives (SLOs)",
    ],
    skills: [
      "Monitoring tools",
      "Alertmanager",
      "Linux",
      "Scripting",
      "Cloud monitoring (CloudWatch, Azure Monitor)",
      "Kubernetes basics",
      "CICD",
    ],
    color: "from-orange-500 to-red-600",
    borderColor: "border-orange-500",
    iconBg: "bg-gradient-to-r from-orange-500 to-red-600",
    iconColor: "text-white",
  },
  {
    title: "Junior Cloud Engineer",
    icon: Cloud,
    responsibilities: [
      "Provision and manage cloud infrastructure",
      "Implement Identity and Access Management (IAM) policies",
      "Deploy and configure cloud services (compute, storage, networking)",
      "Assist in cost optimization and security compliance",
      "Support cloud migration and automation tasks",
    ],
    skills: [
      "Cloud",
      "IAM",
      "IAC (Terraform, CloudFormation)",
      "Networking Basics (VPC, Subnets, Security Groups)",
      "Scripting",
      "CICD",
    ],
    color: "from-red-500 to-pink-600",
    borderColor: "border-red-500",
    iconBg: "bg-gradient-to-r from-red-500 to-pink-600",
    iconColor: "text-white",
  },
];

export function CareerPath() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All Roles");
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
      {/* Header with matching YouTube playlists theme */}
      <div className="text-center mb-6 md:mb-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-4 md:mb-4 relative z-10"
        >
          {/* Animated bubble icon matching YouTube playlists */}
          <motion.div
            className="relative p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full shadow-2xl"
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
            {/* Bubble effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-lg"
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

          {/* Title text beside the icon */}
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Get Jobs
          </motion.h2>

          {/* Chevron with dotted trail matching YouTube playlists */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
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
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 ml-2" />
          </motion.div>
        </motion.div>

        {/* Animated line matching YouTube playlists */}
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mx-auto relative mb-4"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{ x: [0, 90, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto relative z-10"
        >
          Entry-level roles where you can apply your skills and grow your DevOps career.
        </motion.p>
      </div>
   
      {roles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-8 md:py-12"
        >
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-3 md:mb-4 backdrop-blur-sm border border-gray-600">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </div>
          <h4 className="text-gray-300 font-medium text-base md:text-lg mb-2">
            No roles available
          </h4>
          <p className="text-gray-500 text-sm md:text-base">
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
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-yellow-500/50 transition-all duration-300 -ml-6"
              >
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-yellow-500/50 transition-all duration-300 -mr-6"
              >
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </motion.button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-3xl">
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
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="group relative overflow-hidden"
                        >
                          {/* Background glow effect */}
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          />

                          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:border-yellow-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
                            {/* Header Section */}
                            <div className="p-6 pb-4">
                              <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl ${role.iconBg} shadow-lg`}>
                                  <role.icon className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              
                              <h3 className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                                {role.title}
                              </h3>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 pt-0 flex-grow">
                              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Responsibilities
                              </h4>
                              <ul className="space-y-2 mb-6">
                                {role.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start">
                                    <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-yellow-400" />
                                    <span className="text-gray-300 text-sm leading-relaxed">
                                      {resp}
                                    </span>
                                  </li>
                                ))}
                              </ul>

                              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                                Skills & Tools
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {role.skills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 text-sm font-medium rounded-full bg-gray-700/50 text-gray-300 border border-gray-600"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Footer Section */}
                            <div className="p-6 pt-0">
                              <button className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-xl transition-all duration-200 text-sm md:text-base hover:shadow-lg hover:scale-105 group border border-transparent hover:border-white/20">
                                Learn More
                                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                              </button>
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
                      ? "bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg"
                      : "bg-gray-600 hover:bg-gray-500"
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