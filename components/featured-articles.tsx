"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Folder,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  category: number | null;
  tags: number[];
  author: number;
  featured: boolean;
}

interface Author {
  id: number;
  name: string;
  avatar?: string;
  username?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export function FeaturedArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const API_BASE_URL = "http://192.168.1.131:8000/api";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [articlesResponse, authorsResponse, categoriesResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/articles/?featured=true`),
            fetch(`${API_BASE_URL}/authors/`),
            fetch(`${API_BASE_URL}/categories/`),
          ]);

        const [articlesData, authorsData, categoriesData] = await Promise.all([
          articlesResponse.json(),
          authorsResponse.json(),
          categoriesResponse.json(),
        ]);

        setArticles(
          Array.isArray(articlesData)
            ? articlesData
            : articlesData.results || []
        );
        setAuthors(
          Array.isArray(authorsData) ? authorsData : authorsData.results || []
        );
        setCategories(
          Array.isArray(categoriesData)
            ? categoriesData
            : categoriesData.results || []
        );
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
  const getAuthorName = (id: number) => getAuthor(id)?.name || `Author ${id}`;
  const getCategoryById = (id: number | null) =>
    categories.find((c) => c.id === id);

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
      .replace(/[#_*>!\[\]$$$$~\-]/g, "")
      .trim();

  const truncate = (str: string, max = 150) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
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
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
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
      <div className="max-w-4xl mx-auto text-center">
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
    <div className="w-full max-w-full md:max-w-4xl mx-auto px-2 sm:px-4">
      <div className="mb-12">
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
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No featured articles available
          </h3>
          <p className="text-gray-600 mb-6">
            Check back later for featured content
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
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
                    backgroundColor: { duration: 0 }, // Disable background color animation
                  }}
                  className={`group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all ${
                    isScrolling ? "" : "hover:-translate-y-1"
                  }`}
                >
                  <div className="flex justify-between flex-wrap mb-4 gap-2">
                    {category && (
                      <Link
                        href={`/categories/${category.slug}`}
                        className="flex items-center gap-1 text-yellow-600 bg-gradient-to-r from-gray-50 to-black-50 border border-blue-100 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        <Folder className="w-4 h-4" />
                        {category.name}
                      </Link>
                    )}
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="group/link block"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover/link:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-2 text-[15px] leading-relaxed">
                      {truncate(stripMarkdown(article.content), 200)}
                    </p>
                    <div className="text-sm text-blue-600 flex items-center gap-1 group-hover/link:gap-2 font-medium transition-all">
                      Read more{" "}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      {author?.avatar ? (
                        <img
                          src={author.avatar || "/placeholder.svg"}
                          alt={author.name}
                          className="w-5 h-5 rounded-full object-cover border border-gray-200"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <span className="font-medium">
                        {getAuthorName(article.author)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(article.published_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{calculateReadTime(article.content)} read</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}