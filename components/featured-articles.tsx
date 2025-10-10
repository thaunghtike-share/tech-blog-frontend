"use client";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
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
            <div className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Featured Articles
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
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
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-6 text-lg">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Clean Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            className="p-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl shadow-sm"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Featured Articles
          </h2>

          <motion.div
            className="flex items-center gap-1"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
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
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </motion.div>
        </div>

        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Discover our most popular and trending content
        </p>
      </motion.div>

      {articles.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center bg-yellow-50 rounded-full p-6 mb-6 border border-yellow-200">
            <AlertTriangle className="w-12 h-12 text-yellow-600" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            No featured articles available
          </h3>
          <p className="text-gray-700 mb-8 text-lg">
            Check back later for featured content
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {articles.slice(0, 6).map((article, index) => {
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
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    className="group"
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-400 h-full flex flex-col">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="block mb-4 flex-grow"
                      >
                        <h3 className="text-xl font-bold text-gray-900 transition-colors line-clamp-2 leading-tight group-hover:text-blue-600 mb-4">
                          {article.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          {author?.avatar ? (
                            <img
                              src={author.avatar || "/placeholder.svg"}
                              alt={author.name}
                              className="w-6 h-6 rounded-full object-cover border border-gray-300"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <span className="font-medium text-gray-800">
                            {author?.name || `Author ${article.author}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.published_at)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {category && (
                          <Link
                            href={`/categories/${category.slug}`}
                            className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 border-2 border-blue-300 px-3 py-1 rounded-lg text-sm font-medium transition-colors hover:bg-blue-100"
                          >
                            <Folder className="w-4 h-4" />
                            <span>{category.name}</span>
                          </Link>
                        )}
                        {article.tags.slice(0, 2).map((tagId) => {
                          const tag = getTagById(tagId);
                          if (!tag) return null;
                          return (
                            <Link
                              key={tag.id}
                              href={`/articles?tag=${tag.slug}`}
                              className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 border-2 border-purple-300 px-3 py-1 rounded-lg text-sm font-medium transition-colors hover:bg-purple-100"
                            >
                              <TagIcon className="w-4 h-4" />
                              <span>{tag.name}</span>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="mb-6 flex-grow">
                        <p className="text-gray-700 line-clamp-3 text-base leading-relaxed">
                          {truncate(stripMarkdown(article.content), 200)}
                        </p>
                      </div>

                      <div className="pt-4 border-t-2 border-gray-200 flex items-center justify-between">
                        <Link
                          href={`/articles/${article.slug}`}
                          className="text-sm text-blue-600 flex items-center gap-2 font-medium transition-all hover:text-blue-700"
                        >
                          Read more
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{calculateReadTime(article.content)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>
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
        </div>
      )}
    </div>
  );
}
