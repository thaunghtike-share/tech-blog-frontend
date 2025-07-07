"use client";

import React from "react";
import { Star, User, BookOpen, ExternalLink, MessageSquare } from "lucide-react";
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
  rating?: number;
  reviews?: Review[];
}

const udemyCourses: UdemyCourse[] = [
  {
    title: "Docker & Kubernetes: The Practical Guide",
    author: "Brett Fisher",
    url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
    rating: 4.7,
    reviews: [
      { username: "Alice", comment: "Comprehensive and practical, perfect for hands-on learners." },
      { username: "Bob", comment: "Loved the clear explanations and real-world examples." },
      { username: "Carol", comment: "Helped me get a great job in DevOps!" },
    ],
    description: "",
  },
  {
    title: "DevOps CI/CD with Jenkins & Docker",
    author: "Tae Kim",
    url: "https://www.udemy.com/course/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/",
    rating: 4.6,
    reviews: [
      { username: "Dave", comment: "Great course to build solid CI/CD pipelines." },
      { username: "Eve", comment: "The Jenkins setups were easy to follow." },
      { username: "Frank", comment: "Recommended for beginners and intermediates alike." },
    ],
    description: "",
  },
  {
    title: "DevOps Bootcamp: Terraform, Kubernetes, AWS",
    author: "School of DevOps®",
    url: "https://www.udemy.com/course/devops-bootcamp-terraform-kubernetes-aws-docker/",
    rating: 4.8,
    reviews: [
      { username: "Grace", comment: "Detailed and thorough with excellent cloud coverage." },
      { username: "Heidi", comment: "Very helpful for infrastructure automation." },
      { username: "Ivan", comment: "Perfect blend of Terraform and Kubernetes concepts." },
    ],
    description: "",
  },
  {
    title: "Kubernetes for Absolute Beginners",
    author: "Mumshad Mannambeth",
    url: "https://www.udemy.com/course/kubernetes-for-the-absolute-beginners-hands-on/",
    rating: 4.5,
    reviews: [
      { username: "Judy", comment: "Perfect for those starting fresh with Kubernetes." },
      { username: "Ken", comment: "The labs made learning super easy." },
      { username: "Laura", comment: "Clear and beginner-friendly." },
    ],
    description: "",
  },
  {
    title: "Infrastructure Automation With Terraform",
    author: "Ned Bellavance",
    url: "https://www.udemy.com/course/learn-devops-infrastructure-automation-with-terraform/",
    rating: 4.7,
    reviews: [
      { username: "Mike", comment: "Excellent introduction to Terraform automation." },
      { username: "Nina", comment: "Step-by-step explanations were great." },
      { username: "Oscar", comment: "Helped me automate my projects fast." },
    ],
    description: "",
  },
  {
    title: "AWS Certified DevOps Engineer Professional",
    author: "Stephane Maarek",
    url: "https://www.udemy.com/course/aws-certified-devops-engineer-professional-hands-on/",
    rating: 4.8,
    reviews: [
      { username: "Peggy", comment: "Comprehensive and practical preparation for the exam." },
      { username: "Quinn", comment: "Good mix of theory and hands-on labs." },
      { username: "Ralph", comment: "Helped me pass the certification with ease." },
    ],
    description: "",
  }
];

export function TopUdemyCourses() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-3">
          Premium Learning
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Master DevOps with Top-Rated Courses
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hand-picked Udemy courses to accelerate your DevOps journey with practical skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {udemyCourses.map((course, idx) => (
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
              <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                <User className="w-4 h-4" /> {course.author}
              </p>
              {course.rating && (
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  <Star className="w-5 h-5" />
                  <span className="font-medium text-gray-900">{course.rating}</span>
                </div>
              )}

              {/* Show up to 3 reviews */}
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

      <div className="mt-12 text-center">
        <a
          href="https://www.udemy.com/courses/development/devops/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          View All DevOps Courses
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </section>
  );
}