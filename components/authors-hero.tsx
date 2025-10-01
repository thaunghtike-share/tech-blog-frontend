"use client";
import { motion } from "framer-motion";
import {
  Star,
  ArrowRight,
  Sparkles,
  User,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface FeaturedAuthor {
  id: number;
  slug: string;
  name: string;
  bio: string;
  avatar: string;
  featured: boolean;
  job_title?: string;
  company?: string;
  post_count?: number;
}

export function AuthorsHero() {
  const [featuredAuthors, setFeaturedAuthors] = useState<FeaturedAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const authorRes = await fetch(
          `${API_BASE_URL}/authors/?featured=true&count_posts=true`
        );

        if (!authorRes.ok) throw new Error("Failed to fetch authors");

        const authorData = await authorRes.json();

        setFeaturedAuthors(
          Array.isArray(authorData.results) ? authorData.results : authorData
        );
      } catch (err) {
        setError("Failed to load authors");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20">
      {/* Header with bubble icon and dotted animations */}
      <motion.div
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background pattern with dotted signs 
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-orange-900/10" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,200,100,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
      */}
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Animated bubble icon */}
          <motion.div
            className="relative p-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full shadow-2xl"
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
              className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-lg"
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
            Featured Authors
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
                className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
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
            <ChevronRight className="w-6 h-6 text-yellow-400 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mx-auto relative"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
        </motion.div>

        <p className="text-white/85 mt-6 text-lg max-w-2xl mx-auto relative z-10">
          Meet our expert contributors sharing their DevOps knowledge
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-xl"
            >
              <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-700 rounded mx-auto mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-700 rounded mx-auto mb-4"></div>
              <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center bg-red-900/20 rounded-full p-6 mb-6 backdrop-blur-sm border border-red-500/30">
            <User className="w-12 h-12 text-red-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Error loading authors
          </h3>
          <p className="text-gray-400 mb-8 text-lg">{error}</p>
        </div>
      ) : featuredAuthors.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center bg-yellow-900/20 rounded-full p-6 mb-6 backdrop-blur-sm border border-yellow-500/30">
            <User className="w-12 h-12 text-yellow-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            No featured authors available
          </h3>
          <p className="text-gray-400 mb-8 text-lg">
            Check back later for featured contributors
          </p>
        </div>
      ) : (
        <>
          {/* Authors Grid with background images and animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredAuthors.slice(0, 6).map((author, index) => (
              <motion.div
                key={author.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                {/* Background image effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl" />
                <div className="absolute inset-0 bg-[url('/professional-author-background.jpg')] bg-cover bg-center opacity-10 rounded-2xl" />

                {/* Animated background glow */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur opacity-0 transition duration-500"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />

                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 text-center">
                  {/* Avatar with animated bubble rings */}
                  <div className="relative mb-6">
                    <img
                      src={author.avatar || "/placeholder.svg"}
                      alt={author.name}
                      className="relative w-20 h-20 rounded-full object-cover border-4 border-gray-600 mx-auto shadow-lg transition-shadow z-10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />

                    {/* Animated star badge */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg z-20"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Star className="w-4 h-4" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {author.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4">
                    {author.job_title
                      ? `${author.job_title}${
                          author.company ? ` at ${author.company}` : ""
                        }`
                      : "DevOps Expert"}
                  </p>

                  <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {author.bio ||
                      "Passionate about sharing DevOps knowledge and best practices with the community."}
                  </p>

                  {/* Stats with animated dots */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    {/* Animated separator dots */}
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-yellow-400 rounded-full"
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
                    </div>
                  </div>

                  {/* CTA Button with chevron */}
                  <Link
                    href={`/authors/${author.slug}`}
                    className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium group-hover:gap-3 transition-all"
                  >
                    View Profile
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA with animated elements */}
          <motion.div
            className="text-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* Dotted background pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-yellow-400/30 rounded-full mx-4"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            <Link
              href="/authors"
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-2xl hover:from-yellow-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 border border-yellow-400/30 z-10"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Meet All Authors
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </>
      )}
    </section>
  );
}