"use client";

import React from "react";
import { Github, ExternalLink, Code } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Personal Website Backend",
    description: "Robust backend REST API built with Django REST Framework, providing scalable and secure data management.",
    url: "https://github.com/thaunghtike-share/tech-blog-backend",
    tags: ["Django", "REST API", "PostgreSQL"]
  },
  {
    name: "Personal Website Frontend", 
    description: "Modern React/Next.js frontend that consumes the backend API for a responsive blog experience.",
    url: "https://github.com/thaunghtike-share/tech-blog-frontend",
    tags: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    name: "Terraform Azure Infrastructure",
    description: "Infrastructure as Code project managing Azure resources like VMs, AKS clusters, and networking.",
    url: "https://github.com/thaunghtike-share/terraform-azure",
    tags: ["Terraform", "Azure", "IaC"]
  },
  {
    name: "Terraform AWS Kubespot",
    description: "Open-source Terraform module for Kubernetes clusters on AWS with spot instance support.",
    url: "https://github.com/opszero/terraform-aws-kubespot", 
    tags: ["Terraform", "AWS", "Kubernetes"]
  }
];

export function MinimalFeaturedProjects() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header - Centered like Udemy/YouTube */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mb-3">
          <Code className="w-4 h-4 mr-2" />
          Open Source
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Featured DevOps Projects
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Practical implementations from cloud infrastructure to full-stack development.
        </p>
      </div>

      {/* Projects Grid - Same card style as Udemy */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                {/* Tags - Similar to Udemy's metadata */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button - Matching Udemy's style */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Button - Same as Udemy */}
      <div className="mt-12 text-center">
        <a
          href="https://github.com/thaunghtike-share"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <Github className="w-5 h-5 mr-2" />
          View All Projects
        </a>
      </div>
    </section>
  );
}