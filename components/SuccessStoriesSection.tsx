"use client"
import React from "react"
import { Star, Quote } from 'lucide-react'
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Aung Ko",
    role: "DevOps Engineer at XYZ",
    feedback:
      "This blog helped me understand CI/CD pipelines and Kubernetes. I landed my first DevOps job thanks to the free resources!",
  },
  {
    name: "Thet Oo Naing",
    role: "Junior DevOps Engineer at XYZ",
    feedback:
      "This blog helped me understand CI/CD pipelines and Kubernetes. I landed my first DevOps job thanks to the free resources!",
  },
  {
    name: "Su Su Win",
    role: "Cloud Intern at ABC",
    feedback:
      "As a student from Myanmar, I struggled to find relevant DevOps content. This site was a game-changer for me.",
  },
  {
    name: "Myo Thant",
    role: "Junior SRE",
    feedback:
      "The roadmap and certification guidance gave me the confidence to clear my first cloud cert. Highly recommend!",
  },
  {
    name: "Zwe Man",
    role: "Junior Developer",
    feedback:
      "The roadmap and certification guidance gave me the confidence to clear my first cloud cert. Highly recommend!",
  },
  {
    name: "Ko Ko Naing",
    role: "Junior DevOps Engineer at XYZ",
    feedback:
      "This blog helped me understand CI/CD pipelines and Kubernetes. I landed my first DevOps job thanks to the free resources!",
  },
]

export function SuccessStoriesSection() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
            <Quote className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200">
            <Star className="w-4 h-4 mr-2" />
            Success Stories
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-3"
        >
          Success Stories from Myanmar
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg"
        >
          See how students and junior engineers from Myanmar are growing in the DevOps world.
        </motion.p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -10, boxShadow: "0 8px 15px rgba(0,0,0,0.15)" }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 text-center flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-2xl"
          >
            {/* Quote Icon */}
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl">
                <Quote className="w-6 h-6 text-indigo-600" />
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 leading-relaxed italic">"{t.feedback}"</p>

            <div className="mt-auto">
              <div className="text-indigo-600 font-medium">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}