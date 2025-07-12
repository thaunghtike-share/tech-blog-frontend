"use client"
import Link from "next/link"
import { Rocket, Settings2, LayoutTemplate, Briefcase, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    title: "Monolithic to Cloud-Native Migration",
    shortDescription: "Modernize legacy apps to scalable cloud-native architectures",
    details:
      "Containerization with Docker, Kubernetes orchestration, and cloud platform migration (AWS/Azure) with zero downtime.",
    icon: Rocket,
    slug: "monolith-to-cloud-native",
    color: "bg-purple-100 text-purple-600",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "Infrastructure Automation",
    shortDescription: "IaC solutions with Terraform, Pulumi and GitOps workflows",
    details:
      "Automate cloud provisioning with Terraform, manage configurations with Ansible, and implement GitOps for continuous deployments.",
    icon: Settings2,
    slug: "infrastructure-automation",
    color: "bg-blue-100 text-blue-600",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "Web Development",
    shortDescription: "High-performance business websites",
    details:
      "Modern Next.js/Tailwind CSS frontends with scalable backends, optimized for SEO and lightning-fast load times.",
    icon: LayoutTemplate,
    slug: "business-website-development",
    color: "bg-orange-100 text-orange-600",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Part-Time DevOps",
    shortDescription: "Flexible ongoing infrastructure support",
    details:
      "Proactive monitoring, incident response, and maintenance for your cloud infrastructure on a part-time basis.",
    icon: Briefcase,
    slug: "part-time-devops-support",
    color: "bg-red-100 text-red-600",
    gradient: "from-red-500 to-pink-600",
  },
]

export function FreelanceServicesSection() {
  return (
    <section className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
          What I Offer
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Professional DevOps Services</h2>
        <p className="text-base text-gray-600 max-w-3xl mx-auto">
          Comprehensive solutions to accelerate your development and deployment workflows
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        {services.map(({ title, shortDescription, details, icon: Icon, slug, color, gradient }, idx) => (
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className={`p-6 bg-gradient-to-r ${gradient} text-white flex items-center gap-4`}>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{title}</h3>
                    <p className="text-blue-100 text-sm">{shortDescription}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{details}</p>
                  <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    Learn More
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Schedule Free Consultation
          <ExternalLink className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </section>
  )
}