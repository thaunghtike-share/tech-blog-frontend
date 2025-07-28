"use client";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Folder,
  Sparkles,
  ChevronDown,
  Tag as TagIcon,
  Eye,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

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

interface MinimalBlogListProps {
  searchQuery?: string;
  filterTagSlug?: string | null;
}

const PAGE_SIZE = 6;

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

export function MinimalBlogList({
  searchQuery = "",
  filterTagSlug: propFilterTagSlug,
}: MinimalBlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tagParam = searchParams.get("tag");

  const [filterTagSlug, setFilterTagSlug] = useState<string | null>(() => {
    const tagParam = searchParams.get("tag");
    return propFilterTagSlug ?? tagParam ?? null;
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const topRef = useRef<HTMLHeadingElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  // Fetch articles, authors, tags, categories on searchQuery or filterTagSlug change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = `${API_BASE_URL}/articles/?`;
        const params = new URLSearchParams();

        if (searchQuery.trim()) params.append("search", searchQuery.trim());
        if (filterTagSlug) params.append("tags__slug", filterTagSlug);

        url += params.toString();

        const articlesResponse = await fetch(url);
        const articlesData = await articlesResponse.json();
        setArticles(
          Array.isArray(articlesData)
            ? articlesData
            : articlesData.results || []
        );

        const authorsResponse = await fetch(`${API_BASE_URL}/authors/`);
        const authorsData = await authorsResponse.json();
        setAuthors(
          Array.isArray(authorsData) ? authorsData : authorsData.results || []
        );

        const tagsResponse = await fetch(`${API_BASE_URL}/tags/`);
        const tagsData = await tagsResponse.json();
        setTags(Array.isArray(tagsData) ? tagsData : tagsData.results || []);

        const categoriesResponse = await fetch(`${API_BASE_URL}/categories/`);
        const categoriesData = await categoriesResponse.json();
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
    setCurrentPage(1);
  }, [searchQuery, filterTagSlug]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const tagFromUrl = searchParams.get("tag") ?? null;
    if (tagFromUrl !== filterTagSlug) {
      setFilterTagSlug(tagFromUrl);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Scroll to top on currentPage or filterTagSlug change (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [currentPage, filterTagSlug]);

  // Sync filterTagSlug state to URL query param "tag"
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (filterTagSlug) {
      params.set("tag", filterTagSlug);
    } else {
      params.delete("tag");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  }, [filterTagSlug, router]);

  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getAuthor = (id: number) => authors.find((a) => a.id === id);
  const getAuthorName = (id: number) => getAuthor(id)?.name || `Author ${id}`;
  const getCategoryById = (id: number | null) =>
    categories.find((c) => c.id === id);
  const getTagById = (id: number) => tags.find((t) => t.id === id);
  const getCurrentTagName = () =>
    tags.find((tag) => tag.slug === filterTagSlug)?.name || "this tag";

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
      .replace(/[#_*>![\]$$$$~-]/g, "")
      .trim();

  const truncate = (str: string, max = 150) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2
              ref={topRef}
              className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Latest Articles
            </h2>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg"
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
      {/* Header with Enhanced Tag Filter */}
      <div className="mb-12 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <Link href="/articles">
            <h2
              ref={topRef}
              className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent hover:underline hover:cursor-pointer transition-all"
            >
              Latest Articles
            </h2>
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
          <div
            className="relative w-full max-w-[200px] sm:w-56"
            ref={dropdownRef}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium text-gray-700"
            >
              <div className="flex items-center gap-2">
                <TagIcon className="w-4 h-4 text-gray-500" />
                <span className="truncate">
                  {filterTagSlug
                    ? tags.find((t) => t.slug === filterTagSlug)?.name ||
                      "Filter by tag"
                    : "All Tags"}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-full sm:w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                >
                  <div className="py-1 max-h-60 overflow-y-auto">
                    <button
                      onClick={() => {
                        setFilterTagSlug(null);
                        setIsDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                        !filterTagSlug
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Tags
                    </button>
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => {
                          setFilterTagSlug(tag.slug);
                          setIsDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                          filterTagSlug === tag.slug
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {articles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center bg-yellow-50 rounded-full p-4 mb-4">
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            No articles found
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            {filterTagSlug
              ? `No articles match the tag "${getCurrentTagName()}". Try another tag!`
              : "No articles available. Check back later!"}
          </p>
          {filterTagSlug && (
            <button
              onClick={() => setFilterTagSlug(null)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show all articles
            </button>
          )}
        </motion.div>
      ) : (
        <>
          {/* Articles Grid */}
          <div className="grid gap-8">
            <AnimatePresence mode="wait">
              {paginatedArticles.map((article, index) => {
                const author = getAuthor(article.author);
                const category = getCategoryById(article.category);
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
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category && (
                        <Link
                          href={`/categories/${category.slug}`}
                          className="flex items-center gap-1 text-yellow-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                          <Folder className="w-4 h-4" />
                          {category.name}
                        </Link>
                      )}
                      {article.tags.map((tagId) => {
                        const tag = getTagById(tagId);
                        if (!tag) return null;
                        return (
                          <Link
                            key={tag.id}
                            href={`/articles?tag=${tag.slug}`}
                            className="flex items-center gap-1 text-blue-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                          >
                            <TagIcon className="w-4 h-4" />
                            {tag.name}
                          </Link>
                        );
                      })}
                    </div>

                    <Link
                      href={`/articles/${article.slug}`}
                      className="group/link block"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover/link:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm sm:text-[15px] text-gray-700 mb-4 line-clamp-2 leading-relaxed">
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
                        <Link
                          href={`/authors/${
                            author?.username || slugify(author?.name || "")
                          }`}
                          className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {author?.name || `Author ${article.author}`}
                        </Link>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{calculateReadTime(article.content)} read</span>
                      </div>
                      {/* Added view count */}
                      <div className="flex items-center gap-1 ml-auto">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">
                          {article.read_count?.toLocaleString() || 0} views
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <nav className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xs sm:text-sm text-gray-500">
                Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                {Math.min(currentPage * PAGE_SIZE, articles.length)} of{" "}
                {articles.length} articles
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
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
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm transition-all ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm transition-all ${
                        currentPage === totalPages
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
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
                  className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
}