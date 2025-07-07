"use client";

import React, { useState } from "react";
import { Play, ExternalLink, Star, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

interface UdemyCourse {
  title: string;
  description: string;
  url: string;
  videoId: string;
  rating?: number;
  students?: number;
  duration?: string;
}

const udemyCourses: UdemyCourse[] = [
  {
    title: "Docker & Kubernetes: The Practical Guide",
    description: "Master containerization and orchestration with hands-on projects and real-world scenarios.",
    url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/",
    videoId: "JMXtXHA62jg",
    rating: 4.7,
    students: 125000,
    duration: "22 hours"
  },
  {
    title: "DevOps CI/CD with Jenkins & Docker",
    description: "Build automated pipelines with Jenkins, Docker, and GitHub Actions for seamless deployments.",
    url: "https://www.udemy.com/course/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/",
    videoId: "kXV3R5XrrkE",
    rating: 4.6,
    students: 87000,
    duration: "15 hours"
  },
  {
    title: "DevOps Bootcamp: Terraform, Kubernetes, AWS",
    description: "Complete infrastructure automation with Terraform, Kubernetes, and cloud platforms.",
    url: "https://www.udemy.com/course/devops-bootcamp-terraform-kubernetes-aws-docker/",
    videoId: "SBJk8nZw9Jo",
    rating: 4.8,
    students: 95000,
    duration: "30 hours"
  },
  {
    title: "Kubernetes for Absolute Beginners",
    description: "Start your Kubernetes journey with practical labs and beginner-friendly explanations.",
    url: "https://www.udemy.com/course/kubernetes-for-the-absolute-beginners-hands-on/",
    videoId: "n0j3LoCNs8E",
    rating: 4.5,
    students: 110000,
    duration: "12 hours"
  },
  {
    title: "Infrastructure Automation With Terraform",
    description: "Automate cloud infrastructure using Terraform with AWS and multi-cloud examples.",
    url: "https://www.udemy.com/course/learn-devops-infrastructure-automation-with-terraform/",
    videoId: "gDN3oL5gFyI",
    rating: 4.7,
    students: 78000,
    duration: "18 hours"
  },
  {
    title: "AWS Certified DevOps Engineer Professional",
    description: "Prepare for the AWS DevOps certification with hands-on labs and practice exams.",
    url: "https://www.udemy.com/course/aws-certified-devops-engineer-professional-hands-on/",
    videoId: "s2Jg3t7S7c8",
    rating: 4.8,
    students: 65000,
    duration: "25 hours"
  }
];

export function TopUdemyCourses() {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

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
            className="relative group"
          >
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 bg-white">
              {/* Video Thumbnail with Play Button */}
              <div 
                className="relative aspect-video bg-gray-900"
                onMouseEnter={() => setHoveredVideo(course.videoId)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${course.videoId}?autoplay=${hoveredVideo === course.videoId ? 1 : 0}&mute=1&loop=1&controls=0&modestbranding=1`}
                  title={course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  allowFullScreen
                />
                <div className={`absolute inset-0 flex items-center justify-center ${hoveredVideo === course.videoId ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">
                      {course.rating}
                    </span>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students?.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors group"
                >
                  Enroll Now
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
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