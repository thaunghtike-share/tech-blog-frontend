"use client";
import { Users, Heart, Sparkles, PenSquare } from "lucide-react";
import { motion } from "framer-motion";

export function AuthorsContributorsCTA() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-3 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-2xl shadow-lg">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm md:text-sm font-medium bg-gradient-to-r from-indigo-50 to-emerald-50 text-indigo-700 border border-indigo-200">
            <Heart className="w-4 h-4 mr-2" />
            Join Our Community
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-emerald-800 bg-clip-text text-transparent mb-4"
        >
          Want to Become an Author or Contributor?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-xl mx-auto mb-8 text-sm md:text-lg leading-relaxed"
        >
          Join our community to share your knowledge, write articles, or help
          improve this website. Your expertise can make a difference!
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/admin/new-article"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl text-sm md:text-lg font-medium transition-all hover:shadow-lg hover:-translate-y-0.5 shadow-xl"
        >
          <PenSquare className="w-5 h-5" />
          Start Writing
          <Sparkles className="w-4 h-4 ml-1" />
        </motion.a>
      </div>
    </section>
  );
}
