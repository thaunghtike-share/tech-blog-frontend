"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import {
  Calendar,
  Clock,
  User,
  Linkedin,
  Folder,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DEFAULT_PAGE_SIZE = 5;

interface Article {
  id: number;
  slug: string;
  title: string;
  published_at: string;
  read_count: number;
  excerpt?: string;
  content?: string;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
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
        const res = await fetch(`${API_BASE_URL}/authors/${slug}/details`);
        if (!res.ok) throw new Error("Failed to load author details");
        const data = await res.json();
        setAuthor(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchAuthor();
  }, [slug]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const calculateReadTime = (text?: string) =>
    `${Math.ceil(((text ?? "").split(" ").length || 1) / 200)} min read`;

  const stripMarkdown = (md?: string) => {
    if (!md) return "";
    let text = md;
    text = text.replace(/!\[.*?\]\(.*?\)/g, "");
    text = text.replace(/\[(.*?)\]\(.*?\)/g, "$1");
    text = text.replace(/[*_~`]/g, "");
    text = text.replace(/^#+\s+/gm, "");
    text = text.replace(/^>\s+/gm, "");
    text = text.replace(/^[-+*]\s+/gm, "");
    text = text.replace(/<[^>]+>/g, "");
    return text.trim();
  };

  const truncate = (str: string, max = 250) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  // Pagination logic
  const totalArticles = author?.articles?.length || 0;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const paginatedArticles =
    author?.articles?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ) || [];

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing size
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <MinimalHeader />
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-2xl mx-auto">
            <div className="bg-red-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <MinimalHeader />
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-4 bg-white rounded-2xl p-8 shadow-sm">
              <div className="animate-pulse space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-28 h-28 rounded-full bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="h-7 w-64 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-48 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-36 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-4/6"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-3/6"></div>
                </div>
                <div className="h-10 w-56 bg-gray-200 rounded-full mt-8"></div>
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-100 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
            <aside className="lg:col-span-2">
              <MinimalSidebar />
            </aside>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm36 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      <MinimalHeader />
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Author content */}
          <div className="lg:col-span-4 space-y-8">
            {/* Author Profile Card */}
            <div className="bg-white/75 rounded-2xl p-8 shadow-lg border border-gray-100 relative">
              <div className="absolute inset-0 opacity-30 -z-0"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="relative shrink-0">
                    <img
                      src={author?.avatar || "/placeholder.svg"}
                      alt={author?.name || "Author"}
                      className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-purple-300"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 shadow-lg">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {author?.name}
                    </h1>
                    <p className="text-sm text-gray-700 font-medium mb-3">
                      {author?.job_title} at {author?.company}
                    </p>
                    {author?.linkedin && (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors px-4 py-2 bg-blue-50 rounded-full text-sm font-medium"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    About
                  </h2>
                  <p className="text-gray-700 leading-relaxed">{author?.bio}</p>
                </div>
              </div>
            </div>

            {/* Articles Section */}
            <div className="bg-white/75 rounded-2xl p-8 shadow-lg border border-gray-100 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                      <Folder className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      All Articles
                    </h2>
                  </div>
                  <p className="text-gray-600 mt-1">
                    {author?.articles?.length || 0} published article
                    {author?.articles?.length !== 1 ? "s" : ""} by{" "}
                    {author?.name}
                  </p>
                </div>
              </div>

              {author?.articles && author.articles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center bg-yellow-50 rounded-full p-5 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-10 h-10 text-yellow-600"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No articles published yet
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    This author hasn't published any articles yet. Check back
                    later for updates.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <AnimatePresence>
                      {paginatedArticles.map((article, index) => {
                        const previewText =
                          article.excerpt?.trim() ||
                          truncate(stripMarkdown(article.content), 200) ||
                          "No preview available.";

                        return (
                          <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group relative overflow-hidden bg-white rounded-xl border border-gray-200 hover:border-blue-100 transition-all hover:shadow-md"
                          >
                            <div className="p-6">
                              <div className="flex justify-between flex-wrap mb-4 gap-2"></div>
                              <Link
                                href={`/articles/${article.slug}`}
                                className="group/link block"
                              >
                                <h3 className="text-large font-medium text-gray-900 mb-3 group-hover/link:text-blue-600 transition-colors">
                                  {article.title}
                                </h3>
                                {previewText && (
                                  <p className="text-gray-700 mb-4 line-clamp-2 text-[15px] leading-relaxed">
                                    {previewText}
                                  </p>
                                )}
                                <div className="inline-flex items-center text-blue-600 group-hover/link:text-blue-800 text-sm transition-colors">
                                  <span>Read more</span>
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                </div>
                              </Link>
                              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-5 h-5 text-gray-500" />
                                  <span>
                                    {formatDate(article.published_at)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-5 h-5 text-gray-500" />
                                  <span>
                                    {calculateReadTime(article.content)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 ml-auto text-gray-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M1.5 12s3.75-7.5 10.5-7.5S22.5 12 22.5 12s-3.75 7.5-10.5 7.5S1.5 12 1.5 12z"
                                    />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  <span className="font-medium">
                                    {article.read_count.toLocaleString()} views
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="text-sm text-gray-500">
                        Showing {(currentPage - 1) * pageSize + 1} to{" "}
                        {Math.min(currentPage * pageSize, totalArticles)} of{" "}
                        {totalArticles} articles
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm flex items-center gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          Previous
                        </button>
                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: Math.min(5, totalPages) },
                            (_, i) => {
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
                                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm transition-all ${
                                    currentPage === pageNum
                                      ? "bg-blue-600 text-white shadow-md"
                                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            }
                          )}
                          {totalPages > 5 && currentPage < totalPages - 2 && (
                            <span className="px-2 text-gray-500">...</span>
                          )}
                          {totalPages > 5 && currentPage < totalPages - 2 && (
                            <button
                              onClick={() => setCurrentPage(totalPages)}
                              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm transition-all ${
                                currentPage === totalPages
                                  ? "bg-blue-600 text-white shadow-md"
                                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {totalPages}
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm flex items-center gap-1"
                        >
                          Next
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2">
            <MinimalSidebar />
          </aside>
        </div>
      </main>
      <MinimalFooter />
    </div>
  );
}
