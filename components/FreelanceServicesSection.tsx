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
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef } from "react";

const services = [
  {
    title: "Monolithic to Cloud-Native Migration",
    shortDescription:
      "Modernize legacy apps to scalable cloud-native architectures",
    details:
      "We specialize in transforming your legacy monolithic applications into flexible, cloud-native solutions that scale seamlessly. This includes containerization using Docker to isolate app components, orchestration with Kubernetes for automated deployment and scaling, and migrating workloads to leading cloud platforms like AWS or Azure. Our approach ensures zero downtime, improved resilience, and faster release cycles, empowering your business to adapt quickly to changing demands.",
    icon: Rocket,
    slug: "cloud-migration",
    gradient: "from-blue-500 to-cyan-600",
    cardGradient: "from-gray-600 to-gray-800",
  },
  {
    title: "Infrastructure Automation",
    shortDescription:
      "IaC solutions with Terraform, Pulumi and GitOps workflows",
    details:
      "Streamline your infrastructure management by adopting Infrastructure as Code (IaC) practices. Using Terraform and Pulumi, we define and provision cloud resources programmatically to ensure repeatability and reduce human errors. Coupled with configuration management tools like Ansible, and GitOps workflows for continuous deployment, your infrastructure becomes more consistent, auditable, and easy to scale. This automation drastically reduces provisioning times and enhances security compliance.",
    icon: Settings2,
    slug: "infrastructure-automation",
    gradient: "from-green-500 to-emerald-600",
    cardGradient: "from-gray-600 to-gray-800",
  },
  {
    title: "Web Development",
    shortDescription: "High-performance business websites",
    details:
      "Our web development services focus on creating fast, SEO-friendly, and highly responsive websites tailored to your business goals. Leveraging the power of Next.js and Tailwind CSS, we build modern frontends that deliver excellent user experience across devices. Additionally, we develop scalable backend APIs that handle your business logic securely and efficiently. Whether you need a landing page or a complex web app, our solutions are designed to maximize conversion and performance.",
    icon: LayoutTemplate,
    slug: "web-development",
    gradient: "from-purple-500 to-violet-600",
    cardGradient: "from-gray-600 to-gray-800",
  },
  {
    title: "Part-Time DevOps",
    shortDescription: "Flexible ongoing infrastructure support",
    details:
      "For startups and growing businesses that need expert DevOps guidance without full-time commitment, our part-time DevOps services are the perfect fit. We provide proactive infrastructure monitoring, incident response, routine maintenance, and performance tuning. This ensures your cloud environment remains secure, reliable, and cost-efficient while freeing your team to focus on core product development.",
    icon: Briefcase,
    slug: "part-time-devops-support",
    gradient: "from-red-500 to-pink-600",
    cardGradient: "from-gray-600 to-gray-800",
  },
];

export function FreelanceServicesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header - Updated to match DevOpsCyclingHero colors */}
      <div className="text-center mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-4 relative z-10"
        >
          <motion.div
            className="relative p-3 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full shadow-2xl"
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
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-yellow-500/30 rounded-full blur-lg"
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
            <Code className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Professional Services
          </motion.h2>

          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"
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
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-orange-400 ml-2" />
          </motion.div>
        </motion.div>

        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full mx-auto relative mb-4"
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
          Comprehensive solutions to accelerate your development and deployment
          workflows
        </motion.p>
      </div>

      {/* Services Container */}
      <div className="relative">
        {/* Mobile-only scroll indicator */}
        <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-2">
          <motion.button
            onClick={scrollRight}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm text-orange-600 rounded-full shadow-lg border border-gray-200"
          >
            <div className="relative">
              <ChevronRight className="w-5 h-5" />
              <motion.div
                animate={{
                  x: [0, 4, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
                className="absolute -right-1 -top-1 w-2 h-2 bg-orange-600 rounded-full"
              />
            </div>
          </motion.button>
        </div>

        {/* Services Grid */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar lg:grid lg:grid-cols-2 gap-6 lg:gap-8 pb-4"
        >
          {services.map(
            (
              {
                title,
                shortDescription,
                details,
                icon: Icon,
                slug,
                gradient,
                cardGradient,
              },
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
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="min-w-[23.5rem] lg:min-w-0"
                >
                  <Card
                    className={`h-full border-0 transition-all duration-300 overflow-hidden bg-gradient-to-br ${cardGradient} backdrop-blur-sm flex flex-col group hover:shadow-2xl`}
                  >
                    <CardContent className="p-0 flex-grow">
                      <div
                        className={`p-6 bg-gradient-to-r ${gradient} text-white flex items-center gap-4 group-hover:shadow-lg transition-shadow duration-300`}
                      >
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-md">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold mb-1">
                            {title}
                          </h3>
                          <p className="text-white/90 text-sm">
                            {shortDescription}
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-base text-gray-200 leading-relaxed mb-4">
                          {isExpanded ? details : shortText}
                        </p>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setExpanded(isExpanded ? null : idx)}
                            className="text-base text-cyan-400 font-medium hover:text-cyan-300 focus:outline-none transition-colors"
                          >
                            {isExpanded ? "Show Less" : "Read More"}
                          </button>
                          <Link
                            href={`/services/${slug}`}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 border border-gray-600"
                          >
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
      </div>

      {/* Hide scrollbar styles */}
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
