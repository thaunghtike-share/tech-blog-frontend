"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Wrench, CloudCog, Rocket, Settings2, LayoutTemplate, Briefcase, ChevronDown, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Monolithic to Cloud-Native Migration",
    shortDescription: "Modernize legacy apps to scalable cloud-native architectures",
    details: "Containerization with Docker, Kubernetes orchestration, and cloud platform migration (AWS/Azure) with zero downtime.",
    icon: Rocket,
    slug: "monolith-to-cloud-native",
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Infrastructure Automation",
    shortDescription: "IaC solutions with Terraform, Pulumi and GitOps workflows",
    details: "Automate cloud provisioning with Terraform, manage configurations with Ansible, and implement GitOps for continuous deployments.",
    icon: Settings2,
    slug: "infrastructure-automation",
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "DevOps Consulting",
    shortDescription: "End-to-end DevOps strategy and implementation",
    details: "CI/CD pipeline design, Kubernetes architecture, security hardening, and observability solutions tailored to your needs.",
    icon: Wrench,
    slug: "devops-consulting",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Web Development",
    shortDescription: "High-performance business websites",
    details: "Modern Next.js/Tailwind CSS frontends with scalable backends, optimized for SEO and lightning-fast load times.",
    icon: LayoutTemplate,
    slug: "business-website-development",
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Part-Time DevOps",
    shortDescription: "Flexible ongoing infrastructure support",
    details: "Proactive monitoring, incident response, and maintenance for your cloud infrastructure on a part-time basis.",
    icon: Briefcase,
    slug: "part-time-devops-support",
    color: "bg-red-100 text-red-600"
  },
  {
    title: "DevOps as a Service",
    shortDescription: "Complete DevOps team augmentation",
    details: "Full infrastructure ownership including provisioning, CI/CD, monitoring, and deployments as a managed service.",
    icon: CloudCog,
    slug: "devops-as-a-service",
    color: "bg-indigo-100 text-indigo-600"
  },
];

function ExpandableText({ isExpanded, children }: { isExpanded: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (ref.current) {
      setMaxHeight(isExpanded ? `${ref.current.scrollHeight}px` : "0px");
    }
  }, [isExpanded]);

  return (
    <p
      ref={ref}
      style={{
        maxHeight,
        transition: "max-height 0.35s ease, opacity 0.35s ease",
        opacity: isExpanded ? 1 : 0,
        overflow: "hidden",
      }}
      className="text-gray-600 text-sm mt-4 leading-relaxed"
    >
      {children}
    </p>
  );
}

export function FreelanceServicesSection() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const toggleExpand = (slug: string) => {
    setExpandedSlug(prev => (prev === slug ? null : slug));
  };

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
          What I Offer
        </span>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Professional DevOps Services
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive solutions to accelerate your development and deployment workflows
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({ title, shortDescription, details, icon: Icon, slug, color }, idx) => {
          const isExpanded = expandedSlug === slug;
          return (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -8 }}
            >
              <div className={`h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100 flex flex-col ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}>
                <div className="p-6 flex-grow">
                  <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-700 mb-4">{shortDescription}</p>
                  
                  <ExpandableText isExpanded={isExpanded}>{details}</ExpandableText>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleExpand(slug)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm"
                    >
                      {isExpanded ? "Show less" : "Learn more"}
                      <ChevronDown
                        className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>

                    <Link
                      href={`/services/${slug}`}
                      className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full shadow-lg transition-all"
        >
          Schedule Free Consultation
          <ExternalLink className="h-5 w-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}