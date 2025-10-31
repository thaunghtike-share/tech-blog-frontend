"use client";
import { useState, useEffect, useRef } from "react";
import {
  Star,
  GraduationCap,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  User,
  AlertTriangle,
  RefreshCw,
  Trophy,
  Award,
  Users,
  Gift,
  CheckCircle,
  Ship,
  Container,
  Layout,
  Cloud,
  ExternalLink,
  PlayCircle,
  Target,
  Zap,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  username: string;
  comment: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  url: string;
  author: string;
  cover_image?: string | null;
  price?: string;
  students?: string;
  rating?: number;
  reviews?: Review[];
}

const fallbackCourses: Course[] = [
  {
    id: 1,
    title: "1. Git, GitHub, and GitHub Action",
    description: "Learn Git, GitHub & GitHub Actions basics.",
    url: "https://www.udemy.com/course/git-github-and-github-actions-an-introduction/",
    author: "Emil Terhoven",
    price: "Free",
    students: "500+",
    rating: 4.7,
    reviews: [
      { username: "John D.", comment: "Great introduction to GitHub Actions!" },
      { username: "Sarah M.", comment: "Well explained concepts." },
    ],
  },
  {
    id: 2,
    title: "2. Intro to Linux Shell Scripting",
    description: "Shell scripting essentials for Linux administrators.",
    url: "https://www.udemy.com/course/linux-shell-scripting-free/",
    author: "Jason Cannon",
    price: "Free",
    students: "1.2K+",
    rating: 4.7,
    reviews: [
      { username: "Mike T.", comment: "Perfect for beginners" },
      { username: "Lisa K.", comment: "Clear and concise" },
    ],
  },
  {
    id: 3,
    title: "3. Ansible Basics",
    description: "Learn the basics of Ansible automation by Red Hat.",
    url: "https://www.udemy.com/course/ansible-basics-an-automation-technical-overview/",
    author: "Red Hat, Inc.",
    price: "Free",
    students: "800+",
    rating: 4.4,
    reviews: [
      { username: "David L.", comment: "Official Red Hat course - excellent!" },
    ],
  },
  {
    id: 4,
    title: "4. Docker Essentials",
    description: "Learn Docker and Docker Compose efficiently.",
    url: "https://www.udemy.com/course/docker-essentials",
    author: "Cerulean Canvas",
    price: "$10",
    students: "2.5K+",
    rating: 4.6,
    reviews: [
      { username: "Alex P.", comment: "Great hands-on exercises" },
      { username: "Maria S.", comment: "Well structured content" },
    ],
  },
  {
    id: 5,
    title: "5. Introduction to DevOps",
    description: "Introduction to DevOps concepts and tools.",
    url: "https://www.udemy.com/course/introduction-to-devops-f",
    author: "Dicecamp Academy",
    price: "Free",
    students: "900+",
    rating: 4.3,
    reviews: [{ username: "Tom B.", comment: "Good overview of DevOps" }],
  },
  {
    id: 6,
    title: "6. AWS From Scratch",
    description: "Get started with AWS and DevOps cloud basics.",
    url: "https://www.udemy.com/course/aws-from-scratch",
    author: "Sundus Hussain",
    price: "$15",
    students: "3.2K+",
    rating: 4.5,
    reviews: [
      { username: "Chris R.", comment: "Excellent AWS foundation" },
      { username: "Emma W.", comment: "Practical examples" },
    ],
  },
];

