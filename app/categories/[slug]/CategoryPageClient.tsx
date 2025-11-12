"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  ArrowRight,
  Eye,
  Star,
  TrendingUp,
  Code,
  Cloud,
  Shield,
  Container,
  Wrench,
  ToolCase,
  Folder,
  ChevronLeft,
  ChevronRight,
  Users,
  Heart,
} from "lucide-react";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: number;
  name: string;
  slug: string;
  post_count?: number;
}

interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  published_at: string;
  category: number | null;
  tags: number[];
  author: number;
  read_count?: number;
  cover_image?: string;
}

interface Author {
  id: number;
  slug: string;
  name: string;
  avatar?: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  slug: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DEFAULT_PAGE_SIZE = 12;

export default function CategoryPageClient({ slug }: Props) {
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const router = useRouter();
  const topRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Get category icon based on category name
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    
    if (name.includes('kubernetes')) {
      return Container;
    } else if (name.includes('cicd') || name.includes('ci/cd')) {
      return Container;
    } else if (name.includes('python')) {
      return Code;
    } else if (name.includes('terraform')) {
      return Code;
    } else if (name.includes('cloud')) {
      return Cloud;
    } else if (name.includes('devops')) {
      return ToolCase;
    } else if (name.includes('devsecops')) {
      return Shield;
    } else {
      return Wrench;
    }
  };

