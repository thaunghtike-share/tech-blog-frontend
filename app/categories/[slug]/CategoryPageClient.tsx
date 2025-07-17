"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Folder, Calendar, Clock, User } from "lucide-react";
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
}

interface Author {
  id: number;
  name: string;
  avatar?: string;
}

interface Props {
  slug: string;
}

const API_BASE_URL = "http://192.168.1.131:8000/api";
const PAGE_SIZE = 5;

export default function CategoryPageClient({ slug }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Pagination logic
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
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
      {/* Messenger Chat Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on Messenger"
        className="fixed top-[70%] right-1 z-50 flex items-center gap-4 bg-gradient-to-r from-white-600 via-purple-200 to-blue-400 shadow-lg px-3 py-0 rounded-full cursor-pointer transition-transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 240 240"
          fill="none"
          className="w-14 h-14 rounded-full"
        >
          <defs>
            <linearGradient
              id="messengerGradient"
              x1="0"
              y1="0"
              x2="240"
              y2="240"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E1306C" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="120" fill="url(#messengerGradient)" />
          <path
            fill="#fff"
            d="M158.8 80.2l-37.8 44.3-19.2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z"
          />
        </svg>
        <span className="font-semibold text-white select-none text-lg whitespace-nowrap">
          Chat?
        </span>
      </a>
      <MinimalHeader />
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Article list */}
          <div className="lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Folder className="w-6 h-6 text-white" />
                </div>
                <h1
                  ref={topRef}
                  className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                >
                  {category ? category.name : "Loading..."}
                  <span className="text-sm text-gray-500 font-medium ml-2">
                    ({articles.length} article{articles.length !== 1 && "s"})
                  </span>
                </h1>
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4"></div>
              <p className="text-gray-600">
                Explore our collection of articles in this category.
              </p>
            </div>
            {loading ? (
              <div className="grid gap-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg"
                  ></div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 shadow-lg text-center">
                <p className="text-red-600 mb-4">Error: {error}</p>
                <button
                  onClick={() => router.refresh()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : paginatedArticles.length === 0 ? (
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
                  No articles found
                </h3>
                <p className="text-gray-600 mb-6">
                  No articles available. Check back later!
                </p>
              </div>
            ) : (
              <div className="grid gap-8">
                <AnimatePresence mode="wait">
                  {paginatedArticles.map((article, index) => {
                    const authorName = getAuthorName(article.author);
                    return (
                      <motion.article
                        key={article.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                      >
                        <div className="flex justify-between flex-wrap mb-4 gap-2">
                          {category && (
                            <Link
                              href={`/categories/${category.slug}`}
                              className="flex items-center gap-1 text-yellow-600 bg-gradient-to-r from-gray-50 to-black-50 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100 hover:text-blue-600"
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
                          <div className="flex items-center gap-2">
                            {getAuthor(article.author)?.avatar ? (
                              <img
                                src={
                                  getAuthor(article.author)?.avatar ||
                                  "/placeholder.svg"
                                }
                                alt={
                                  getAuthor(article.author)?.name || "Author"
                                }
                                className="w-5 h-5 rounded-full object-cover border border-gray-200"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                <User className="w-3 h-3 text-white" />
                              </div>
                            )}
                            <span className="font-medium">{authorName}</span>
                          </div>
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
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
            {/* Pagination */}
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