const greatLearningCourses: Course[] = [
  {
    id: 1,
    title: "1.Linux Tutorial",
    description:
      "Comprehensive Linux tutorial covering essential commands, file systems, and system administration basics.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/linux-tutorial",
    author: "Mr. Ramendra Tripathi",
    cover_image: "/g1.webp",
    price: "Free",
    students: "40K+",
    rating: 4.6,
  },
  {
    id: 2,
    title: "2.AWS for Beginners",
    description:
      "Learn AWS fundamentals, services, and cloud computing concepts from scratch with hands-on examples.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/aws-for-beginners1",
    author: "Mr. Vishal Padghan",
    cover_image: "/aws.jpg",
    price: "Free",
    students: "15K+",
    rating: 4.7,
  },
  {
    id: 3,
    title: "3.Git Tutorial",
    description:
      "Master version control with Git - from basic commands to branching strategies and collaboration workflows.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/git-tutorial",
    author: "Mr. Ramendra Tripathi",
    cover_image: "/g4.webp",
    price: "Free",
    students: "12K+",
    rating: 4.8,
  },
  {
    id: 4,
    title: "4.GitHub Tutorial for Beginners",
    description:
      "Learn GitHub essentials including repositories, pull requests, issues, and collaborative development.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/github-tutorial-for-beginners",
    author: "Pragya P",
    cover_image: "/g5.jpg",
    price: "Free",
    students: "9K+",
    rating: 4.6,
  },
  {
    id: 5,
    title: "5.Docker for Intermediate Level",
    description:
      "Advanced Docker concepts including container orchestration, Docker Compose, and best practices.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/docker-for-intermediate-level",
    author: "Mr. Ramendra Tripathi",
    cover_image: "/docker.webp",
    price: "Free",
    students: "8K+",
    rating: 4.5,
  },
  {
    id: 6,
    title: "6.Docker Orchestration",
    description:
      "Advanced Docker concepts including container orchestration, Docker Compose, and best practices.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/docker-orchestration",
    author: "Mr. Ramendra Tripathi",
    cover_image: "/g12.png",
    price: "Free",
    students: "18K+",
    rating: 4.8,
  },
  {
    id: 7,
    title: "7.AWS CI/CD Pipeline Tutorial",
    description:
      "Build continuous integration and deployment pipelines on AWS with CodePipeline, CodeBuild, and CodeDeploy.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/aws-ci-cd-pipeline-tutorial",
    author: "Mrs. Priyanka Sharma",
    cover_image: "/g6.jpg",
    price: "Free",
    students: "7K+",
    rating: 4.7,
  },
  {
    id: 8,
    title: "8.Jenkins Tutorial",
    description:
      "Build continuous integration and deployment pipelines with Jenkins.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/jenkins-tutorial",
    author: "Mr. Ramendra Tripathi",
    cover_image: "/g7.png",
    price: "Free",
    students: "12K+",
    rating: 4.8,
  },
  {
    id: 9,
    title: "9.Kubernetes Tutorial",
    description: "Build container orchestration solutions with Kubernetes.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/introduction-to-kubernetes1",
    author: "Mr. Ramendra Tripathi",
    cover_image: "/g8.png",
    price: "Free",
    students: "33K+",
    rating: 4.7,
  },
  {
    id: 10,
    title: "10.Deploy an App using Kubernetes",
    description:
      "Learn how to deploy a containerized application using Kubernetes.",
    url: "https://www.mygreatlearning.com/academy/learn-for-free/courses/deploy-an-app-using-kubernetes",
    author: "Mr. Ramendra Tripathi",
    cover_image: "/g11.png",
    price: "Free",
    students: "24K+",
    rating: 4.7,
  },
];

