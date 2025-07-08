"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

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
];

export function SuccessStoriesSection() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Quote className="mx-auto mb-4 w-10 h-10 text-indigo-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Success Stories from Myanmar
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          See how students and junior engineers from Myanmar are growing in the DevOps world.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center flex flex-col justify-between"
          >
            <p className="text-gray-700 text-sm mb-4">"{t.feedback}"</p>
            <div className="mt-auto">
              <div className="text-indigo-600 font-semibold">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}