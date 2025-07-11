"use client";

import React, { useState, useEffect } from "react";
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

const API_BASE_URL = "http://192.168.100.7:8000/api";

export function TopUdemyCourses() {
  const [courses, setCourses] = useState<UdemyCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/udemy-courses/`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Support paginated response with 'results' or direct array
        const rawCourses = Array.isArray(data) ? data : data.results;

        if (!Array.isArray(rawCourses)) {
          throw new Error("Invalid data format received from API");
        }

        // Map snake_case to camelCase for UdemyCourse interface
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
        setError("Failed to fetch Udemy courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center py-12">Loading courses...</p>;
  if (error)
    return (
      <p className="text-center py-12 text-red-600">
        Error: {error}
      </p>
    );

  const displayed = showAll ? courses : courses.slice(0, 9);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600 mb-3">
          <GraduationCap className="w-4 h-4 mr-2" />
          Free DevOps Learning
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top Free DevOps Courses on Udemy
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Curated list of free Udemy courses to master DevOps tools and
          practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="border rounded-xl shadow hover:shadow-lg p-6 bg-white flex flex-col"
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              {course.title}
            </h3>

            <p className="text-gray-700 mb-4">{course.description}</p>

            <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
              {course.authorImage && (
                <img
                  src={course.authorImage}
                  alt={course.author}
                  className="w-6 h-6 rounded-full object-cover"
                  loading="lazy"
                />
              )}
              <span>{course.author}</span>
            </p>

            {course.rating && (
              <div className="flex items-center gap-1 text-yellow-500 mb-3">
                <Star className="w-5 h-5" />
                <span className="font-medium text-gray-900">{course.rating}</span>
              </div>
            )}

            {course.reviews && course.reviews.length > 0 && (
              <div className="space-y-2 mb-4">
                {course.reviews.slice(0, 3).map((review, i) => (
                  <div
                    key={i}
                    className="text-gray-700 italic text-sm flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span>
                      <strong>{review.username}:</strong> {review.comment}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <a
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Enroll Now
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        ))}
      </div>

      {courses.length > 9 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-gray-100 transition-colors"
          >
            {showAll ? "Show Less" : "See More"}
            {showAll ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </button>
        </div>
      )}
    </section>
  );
}