const kodekloudCourses: Course[] = [
  {
    id: 1,
    title: "Linux for Beginners",
    description:
      "Comprehensive Linux course covering commands, file systems, and administration basics with hands-on labs.",
    url: "https://kodekloud.com/courses/linux-for-beginners/",
    author: "KodeKloud Team",
    cover_image: "/kodekloud-linux.jpg",
    price: "Free",
    students: "50K+",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Docker for Beginners",
    description:
      "Learn Docker fundamentals with interactive labs and real-world containerization scenarios.",
    url: "https://kodekloud.com/courses/docker-for-beginners/",
    author: "KodeKloud Team",
    cover_image: "/kodekloud-docker.jpg",
    price: "Free",
    students: "45K+",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Kubernetes for Beginners",
    description:
      "Master Kubernetes basics with hands-on labs and practical deployment exercises.",
    url: "https://kodekloud.com/courses/kubernetes-for-beginners/",
    author: "KodeKloud Team",
    cover_image: "/kodekloud-k8s.jpg",
    price: "Free",
    students: "38K+",
    rating: 4.8,
  },
  {
    id: 4,
    title: "DevOps Pre-requisites",
    description:
      "Essential foundation course covering Git, Linux, and basic DevOps concepts with interactive labs.",
    url: "https://kodekloud.com/courses/devops-pre-requisites/",
    author: "KodeKloud Team",
    cover_image: "/kodekloud-devops.jpg",
    price: "Free",
    students: "42K+",
    rating: 4.7,
  },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to extract number from title for sorting
const extractNumberFromTitle = (title: string): number => {
  const match = title.match(/^(\d+)\./);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
};

export function TopUdemyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeftGL, setCanScrollLeftGL] = useState(false);
  const [canScrollRightGL, setCanScrollRightGL] = useState(true);
  const [canScrollLeftKK, setCanScrollLeftKK] = useState(false);
  const [canScrollRightKK, setCanScrollRightKK] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const glScrollRef = useRef<HTMLDivElement>(null);
  const kkScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);

        if (!API_BASE_URL) {
          throw new Error("API URL not configured");
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(`${API_BASE_URL}/udemy-courses/`, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        let rawCourses = data;

        if (data && typeof data === "object") {
          if (Array.isArray(data)) {
            rawCourses = data;
          } else if (Array.isArray(data.results)) {
            rawCourses = data.results;
          } else if (Array.isArray(data.courses)) {
            rawCourses = data.courses;
          }
        }

        if (!Array.isArray(rawCourses)) {
          throw new Error("Invalid data format received");
        }

        const mapped: Course[] = rawCourses.map(
          (course: any, index: number) => ({
            id: course.id || index + 1,
            title: course.title || "Untitled Course",
            description: course.description || "No description available.",
            url: course.url || "#",
            author: course.author || "Unknown Author",
            cover_image: course.cover_image || course.image || null,
            price: course.price || "Free",
            students:
              course.students || `${Math.floor(Math.random() * 900) + 100}+`,
            rating:
              course.rating || Math.round((Math.random() * 1 + 3.5) * 10) / 10,
            reviews: course.reviews || [],
          })
        );

        // Sort courses by number in title
        const sortedCourses = mapped.sort((a, b) => {
          const numA = extractNumberFromTitle(a.title);
          const numB = extractNumberFromTitle(b.title);
          return numA - numB;
        });

        setCourses(sortedCourses.length > 0 ? sortedCourses : fallbackCourses);
      } catch (err) {
        console.error("Fetch error:", err);
        setUsingFallback(true);
        // Also sort fallback courses
        const sortedFallback = fallbackCourses.sort((a, b) => {
          const numA = extractNumberFromTitle(a.title);
          const numB = extractNumberFromTitle(b.title);
          return numA - numB;
        });
        setCourses(sortedFallback);
        setError(err instanceof Error ? err.message : "Failed to load courses");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const checkScrollGL = () => {
    if (glScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = glScrollRef.current;
      setCanScrollLeftGL(scrollLeft > 0);
      setCanScrollRightGL(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const checkScrollKK = () => {
    if (kkScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = kkScrollRef.current;
      setCanScrollLeftKK(scrollLeft > 0);
      setCanScrollRightKK(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollGL = (direction: "left" | "right") => {
    if (glScrollRef.current) {
      const scrollAmount = 400;
      glScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollKK = (direction: "left" | "right") => {
    if (kkScrollRef.current) {
      const scrollAmount = 400;
      kkScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", checkScroll);
    return () => currentRef?.removeEventListener("scroll", checkScroll);
  }, [courses]);

  useEffect(() => {
    checkScrollGL();
    const currentRef = glScrollRef.current;
    currentRef?.addEventListener("scroll", checkScrollGL);
    return () => currentRef?.removeEventListener("scroll", checkScrollGL);
  }, []);

  useEffect(() => {
    checkScrollKK();
    const currentRef = kkScrollRef.current;
    currentRef?.addEventListener("scroll", checkScrollKK);
    return () => currentRef?.removeEventListener("scroll", checkScrollKK);
  }, []);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      // Sort fallback courses when retrying
      const sortedFallback = fallbackCourses.sort((a, b) => {
        const numA = extractNumberFromTitle(a.title);
        const numB = extractNumberFromTitle(b.title);
        return numA - numB;
      });
      setCourses(sortedFallback);
      setLoading(false);
      setUsingFallback(true);
    }, 500);
  };

  if (loading) {
    return (
      <section ref={sectionRef} className="w-full bg-white/95 py-20">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="h-1 w-24 bg-gray-200 rounded-full mb-6 animate-pulse" />
            <div className="h-12 w-96 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-6 w-full max-w-2xl bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="flex gap-6 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-2xl mb-4" />
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* KodeKloud Section - Clean & Minimal */}
      <section className="w-full bg-white/95 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-sky-100 px-6 py-3 rounded-full mb-6">
              <Trophy className="w-5 h-5 text-sky-600" />
              <span className="text-sky-700 font-semibold text-sm uppercase tracking-wide">
                Trusted by 500,000+ Engineers
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Master DevOps with
              <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                KodeKloud
              </span>
            </h2>

            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              The leading platform for DevOps, Cloud, and Infrastructure
              learning. Join engineers from Fortune 500 companies.
            </p>
          </div>

          {/* Simple Feature Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Industry Courses
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Docker, Kubernetes, AWS, Terraform with real-world projects.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Expert Instructors
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Learn from industry leaders like Mumshad Mannambeth.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Free Access
              </h3>
              <p className="text-slate-700 leading-relaxed">
                Start with free courses and hands-on labs.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl mb-6">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Start Your DevOps Journey?
              </h3>
              <p className="text-sky-100 text-lg mb-6 max-w-2xl mx-auto">
                Join thousands of successful engineers who transformed their
                careers with KodeKloud's proven learning platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://kodekloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-sky-600 rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105"
                >
                  <span>Explore All Courses</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a
                  href="https://learn.kodekloud.com/user/learning-paths/devops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-sky-600 transition-all duration-300 font-bold text-lg"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>View DevOps Path</span>
                </a>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Trusted by engineers at Google, Amazon, Microsoft, and thousands
              of other companies worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Udemy Section */}
      <section
        ref={sectionRef}
        className="relative w-full bg-white/95 py-10 overflow-hidden"
      >
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl">
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mb-6"
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2">
                  <img
                    src="/udemy.webp"
                    alt="Udemy"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Master DevOps with
                  <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    Udemy Courses
                  </span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-black leading-relaxed"
              >
                Curated collection of online courses designed to help you master
                essential DevOps tools, practices, and methodologies for modern
                software development
                {usingFallback && (
                  <span className="block text-sm mt-2 text-yellow-600">
                    • Showing demo data (API unavailable)
                  </span>
                )}
              </motion.p>
            </div>
          </motion.div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1 font-medium text-sm">
                      Unable to load live data
                    </p>
                    <p className="text-gray-600 text-sm">
                      {error} - Showing demo courses instead.
                    </p>
                  </div>
                  <button
                    onClick={retryFetch}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl transition-all hover:bg-yellow-600 text-sm font-medium shadow-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Courses Grid */}
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-8 mb-6 border-2 border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                No courses available
              </h3>
              <p className="text-gray-600 text-lg">
                Check back later for featured courses
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Navigation Arrows */}
              {canScrollLeft && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scroll("left")}
                  className="absolute -left-6 top-1/4 -translate-y-1/2 z-20 bg-white border-2 border-gray-200 p-3 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </motion.button>
              )}

              {canScrollRight && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scroll("right")}
                  className="absolute -right-2 top-1/4 -translate-y-1/2 z-20 bg-white border-2 border-gray-200 p-3 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </motion.button>
              )}

              {/* Horizontal Scroll Section */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                onScroll={checkScroll}
              >
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0 w-96 snap-start"
                  >
                    <div className="block group h-full">
                      <div className="relative">
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-2xl border-2 border-gray-200 group-hover:border-gray-300 group-hover:shadow-xl transition-all duration-300">
                            {course.cover_image ? (
                              <img
                                src={course.cover_image || "/placeholder.svg"}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="w-16 h-16 text-gray-300" />
                              </div>
                            )}
                          </div>
                        </a>
                      </div>

                      <div className="mt-4 space-y-3">
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-sky-600 transition-colors duration-200 text-base leading-snug">
                            {course.title}
                          </h3>
                        </a>

                        <div className="flex items-center justify-between  py-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium truncate">
                              {course.author}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span>{course.students}</span>
                          </div>
                        </div>

                        {course.rating && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium text-gray-900 text-sm">
                                {course.rating.toFixed(1)}
                              </span>
                            </div>
                            <span className="text-gray-600 text-sm">
                              rating
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Great Learning Section */}
      <section className="relative w-full bg-white py-17 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl">
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mb-6"
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-16 h-16 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2">
                  <img
                    src="/greatlearning.png"
                    alt="Great Learning"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Master DevOps with
                  <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    Great Learning
                  </span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-black leading-relaxed"
              >
                Free comprehensive courses from Great Learning Academy covering
                Linux, AWS, Docker, Git, and CI/CD pipelines to boost your
                DevOps skills
              </motion.p>
            </div>
          </motion.div>

          {/* Great Learning Courses Grid */}
          <div className="relative">
            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollGL("left")}
              className="absolute -left-6 top-1/4 -translate-y-1/2 z-20 bg-white border-2 border-gray-200 p-3 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollGL("right")}
              className="absolute -right-2 top-1/4 -translate-y-1/2 z-20 bg-white border-2 border-gray-200 p-3 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>

            {/* Horizontal Scroll Section */}
            <div
              ref={glScrollRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {greatLearningCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-96 snap-start"
                >
                  <div className="block group h-full">
                    <div className="relative">
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-2xl border-2 border-gray-200 group-hover:border-gray-300 group-hover:shadow-xl transition-all duration-300">
                          {course.cover_image ? (
                            <img
                              src={course.cover_image || "/placeholder.svg"}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-gray-300" />
                            </div>
                          )}
                        </div>
                      </a>
                    </div>

                    <div className="mt-4 space-y-3">
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-sky-600 transition-colors duration-200 text-base leading-snug">
                          {course.title}
                        </h3>
                      </a>

                      <div className="flex items-center justify-between  py-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-medium truncate">
                            {course.author}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{course.students}</span>
                        </div>
                      </div>

                      {course.rating && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-gray-900 text-sm">
                              {course.rating.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-gray-600 text-sm">rating</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
