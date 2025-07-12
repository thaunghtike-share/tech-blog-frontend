"use client"
import React, { useState, useEffect, useRef } from "react"
import { Star, GraduationCap, BookOpen, ExternalLink, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from "framer-motion"

interface Review {
  username: string
  comment: string
}

interface UdemyCourse {
  id: number
  title: string
  description: string
  url: string
  author: string
  authorImage?: string | null
  rating?: number
  reviews?: Review[]
}

const API_BASE_URL = "http://192.168.100.7:8000/api"

export function TopUdemyCourses() {
  const [courses, setCourses] = useState<UdemyCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${API_BASE_URL}/udemy-courses/`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()

        const rawCourses = Array.isArray(data) ? data : data.results
        if (!Array.isArray(rawCourses)) {
          throw new Error("Invalid data format received from API")
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
        }))
        setCourses(mapped)
      } catch (err) {
        setError("Failed to fetch Udemy courses.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const displayed = showAll ? courses : courses.slice(0, 9)

  const handleToggleShowAll = () => {
    if (showAll) {
      // Scroll smoothly to top of the courses section when showing less
      sectionRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    setShowAll(!showAll)
  }

  if (loading) {
    return (
      <section ref={sectionRef} className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section ref={sectionRef} className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center bg-red-50 border border-red-200 rounded-3xl p-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Failed to Load Courses</h3>
          <p className="text-red-600">Error: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200">
            <BookOpen className="w-4 h-4 mr-2" />
            Free DevOps Learning
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4"
        >
          Top Free DevOps Courses on Udemy
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Curated list of free Udemy courses to master DevOps tools and practices.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayed.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                {course.title}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">{course.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                {course.authorImage && (
                  <img
                    src={course.authorImage || "/placeholder.svg"}
                    alt={course.author}
                    className="w-6 h-6 rounded-full object-cover border border-gray-200"
                    loading="lazy"
                  />
                )}
                <span className="font-medium">{course.author}</span>
              </div>

              {course.rating && (
                <div className="flex items-center gap-1 text-yellow-500 mb-3">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium text-gray-900 text-sm">{course.rating}</span>
                </div>
              )}

              {course.reviews && course.reviews.length > 0 && (
                <div className="space-y-2 mb-4">
                  {course.reviews.slice(0, 2).map((review, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100"
                    >
                      <div className="text-gray-700 text-xs flex items-start gap-2">
                        <MessageSquare className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong className="text-blue-700">{review.username}:</strong> {review.comment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 pt-0">
              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group/btn"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Enroll Now
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {courses.length > 9 && (
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleShowAll}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {showAll ? "Show Less" : `See All Courses`}
            {showAll ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </motion.button>
        </div>
      )}
    </section>
  )
}