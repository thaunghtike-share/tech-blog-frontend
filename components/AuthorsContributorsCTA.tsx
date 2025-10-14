"use client";
import { Users, Sparkles, PenSquare } from "lucide-react";
import { motion } from "framer-motion";

export function AuthorsContributorsCTA() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Modern Card Design */}
      <motion.div
        className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-sky-200 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl mb-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Share Your Knowledge with
            <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Our Community
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Join fellow DevOps enthusiasts in Myanmar to share insights, write
            articles, and help others grow in their DevOps journey. Your
            experience can inspire the next generation.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href="/admin/new-article"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PenSquare className="w-5 h-5" />
            Start Writing Now
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </motion.a>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-sm mt-6"
          >
            No technical writing experience required • Get feedback from the
            community • Help others learn
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
