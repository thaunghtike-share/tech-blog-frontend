"use client"

import React from "react"

interface UdemyCourse {
  title: string
  description: string
  url: string
  thumbnail: string
}

const udemyCourses: UdemyCourse[] = [
  {
    title: "Docker & Kubernetes: The Practical Guide [2023 Edition]",
    description: "Learn Docker, Kubernetes, and DevOps fundamentals in this hands-on course by Maximilian Schwarzmüller.",
    url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
    thumbnail: "https://img-c.udemycdn.com/course/480x270/3618824_67a8_6.jpg",
  },
  {
    title: "Learn DevOps: CI/CD with Jenkins using Pipelines and Docker",
    description: "Master Jenkins, CI/CD pipelines, Docker, and GitHub Actions with this DevOps-focused course.",
    url: "https://www.udemy.com/course/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/",
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1258436_2dc3_4.jpg",
  },
  {
    title: "DevOps Bootcamp: Terraform, Kubernetes, AWS, and Docker",
    description: "Comprehensive DevOps bootcamp covering Terraform, Kubernetes, AWS, GitHub Actions, and Docker.",
    url: "https://www.udemy.com/course/devops-bootcamp-terraform-kubernetes-aws-docker/",
    thumbnail: "https://img-c.udemycdn.com/course/480x270/5098584_b6bb_3.jpg",
  },
  {
    title: "Kubernetes for the Absolute Beginners - Hands-on",
    description: "Perfect beginner’s guide to Kubernetes with practical hands-on labs.",
    url: "https://www.udemy.com/course/kubernetes-for-the-absolute-beginners-hands-on/",
    thumbnail: "https://img-c.udemycdn.com/course/480x270/2195280_49b2_4.jpg",
  },
  {
    title: "Learn DevOps: Infrastructure Automation With Terraform",
    description: "Automate infrastructure with Terraform using real-world examples on AWS and other platforms.",
    url: "https://www.udemy.com/course/learn-devops-infrastructure-automation-with-terraform/",
    thumbnail: "https://img-c.udemycdn.com/course/480x270/1616400_3f80_3.jpg",
  },
]

export function TopUdemyCourses() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h3 className="text-3xl font-extrabold text-gray-900 mb-8">🎓 Top DevOps Udemy Courses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {udemyCourses.map(({ title, description, url, thumbnail }, idx) => (
          <article
            key={idx}
            className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden"
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
            </a>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-blue-700 mb-2">{title}</h4>
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