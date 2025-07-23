"use client";
import { useEffect, useState, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  feedback: string;
  rating: number;
};

export function SuccessStoriesSection() {
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Using your specified API endpoint.
    // Please note: This fetch request to a local/private IP (http://20.212.140.239:8000)
    // will NOT work in the sandboxed v0 preview environment.
    // For the preview to display data, your backend needs to be publicly accessible.
    fetch("https://ldn-api.maharbawgammoney.com/api/testimonials/")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }
        const data = await res.json();
        console.log("Testimonials fetched:", data);
        setFeedbacks(data);
      })
      .catch((err) => console.error("Failed to fetch testimonials:", err));
  }, []);

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

  // Determine testimonials to display based on screen size and showAll state
  const displayed =
    typeof window !== "undefined" && window.innerWidth < 640
      ? feedbacks // Show all on mobile for horizontal scroll
      : showAll
      ? feedbacks.slice(0, 12) // Desktop: show up to 12 if showAll is true
      : feedbacks.slice(0, 6); // Desktop: show first 6 if showAll is false

  return (
    <section
      ref={sectionRef}
      className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Header */}
      <div className="text-center mb-4 md:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
            <Quote className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200">
            <Star className="w-4 h-4 mr-2" /> Success Stories
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-3"
        >
          Success Stories from Myanmar
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto"
        >
          See how students and junior engineers from Myanmar are growing in the
          DevOps world.
        </motion.p>
      </div>
      {/* Testimonials - Horizontal scroll on mobile, grid on desktop */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:overflow-x-visible sm:snap-none">
        {displayed.map((t, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="flex-shrink-0 w-[85vw] snap-center sm:w-auto bg-white rounded-3xl border border-gray-100 p-6 text-center flex flex-col justify-between transition-all"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl">
                <Quote className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 mb-4 leading-relaxed">
              "{t.feedback}"
            </p>
            <div className="mt-auto">
              <div className="text-sm sm:text-base text-indigo-600 font-medium">
                {t.name}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{t.role}</div>
              <div className="flex justify-center mt-2">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* See More / See Less Button - Hidden on mobile, visible on desktop */}
      {feedbacks.length > 6 && (
        <div className="mt-12 text-center hidden sm:block">
          <motion.button
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-white/90 text-bold text-indigo-600 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 shadow-sm transition-all flex items-center gap-2 mx-auto"
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
    </section>
  );
}
