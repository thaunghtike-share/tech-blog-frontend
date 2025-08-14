"use client";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Folder,
  Sparkles,
  AlertTriangle,
  Tag as TagIcon,
  Eye,
  ChevronLeft,
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
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsScrolling(false), 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

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
      <div className="w-full max-w-full md:max-w-4xl mx-auto px-0 sm:px-4">
        {/* MOBILE LOADING */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[85vw] sm:w-[calc(50%-0.5rem)] bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
            </div>
          ))}
        </div>
        {/* DESKTOP LOADING */}
        <div className="hidden md:block mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Featured Articles
              </h2>
            </div>
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Read All Articles →
            </Link>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>
        <div className="hidden md:grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse p-6 bg-gray-50 rounded-xl shadow"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 shadow-lg">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full md:max-w-4xl mx-auto px-0 sm:px-4">
      {/* MOBILE HEADER (hidden on desktop) */}
      <div className="md:hidden sticky top-0 z-10 bg-white/80 backdrop-blur-sm py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="font-bold text-lg text-gray-900">
              Featured Articles
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-blue-600 text-base font-medium"
          >
            View All
          </Link>
        </div>
      </div>
      {/* DESKTOP HEADER */}
      <div className="hidden md:block mb-12">
        <div className="flex items-center justify-between flex-wrap gap-y-2 mb-4 sm:flex-nowrap sm:items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Articles
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Read All Articles →
          </Link>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
      </div>
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center bg-yellow-50 rounded-full p-4 mb-4">
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            No featured articles available
          </h3>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Check back later for featured content
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Mobile scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-8 overflow-x-auto pb-4 md:grid hide-scrollbar snap-x snap-mandatory"
          >
            <AnimatePresence mode="wait">
              {articles.map((article, index) => {
                const author = getAuthor(article.author);
                const category = getCategoryById(article.category);
                return (
                  <motion.article
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      backgroundColor: { duration: 0 },
                    }}
                    className={`group flex-shrink-0 w-[85vw] sm:w-[calc(50%-0.5rem)] md:w-auto bg-white p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all ${
                      isScrolling ? "" : "hover:-translate-y-1"
                    } snap-center`}
                  >
                    {/* Title */}
                    <Link
                      href={`/articles/${article.slug}`}
                      className="group/link block mb-3"
                    >
                      <h3 className="text-base md:text-xl font-semibold text-gray-900 group-hover/link:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>

                    {/* Author and Date */}
                    <div className="flex items-center gap-3 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        {author?.avatar ? (
                          <img
                            src={author.avatar || "/placeholder.svg"}
                            alt={author.name}
                            className="w-4 h-4 rounded-full object-cover border border-gray-200"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                            <User className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                        <Link
                          href={`/authors/${
                            author?.username || slugify(author?.name || "")
                          }`}
                          className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {author?.name || `Author ${article.author}`}
                        </Link>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                    </div>

                    {/* Category and Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {category && (
                        <Link
                          href={`/categories/${category.slug}`}
                          className="flex items-center gap-1 text-yellow-600 bg-gray-50 border border-gray-200 px-2 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                          <Folder className="w-4 h-4" />
                          <span>{category.name.split(" ")[0]}</span>
                        </Link>
                      )}
                      {article.tags.map((tagId) => {
                        const tag = getTagById(tagId);
                        if (!tag) return null;
                        return (
                          <Link
                            key={tag.id}
                            href={`/articles?tag=${tag.slug}`}
                            className="flex items-center gap-1 text-blue-600 bg-gray-50 border border-gray-200 px-2 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            <TagIcon className="w-4 h-4" />
                            <span>{tag.name.split(" ")[0]}</span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <p className="text-gray-700 line-clamp-2 text-sm md:text-base leading-relaxed">
                        {truncate(stripMarkdown(article.content), 200)}
                      </p>
                    </div>

                    {/* Read more and stats in one line */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="relative">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-sm text-blue-600 flex items-center gap-1 group-hover:gap-2 font-medium transition-all"
                        >
                          Read more{" "}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{calculateReadTime(article.content)} read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">
                            {article.read_count?.toLocaleString() || 0} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Scroll indicators for mobile */}
          <div className="md:hidden">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-2">
              <motion.button
                onClick={scrollRight}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full shadow-lg border border-gray-200"
              >
                <div className="relative">
                  <ChevronRight className="w-5 h-5" />
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                    }}
                    className="absolute -right-1 -top-1 w-2 h-2 bg-blue-600 rounded-full"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Hide scrollbar for mobile scroll */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
