"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import { Calendar, Clock, User, Linkedin, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = "http://192.168.1.131:8000/api";
const PAGE_SIZE = 5;

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

  // Improved stripMarkdown function (optional, may not be needed)
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
  const totalArticles = author?.articles.length || 0;
  const totalPages = Math.ceil(totalArticles / PAGE_SIZE);
  const paginatedArticles =
    author?.articles.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    ) || [];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MinimalHeader />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 shadow-lg text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MinimalHeader />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
            <div className="lg:col-span-4 bg-white rounded-xl p-6 shadow-sm border border-white/50">
              <div className="animate-pulse space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="h-8 w-48 bg-gray-200 rounded mt-6"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
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
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <MinimalHeader />
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Author content */}
          <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="relative">
                <img
                  src={author?.avatar || "/placeholder.svg"}
                  alt={author?.name || "Author"}
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-white/80"
                  loading="lazy"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-1.5 shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {author?.name}
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  {author?.job_title} at {author?.company}
                </p>
                {author?.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 text-sm hover:underline mt-3"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"></div>

            <p className="text-gray-700 leading-relaxed mb-10">{author?.bio}</p>

            <div className="mb-8">
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                Articles by {author?.name}
              </h2>
              <p className="text-gray-600 mb-6">
                {author?.articles.length} published article
                {author?.articles.length !== 1 ? "s" : ""}
              </p>
            </div>

            {author?.articles.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center bg-yellow-50 rounded-full p-4 mb-4">
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
                <p className="text-gray-600">
                  Check back later for articles from this author.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6">
                  <AnimatePresence>
                    {paginatedArticles.map((article, index) => {
                      // Use excerpt from backend, fallback to stripped/truncated content
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
                          className="group bg-white will-change-transform p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                          <div className="flex justify-between flex-wrap mb-4 gap-2">
                            {article.category && (
                              <Link
                                href={`/categories/${article.category.slug}`}
                                className="flex items-center gap-1 text-blue-600 bg-gradient-to-r from-gray-50 to-blue-50 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100 hover:text-blue-700"
                              >
                                <Folder className="w-4 h-4" />
                                {article.category.name}
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
                            {previewText && (
                              <p className="text-gray-700 mb-4 line-clamp-2 text-[15px] leading-relaxed">
                                {previewText}
                              </p>
                            )}
                            <div className="text-sm text-blue-600 flex items-center gap-1 group-hover/link:gap-2 font-medium transition-all">
                              Read more{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                              >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                              </svg>
                            </div>
                          </Link>
                          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{formatDate(article.published_at)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>
                                {calculateReadTime(article.content)} read
                              </span>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <span className="font-medium">
                                {article.read_count} views
                              </span>
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-10 flex justify-center items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-full border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          currentPage === i + 1
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-full border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            )}
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
