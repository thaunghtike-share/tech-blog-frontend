"use client";

import React, { useState } from "react";
import { Star, BookOpen, Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

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
    description: "Master the Terraform Associate with 70+ AWS-based labs that follow the Terraform Associate 003 objectives",
  },
  {
    title: "Certified Kubernetes Administrator (CKA) with Practice Tests",
    author: "KodeKloud",
    url: "https://www.kodekloud.com/courses/certified-kubernetes-administrator-cka",
    rating: 4.9,
    description: "Comprehensive preparation for the official Kubernetes CKA exam with hands-on labs.",
  },
  {
    title: "Certified Kubernetes Application Developer (CKAD)",
    author: "KodeKloud",
    url: "https://www.kodekloud.com/courses/certified-kubernetes-application-developer-ckad",
    rating: 4.8,
    description: "Learn to build, deploy, and configure cloud native applications on Kubernetes.",
  },
  {
    title: "Certified Kubernetes Security Specialist (CKS)",
    author: "KodeKloud",
    url: "https://www.kodekloud.com/courses/certified-kubernetes-security-specialist-cks",
    rating: 4.7,
    description: "Advance your Kubernetes security skills and pass the CKS exam.",
  },
  {
    title: "AWS Certified DevOps Engineer - Professional 2023",
    author: "Stephane Maarek",
    url: "https://www.udemy.com/course/aws-certified-devops-engineer-professional-hands-on/",
    rating: 4.8,
    description: "Deep dive into AWS DevOps tools and prepare for the AWS DevOps Engineer certification.",
  },
  {
    title: "GitHub Actions - The Complete Guide",
    author: "James Q Quick",
    url: "https://www.udemy.com/course/github-actions-the-complete-guide/",
    rating: 4.7,
    description: "Master GitHub Actions to automate your workflows and CI/CD pipelines effectively.",
  },
  {
    title: "DevSecOps with Azure, GitHub Action, GitOps and AKS",
    author: "A Security Guru",
    url: "https://www.udemy.com/course/devsecops-with-gitops-azure-cloud-and-github-actions",
    rating: 4.7,
    description: "DevSecOps for a Gaming Project using GitOps (ArgoCD), Azure Cloud (AKS) and GitHub Actions with Trivy, SonarQube",
  },
];

export function RecommendedPaidCourses() {
  const [showAll, setShowAll] = useState(false);
  const coursesToShow = showAll ? paidCourses : paidCourses.slice(0, 6);

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600 mb-3">
          <Play className="w-4 h-4 mr-2" />
          Video Learning
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Recommended Paid DevOps & Kubernetes Courses
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Carefully selected paid courses to accelerate your DevOps and Cloud career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesToShow.map((course, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="border border-gray-200 rounded-lg shadow-sm bg-white p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                {course.authorImage && (
                  <img
                    src={course.authorImage}
                    alt={course.author}
                    className="w-6 h-6 rounded-full object-cover"
                    loading="lazy"
                  />
                )}
                <span>{course.author}</span>
              </p>

              <p className="text-gray-700 text-sm mb-4">{course.description}</p>

              {course.rating && (
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  <Star className="w-5 h-5" />
                  <span className="font-medium text-gray-900">{course.rating}</span>
                </div>
              )}
            </div>

            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Enroll Now
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-green-700 bg-white hover:bg-gray-100 transition-colors"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      </div>
    </section>
  );
}