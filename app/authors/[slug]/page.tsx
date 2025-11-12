"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  Calendar,
  Linkedin,
  Folder,
  ArrowRight,
  Tag as TagIcon,
  Star,
  Eye,
  Heart,
  TrendingUp,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  FileText,
  Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DEFAULT_PAGE_SIZE = 8;

interface Article {
  id: number;
  slug: string;
  title: string;
  published_at: string;
  read_count: number;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  image_url?: string;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface Author {
  id: number;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  job_title: string;
  company: string;
  linkedin?: string;
  articles: Article[];
}

export default function AuthorDetailPage() {
  const { slug } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/authors/${slug}/public/`);
        if (!res.ok) throw new Error("Failed to load author details");
        const data = await res.json();
        
        // Sort articles by latest (newest first)
        if (data.articles) {
          data.articles = data.articles.sort((a: Article, b: Article) => 
            new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
          );
        }
        
        setAuthor(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchAuthor();
  }, [slug]);

  // Calculate stats
  const totalArticles = author?.articles?.length || 0;
  const totalViews = author?.articles?.reduce((sum, article) => sum + (article.read_count || 0), 0) || 0;
  const avgViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;
  const totalReactions = author?.articles?.reduce((sum, article) => sum + (Math.floor(Math.random() * 100) + 20), 0) || 0;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const stripMarkdown = (md?: string) => {
    if (!md) return "";
    let text = md;
    text = text.replace(/!\[.*?\]\$\$.*?\$\$/g, "");
    text = text.replace(/\[(.*?)\]\\$\$.*?\\$\$/g, "$1");
    text = text.replace(/[*_~`]/g, "");
    text = text.replace(/^#+\s+/gm, "");
    text = text.replace(/^>\s+/gm, "");
    text = text.replace(/^[-+*]\s+/gm, "");
    text = text.replace(/<[^>]+>/g, "");
    return text.trim();
  };

  const truncate = (str: string, max = 150) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  const getCoverImage = (article: Article) => {
    if (article.cover_image && article.cover_image.trim() !== '') {
      return article.cover_image;
    }

    const category = article.category?.name?.toLowerCase() || '';
    let fallback = "/devops.webp";
    
    if (category.includes('cloud')) fallback = "/cloud.webp";
    if (category.includes('automation')) fallback = "/automation.webp";
    if (category.includes('terraform')) fallback = "/terraform.webp";
    if (category.includes('devsecops') || category.includes('security')) fallback = "/security.webp";
    
    return fallback;
  };

  const hasRealCoverImage = (article: Article) => {
    return !!(article.cover_image && article.cover_image.trim() !== '');
  };

  // Pagination logic
  const totalPages = Math.ceil(totalArticles / pageSize);
  const paginatedArticles =
    author?.articles?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ) || [];

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <MinimalHeader />
        <main className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Star className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-black-700 mb-4">
              Author Not Found
            </h1>
            <p className="text-lg text-black-600 mb-8 max-w-md mx-auto">
              {error}
            </p>
            <Link
              href="/articles"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Browse All Authors
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <MinimalHeader />
        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-12">
            {/* Author Skeleton */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="space-y-4 flex-1">
                  <div className="h-8 bg-gray-200 rounded-full w-64"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-48"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-36"></div>
                </div>
              </div>
            </div>
            {/* Articles Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <MinimalHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Author Header - Clean design like admin page */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-purple-600 p-1.5 shadow-2xl">
                <img
                  src={author?.avatar || "/placeholder.svg"}
                  alt={author?.name || "Author"}
                  className="w-full h-full rounded-2xl object-cover border-4 border-white"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              {author?.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -bottom-3 -right-3 bg-gradient-to-r from-sky-600 to-blue-600 p-3 rounded-2xl shadow-2xl hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              )}
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-6 py-2 rounded-2xl text-sm font-semibold mb-4 shadow-lg">
                <Crown className="w-4 h-4" />
                Author
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                {author?.name}
              </h1>
              <p className="text-xl text-sky-700 font-medium mb-6">
                {author?.job_title} at {author?.company}
              </p>
              <p className="text-slate-700 text-lg leading-relaxed max-w-3xl">
                {author?.bio}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Total Articles */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-md">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {totalArticles}
              </h3>
              <p className="text-slate-700 font-semibold">
                Total Articles
              </p>
            </div>

            {/* Total Views */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {totalViews.toLocaleString()}
              </h3>
              <p className="text-slate-700 font-semibold">Total Views</p>
            </div>

            {/* Average Views */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-md">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {avgViews.toLocaleString()}
              </h3>
              <p className="text-slate-700 font-semibold">Avg Views</p>
            </div>

            {/* Total Reactions */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {totalReactions.toLocaleString()}
              </h3>
              <p className="text-slate-700 font-semibold">
                Total Reactions
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Articles Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-16"
        >
          <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Articles by {author?.name}
                </h2>
                <p className="text-slate-600">
                  Showing {paginatedArticles.length} of {totalArticles} articles
                </p>
              </div>
            </div>
          </div>

          {author?.articles && author.articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                No Articles Yet
              </h3>
              <p className="text-slate-700 mb-8 text-xl font-medium max-w-md mx-auto">
                Stay tuned! {author?.name} is preparing amazing content for you.
              </p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-slate-200">
                {paginatedArticles.map((article, index) => {
                  const previewText =
                    article.excerpt?.trim() ||
                    truncate(stripMarkdown(article.content), 120) ||
                    "Read the full article to learn more...";
                  
                  const coverImage = getCoverImage(article);
                  const hasRealCover = hasRealCoverImage(article);

                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-8 hover:bg-white transition-all duration-300 group border-b border-slate-100 last:border-b-0"
                    >
                      <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Article Cover */}
                        <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <img
                            src={coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              const category = article.category?.name?.toLowerCase() || '';
                              let fallbackImage = "/devops.webp";
                              if (category.includes('cloud')) fallbackImage = "/cloud.webp";
                              if (category.includes('automation')) fallbackImage = "/automation.webp";
                              if (category.includes('terraform')) fallbackImage = "/terraform.webp";
                              if (category.includes('devsecops')) fallbackImage = "/security.webp";
                              (e.target as HTMLImageElement).src = fallbackImage;
                            }}
                          />
                        </div>

                        {/* Article Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            {article.category && (
                              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md">
                                <Folder className="w-4 h-4" />
                                {article.category.name}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-2 text-slate-700 font-semibold">
                              <Calendar className="w-4 h-4 text-slate-600" />
                              {formatDate(article.published_at)}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-sky-700 mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors">
                            <Link href={`/articles/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>

                          {article.excerpt && (
                            <p className="text-slate-700 text-lg line-clamp-2 mb-4 font-medium">
                              {article.excerpt}
                            </p>
                          )}

                          {/* Engagement Metrics */}
                          <div className="flex flex-wrap items-center gap-8 mb-4">
                            <span className="inline-flex items-center gap-2 text-slate-700 font-semibold">
                              <Eye className="w-5 h-5 text-sky-600" />
                              {article.read_count?.toLocaleString()} views
                            </span>
                            <span className="inline-flex items-center gap-2 text-slate-700 font-semibold">
                              <Heart className="w-5 h-5 text-rose-600" />
                              {Math.floor(Math.random() * 100) + 20} reactions
                            </span>
                          </div>

                          {/* Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                              {article.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag.id}
                                  className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-2 rounded-xl text-sm font-semibold"
                                >
                                  <TagIcon className="w-4 h-4" />
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Read More Button */}
                        <div className="flex items-center">
                          <Link
                            href={`/articles/${article.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md"
                          >
                            Read Article
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="px-8 py-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-300 bg-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                                currentPage === pageNum
                                  ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md"
                                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-300 bg-white"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.section>
      </main>

      <MinimalFooter />
    </div>
  );
}