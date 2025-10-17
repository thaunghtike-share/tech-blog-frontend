"use client";
import { useEffect, useState, useRef } from "react";
import { Star, Quote, ChevronRight, ChevronLeft } from "lucide-react";
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
        left: 320,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
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

  const displayed = showAll ? feedbacks.slice(0, 12) : feedbacks.slice(0, 6);

  const mockTestimonials: Testimonial[] = [
    {
      name: "Aung Ko",
      role: "Junior DevOps Engineer",
      feedback:
        "The mentorship program completely transformed my career path. From zero knowledge to landing my first DevOps role in just 6 months!",
      rating: 5,
    },
    {
      name: "Hla Hla",
      role: "Cloud Engineer",
      feedback:
        "The hands-on projects and real-world scenarios prepared me for actual workplace challenges. Highly recommended!",
      rating: 5,
    },
    {
      name: "Min Thu",
      role: "Site Reliability Engineer",
      feedback:
        "The community support and detailed curriculum helped me transition from network engineering to SRE successfully.",
      rating: 5,
    },
    {
      name: "Su Su",
      role: "DevOps Specialist",
      feedback:
        "Learning modern tools like Kubernetes and Terraform through practical projects made all the difference in my job interviews.",
      rating: 4,
    },
    {
      name: "Kyaw Zin",
      role: "Infrastructure Engineer",
      feedback:
        "The career guidance and interview preparation sessions were invaluable. Got 3 job offers within 2 months of completing the program.",
      rating: 5,
    },
    {
      name: "Nilar",
      role: "Platform Engineer",
      feedback:
        "As someone with non-CS background, the structured learning path and mentor support made complex concepts easy to understand.",
      rating: 5,
    },
  ];

  const testimonials = feedbacks.length > 0 ? feedbacks : mockTestimonials;

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-open-sans">
          {/* Header */}
          <motion.div
            className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1">
              <motion.div
                className="h-1 w-32 mb-6 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Real Stories from
                <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mt-2">
                  Our Community
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 text-lg max-w-2xl"
              >
                See how students and junior engineers from Myanmar are growing
                their careers and mastering DevOps skills
              </motion.p>
            </div>
          </motion.div>

          {/* Testimonials Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <div className="hidden sm:flex absolute -top-20 right-0 gap-3">
              <motion.button
                onClick={scrollLeft}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-white rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5 text-sky-600" />
              </motion.button>
              <motion.button
                onClick={scrollRight}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-white rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <ChevronRight className="w-5 h-5 text-sky-600" />
              </motion.button>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full z-10 px-2">
              <motion.button
                onClick={scrollLeft}
                className="w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </motion.button>
              <motion.button
                onClick={scrollRight}
                className="w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-sm"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </motion.button>
            </div>

            {/* Testimonials Grid/Scroll */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4"
            >
              {displayed.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="min-w-[320px] sm:min-w-0 snap-start flex-shrink-0"
                >
                  {/* Enhanced Card Design */}
                  <div className="bg-white/50 rounded-2xl p-6 h-full flex flex-col border border-gray-300 hover:border-gray-300 transition-colors duration-200">
                    {/* Top Section with Quote and Rating */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-white rounded-lg border border-sky-300">
                        <Quote className="w-4 h-4 text-sky-600" />
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Feedback Text - Full Height */}
                    <div className="flex-grow mb-6">
                      <p className="text-gray-700 text-base leading-relaxed">
                        "{testimonial.feedback}"
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-sky-600 mt-1">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* See More Button */}
          {testimonials.length > 6 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-lg text-sm font-medium bg-sky-800 text-white border border-sky-800 flex items-center gap-2 mx-auto transition-colors duration-200 hover:bg-gray-700"
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
                    Show Less Stories
                  </>
                ) : (
                  <>
                    Show More Stories
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
              </button>
            </motion.div>
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
