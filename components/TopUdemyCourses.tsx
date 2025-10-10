"use client";
import { useState, useEffect, useRef } from "react";
import {
  Star,
  GraduationCap,
  BookOpen,
  ExternalLink,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Play,
  User,
  AlertTriangle,
  Users,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

// Fallback data in case API fails
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const coursesPerPage = 3;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);
        setUsingFallback(false);

        // Check if API_BASE_URL is available
        if (!API_BASE_URL) {
          throw new Error("API URL not configured");
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

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

        // Handle different response formats
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
          console.warn("Invalid courses data format, using fallback");
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

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    // Retry logic would go here, but for now we'll use fallback
    setTimeout(() => {
      setCourses(fallbackCourses);
      setLoading(false);
      setUsingFallback(true);
    }, 500);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section
        ref={sectionRef}
        className="w-full max-w-7xl mx-auto px-4 py-16 font-open-sans"
      >
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl shadow-lg">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-800 to-blue-800 bg-clip-text text-transparent">
              Free Online Courses
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>
              <div className="p-6">
                <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 py-16 font-open-sans"
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Animated bubble icon */}
          <motion.div
            className="relative p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full shadow-2xl"
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
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-sky-400/30 to-blue-500/30 rounded-full blur-lg"
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
            <Play className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-800 to-blue-800 bg-clip-text text-transparent">
            Free Online Courses
          </h2>

          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
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
            <ChevronRight className="w-6 h-6 text-sky-600 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full mx-auto relative"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>

        <p className="text-black mt-6 text-lg max-w-2xl mx-auto relative z-10">
          Curated list of free online courses to master DevOps tools and
          practices
          {usingFallback && (
            <span className="text-yellow-600 text-sm block mt-2">
              • Showing demo data (API unavailable)
            </span>
          )}
        </p>
      </motion.div>

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-400 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-yellow-700 mb-2 font-medium">
                  Unable to load live data
                </p>
                <p className="text-gray-600 text-sm">
                  {error} - Showing demo courses instead.
                </p>
              </div>
              <button
                onClick={retryFetch}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl transition-all border border-yellow-600 hover:bg-yellow-600"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {courses.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center bg-blue-100 rounded-full p-6 mb-6 backdrop-blur-sm border border-blue-300">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
            No courses available
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Check back later for featured courses
          </p>
        </div>
      ) : (
        <div className="relative">
          {totalPages > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-300 flex items-center justify-center transition-all duration-300 -ml-6"
              >
                <ChevronLeft className="w-5 h-5 text-blue-500" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-300 flex items-center justify-center transition-all duration-300 -mr-6"
              >
                <ChevronRight className="w-5 h-5 text-blue-500" />
              </motion.button>
            </>
          )}

          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {Array.from({ length: totalPages }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
                    {courses
                      .slice(
                        slideIndex * coursesPerPage,
                        (slideIndex + 1) * coursesPerPage
                      )
                      .map((course, idx) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="group relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-3xl blur opacity-0 transition duration-500"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          />

                          {/* Course Card */}
                          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-2 flex flex-col h-full overflow-hidden">
                            {/* Course Cover Image - Clean without badges */}
                            <div className="relative h-48 bg-gradient-to-br from-sky-100 to-blue-200 overflow-hidden">
                              {course.cover_image ? (
                                <img
                                  src={course.cover_image || "/placeholder.svg"}
                                  alt={course.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200">
                                  <BookOpen className="w-16 h-16 text-blue-400/50" />
                                </div>
                              )}
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                              <h3 className="text-xl font-bold text-black mb-3 transition-colors line-clamp-2">
                                {course.title}
                              </h3>

                              <p className="text-black mb-4 leading-relaxed line-clamp-3 flex-grow">
                                {course.description}
                              </p>

                              {/* Author and Student Count Row */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 rounded-full border border-blue-300">
                                  <div className="p-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full">
                                    <User className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="font-medium text-blue-700 text-sm">
                                    {course.author}
                                  </span>
                                </div>

                                {/* Student Count */}
                                <div className="flex items-center gap-1 text-gray-700 text-sm">
                                  <Users className="w-4 h-4" />
                                  <span>{course.students}</span>
                                </div>
                              </div>

                              {/* Rating */}
                              {course.rating && (
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="font-medium text-black text-sm">
                                      {course.rating.toFixed(1)}
                                    </span>
                                  </div>
                                  <span className="text-gray-600 text-sm">
                                    rating
                                  </span>
                                </div>
                              )}

                              <AnimatePresence>
                                {(course.reviews?.length ?? 0) > 0 && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-3 mb-4"
                                  >
                                    {course.reviews
                                      ?.slice(0, 2)
                                      .map((review, i) => (
                                        <motion.div
                                          key={i}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.1 }}
                                          className="bg-blue-50 p-3 rounded-xl border border-blue-200"
                                        >
                                          <div className="text-black text-sm flex items-start gap-2">
                                            <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                            <span>
                                              <strong className="text-blue-600">
                                                {review.username}:
                                              </strong>{" "}
                                              {review.comment}
                                            </span>
                                          </div>
                                        </motion.div>
                                      ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <div className="mt-auto pt-4">
                                <a
                                  href={course.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:scale-[1.02] hover:shadow-xl border border-blue-400/30 group/btn"
                                >
                                  <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{
                                      duration: 3,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "linear",
                                    }}
                                    className="mr-2"
                                  >
                                    <GraduationCap className="w-4 h-4" />
                                  </motion.div>
                                  Enroll Now
                                  <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {totalPages > 1 && (
            <motion.div
              className="flex justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-gradient-to-r from-sky-500 to-blue-500 shadow-lg"
                      : "bg-gray-400 hover:bg-gray-500"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
