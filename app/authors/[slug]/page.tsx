"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  Calendar,
  Clock,
  Linkedin,
  Folder,
  ArrowRight,
  Tag as TagIcon,
  Award,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DEFAULT_PAGE_SIZE = 6;

interface Article {
  id: number;
  slug: string;
  title: string;
  published_at: string;
  read_count: number;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  image_url?: string;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
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
        console.log("Full API response:", data);
        
        // Debug: Check the first article's structure
        if (data.articles && data.articles.length > 0) {
          console.log("First article structure:", data.articles[0]);
          console.log("Available image fields in first article:", {
            cover_image: data.articles[0].cover_image,
            image_url: data.articles[0].image_url,
            has_cover_image: !!data.articles[0].cover_image,
            has_image_url: !!data.articles[0].image_url,
            all_keys: Object.keys(data.articles[0])
          });
        }
        
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
    `${Math.ceil(((text ?? "").split(" ").length || 1) / 200)} min`;

  const stripMarkdown = (md?: string) => {
    if (!md) return "";
    let text = md;
    text = text.replace(/!\[.*?\]\$\$.*?\$\$/g, "");
    text = text.replace(/\[(.*?)\]\\$\$.*?\\$\$/g, "$1");
    text = text.replace(/[*_~`]/g, "");
    text = text.replace(/^#+\s+/gm, "");
    text = text.replace(/^>\s+/gm, "");
    text = text.replace(/^[-+*]\s+/gm, "");
    text = text.replace(/<[^>]+>/g, "");
    return text.trim();
  };

  const truncate = (str: string, max = 150) =>
    str.length <= max ? str : str.slice(0, max) + "...";

  // Get cover image URL - handle different API response structures
  const getCoverImage = (article: Article) => {
    console.log("Processing article cover image:", {
      title: article.title,
      cover_image: article.cover_image,
      image_url: article.image_url
    });

    // Try cover_image first
    if (article.cover_image) {
      // If it's a full URL, use it directly
      if (article.cover_image.startsWith('http')) {
        return article.cover_image;
      }
      // If it's a relative path starting with /, use it as-is
      if (article.cover_image.startsWith('/')) {
        return article.cover_image;
      }
      // If it's just a filename, prepend with /
      return `/${article.cover_image}`;
    }
    
    // Try image_url as fallback
    if (article.image_url) {
      if (article.image_url.startsWith('http')) {
        return article.image_url;
      }
      if (article.image_url.startsWith('/')) {
        return article.image_url;
      }
      return `/${article.image_url}`;
    }
    
    // Final fallback - use different fallbacks to see which one works
    console.log("No cover image found for article:", article.title);
    return "/devops.webp";
  };

  // Pagination logic
  const totalArticles = author?.articles?.length || 0;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const paginatedArticles =
    author?.articles?.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ) || [];

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <MinimalHeader />
        <main className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Author Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              {error}
            </p>
            <Link
              href="/authors"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Browse All Authors
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
        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-12">
            {/* Author Skeleton */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="space-y-4 flex-1">
                  <div className="h-8 bg-gray-200 rounded-full w-64"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-48"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-36"></div>
                </div>
              </div>
            </div>
            {/* Articles Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
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

  return (
    <div className="min-h-screen bg-white">
      <MinimalHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Author Header */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8">
              {/* Author Avatar */}
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-1 shadow-lg">
                  <img
                    src={author?.avatar || "/placeholder.svg"}
                    alt={author?.name || "Author"}
                    className="w-full h-full rounded-2xl object-cover border-4 border-white"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                {author?.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute -bottom-2 -right-2 bg-sky-600 hover:bg-sky-700 p-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                )}
              </div>

              {/* Author Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
                  <Award className="w-4 h-4" />
                  DevOps Author
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  {author?.name}
                </h1>
                
                <p className="text-lg text-sky-600 font-semibold mb-4">
                  {author?.job_title} at {author?.company}
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl text-base">
                  {author?.bio}
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
            <div className="p-3 bg-gradient-to-r from-sky-600 to-blue-600 rounded-xl">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Articles by {author?.name}
              </h2>
              <p className="text-gray-600">
                {author?.articles?.length || 0} published articles
              </p>
            </div>
          </motion.div>

          {author?.articles && author.articles.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-10 h-10 text-sky-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                No Articles Yet
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Stay tuned! {author?.name} is preparing amazing content for you.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {paginatedArticles.map((article, index) => {
                    const previewText =
                      article.excerpt?.trim() ||
                      truncate(stripMarkdown(article.content), 120) ||
                      "Read the full article to learn more...";
                    
                    const coverImage = getCoverImage(article);
                    const isFallbackImage = coverImage === "/devops.webp";
                    
                    return (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden"
                      >
                        {/* Cover Image */}
                        <div className={`relative h-48 overflow-hidden ${isFallbackImage ? 'bg-gradient-to-br from-gray-100 to-gray-200' : 'bg-gray-100'}`}>
                          <img
                            src={coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              console.log(`Image failed to load for "${article.title}":`, coverImage);
                              // Try a different fallback
                              (e.target as HTMLImageElement).src = "/placeholder.svg";
                            }}
                            onLoad={() => {
                              console.log(`Image loaded successfully for "${article.title}":`, coverImage);
                            }}
                          />
                          {isFallbackImage && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center p-4">
                                <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-xs text-gray-500 font-medium">No cover image</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Article Content */}
                        <div className="p-6">
                          {/* Category */}
                          {article.category && (
                            <Link
                              href={`/categories/${article.category.slug}`}
                              className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-sky-100 transition-colors border border-sky-200 mb-3"
                            >
                              <Folder className="w-4 h-4" />
                              {article.category.name}
                            </Link>
                          )}

                          {/* Title */}
                          <Link href={`/articles/${article.slug}`}>
                            <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-sky-600 transition-colors duration-300 line-clamp-2">
                              {article.title}
                            </h3>
                          </Link>

                          {/* Excerpt */}
                          <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3 text-sm">
                            {previewText}
                          </p>

                          {/* Meta Information */}
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{formatDate(article.published_at)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{calculateReadTime(article.content)}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {article.tags.slice(0, 3).map((tag) => (
                                <Link
                                  key={tag.id}
                                  href={`/articles?tag=${tag.slug}`}
                                  className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-gray-100"
                                >
                                  <TagIcon className="w-3 h-3" />
                                  {tag.name}
                                </Link>
                              ))}
                            </div>
                          )}

                          {/* Read More */}
                          <Link
                            href={`/articles/${article.slug}`}
                            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm transition-colors group/readmore"
                          >
                            Read more
                            <ArrowRight className="w-4 h-4 group-hover/readmore:translate-x-1 transition-transform duration-300" />
                          </Link>
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
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
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
                                ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md"
                                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
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
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white"
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