"use client"

import React from "react"

const GitHubIcon = () => (
  <svg
    className="w-5 h-5 inline-block mr-1"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.02c0 4.42 2.865 8.166 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.34-2.22-.253-4.555-1.11-4.555-4.942 0-1.091.39-1.983 1.029-2.681-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.908-1.295 2.747-1.025 2.747-1.025.546 1.379.203 2.398.1 2.65.64.698 1.028 1.59 1.028 2.68 0 3.841-2.338 4.685-4.566 4.932.359.31.678.922.678 1.859 0 1.342-.012 2.423-.012 2.753 0 .268.18.577.688.479A10.019 10.019 0 0022 12.02C22 6.484 17.523 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
)

export function MinimalFeaturedProjects() {
  const projects = [
    {
      name: "Personal Website Backend",
      description:
        "My own robust backend REST API built with Django REST Framework, providing scalable and secure data management for a personal website.",
      url: "https://github.com/thaunghtike-share/tech-blog-backend",
      github: true,
    },
    {
      name: "Personal Website Frontend",
      description:
        "My own modern React/Next.js frontend that consumes the backend API to deliver a smooth, responsive personal blog experience.",
      url: "https://github.com/thaunghtike-share/tech-blog-frontend",
      github: true,
    },
    {
      name: "Terraform Azure Infrastructure",
      description:
        "My own Infrastructure as Code project using Terraform to manage Azure resources like VMs, AKS clusters, NSGs, and networking.",
      url: "https://github.com/thaunghtike-share/terraform-azure",
      github: true,
    },
    {
      name: "Terraform AWS Kubespot",
      description:
        "Open-source Terraform module for Kubernetes clusters on AWS with spot instance support. Contributed Terraform code as a collaborator on this OpsZero project.",
      url: "https://github.com/opszero/terraform-aws-kubespot",
      github: true,
    },
  ]

  return (
    <section className="mt-20 bg-white rounded-xl p-10 border border-gray-100 shadow-sm">
      <h3 className="text-3xl font-bold mb-4 text-gray-900 text-left select-none">
        🚀 Featured Projects
      </h3>
      <p className="text-gray-700 mb-10 text-left leading-relaxed max-w-4xl">
        A collection of hands-on DevOps projects ranging from cloud infrastructure to frontend/backend development.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(({ name, description, url, github }, idx) => (
          <article
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{name}</h4>
            <p className="text-sm text-gray-700 mb-4">{description}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              {github ? (
                <>
                  <GitHubIcon />
                  Source Code
                </>
              ) : (
                "Visit Website →"
              )}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}