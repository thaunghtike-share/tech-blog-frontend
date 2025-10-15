"use client";
import { useState, useEffect, useRef } from "react";
import {
  Star,
  GraduationCap,
  BookOpen,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  User,
  AlertTriangle,
  Users,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  username: string;
  comment: string;
}

interface UdemyCourse {
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

const fallbackCourses: UdemyCourse[] = [
  {
    id: 1,
    title: "Git, GitHub, and GitHub Action",
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
    title: "Intro to Linux Shell Scripting",
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
    title: "Ansible Basics",
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
    title: "Docker Essentials",
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
    title: "Introduction to DevOps",
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
    title: "AWS From Scratch",
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function TopUdemyCourses() {
  const [courses, setCourses] = useState<UdemyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

        const mapped: UdemyCourse[] = rawCourses.map(
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

        setCourses(mapped.length > 0 ? mapped : fallbackCourses);
      } catch (err) {
        console.error("Fetch error:", err);
        setUsingFallback(true);
        setCourses(fallbackCourses);
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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
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

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setCourses(fallbackCourses);
      setLoading(false);
      setUsingFallback(true);
    }, 500);
  };

  if (loading) {
    return (
      <section ref={sectionRef} className="w-full bg-white/95 py-20">
        {/* Subtle background pattern */}

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
    <section
      ref={sectionRef}
      className="relative w-full bg-white/95 py-14 overflow-hidden"
    >
      {/* Subtle background pattern */}

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

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Master DevOps with
              <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Udemy Courses
              </span>
            </motion.h2>

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
                className="absolute -left-4 top-1/3 -translate-y-1/2 z-20 bg-white border-2 border-gray-200 p-3 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg"
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
                className="absolute -right-4 top-1/3 -translate-y-1/2 z-20 bg-white border-2 border-gray-200 p-3 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-lg"
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
                  className="flex-shrink-0 w-80 snap-start"
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
                          {index + 1}. {course.title}
                        </h3>
                      </a>

                      <div className="flex items-center justify-between text-sm">
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

                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] mt-3 text-sm border border-blue-400/30"
                      >
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Enroll Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
