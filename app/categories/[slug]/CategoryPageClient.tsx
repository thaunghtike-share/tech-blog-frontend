"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Folder, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  category: number | null;
  tags: number[];
  author: number;
  read_count?: number;
}

interface Author {
  id: number;
  slug: string;
  name: string;
  avatar?: string;
}

interface Props {
  slug: string;
}

const API_BASE_URL = "http://20.212.140.239:8000/api";
const DEFAULT_PAGE_SIZE = 5;

export default function CategoryPageClient({ slug }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const router = useRouter();
  const topRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Fetch data on slug change
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch category
        const categoryRes = await fetch(`${API_BASE_URL}/categories/${slug}/`);
        if (!categoryRes.ok)
          throw new Error(
            `Error ${categoryRes.status}: ${categoryRes.statusText}`
          );
        const categoryData = await categoryRes.json();
        setCategory(categoryData);

        // Fetch articles by category slug
        const articlesRes = await fetch(
          `${API_BASE_URL}/articles/?category__slug=${slug}`
        );
        const articlesData = await articlesRes.json();
        const articlesList = Array.isArray(articlesData)
          ? articlesData
          : articlesData.results || [];
        setArticles(articlesList);

        // Fetch authors
        const authorsRes = await fetch(`${API_BASE_URL}/authors/`);
        const authorsData = await authorsRes.json();
        setAuthors(
          Array.isArray(authorsData) ? authorsData : authorsData.results || []
        );

        setLoading(false);
        setCurrentPage(1);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  // Scroll to top on page change (not on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  // Helpers
  const getAuthorName = (id: number) =>
    authors.find((a) => a.id === id)?.name || `Author ${id}`;
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const calculateReadTime = (text: string) =>
    `${Math.ceil((text.split(" ").length || 1) / 200)} min read`;
  const stripMarkdown = (md: string) =>
    md
      .replace(/<[^>]+>/g, "")
      .replace(/[#_*>[\]~`-]/g, "")
      .trim();
  const truncate = (str: string, max = 250) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Tag click handler passed to sidebar - updates URL with tag filter
  const onTagClick = (tagSlug: string | null) => {
    setSelectedTag(tagSlug);
    const params = new URLSearchParams();
    if (tagSlug) {
      params.set("tags__slug", tagSlug);
    }
    const newUrl = `/articles?${params.toString()}`;
    router.push(newUrl);
  };

  const getAuthor = (id: number) => authors.find((a) => a.id === id);

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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                  <div className="space-y-2">
                    <div className="h-7 w-64 bg-gray-200 rounded-full"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
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
          {/* Article list */}
          <div className="lg:col-span-4 space-y-8">
            {/* Articles Section */}
            <div className="bg-white/75 relative rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                      <Folder className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category?.name} Articles
                    </h2>
                  </div>
                  <p className="text-gray-600 mt-1">
                    {articles.length} published article
                    {articles.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {articles.length === 0 ? (
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
                    No articles found
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    No articles available in this category yet. Check back
                    later!
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    <AnimatePresence>
                      {paginatedArticles.map((article, index) => {
                        const previewText = truncate(
                          stripMarkdown(article.content),
                          200
                        );
                        const author = getAuthor(article.author); // get full author object by id

                        return (
                          <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group relative overflow-hidden bg-white rounded-xl border border-gray-100 hover:border-blue-100 transition-all hover:shadow-md"
                          >
                            <div className="p-6">
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
                                  {author?.avatar ? (
                                    <img
                                      src={author.avatar}
                                      alt={author.name}
                                      className="w-5 h-5 rounded-full object-cover border border-gray-200"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                      <User className="w-3 h-3 text-white" />
                                    </div>
                                  )}

                                  {author ? (
                                    <Link
                                      href={`/authors/${author.slug}`}
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                                    >
                                      {author.name}
                                    </Link>
                                  ) : (
                                    <span className="text-gray-700 font-medium">
                                      Unknown Author
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span>
                                    {formatDate(article.published_at)}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span>
                                    {calculateReadTime(article.content)}
                                  </span>
                                </div>

                                {article.read_count && (
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
                                      {article.read_count.toLocaleString()}{" "}
                                      views
                                    </span>
                                  </div>
                                )}
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
            <MinimalSidebar onTagClick={onTagClick} />
          </aside>
        </div>
      </main>
      <MinimalFooter />
    </div>
  );
}
