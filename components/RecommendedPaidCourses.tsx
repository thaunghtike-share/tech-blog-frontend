"use client";
import { useState, useRef } from "react";
import {
  Star,
  BookOpen,
  Play,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const coursesPerView = 3;

  const filteredCourses = paidCourses; // You can add filtering logic later if needed
  const totalSlides = Math.ceil(filteredCourses.length / coursesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header with matching YouTube playlists theme */}
      <div className="text-center mb-6 md:mb-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 mb-4 md:mb-4 relative z-10"
        >
          {/* Animated bubble icon matching YouTube playlists */}
          <motion.div
            className="relative p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full shadow-2xl"
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
            {/* Bubble effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-lg"
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
            <BookOpen className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          {/* Title text beside the icon */}
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Recommended Paid Courses
          </motion.h2>

          {/* Chevron with dotted trail matching YouTube playlists */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 md:w-2 md:h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
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
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 ml-2" />
          </motion.div>
        </motion.div>

        {/* Animated line matching YouTube playlists */}
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mx-auto relative mb-4"
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
          Carefully selected paid courses to accelerate your DevOps and Cloud career with hands-on learning.
        </motion.p>
      </div>

      {filteredCourses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-8 md:py-12"
        >
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-3 md:mb-4 backdrop-blur-sm border border-gray-600">
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </div>
          <h4 className="text-gray-300 font-medium text-base md:text-lg mb-2">
            No courses available
          </h4>
          <p className="text-gray-500 text-sm md:text-base">
            Please check back later for new course recommendations.
          </p>
        </motion.div>
      ) : (
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-yellow-500/50 transition-all duration-300 -ml-6"
              >
                <ChevronLeft className="w-5 h-5 text-gray-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-700 flex items-center justify-center hover:shadow-xl hover:border-yellow-500/50 transition-all duration-300 -mr-6"
              >
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </motion.button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                    {filteredCourses
                      .slice(
                        slideIndex * coursesPerView,
                        (slideIndex + 1) * coursesPerView
                      )
                      .map((course, idx) => (
                        <motion.div
                          key={course.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="group relative overflow-hidden"
                        >
                          {/* Background glow effect */}
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          />

                          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl hover:border-yellow-500/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
                            {/* Header Section */}
                            <div className="p-6 pb-4">
                              <h3 className="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors">
                                {course.title}
                              </h3>
                              <div className="flex items-start justify-between mb-4">
                                {course.rating && (
                                  <div className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-yellow-900 text-sm font-medium rounded-full shadow-sm border border-yellow-500">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span>{course.rating.toFixed(1)}</span>
                                  </div>
                                )}
                              </div>
                            
                              
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-gray-300">
                                  {course.author}
                                </span>
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 pt-0 flex-grow">
                              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                {course.description}
                              </p>
                            </div>

                            {/* Footer Section */}
                            <div className="p-6 pt-0">
                              <a
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-xl transition-all duration-200 text-sm md:text-base hover:shadow-lg hover:scale-105 group border border-transparent hover:border-white/20"
                              >
                                <Play className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:scale-110 transition-transform" />
                                Enroll Now
                                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-yellow-500 to-orange-600 shadow-lg"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}