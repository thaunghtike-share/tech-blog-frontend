"use client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  published_at: string;
}

interface Props {
  id: string;
}

const API_BASE_URL = "http://172.20.10.6:8000/api";
const PAGE_SIZE = 6;

export default function CategoryPageClient({ id }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [errorArticles, setErrorArticles] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategory() {
      setLoadingCategory(true);
      setErrorCategory(null);
      try {
        const res = await fetch(`${API_BASE_URL}/categories/${id}/`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        setErrorCategory(
          err instanceof Error ? err.message : "Failed to fetch category"
        );
      } finally {
        setLoadingCategory(false);
      }
    }

    async function fetchArticles() {
      setLoadingArticles(true);
      setErrorArticles(null);
      try {
        const res = await fetch(`${API_BASE_URL}/articles/?category=${id}`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setArticles(data.results || data);
      } catch (err) {
        setErrorArticles(
          err instanceof Error ? err.message : "Failed to fetch articles"
        );
      } finally {
        setLoadingArticles(false);
      }
    }

    fetchCategory();
    fetchArticles();
    setCurrentPage(1); // reset page on category change
  }, [id]);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const stripMarkdown = (md: string) =>
    md
      .replace(/<[^>]+>/g, "")
      .replace(/[#_*>![\]$$$$~-]/g, "")
      .trim();

  const truncate = (str: string, max = 150) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  const calculateReadTime = (text: string) =>
    `${Math.ceil((text.split(" ").length || 1) / 200)} min read`;

  // Pagination logic
  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loadingCategory)
    return <div className="p-8 text-center">Loading category...</div>;
  if (errorCategory)
    return (
      <div className="p-8 text-center text-red-500">Error: {errorCategory}</div>
    );
  if (!category)
    return <div className="p-8 text-center">Category not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden flex flex-col">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      {/* Messenger Support Floating Button */}
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
      <div
        className="max-w-7xl mx-auto px-4 py-8 w-full relative z-10"
        ref={topRef}
      >
        {/* Category Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {category.name}
          </h1>
          <div className="w-16 h-1 bg-blue-500 rounded-full mb-3"></div>
          <p className="text-gray-600 text-base">
            Explore the latest articles and tutorials in{" "}
            {category.name.toLowerCase()}.
          </p>
        </div>
        {/* Main content & sidebar aligned together */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Articles */}
          <main className="w-full md:flex-1 space-y-6">
            {loadingArticles && <p>Loading articles...</p>}
            {errorArticles && (
              <p className="text-red-500">Error: {errorArticles}</p>
            )}
            {!loadingArticles && articles.length === 0 && (
              <p className="text-gray-500">
                No articles found in this category.
              </p>
            )}
            {paginatedArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-lg overflow-hidden"
              >
                <CardContent className="p-5 hover:bg-gray-50 transition-colors duration-200">
                  <Link
                    href={`/articles/${article.id}`}
                    className="group block"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {truncate(stripMarkdown(article.content), 200)}
                    </p>
                    <div className="text-sm text-blue-600 flex items-center gap-1 group-hover:underline">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="text-gray-400 w-3 h-3" />
                      <span>
                        {new Date(article.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="text-gray-400 w-3 h-3" />
                      <span>{calculateReadTime(article.content)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Pagination buttons */}
            {totalPages > 1 && (
              <nav className="mt-8 flex justify-center items-center gap-2">
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
          </main>
        </div>
      </div>
      <MinimalFooter />
    </div>
  );
}
