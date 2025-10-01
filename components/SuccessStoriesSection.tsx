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
      className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Enhanced Header */}
      <motion.div
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Animated bubble icon */}
          <motion.div
            className="relative p-4 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full shadow-2xl"
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
            <Quote className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Success Stories
          </h2>

          {/* Chevron with dotted trail */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
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
            <ChevronRight className="w-6 h-6 text-sky-400 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full mx-auto relative mb-6"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Animated dots on the line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
            animate={{ x: [0, 120, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <p className="text-white text-lg max-w-2xl mx-auto relative z-10">
          See how students and junior engineers from Myanmar are growing in the
          DevOps world.
        </p>
      </motion.div>

      {/* Testimonials Container - Mobile scroll with indicator */}
      <div className="relative">
        {/* Right-side scroll indicator (mobile only) */}
        <div className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-2">
          <motion.button
            onClick={scrollRight}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 bg-gray-700/90 backdrop-blur-sm text-sky-400 rounded-full shadow-lg border border-gray-600"
          >
            <div className="relative">
              <ChevronRight className="w-5 h-5" />
              <motion.div
                animate={{
                  x: [0, 4, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
                className="absolute -right-1 -top-1 w-2 h-2 bg-sky-400 rounded-full"
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="min-w-[23.5rem] sm:min-w-0 bg-gradient-to-br from-gray-600 to-gray-800 rounded-3xl border border-gray-700 p-6 text-center flex flex-col justify-between transition-all shadow-xl"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-sky-500/20 to-blue-600/20 rounded-2xl border border-sky-500/30">
                  <Quote className="w-6 h-6 text-sky-400" />
                </div>
              </div>
              <p className="text-base sm:text-base text-white/85 mb-4 leading-relaxed">
                "{t.feedback}"
              </p>
              <div className="mt-auto">
                <div className="text-sm sm:text-base text-white/90 font-medium">
                  {t.name}
                </div>
                <div className="text-sm sm:text-sm text-white">{t.role}</div>
                <div className="flex justify-center mt-2">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-yellow-700 fill-yello-600"
                    />
                  ))}
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-800 text-sky-400 hover:from-sky-500/20 hover:to-blue-600/20 border border-sky-500/30 shadow-sm transition-all flex items-center gap-2 mx-auto"
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
