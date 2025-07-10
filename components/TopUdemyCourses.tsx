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
    title: "Git, GitHub, and GitHub Actions: An Introduction",
    author: "Emil Terhoven",
    url: "https://www.udemy.com/course/git-github-and-github-actions-an-introduction/",
    rating: 4.7,
    description: "Learn Git, GitHub & GitHub Actions basics in under 2 hours."
  },
  {
    title: "Intro to Linux Shell Scripting",
    author: "Jason Cannon",
    url: "https://www.udemy.com/course/linux-shell-scripting-free/",
    rating: 4.7,
    description: "Shell scripting essentials for Linux administrators."
  },
  {
    title: "Ansible Basics: An Automation Technical Overview",
    author: "Red Hat, Inc.",
    url: "https://www.udemy.com/course/ansible-basics-an-automation-technical-overview/",
    rating: 4.4,
    description: "Learn the basics of Ansible automation by Red Hat."
  },
  {
    title: "How to Use Docker and Docker Compose",
    author: "Cerulean Canvas",
    url: "https://www.udemy.com/course/docker-essentials",
    rating: 4.6,
    description: "Learn Docker and Docker Compose quickly and efficiently."
  },
  {
    title: "Introduction to DevOps",
    author: "Dicecamp Academy",
    url: "https://www.udemy.com/course/introduction-to-devops-f",
    rating: 4.3,
    description: "A beginner-friendly introduction to DevOps concepts and tools."
  },
  {
    title: "AWS Essentials",
    author: "Sundus Hussain",
    url: "https://www.udemy.com/course/aws-from-scratch",
    rating: 4.5,
    description: "Get started with AWS and DevOps cloud basics."
  },
  {
    title: "Docker Crash Course for Busy DevOps and Developers",
    author: "Tao W.",
    url: "https://www.udemy.com/course/docker-crash-course-for-busy-devops-and-developers/",
    rating: 4.6,
    description: "Practical Docker use cases and examples for DevOps."
  },
  {
    title: "Jenkins Crash Course for DevOps and Developers",
    author: "Tao W.",
    url: "https://www.udemy.com/course/jenkins-crash-course-for-devops-and-developers/",
    rating: 4.4,
    description: "Fast-paced intro to Jenkins CI/CD pipelines."
  },
  {
    title: "Kubernetes for Beginners",
    author: "School of DevOps®",
    url: "https://www.udemy.com/course/kubernetes-for-beginners/",
    rating: 4.6,
    description: "Start learning Kubernetes with hands-on examples."
  },
  {
    title: "DevOps Essentials",
    author: "Edureka!",
    url: "https://www.udemy.com/course/devops-essentials/",
    rating: 4.5,
    description: "Learn DevOps culture, CI/CD pipelines, Jenkins, Git & Docker."
  }
];

export function TopUdemyCourses() {
  const [showAll, setShowAll] = useState(false);
  const coursesToShow = showAll ? allUdemyCourses : allUdemyCourses.slice(0, 9);

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