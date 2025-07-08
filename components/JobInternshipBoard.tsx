"use client";

import React from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  ExternalLink,
  DollarSign,
  Bus,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const jobs = [
  {
    title: "DevOps Intern",
    company: "CloudStart Myanmar",
    location: "Yangon (Remote-friendly)",
    type: "Internship",
    link: "https://example.com/job1",
    salary: "50,000 MMK/month (stipend)",
    ferry: "No",
    eligibility: "Final year IT students or fresh graduates",
    description:
      "Work with our DevOps team to build CI/CD pipelines using GitHub Actions and Docker. You'll also learn about Terraform and AWS.",
  },
  {
    title: "Junior DevOps Engineer",
    company: "NextTech",
    location: "Remote (Myanmar Only)",
    type: "Full-time",
    link: "https://example.com/job2",
    salary: "300,000 – 500,000 MMK/month",
    ferry: "Not Required (Remote)",
    eligibility: "0–1 year experience, strong Linux knowledge",
    description:
      "Support Kubernetes clusters, write automation scripts with Bash/Python, and maintain monitoring dashboards.",
  },
  {
    title: "Platform Engineering Intern",
    company: "SEA Cloud Co.",
    location: "Mandalay",
    type: "Internship",
    link: "https://example.com/job3",
    salary: "80,000 MMK/month",
    ferry: "Yes (company provided)",
    eligibility: "IT/Computer Science students from Mandalay",
    description:
      "Assist in managing internal tools, support deployment tasks, and learn about cloud-native stack including Helm and ArgoCD.",
  },
];

export function JobInternshipBoard() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Briefcase className="mx-auto mb-4 w-10 h-10 text-indigo-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Job & Internship Board for Myanmar DevOps Learners
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Beginner-friendly roles and internships to help you get real-world DevOps experience.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            whileHover={{ y: -8, boxShadow: "0px 10px 15px rgba(99, 102, 241, 0.3)" }}
            className="bg-white border border-gray-100 rounded-xl shadow-md p-6 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {job.title}
              </h3>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <Building2 className="w-4 h-4 text-indigo-500" />
                {job.company}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-emerald-500" />
                {job.location}
              </div>

              <div className="inline-block mt-2 mb-3 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {job.type}
              </div>

              <p className="text-sm text-gray-700 mb-3">{job.description}</p>

              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-yellow-500" />
                  <span>{job.salary}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Bus className="w-4 h-4 text-blue-400" />
                  <span>Ferry: {job.ferry}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-500" />
                  <span>{job.eligibility}</span>
                </li>
              </ul>
            </div>

            <div className="mt-5">
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm inline-flex items-center text-indigo-600 hover:underline font-medium"
                onClick={e => e.stopPropagation()}
              >
                View Opportunity
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}