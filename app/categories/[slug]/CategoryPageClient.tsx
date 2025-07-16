"use client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Article {
  id: number;
  slug: string; // <-- Added slug field here
  title: string;
  content: string;
  published_at: string;
}

interface Props {
  slug: string;
}

const API_BASE_URL = "http://172.20.10.6:8000/api";
const PAGE_SIZE = 6;

export default function CategoryPageClient({ slug }: Props) {
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
      try {
        const res = await fetch(`${API_BASE_URL}/categories/${slug}/`);
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
      try {
        const res = await fetch(
          `${API_BASE_URL}/articles/?category__slug=${slug}`
        );
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
    setCurrentPage(1);
  }, [slug]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="min-h-screen bg-gray-50">
      <MinimalHeader />
      <div className="max-w-7xl mx-auto px-4 py-8" ref={topRef}>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {category.name}
        </h1>
        <div className="w-20 h-1 bg-blue-500 mb-6"></div>
        {loadingArticles ? (
          <p>Loading articles...</p>
        ) : errorArticles ? (
          <p className="text-red-500">Error: {errorArticles}</p>
        ) : paginatedArticles.length === 0 ? (
          <p className="text-gray-500">No articles found in this category.</p>
        ) : (
          paginatedArticles.map((article) => (
            <Card
              key={article.id}
              className="mb-4 border border-gray-100 shadow-sm"
            >
              <CardContent className="p-5">
                {/* Use slug here */}
                <Link href={`/articles/${article.slug}`}>
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-700 mt-2">
                  {truncate(stripMarkdown(article.content), 200)}
                </p>
                <div className="flex items-center gap-3 text-sm mt-3 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(article.published_at).toLocaleDateString()}
                  </span>
                  <Clock className="w-4 h-4 ml-4" />
                  <span>{calculateReadTime(article.content)}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        {totalPages > 1 && (
          <div className="mt-6 flex gap-2 justify-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  i + 1 === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <MinimalFooter />
    </div>
  );
}
