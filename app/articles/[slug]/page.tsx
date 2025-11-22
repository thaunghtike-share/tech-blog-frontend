"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Head from "next/head";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { ArticleContent } from "@/components/article-content";
import { Moon, Sun, Monitor } from "lucide-react";

interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  category: number;
  tags: number[];
  author: number;
  featured: boolean;
  read_count?: number;
  cover_image?: string;
}

interface Author {
  id: number;
  slug: string;
  name: string;
  bio?: string;
  avatar?: string;
  linkedin?: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const SITE_URL = "https://www.learndevopsnow-mm.blog";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function fetchJSON<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch {
    return [];
  }
}

async function fetchAuthor(id: number): Promise<Author | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/authors/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const author: Author = await res.json();
    if (!author.slug) {
      author.slug = `author-${author.id}`;
    }
    return author;
  } catch {
    return null;
  }
}

function extractHeadings(
  markdown: string
): { text: string; level: number; id: string }[] {
  const idCounts: Record<string, number> = {};
  return markdown
    .split("\n")
    .map((line) => {
      const match = line.match(/^(#{1,6})\s+(.*)/);
      if (!match) return null;
      const [, hashes, rawText] = match;
      const level = hashes.length;
      let baseId = rawText
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (idCounts[baseId]) {
        idCounts[baseId] += 1;
        baseId = `${baseId}-${idCounts[baseId]}`;
      } else {
        idCounts[baseId] = 1;
      }
      return { text: rawText, level, id: baseId };
    })
    .filter(Boolean) as { text: string; level: number; id: string }[];
}

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  useEffect(() => {
    setMounted(true);
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "system") {
      setTheme("system");
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const setThemeMode = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    if (slug) {
      fetchArticleData();
    }
  }, [slug]);

  const fetchArticleData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch article
      const articleRes = await fetch(`${API_BASE_URL}/articles/${slug}/`, {
        cache: "no-store",
      });

      if (!articleRes.ok) {
        throw new Error("Article not found");
      }

      const articleData: Article = await articleRes.json();
      setArticle(articleData);

      // Fetch all related data in parallel
      const [
        authorData,
        articlesData,
        tagsData,
        categoriesData,
        authorsData,
      ] = await Promise.all([
        fetchAuthor(articleData.author),
        fetchJSON<Article>(`${API_BASE_URL}/articles/`),
        fetchJSON<Tag>(`${API_BASE_URL}/tags/`),
        fetchJSON<Category>(`${API_BASE_URL}/categories/`),
        fetchJSON<Author>(`${API_BASE_URL}/authors/`),
      ]);

      setAuthor(authorData);
      setAllArticles(articlesData);
      setTags(tagsData);
      setCategories(categoriesData);
      setAuthors(authorsData);

    } catch (err) {
      console.error("Error fetching article data:", err);
      setError("Article not found or failed to load.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg">{error || "Article not found"}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Prepare metadata
  const cleanDescription =
    article.content
      ?.replace(/[#_*>\[\]()`]/g, "")
      .slice(0, 150)
      .trim() || "Learn DevOps Now - Myanmar";

  let image = article.cover_image || "/og-image.jpg";
  if (image && !image.startsWith("http")) {
    image = `https://www.learndevopsnow-mm.blog${
      image.startsWith("/") ? "" : "/"
    }${image}`;
  }

  const headings = extractHeadings(article.content);
  const sorted = allArticles.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  const currentIndex = sorted.findIndex((a) => a.id === article.id);
  const prevArticle = sorted[currentIndex + 1] || null;
  const nextArticle = sorted[currentIndex - 1] || null;
  const recentArticles = sorted.filter((a) => a.id !== article.id).slice(0, 5);
  const sameCategoryArticles = sorted
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 5);

  const publishDate = new Date(article.published_at).toLocaleDateString();
  const categoryName =
    categories.find((c) => c.id === article.category)?.name || "General";
  const tagNames = article.tags
    .map((id) => tags.find((t) => t.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <>
      <Head>
        <title>{`${article.title} | Learn DevOps Now - Myanmar`}</title>
        <meta name="description" content={cleanDescription} />

        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={cleanDescription} />
        <meta property="og:image" content={image} />
        <meta
          property="og:url"
          content={`https://www.learndevopsnow-mm.blog/articles/${slug}`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={cleanDescription} />
        <meta name="twitter:image" content={image} />
      </Head>

      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] relative overflow-x-hidden transition-colors duration-300">
        {/* Compact Theme Toggle - Bottom Right Corner */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex flex-col items-center space-y-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            {/* Dark Button */}
            <button
              onClick={() => setThemeMode("dark")}
              className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                theme === "dark" 
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/50" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              title="Dark Theme"
            >
              <Moon className="h-5 w-5" />
            </button>
                        
            {/* Light Button */}
            <button
              onClick={() => setThemeMode("light")}
              className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                theme === "light" 
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/50" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              title="Light Theme"
            >
              <Sun className="h-5 w-5" />
            </button>
          </div>
        </div>

        <MinimalHeader />
        
        <div className="md:-mt-1 -mt-19">
          <ArticleContent
            article={article}
            author={author}
            headings={headings}
            prevArticle={prevArticle}
            nextArticle={nextArticle}
            recentArticles={recentArticles}
            sameCategoryArticles={sameCategoryArticles}
            publishDate={publishDate}
            categoryName={categoryName}
            tagNames={tagNames}
            authors={authors}
            categories={categories}
            readCount={article.read_count || 0}
          />
        </div>
        
        <div className="md:-mt-2 -mt-5">
          <MinimalFooter />
        </div>
      </div>
    </>
  );
}
