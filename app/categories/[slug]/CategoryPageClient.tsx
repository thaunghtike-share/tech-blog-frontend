"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Eye,
  Tag as TagIcon,
  Star,
  TrendingUp,
  Code,
  Zap,
  Cloud,
  Shield,
  Container,
  GitBranch,
  Server,
  Wrench,
  ToolCase,
  Folder,
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
  const calculateReadTime = (text: string) =>
    `${Math.ceil((text.split(" ").length || 1) / 200)} min`;
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

  // Pagination logic
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (error) {
    return (
      <div className="min-h-screen bg-white/95 relative overflow-x-hidden">
        <MinimalHeader />
        <main className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Category Not Found
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
              {error}
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
      <div className="min-h-screen bg-white/95 relative overflow-x-hidden">
        <MinimalHeader />
        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-12">
            {/* Category Skeleton */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
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
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
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
    <div className="min-h-screen bg-white/95 relative overflow-x-hidden">
      <MinimalHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Header */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8">
              {/* Category Icon */}
              <div className="relative">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${categoryGradient} p-1 shadow-lg`}>
                  <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/20">
                    <CategoryIcon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                  </div>
                </div>
              </div>

              {/* Category Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${categoryGradient} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg`}>
                  <Folder className="w-4 h-4" />
                  Category
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-700 mb-3 leading-tight">
                  {category?.name}
                </h1>
                
                <p className="text-lg text-slate-600 font-semibold mb-4">
                  {articles.length} published articles
                </p>
                
                <p className="text-black-600 leading-relaxed mb-6 max-w-2xl text-base">
                  Explore all articles in the {category?.name} category. 
                  Stay updated with the latest insights, tutorials, and best practices.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Articles Grid */}
        <section className="mb-16">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className={`p-3 bg-gradient-to-r ${categoryGradient} rounded-xl`}>
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                {category?.name} Articles
              </h2>
              <p className="text-slate-600">
                {articles.length} published articles • Page {currentPage} of {totalPages}
              </p>
            </div>
          </motion.div>

          {articles.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                No Articles Yet
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Stay tuned! We're preparing amazing {category?.name} content for you.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {paginatedArticles.map((article, index) => {
                    const previewText = truncate(
                      stripMarkdown(article.content),
                      120
                    );
                    const author = getAuthor(article.author);
                    const coverImage = getCoverImage(article);
                    const hasRealCover = hasRealCoverImage(article);
                    
                    return (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden"
                      >
                        {/* Cover Image */}
                        <div className={`relative h-48 overflow-hidden ${!hasRealCover ? 'bg-gradient-to-br from-slate-100 to-blue-100' : 'bg-slate-100'}`}>
                          <img
                            src={coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
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
                          {!hasRealCover && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center p-4">
                                <CategoryIcon className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                <p className="text-xs text-slate-700 font-medium">{category?.name}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Article Content */}
                        <div className="p-6">
                          {/* Author with Avatar */}
                          {author && (
                            <div className="flex items-center gap-2 bg-slate-50 text-black-700 px-3 py-1.5 rounded-full text-sm font-medium border border-slate-200 mb-3 w-fit">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 p-0.5">
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
                            </div>
                          )}

                          {/* Title */}
                          <Link href={`/articles/${article.slug}`}>
                            <h3 className="text-lg font-bold text-sky-700 mb-3 leading-tight group-hover:text-sky-700 transition-colors duration-300 line-clamp-2">
                              {article.title}
                            </h3>
                          </Link>

                          {/* Excerpt */}
                          <p className="text-black-400 leading-relaxed mb-4 line-clamp-3 text-sm">
                            {previewText}
                          </p>

                          {/* Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {article.tags.slice(0, 3).map((tagId) => {
                                const tag = getTagById(tagId);
                                if (!tag) return null;
                                return (
                                  <Link
                                    key={tag.id}
                                    href={`/articles?tag=${tag.slug}`}
                                    className="inline-flex items-center gap-1 bg-black-50 text-orange-700 px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-black-100 border border-black-200"
                                  >
                                    <TagIcon className="w-3 h-3" />
                                    {tag.name}
                                  </Link>
                                );
                              })}
                            </div>
                          )}

                          {/* Read More and Stats */}
                          <div className="flex items-center justify-between">
                            <Link
                              href={`/articles/${article.slug}`}
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors group/readmore"
                            >
                              Read more
                              <ArrowRight className="w-4 h-4 group-hover/readmore:translate-x-1 transition-transform duration-300" />
                            </Link>
                            
                            {article.read_count && (
                              <div className="flex items-center gap-1 text-xs text-black-500">
                                <Eye className="w-3 h-3" />
                                <span className="font-medium">{article.read_count.toLocaleString()}</span>
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
                <motion.nav 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                  <div className="text-sm text-slate-600">
                    Showing {paginatedArticles.length} of {totalArticles} articles
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors bg-white text-slate-700"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
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
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all ${
                              currentPage === pageNum
                                ? `bg-gradient-to-r ${categoryGradient} text-white shadow-md`
                                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors bg-white text-slate-700"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.nav>
              )}
            </>
          )}
        </section>
      </main>

      <MinimalFooter />
    </div>
  );
}