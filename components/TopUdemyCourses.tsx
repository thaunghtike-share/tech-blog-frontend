"use client";
import { useState, useEffect, useRef } from "react";
import {
  Star,
  GraduationCap,
  BookOpen,
  ExternalLink,
  MessageSquare,
  ChevronDown,
  ChevronUp,
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
  authorImage?: string | null;
  rating?: number;
  reviews?: Review[];
}

const API_BASE_URL = "http://192.168.1.131:8000/api";

export function TopUdemyCourses() {
  const [courses, setCourses] = useState<UdemyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/udemy-courses/`);
        if (!res.ok) throw new Error(`Error status: ${res.status}`);
        const data = await res.json();
        const rawCourses = Array.isArray(data) ? data : data.results;
        if (!Array.isArray(rawCourses)) {
          throw new Error("Invalid courses data format");
        }
        const mapped: UdemyCourse[] = rawCourses.map((course: any) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          url: course.url,
          author: course.author,
          authorImage: course.author_image ?? null,
          rating: course.rating,
          reviews: course.reviews ?? [],
        }));
        setCourses(mapped);
      } catch (err) {
        setError("Failed to load courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // On mobile, always show all courses
  // On desktop, show 6 courses by default and all when showAll is true
  const displayedCourses =
    showAll || (typeof window !== "undefined" && window.innerWidth < 640)
      ? courses
      : courses.slice(0, 6);

  function toggleShowAll() {
    if (showAll) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setShowAll((prev) => !prev);
  }

  if (loading) {
    return (
      <section ref={sectionRef} className="max-w-7xl mx-auto py-12 px-4">
        <p className="text-center text-gray-500">Loading courses...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={sectionRef} className="max-w-7xl mx-auto py-12 px-4">
        <p className="text-center text-red-600 font-semibold">{error}</p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-5 sm:mb-9 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Udemy Courses
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2 md:mb-4"
        >
          Learn DevOps on Udemy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Curated list of free Udemy courses to master DevOps tools and
          practices.
        </motion.p>
      </div>

      {/* ⚡ Horizontal scroll on mobile */}
      <div className="flex overflow-x-auto hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-4">
        {displayedCourses.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="min-w-[21rem] sm:min-w-0 group bg-white rounded-xl shadow-lg border-l-4 border-blue-500 overflow-hidden transition-all duration-300 flex flex-col"
          >
            <div className="p-5 relative flex-grow">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg inline-flex mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                {course.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-4 leading-relaxed line-clamp-3">
                {course.description}
              </p>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-4">
                {course.authorImage && (
                  <img
                    src={course.authorImage || "/placeholder.svg"}
                    alt={course.author}
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-gray-200"
                    loading="lazy"
                  />
                )}
                <span className="font-medium">{course.author}</span>
              </div>
              {course.rating && (
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <span className="font-medium text-gray-900 text-xs sm:text-sm">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
              )}
              {(course.reviews?.length ?? 0) > 0 && (
                <div className="space-y-2 mb-4">
                  {course.reviews?.slice(0, 2).map((review, i) => (
                    <div
                      key={i}
                      className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-100"
                    >
                      <div className="text-gray-700 text-xs flex items-start gap-2">
                        <MessageSquare className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-blue-700">
                            {review.username}:
                          </strong>{" "}
                          {review.comment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-5 pt-0">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:scale-[1.01] text-sm sm:text-base"
              >
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Enroll Now
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More / Show Less button - Desktop only */}
      {courses.length > 6 && (
        <div className="hidden sm:block mt-8 md:mt-6 text-center">
          <motion.button
            type="button"
            onClick={toggleShowAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-2xl shadow-lg transition-all duration-300 text-base"
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

      {/* ⛔ Hide scrollbar for mobile scroll */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
