"use client";
import { Users, Heart, Sparkles, PenSquare, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function AuthorsContributorsCTA() {
  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            className="relative p-4 bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-full shadow-2xl"
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
              className="absolute -inset-2 bg-gradient-to-r from-indigo-400/30 to-emerald-500/30 rounded-full blur-lg"
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
            <Users className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Want to Become Author?
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
                className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-emerald-500 rounded-full"
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
            <ChevronRight className="w-6 h-6 text-indigo-400 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-full mx-auto relative mb-6"
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/85 text-lg max-w-2xl mx-auto relative z-10 mb-8"
        >
          Join our community to share your knowledge, write articles, or help
          improve this website. Your expertise can make a difference!
        </motion.p>

        {/* CTA Button */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/admin/new-article"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl text-lg font-medium transition-all hover:shadow-2xl hover:-translate-y-1 shadow-xl"
        >
          <PenSquare className="w-6 h-6" />
          Start Writing
          <Sparkles className="w-5 h-5 ml-1" />
        </motion.a>
      </motion.div>
    </section>
  );
}
