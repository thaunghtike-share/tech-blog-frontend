"use client";
import { useState, useRef } from "react";
import {
  Star,
  BookOpen,
  Play,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge"; // Make sure you have this or replace with your own badge

interface PaidCourse {
  title: string;
  author: string;
  url: string;
  rating?: number;
  description: string;
  authorImage?: string;
}

const paidCourses: PaidCourse[] = [
  {
    title: "HashiCorp Certified: Terraform Associate - Hands-On Labs",
    author: "Bryan Krausen",
    url: "https://www.udemy.com/course/terraform-hands-on-labs/",
    rating: 4.6,
    description:
      "Master the Terraform Associate with 70+ AWS-based labs that follow the Terraform Associate 003 objectives",
  },
  {
    title: "Certified Kubernetes Administrator (CKA) with Practice Tests",
    author: "KodeKloud",
    url: "https://www.kodekloud.com/courses/certified-kubernetes-administrator-cka",
    rating: 4.9,
    description:
      "Comprehensive preparation for the official Kubernetes CKA exam with hands-on labs.",
  },
  {
    title: "Certified Kubernetes Application Developer (CKAD)",
    author: "KodeKloud",
    url: "https://www.kodekloud.com/courses/certified-kubernetes-application-developer-ckad",
    rating: 4.8,
    description:
      "Learn to build, deploy, and configure cloud native applications on Kubernetes.",
  },
  {
    title: "Certified Kubernetes Security Specialist (CKS)",
    author: "KodeKloud",
    url: "https://www.kodekloud.com/courses/certified-kubernetes-security-specialist-cks",
    rating: 4.7,
    description:
      "Advance your Kubernetes security skills and pass the CKS exam.",
  },
  {
    title: "AWS Certified DevOps Engineer - Professional 2023",
    author: "Stephane Maarek",
    url: "https://www.udemy.com/course/aws-certified-devops-engineer-professional-hands-on/",
    rating: 4.8,
    description:
      "Deep dive into AWS DevOps tools and prepare for the AWS DevOps Engineer certification.",
  },
  {
    title: "GitHub Actions - The Complete Guide",
    author: "James Q Quick",
    url: "https://www.udemy.com/course/github-actions-the-complete-guide/",
    rating: 4.7,
    description:
      "Master GitHub Actions to automate your workflows and CI/CD pipelines effectively.",
  },
  {
    title: "DevSecOps with Azure, GitHub Action, GitOps and AKS",
    author: "A Security Guru",
    url: "https://www.udemy.com/course/devsecops-with-gitops-azure-cloud-and-github-actions",
    rating: 4.7,
    description:
      "DevSecOps for a Gaming Project using GitOps (ArgoCD), Azure Cloud (AKS) and GitHub Actions with Trivy, SonarQube",
  },
];

export function RecommendedPaidCourses() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Determine courses to show based on screen size and showAll state
  const coursesToShow =
    typeof window !== "undefined" && window.innerWidth < 640
      ? paidCourses // Show all on mobile
      : showAll
      ? paidCourses
      : paidCourses.slice(0, 6); // Limit on desktop unless showAll is true

  const toggleShowAll = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section
      ref={sectionRef}
      className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <Play className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs md:text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
            <BookOpen className="w-4 h-4 mr-2" /> Paid Courses
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4"
        >
          Recommended Paid DevOps Courses
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Carefully selected paid courses to accelerate your DevOps and Cloud
          career.
        </motion.p>
      </div>

      {/* Courses Grid - Horizontal scroll on mobile, grid on desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-4 lg:grid lg:grid-cols-3 lg:overflow-x-visible lg:snap-none">
        {coursesToShow.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="flex-shrink-0 w-[85vw] snap-center sm:w-auto group bg-white rounded-xl shadow-lg border-l-4 border-blue-500 overflow-hidden transition-all duration-300 hover:shadow-xl relative flex flex-col" // Added flex flex-col
          >
            <div className="p-5 flex-grow">
              {" "}
              {/* Added flex-grow */}
              <div className="absolute top-3 right-3">
                <Badge className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-medium rounded-full shadow-sm border border-gray-200">
                  Paid Course
                </Badge>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg inline-flex mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                {course.authorImage && (
                  <img
                    src={course.authorImage || "/placeholder.svg"}
                    alt={course.author}
                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                    loading="lazy"
                  />
                )}
                <span className="font-medium">{course.author}</span>
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {course.description}
              </p>
              {course.rating && (
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium text-gray-900 text-sm">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-5 pt-0">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01]"
              >
                <Play className="w-4 h-4 mr-2" /> Enroll Now
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toggle Button - Hidden on mobile */}
      {paidCourses.length > 6 && (
        <div className="mt-10 text-center hidden sm:block">
          <motion.button
            type="button"
            onClick={toggleShowAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {showAll ? "Show Less" : "See All Courses"}
            {showAll ? (
              <ChevronUp className="w-5 h-5 ml-2" />
            ) : (
              <ChevronDown className="w-5 h-5 ml-2" />
            )}
          </motion.button>
        </div>
      )}
    </section>
  );
}
