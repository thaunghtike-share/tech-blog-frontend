"use client";
import { useEffect, useState, useRef } from "react";
import { Star, Quote, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  feedback: string;
  rating: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export function SuccessStoriesSection() {
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/testimonials/`)
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }
        const data = await res.json();
        setFeedbacks(data);
      })
      .catch((err) => console.error("Failed to fetch testimonials:", err));
  }, []);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!showAll && sectionRef.current) {
      const timeout = setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [showAll]);

  const displayed =
    typeof window !== "undefined" && window.innerWidth < 640
      ? feedbacks
      : showAll
      ? feedbacks.slice(0, 12)
      : feedbacks.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white/95 overflow-hidden"
    >
      {/* Subtle background pattern */}

      <div className="relative mt-3 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-open-sans">
          {/* Left Aligned Header */}
          <motion.div
            className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1">
              <motion.div
                className="h-1 w-32 mb-4 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight"
              >
                Real Stories from
                <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Our Community
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-black mt-4 text-lg max-w-2xl"
              >
                See how students and junior engineers from Myanmar are growing
                their careers and mastering DevOps skills
              </motion.p>
            </div>
          </motion.div>

          {/* Testimonials Container - Mobile scroll with indicator */}
          <div className="relative">
            {/* Right-side scroll indicator (mobile only) */}
            <div className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-2">
              <motion.button
                onClick={scrollRight}
                className="flex items-center justify-center w-10 h-10 bg-white text-blue-500 rounded-full border border-gray-300"
              >
                <div className="relative">
                  <ChevronRight className="w-5 h-5" />
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                    }}
                    className="absolute -right-1 -top-1 w-2 h-2 bg-blue-500 rounded-full"
                  />
                </div>
              </motion.button>
            </div>

            {/* Testimonials - Horizontal scroll on mobile, grid on desktop */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-4"
            >
              {displayed.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[23.5rem] sm:min-w-0"
                >
                  {/* Card */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-300 p-6 text-center flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gradient-to-r from-sky-500/20 to-blue-600/20 rounded-2xl border border-sky-500/30">
                        <Quote className="w-6 h-6 text-sky-600" />
                      </div>
                    </div>

                    {/* Feedback Text */}
                    <p className="text-base sm:text-base text-black mb-4 leading-relaxed line-clamp-5 flex-grow">
                      "{t.feedback}"
                    </p>

                    {/* User Info */}
                    <div className="mt-auto">
                      <div className="text-sm sm:text-base text-black font-semibold">
                        {t.name}
                      </div>
                      <div className="text-sm sm:text-sm text-black">
                        {t.role}
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center mt-3">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < t.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* See More / See Less Button - Desktop only */}
          {feedbacks.length > 6 && (
            <div className="mt-12 text-center hidden sm:block">
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-xl text-sm font-medium bg-white/95 backdrop-blur-sm text-blue-600 border border-blue-500/30 flex items-center gap-2 mx-auto hover:shadow-md transition-all duration-300"
              >
                {showAll ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    Show More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Hide scrollbar styles */}
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
