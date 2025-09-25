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
  User,
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function TopUdemyCourses() {
  const [courses, setCourses] = useState<UdemyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const coursesPerPage = 3;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentCourses = () => {
    const startIndex = currentSlide * coursesPerPage;
    return courses.slice(startIndex, startIndex + coursesPerPage);
  };

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
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-5 sm:mb-9 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-6 py-2 rounded-full text-sm sm:text-sm font-medium bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm">
            <BookOpen className="w-4 h-4 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Udemy Courses
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent mb-2 md:mb-4"
        >
          Learn DevOps on Udemy
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Curated list of free Udemy courses to master DevOps tools and
          practices.
        </motion.p>
      </div>

      <div className="relative">
        {totalPages > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:shadow-xl transition-all duration-300 -ml-6"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:shadow-xl transition-all duration-300 -mr-6"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                  {courses
                    .slice(
                      slideIndex * coursesPerPage,
                      (slideIndex + 1) * coursesPerPage
                    )
                    .map((course, idx) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl hover:border-green-200"
                      >
                        <div className="p-5 relative flex-grow">
                          <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg inline-flex mb-4">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-base sm:text-base text-gray-700 mb-4 leading-relaxed line-clamp-3">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
                              <div className="p-1 bg-green-500 rounded-full">
                                <User className="w-3 h-3 text-white" />
                              </div>
                              <span className="font-medium text-green-700 text-sm">
                                {course.author}
                              </span>
                            </div>
                          </div>
                          {course.rating && (
                            <div className="flex items-center gap-1 text-yellow-500 mb-3">
                              <Star className="w-4 h-4 sm:w-4 sm:h-4 fill-current" />
                              <span className="font-medium text-gray-900 text-sm sm:text-sm">
                                {course.rating.toFixed(1)}
                              </span>
                            </div>
                          )}
                          {(course.reviews?.length ?? 0) > 0 && (
                            <div className="space-y-2 mb-4">
                              {course.reviews?.slice(0, 2).map((review, i) => (
                                <div
                                  key={i}
                                  className="bg-green-50 p-2 sm:p-3 rounded-xl border border-green-100"
                                >
                                  <div className="text-gray-700 text-xs flex items-start gap-2">
                                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    <span>
                                      <strong className="text-green-700">
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
                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:scale-[1.02] text-sm sm:text-base"
                          >
                            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Enroll Now
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center -mt-5 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
