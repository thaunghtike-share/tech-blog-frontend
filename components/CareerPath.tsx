"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ServerCog,
  ShieldCheck,
  Cloud,
  ChevronRight,
  Sparkles,
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
    color: "from-blue-500 to-indigo-600",
    borderColor: "border-blue-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
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
    color: "from-green-500 to-emerald-600",
    borderColor: "border-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
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
    color: "from-amber-500 to-orange-500",
    borderColor: "border-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export function CareerPath() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-lg">
            <ServerCog className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm md:text-sm font-medium bg-gradient-to-r from-indigo-50 to-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-4 h-4 mr-2" /> Career Path
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4"
        >
          Internship & Junior Positions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Entry-level roles where you can apply your skills and grow your
          career.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="relative -mt-5">
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
          <div className="flex space-x-6 min-w-max sm:min-w-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-x-0 items-stretch">
            {roles.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className={`w-87 sm:w-auto h-full flex-shrink-0 sm:flex-shrink bg-white rounded-xl shadow-md border-l-4 ${role.borderColor} overflow-hidden transition-all duration-300 hover:shadow-lg group flex flex-col`}
              >
                <div className="p-5 flex flex-col h-full">
                  {/* Top */}
                  <div>
                    <div
                      className={`flex items-center justify-center w-12 h-12 ${role.iconBg} ${role.iconColor} rounded-xl mb-4`}
                    >
                      <role.icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {role.title}
                    </h3>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Responsibilities & Principles
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {role.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight
                              className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${role.iconColor}`}
                            />
                            <span className="text-gray-700">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer to push skills to bottom */}
                  <div className="mt-auto pt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                      Skills & Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {role.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${role.iconBg} ${role.iconColor}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default CareerPath;
