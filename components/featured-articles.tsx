"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Folder,
  Sparkles,
  AlertTriangle,
  TagIcon,
  Eye,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: number;
  slug: string;
  title: string;
  read_count: number;
  content: string;
  published_at: string;
  category: number | null;
  tags: number[];
  author: number;
}

interface Author {
  id: number;
  name: string;
  avatar?: string;
  username?: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function FeaturedArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [
          articlesResponse,
          authorsResponse,
          categoriesResponse,
          tagsResponse,
        ] = await Promise.all([
          fetch(`${API_BASE_URL}/articles/?featured=true`),
          fetch(`${API_BASE_URL}/authors/`),
          fetch(`${API_BASE_URL}/categories/`),
          fetch(`${API_BASE_URL}/tags/`),
        ]);

        if (!articlesResponse.ok) throw new Error("Failed to fetch articles");
        if (!authorsResponse.ok) throw new Error("Failed to fetch authors");
        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch categories");
        if (!tagsResponse.ok) throw new Error("Failed to fetch tags");

        const [articlesData, authorsData, categoriesData, tagsData] =
          await Promise.all([
            articlesResponse.json(),
            authorsResponse.json(),
            categoriesResponse.json(),
            tagsResponse.json(),
          ]);

        setArticles(
          Array.isArray(articlesData)
            ? articlesData
            : articlesData?.results || []
        );
        setAuthors(
          Array.isArray(authorsData) ? authorsData : authorsData?.results || []
        );
        setCategories(
          Array.isArray(categoriesData)
            ? categoriesData
            : categoriesData?.results || []
        );
        setTags(Array.isArray(tagsData) ? tagsData : tagsData?.results || []);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getAuthor = (id: number) => authors.find((a) => a.id === id);
  const getCategoryById = (id: number | null) =>
    categories.find((c) => c.id === id);
  const getTagById = (id: number) => tags.find((t) => t.id === id);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const calculateReadTime = (text: string) =>
    `${Math.ceil((text.split(" ").length || 1) / 200)} min`;

  const stripMarkdown = (md: string) =>
    md
      .replace(/<[^>]+>/g, "")
      .replace(/[#_*>[\]`~\-!]/g, "")
      .trim();

  const truncate = (str: string, max = 150) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Articles
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl"
            >
              <div className="h-6 w-3/4 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
                <div className="h-4 w-16 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center px-4 py-16">
        <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-6 text-lg">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl transition-all shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Enhanced Header with refined colors */}
      <motion.div
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
          {/* Refined animated bubble icon */}
          <motion.div
            className="relative p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full shadow-2xl"
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
            {/* Enhanced bubble effect */}
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-blue-400/40 to-purple-500/40 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <Sparkles className="w-10 h-10 text-white relative z-10" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Featured Articles
          </h2>

          {/* Enhanced chevron with refined trail */}
          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
            <ChevronRight className="w-6 h-6 text-blue-300 ml-2" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full mx-auto relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Enhanced animated dots on the line */}
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

        <p className="text-white/85 mt-6 text-lg max-w-2xl mx-auto relative z-10">
          Discover our most popular and trending content
        </p>
      </motion.div>

      {articles.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center bg-yellow-900/20 rounded-full p-6 mb-6 backdrop-blur-sm border border-yellow-500/30">
            <AlertTriangle className="w-12 h-12 text-yellow-300" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            No featured articles available
          </h3>
          <p className="text-gray-300 mb-8 text-lg">
            Check back later for featured content
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {articles.slice(0, 6).map((article, index) => {
                const author = getAuthor(article.author);
                const category = getCategoryById(article.category);
                return (
                  <motion.article
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="group relative overflow-hidden"
                  >
                    {/* Enhanced animated background glow */}
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-indigo-500/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />

                    <div className="relative bg-gray-800/60 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      {/* Title */}
                      <Link
                        href={`/articles/${article.slug}`}
                        className="block mb-4"
                      >
                        <h3 className="text-xl font-bold text-white transition-colors line-clamp-2 leading-tight">
                          {article.title}
                        </h3>
                      </Link>

                      {/* Author and Date */}
                      <div className="flex items-center gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          {author?.avatar ? (
                            <img
                              src={author.avatar || "/placeholder.svg"}
                              alt={author.name}
                              className="w-6 h-6 rounded-full object-cover border-2 border-gray-500"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <Link
                            href={`/authors/${
                              author?.username || slugify(author?.name || "")
                            }`}
                            className="font-medium text-gray-200 transition-colors"
                          >
                            {author?.name || `Author ${article.author}`}
                          </Link>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.published_at)}</span>
                        </div>
                      </div>

                      {/* Enhanced Category and Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category && (
                          <Link
                            href={`/categories/${category.slug}`}
                            className="flex items-center gap-1 text-amber-300 bg-amber-900/30 border border-amber-500/40 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                          >
                            <Folder className="w-4 h-4" />
                            <span>{category.name.split(" ")[0]}</span>
                          </Link>
                        )}
                        {article.tags.slice(0, 2).map((tagId) => {
                          const tag = getTagById(tagId);
                          if (!tag) return null;
                          return (
                            <Link
                              key={tag.id}
                              href={`/articles?tag=${tag.slug}`}
                              className="flex items-center gap-1 text-cyan-300 bg-cyan-900/30 border border-cyan-500/40 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                            >
                              <TagIcon className="w-4 h-4" />
                              <span>{tag.name.split(" ")[0]}</span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Content */}
                      <div className="mb-6">
                        <p className="text-gray-300 line-clamp-3 text-sm leading-relaxed">
                          {truncate(stripMarkdown(article.content), 150)}
                        </p>
                      </div>

                      {/* Enhanced Footer */}
                      <div className="pt-4 border-t border-gray-600/50 flex items-center justify-between">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-sm text-blue-300 flex items-center gap-2 font-medium transition-all"
                        >
                          Read more
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
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {calculateReadTime(article.content)} read
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span className="font-medium text-gray-300">
                              {article.read_count?.toLocaleString() || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Enhanced "See All Articles" button with refined colors */}
          <motion.div
            className="text-center mt-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {/* Refined dotted background pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-300/40 rounded-full mx-4"
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
              href="/articles"
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-semibold rounded-2xl transition-all shadow-lg border border-blue-400/50 z-10"
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
              See All Articles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
}
