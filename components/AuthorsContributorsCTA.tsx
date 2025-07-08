"use client";

import React from "react";
import { Mail, Users } from "lucide-react";

export function AuthorsContributorsCTA() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 mx-auto mb-6 bg-indigo-50 rounded-full border border-indigo-100">
          <Users className="w-6 h-6 text-indigo-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Want to Become an Author or Contributor?
        </h2>
        
        <p className="text-gray-600 max-w-xl mx-auto mb-8 text-lg leading-relaxed">
          Join our community to share your knowledge, write articles, or help
          improve this website. Your expertise can make a difference!
        </p>
        
        <a
          href="mailto:your-email@example.com"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <Mail className="w-5 h-5" />
          Get in Touch
        </a>
      </div>
    </section>
  );
}