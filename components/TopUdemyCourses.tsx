"use client"

import React from "react"

interface UdemyCourse {
  title: string
  description: string
  url: string
  videoId: string
}

const udemyCourses: UdemyCourse[] = [
  {
    title: "Docker & Kubernetes: The Practical Guide [2023 Edition]",
    description: "Learn Docker, Kubernetes, and DevOps fundamentals in this hands-on course by Maximilian Schwarzmüller.",
    url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
    videoId: "JMXtXHA62jg",
  },
  {
    title: "Learn DevOps: CI/CD with Jenkins using Pipelines and Docker",
    description: "Master Jenkins, CI/CD pipelines, Docker, and GitHub Actions with this DevOps-focused course.",
    url: "https://www.udemy.com/course/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/",
    videoId: "kXV3R5XrrkE",
  },
  {
    title: "DevOps Bootcamp: Terraform, Kubernetes, AWS, and Docker",
    description: "Comprehensive DevOps bootcamp covering Terraform, Kubernetes, AWS, GitHub Actions, and Docker.",
    url: "https://www.udemy.com/course/devops-bootcamp-terraform-kubernetes-aws-docker/",
    videoId: "SBJk8nZw9Jo",
  },
  {
    title: "Kubernetes for the Absolute Beginners - Hands-on",
    description: "Perfect beginner’s guide to Kubernetes with practical hands-on labs.",
    url: "https://www.udemy.com/course/kubernetes-for-the-absolute-beginners-hands-on/",
    videoId: "n0j3LoCNs8E",
  },
  {
    title: "Infrastructure Automation With Terraform",
    description: "Automate infrastructure with Terraform using real-world examples on AWS and other platforms.",
    url: "https://www.udemy.com/course/learn-devops-infrastructure-automation-with-terraform/",
    videoId: "gDN3oL5gFyI",
  },
]

export function TopUdemyCourses() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-6 py-12 bg-white rounded-2xl border border-blue-100 shadow-sm">
      <h3 className="text-3xl font-bold mb-8 text-gray-900 text-left select-none">
        🎓 Top DevOps Udemy Courses
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {udemyCourses.map(({ title, description, url, videoId }, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-transform transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-t-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">{title}</h4>
              <p className="text-gray-700 text-sm mb-4">{description}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View Course →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}