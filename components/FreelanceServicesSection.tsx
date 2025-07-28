"use client";
import Link from "next/link";
import {
  Rocket,
  Settings2,
  LayoutTemplate,
  Briefcase,
  Sparkles,
  ExternalLink,
  Code,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const services = [
  {
    title: "Monolithic to Cloud-Native Migration",
    shortDescription:
      "Modernize legacy apps to scalable cloud-native architectures",
    details:
      "We specialize in transforming your legacy monolithic applications into flexible, cloud-native solutions that scale seamlessly. This includes containerization using Docker to isolate app components, orchestration with Kubernetes for automated deployment and scaling, and migrating workloads to leading cloud platforms like AWS or Azure. Our approach ensures zero downtime, improved resilience, and faster release cycles, empowering your business to adapt quickly to changing demands.",
    icon: Rocket,
    slug: "cloud-migration",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "Infrastructure Automation",
    shortDescription:
      "IaC solutions with Terraform, Pulumi and GitOps workflows",
    details:
      "Streamline your infrastructure management by adopting Infrastructure as Code (IaC) practices. Using Terraform and Pulumi, we define and provision cloud resources programmatically to ensure repeatability and reduce human errors. Coupled with configuration management tools like Ansible, and GitOps workflows for continuous deployment, your infrastructure becomes more consistent, auditable, and easy to scale. This automation drastically reduces provisioning times and enhances security compliance.",
    icon: Settings2,
    slug: "infrastructure-automation",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Web Development",
    shortDescription: "High-performance business websites",
    details:
      "Our web development services focus on creating fast, SEO-friendly, and highly responsive websites tailored to your business goals. Leveraging the power of Next.js and Tailwind CSS, we build modern frontends that deliver excellent user experience across devices. Additionally, we develop scalable backend APIs that handle your business logic securely and efficiently. Whether you need a landing page or a complex web app, our solutions are designed to maximize conversion and performance.",
    icon: LayoutTemplate,
    slug: "web-development",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Part-Time DevOps",
    shortDescription: "Flexible ongoing infrastructure support",
    details:
      "For startups and growing businesses that need expert DevOps guidance without full-time commitment, our part-time DevOps services are the perfect fit. We provide proactive infrastructure monitoring, incident response, routine maintenance, and performance tuning. This ensures your cloud environment remains secure, reliable, and cost-efficient while freeing your team to focus on core product development.",
    icon: Briefcase,
    slug: "part-time-devops-support",
    gradient: "from-red-500 to-pink-600",
  },
];

export function FreelanceServicesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Enhanced Header */}
      <div className="text-center mb-4 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="p-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl shadow-lg">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm md:text-sm font-medium bg-gradient-to-r from-yellow-50 to-orange-50 text-orange-700 border border-orange-200">
            <Sparkles className="w-4 h-4 mr-2" /> What I Offer
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-3xl -mt-3 md:-mt-2 font-bold bg-gradient-to-r from-yellow-900 via-red-800 to-orange-800 bg-clip-text text-transparent mb-2 md:mb-3"
        >
          Professional DevOps Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text:sm md:text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Comprehensive solutions to accelerate your development and deployment
          workflows
        </motion.p>
      </div>

      {/* Services Grid - Horizontal scroll on mobile, 2-column grid on desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-hide lg:grid lg:grid-cols-2 lg:overflow-x-visible lg:snap-none">
        {services.map(
          (
            { title, shortDescription, details, icon: Icon, slug, gradient },
            idx
          ) => {
            const isExpanded = expanded === idx;
            const shortText =
              details.length > 150
                ? details.slice(0, 150).trim() + "..."
                : details;

            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -5 }}
                className="flex-shrink-0 w-[85vw] snap-center lg:w-auto" // Added flex-shrink-0 and w-[85vw] for mobile horizontal scroll
              >
                <Card className="h-full border-0 hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white/90 backdrop-blur-sm flex flex-col">
                  <CardContent className="p-0 flex-grow">
                    <div
                      className={`p-6 bg-gradient-to-r ${gradient} text-white flex items-center gap-4`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold mb-1">
                          {title}
                        </h3>{" "}
                        {/* Reduced text size */}
                        <p className="text-sm md:text-sm text-blue-100">
                          {shortDescription}
                        </p>{" "}
                        {/* Reduced text size */}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
                        {isExpanded ? details : shortText}
                      </p>{" "}
                      {/* Reduced text size */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setExpanded(isExpanded ? null : idx)}
                          className="text-xs md:text-sm text-blue-600 font-medium hover:underline focus:outline-none"
                        >
                          {isExpanded ? "Show Less" : "Read More"}
                        </button>{" "}
                        {/* Reduced text size */}
                        <Link
                          href={`/services/${slug}`}
                          className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs md:text-sm font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                        >
                          {" "}
                          {/* Reduced text size */}
                          Explore
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          }
        )}
      </div>
    </section>
  );
}