  // Get category gradient colors
  const getCategoryGradient = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    
    if (name.includes('kubernetes')) {
      return "from-blue-500 to-cyan-600";
    } else if (name.includes('cicd') || name.includes('ci/cd')) {
      return "from-green-500 to-emerald-600";
    } else if (name.includes('python')) {
      return "from-yellow-500 to-amber-600";
    } else if (name.includes('terraform')) {
      return "from-purple-500 to-pink-600";
    } else if (name.includes('cloud')) {
      return "from-sky-500 to-blue-600";
    } else if (name.includes('devops')) {
      return "from-orange-500 to-red-600";
    } else if (name.includes('devsecops')) {
      return "from-red-500 to-rose-600";
    } else {
      return "from-gray-500 to-gray-600";
    }
  };

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
        const authorsList = Array.isArray(authorsData) ? authorsData : authorsData.results || [];
        setAuthors(authorsList);

        // Fetch tags
        const tagsRes = await fetch(`${API_BASE_URL}/tags/`);
        const tagsData = await tagsRes.json();
        setTags(Array.isArray(tagsData) ? tagsData : tagsData.results || []);

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
  const getAuthor = (id: number) => authors.find((a) => a.id === id);
  const getTagById = (id: number) => tags.find((t) => t.id === id);
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const stripMarkdown = (md: string) =>
    md
      .replace(/<[^>]+>/g, "")
      .replace(/[#_*>[\]~`-]/g, "")
      .trim();
  const truncate = (str: string, max = 150) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  // Get cover image URL
  const getCoverImage = (article: Article) => {
    if (article.cover_image && article.cover_image.trim() !== '') {
      return article.cover_image;
    }

    // Fallback based on category
    const categoryName = category?.name?.toLowerCase() || '';
    if (categoryName.includes('kubernetes')) {
      return "/kubernetes.webp";
    } else if (categoryName.includes('cicd') || categoryName.includes('ci/cd')) {
      return "/cicd.webp";
    } else if (categoryName.includes('python')) {
      return "/python.webp";
    } else if (categoryName.includes('terraform')) {
      return "/terraform.webp";
    } else if (categoryName.includes('cloud')) {
      return "/cloud.webp";
    } else if (categoryName.includes('devops')) {
      return "/devops.webp";
    } else if (categoryName.includes('devsecops')) {
      return "/security.webp";
    }
    
    return "/devops.webp";
  };

  // Check if article has a real cover image
  const hasRealCoverImage = (article: Article) => {
    return !!(article.cover_image && article.cover_image.trim() !== '');
  };

  // Calculate stats
  const totalArticles = articles.length;
  const totalViews = articles.reduce((sum, article) => sum + (article.read_count || 0), 0);
  const avgViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;
  
  // Get unique authors in this category
  const uniqueAuthors = new Set(articles.map(article => article.author));
  const totalAuthors = uniqueAuthors.size;

  // Calculate total reactions (random for now)
  const totalReactions = articles.reduce((sum, article) => sum + (Math.floor(Math.random() * 100) + 20), 0);

  // Pagination logic
  const totalPages = Math.ceil(totalArticles / pageSize);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <MinimalHeader />
        <main className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-black-700 mb-4">
              Category Not Found
            </h1>
            <p className="text-lg text-black-600 mb-8 max-w-md mx-auto">
              {error}
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Browse All Categories
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
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-12">
            {/* Category Skeleton */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-slate-200 rounded-2xl"></div>
                <div className="space-y-4 flex-1">
                  <div className="h-8 bg-slate-200 rounded-full w-64"></div>
                  <div className="h-6 bg-slate-200 rounded-full w-48"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-36"></div>
                </div>
              </div>
            </div>
            {/* Articles Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="h-48 bg-slate-200 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
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

  const CategoryIcon = category ? getCategoryIcon(category.name) : Wrench;
  const categoryGradient = category ? getCategoryGradient(category.name) : "from-slate-500 to-slate-600";

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <MinimalHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-purple-600 p-1.5 shadow-2xl">
                <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/20">
                  <CategoryIcon className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-6 py-2 rounded-2xl text-sm font-semibold mb-4 shadow-lg">
                <Folder className="w-4 h-4" />
                Category
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black-700 mb-3">
                {category?.name} Category
              </h1>
              <p className="text-xl text-sky-700 font-medium mb-6">
                {articles.length} published articles
              </p>
              <p className="text-black-700 text-lg leading-relaxed max-w-3xl">
                Explore all articles in the {category?.name} category. 
                Stay updated with the latest insights, tutorials, and best practices.
              </p>
            </div>
          </div>

          {/* Stats Grid - Like Admin Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
          >
            {/* Total Articles */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:border-sky-200">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-black-700 mb-2">
                {totalArticles}
              </h3>
              <p className="text-black-700 font-semibold text-lg">
                Total Articles
              </p>
            </div>

            {/* Total Views */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:border-green-200">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Eye className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-black-700 mb-2">
                {totalViews.toLocaleString()}
              </h3>
              <p className="text-black-700 font-semibold text-lg">Total Views</p>
            </div>

            {/* Total Authors */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:border-purple-200">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-black-700 mb-2">
                {totalAuthors}
              </h3>
              <p className="text-black-700 font-semibold text-lg">Total Authors</p>
            </div>

            {/* Total Reactions */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:border-rose-200">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Heart className="w-7 h-7 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-black-700 mb-2">
                {totalReactions.toLocaleString()}
              </h3>
              <p className="text-black-700 font-semibold text-lg">
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
                <h2 className="text-3xl font-bold text-black-700 mb-2">
                  {category?.name} Articles
                </h2>
                <p className="text-black-700">
                  Showing {paginatedArticles.length} of {totalArticles} articles
                </p>
              </div>
            </div>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black-700 mb-4">
                No Articles Yet
              </h3>
              <p className="text-black-700 mb-8 text-xl font-medium max-w-md mx-auto">
                Stay tuned! We're preparing amazing {category?.name} content for you.
              </p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-slate-200">
                {paginatedArticles.map((article, index) => {
                  const previewText = article.excerpt?.trim() || truncate(
                    stripMarkdown(article.content),
                    120
                  );
                  const author = getAuthor(article.author);
                  const coverImage = getCoverImage(article);
                  const hasRealCover = hasRealCoverImage(article);
                  // Random reactions for now
                  const articleReactions = Math.floor(Math.random() * 100) + 20;
                  
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
                              console.log(`Image failed to load: ${coverImage}`);
                              // Fallback to category-based image
                              const categoryName = category?.name?.toLowerCase() || '';
                              let fallbackImage = "/devops.webp";
                              if (categoryName.includes('kubernetes')) fallbackImage = "/kubernetes.webp";
                              if (categoryName.includes('cicd') || categoryName.includes('ci/cd')) fallbackImage = "/cicd.webp";
                              if (categoryName.includes('python')) fallbackImage = "/python.webp";
                              if (categoryName.includes('terraform')) fallbackImage = "/terraform.webp";
                              if (categoryName.includes('cloud')) fallbackImage = "/cloud.webp";
                              if (categoryName.includes('devops')) fallbackImage = "/devops.webp";
                              if (categoryName.includes('devsecops')) fallbackImage = "/security.webp";
                              (e.target as HTMLImageElement).src = fallbackImage;
                            }}
                          />
                        </div>

                        {/* Article Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            {author && (
                              <div className="flex items-center gap-2 text-black-700 px-4 py-2 rounded-xl text-sm font-semibold">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 p-0.5">
                                  <img
                                    src={author.avatar || "/placeholder.svg"}
                                    alt={author.name}
                                    className="w-full h-full rounded-full object-cover border border-white"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                </div>
                                <Link 
                                  href={`/authors/${author.slug}`}
                                  className="hover:text-sky-600 transition-colors"
                                >
                                  {author.name}
                                </Link>
                              </div>
                            )}
                          </div>

                          <h3 className="text-2xl font-bold text-sky-700 mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors">
                            <Link href={`/articles/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>

                          <p className="text-black-700 text-lg line-clamp-2 mb-4 font-medium">
                            {previewText}
                          </p>

                          {/* Engagement Metrics - Date, Views, Reactions */}
                          <div className="flex flex-wrap items-center gap-8 mb-4">
                            <span className="inline-flex items-center gap-2 text-black-700 font-semibold">
                              <Calendar className="w-5 h-5 text-black-600" />
                              {formatDate(article.published_at)}
                            </span>
                            <span className="inline-flex items-center gap-2 text-black-700 font-semibold">
                              <Eye className="w-5 h-5 text-sky-600" />
                              {article.read_count?.toLocaleString() || '0'} views
                            </span>
                            <span className="inline-flex items-center gap-2 text-black-700 font-semibold">
                              <Heart className="w-5 h-5 text-rose-600" />
                              {articleReactions} reactions
                            </span>
                          </div>
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
                <div className="px-8 py-6 border-t border-black-200 bg-gradient-to-r from-black-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-black-600">
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
                                  : "border border-black-300 bg-white text-black-700 hover:bg-black-50"
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