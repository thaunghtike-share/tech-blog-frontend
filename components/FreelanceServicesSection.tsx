"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Wrench, CloudCog, Rocket, Settings2, LayoutTemplate, Briefcase, ChevronDown } from "lucide-react"

const services = [
  {
    title: "Monolithic to Cloud-Native Migration",
    shortDescription:
      "Modernize your app by migrating to scalable, containerized, cloud-native architecture.",
    details:
      "I help migrate legacy monolithic applications to microservices and cloud-native platforms using Docker, Kubernetes, and Azure/AWS cloud services. This includes re-architecting, containerization, and automation to improve scalability and reliability.",
    icon: Rocket,
    slug: "monolith-to-cloud-native",
  },
  {
    title: "Infrastructure Automation",
    shortDescription:
      "Automate your infrastructure using Terraform, Pulumi, Ansible, and GitOps workflows.",
    details:
      "I design Infrastructure as Code (IaC) solutions with Terraform and Pulumi, configure Ansible playbooks, and set up GitOps pipelines for continuous, consistent infrastructure deployments across multiple environments.",
    icon: Settings2,
    slug: "infrastructure-automation",
  },
  {
    title: "DevOps Consulting",
    shortDescription:
      "Expert guidance on CI/CD pipelines, IaC, GitHub Actions, and Kubernetes best practices.",
    details:
      "I provide consulting services to optimize your DevOps workflows, including setting up robust CI/CD pipelines with GitHub Actions, designing scalable Kubernetes architectures, and implementing security and monitoring best practices.",
    icon: Wrench,
    slug: "devops-consulting",
  },
  {
    title: "Business Website Development",
    shortDescription:
      "Build modern business websites with Next.js, Tailwind CSS, and scalable backends.",
    details:
      "I develop responsive, SEO-friendly websites using Next.js and Tailwind CSS, integrated with powerful backend APIs and cloud infrastructure to ensure high availability and fast load times.",
    icon: LayoutTemplate,
    slug: "business-website-development",
  },
  {
    title: "Part-Time DevOps Support",
    shortDescription:
      "Hire me part-time to manage your cloud infra, CI/CD, or Kubernetes clusters.",
    details:
      "Flexible part-time support to manage your infrastructure, troubleshoot issues, and keep your DevOps pipelines running smoothly with proactive monitoring and quick incident response.",
    icon: Briefcase,
    slug: "part-time-devops-support",
  },
  {
    title: "DevOps as a Service (DaaS)",
    shortDescription:
      "End-to-end DevOps ownership from infra to deployment — plug-and-play DevOps for your team.",
    details:
      "Full-cycle DevOps ownership where I manage everything from infrastructure provisioning, CI/CD pipeline setup, monitoring, to deployments, letting your team focus on building products without DevOps overhead.",
    icon: CloudCog,
    slug: "devops-as-a-service",
  },
]

function ExpandableText({ isExpanded, children }: { isExpanded: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [maxHeight, setMaxHeight] = useState("0px")

  useEffect(() => {
    if (ref.current) {
      setMaxHeight(isExpanded ? `${ref.current.scrollHeight}px` : "0px")
    }
  }, [isExpanded])

  return (
    <p
      ref={ref}
      style={{
        maxHeight,
        transition: "max-height 0.35s ease, opacity 0.35s ease",
        opacity: isExpanded ? 1 : 0,
        overflow: "hidden",
      }}
      className="text-gray-600 text-sm mt-4 leading-relaxed border-t pt-4"
    >
      {children}
    </p>
  )
}

export function FreelanceServicesSection() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  const toggleExpand = (slug: string) => {
    setExpandedSlug(prev => (prev === slug ? null : slug))
  }

  return (
    <section className="bg-gray-50 py-16 px-6 sm:px-12 lg:px-20 rounded-2xl shadow-lg border border-gray-200 max-w-7xl mx-auto mb-20">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-left">
        🚀 Freelance DevOps Services
      </h2>
      <p className="text-gray-600 text-lg mb-12 max-w-3xl">
        I offer specialized DevOps and cloud engineering services to help startups and businesses scale fast and ship with confidence.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map(({ title, shortDescription, details, icon: Icon, slug }) => {
          const isExpanded = expandedSlug === slug
          return (
            <article
              key={slug}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full flex-shrink-0">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              </div>
              <p className="text-gray-700 text-sm flex-grow">{shortDescription}</p>

              <ExpandableText isExpanded={isExpanded}>{details}</ExpandableText>

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => toggleExpand(slug)}
                  className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium focus:outline-none"
                  aria-expanded={isExpanded}
                  aria-controls={`service-details-${slug}`}
                >
                  {isExpanded ? "Show less" : "Read more"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <Link
                  href={`/services/${slug}`}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  Go to service page →
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}