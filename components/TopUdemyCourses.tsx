"use client";

import React, { useState } from "react";
import { Star, User, GraduationCap, BookOpen, ExternalLink, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  username: string;
  comment: string;
}

interface UdemyCourse {
  title: string;
  description: string;
  url: string;
  author: string;
  authorImage?: string;
  rating?: number;
  reviews?: Review[];
}

const allUdemyCourses: UdemyCourse[] = [
  {
    title: "DevOps 101",
    author: "Jane DevOps",
    url: "...",
    rating: 4.5,
    description: "Foundational DevOps principles, tools & practices.",
  },
  {
    title: "Docker Before Compose — Learn Docker by Example",
    author: "Docker Guru",
    url: "...",
    rating: 4.6,
    description: "Hands‑on Docker tutorials through practical examples.",
  },
  {
    title: "Understanding Docker in About an Hour",
    author: "Quick Docker",
    url: "...",
    rating: 4.5,
    description: "Quick and thorough intro to Docker essentials.",
  },
  {
    title: "Minikube: A Simple Introduction to Kubernetes",
    author: "K8s Starter",
    url: "...",
    rating: 4.6,
    description: "Learn Kubernetes basics locally using Minikube.",
  },
  {
    title: "Kube By Example — Spring Boot on Kubernetes",
    author: "Spring K8s",
    url: "...",
    rating: 4.6,
    description: "Deploy Spring Boot apps on Kubernetes step by step.",
  },
  {
    title: "Service Mesh with Istio and Kubernetes",
    author: "Istio Pro",
    url: "...",
    rating: 4.6,
    description: "Intro to service mesh with Istio on Kubernetes.",
  },
  {
    title: "Building Docker & Kubernetes Network & Security Lab for Free",
    author: "Security Dev",
    url: "...",
    rating: 4.7,
    description: "Hands‑on Docker/K8s lab focused on networking & security.",
  },
  {
    title: "FREE Advanced Jenkins in K8s (Docker in Docker)",
    author: "Jenkins K8s",
    url: "...",
    rating: 4.5,
    description: "Advanced Jenkins pipelines inside Kubernetes.",
  },
  {
    title: "Terraform Lightning Course",
    author: "Terraform Ace",
    url: "...",
    rating: 4.6,
    description: "Quick intro to Infrastructure as Code with Terraform.",
  },
  {
    title: "Continuous Delivery with Kubernetes and Octopus Deploy",
    author: "Octopus CD",
    url: "...",
    rating: 4.6,
    description: "Integrate CD pipelines using K8s + Octopus Deploy.",
  },
  // additional:
  {
    title: "Git, GitHub, and GitHub Actions: An Introduction",
    author: "Emil Terhoven",
    url: "https://www.udemy.com/course/git-github-and-github-actions-an-introduction/",
    rating: 4.7,
    description: "Learn Git, GitHub & GitHub Actions basics in ~1h51m.", reviews: [],
  },
  {
    title: "Intro to Linux Shell Scripting",
    author: "Jason Cannon",
    url: "https://www.udemy.com/course/linux-shell-scripting-free/",
    rating: 4.7,
    description: "Shell scripting essentials in Linux.",
  },
  {
    title: "Ansible Basics: An Automation Technical Overview",
    author: "Red Hat, Inc.",
    url: "https://www.udemy.com/course/ansible-basics-an-automation-technical-overview/",
    rating: 4.4,
    description: "Intro to Ansible, playbooks, modules & automation.",
  },
];

export function TopUdemyCourses() {
  const [showAll, setShowAll] = useState(false);
  const coursesToShow = showAll ? allUdemyCourses : allUdemyCourses.slice(0, 6);

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 mb-3">
            <GraduationCap className="w-4 h-4 mr-2" />
            Free DevOps Learning
          </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top Free DevOps Courses on Udemy
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Curated list of free Udemy courses to master DevOps tools and practices.
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
                <BookOpen className="w-5 h-5 text-blue-600" />
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

              {course.description && (
                <p className="text-gray-700 text-sm mb-4">{course.description}</p>
              )}

              {course.rating && (
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  <Star className="w-5 h-5" />
                  <span className="font-medium text-gray-900">{course.rating}</span>
                </div>
              )}

              {course.reviews && course.reviews.length > 0 && (
                <div className="space-y-2 mb-4">
                  {course.reviews.slice(0, 3).map((review, i) => (
                    <div key={i} className="text-gray-700 italic text-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span>
                        <strong>{review.username}:</strong> {review.comment}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-gray-100 transition-colors"
        >
          {showAll ? "Show Less" : "See More"}
          {showAll ? (
            <ChevronUp className="w-4 h-4 ml-2" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-2" />
          )}
        </button>
      </div>
    </section>
  );
}