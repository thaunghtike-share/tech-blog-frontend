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
  Clock,
  BookOpen,
  FileText,
  MessageSquare,
  Heart,
  ThumbsUp,
  Sparkles,
  Lightbulb,
  CheckCircle,
  Target,
  Award,
  Zap,
} from "lucide-react";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
  comment_count?: number;
  reactions_summary?: {
    like?: number;
    love?: number;
    celebrate?: number;
    insightful?: number;
  };
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const DEFAULT_PAGE_SIZE = 10;

// Progress tracking interface
interface ProgressData {
  completedDays: number[];
  lastRead: { [day: number]: number }; // timestamp
  streak: number;
  totalTimeSpent: number;
}

export default function HundredDaysCloudChallenge() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [progress, setProgress] = useState<ProgressData>({
    completedDays: [],
    lastRead: {},
    streak: 0,
    totalTimeSpent: 0,
  });

  const router = useRouter();
  const topRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("cloud-challenge-progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: ProgressData) => {
    setProgress(newProgress);
    localStorage.setItem(
      "cloud-challenge-progress",
      JSON.stringify(newProgress)
    );
  };

  // Mark day as completed
  const markDayCompleted = (dayNumber: number) => {
    const newCompletedDays = [
      ...new Set([...progress.completedDays, dayNumber]),
    ].sort((a, b) => a - b);

    // Calculate streak (consecutive days from current day backward)
    let currentStreak = 0;
    for (let i = dayNumber; i > 0; i--) {
      if (newCompletedDays.includes(i)) {
        currentStreak++;
      } else {
        break;
      }
    }

    const newProgress: ProgressData = {
      ...progress,
      completedDays: newCompletedDays,
      lastRead: {
        ...progress.lastRead,
        [dayNumber]: Date.now(),
      },
      streak: currentStreak,
    };

    saveProgress(newProgress);
  };

  // Unmark day as completed
  const unmarkDayCompleted = (dayNumber: number) => {
    const newCompletedDays = progress.completedDays.filter(
      (day) => day !== dayNumber
    );

    // Recalculate streak
    let currentStreak = 0;
    const maxDay = Math.max(...newCompletedDays);
    for (let i = maxDay; i > 0; i--) {
      if (newCompletedDays.includes(i)) {
        currentStreak++;
      } else {
        break;
      }
    }

    const newProgress: ProgressData = {
      ...progress,
      completedDays: newCompletedDays,
      streak: currentStreak,
    };

    saveProgress(newProgress);
  };

  // Calculate read time function
  const calculateReadTime = (content?: string) => {
    if (!content) return 5;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  // Extract day number from title or slug
  const extractDayNumber = (article: Article): number => {
    // Try to extract from title first (e.g., "Day 1: Introduction")
    const titleMatch = article.title.match(/Day\s+(\d+)/i);
    if (titleMatch) return parseInt(titleMatch[1]);

    // Try to extract from slug (e.g., "day-1-introduction")
    const slugMatch = article.slug.match(/day-?(\d+)/i);
    if (slugMatch) return parseInt(slugMatch[1]);

    // Fallback: use article ID or return 0
    return article.id;
  };

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch articles with kodekloud-cloud-challenge tag
        const articlesRes = await fetch(
          `${API_BASE_URL}/articles/?tags__slug=kodekloud-cloud-challenge&ordering=published_at`
        );

        if (!articlesRes.ok) {
          throw new Error(
            `Error ${articlesRes.status}: ${articlesRes.statusText}`
          );
        }

        const articlesData = await articlesRes.json();
        const articlesList = Array.isArray(articlesData)
          ? articlesData
          : articlesData.results || [];

        // Fetch engagement data for each article
        const articlesWithEngagement = await Promise.all(
          articlesList.map(async (article: Article) => {
            try {
              // Fetch comments
              const commentsRes = await fetch(
                `${API_BASE_URL}/articles/${article.slug}/comments/`
              );

              // Fetch reactions
              const reactionsRes = await fetch(
                `${API_BASE_URL}/articles/${article.slug}/reactions/`
              );

              let comment_count = 0;
              let reactions_summary = {
                like: 0,
                love: 0,
                celebrate: 0,
                insightful: 0,
              };

              if (commentsRes.ok) {
                const commentsData = await commentsRes.json();
                comment_count = commentsData.reduce(
                  (total: number, comment: any) => {
                    return total + 1 + (comment.replies?.length || 0);
                  },
                  0
                );
              }

              if (reactionsRes.ok) {
                const reactionsData = await reactionsRes.json();
                reactions_summary = {
                  like: reactionsData.summary?.like || 0,
                  love: reactionsData.summary?.love || 0,
                  celebrate: reactionsData.summary?.celebrate || 0,
                  insightful: reactionsData.summary?.insightful || 0,
                };
              }

              return {
                ...article,
                comment_count,
                reactions_summary,
                read_time: calculateReadTime(article.content),
                day_number: extractDayNumber(article),
              };
            } catch (error) {
              console.error(
                `Failed to fetch engagement for article ${article.slug}:`,
                error
              );
              return {
                ...article,
                comment_count: 0,
                reactions_summary: {
                  like: 0,
                  love: 0,
                  celebrate: 0,
                  insightful: 0,
                },
                read_time: calculateReadTime(article.content),
                day_number: extractDayNumber(article),
              };
            }
          })
        );

        // Sort articles by published date (newest first)
        const sortedArticles = articlesWithEngagement.sort(
          (a, b) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
        );
        setArticles(sortedArticles);

        // Fetch authors
        const authorsRes = await fetch(`${API_BASE_URL}/authors/`);
        const authorsData = await authorsRes.json();
        const authorsList = Array.isArray(authorsData)
          ? authorsData
          : authorsData.results || [];
        setAuthors(authorsList);

        // Fetch tags
        const tagsRes = await fetch(`${API_BASE_URL}/tags/`);
        const tagsData = await tagsRes.json();
        setTags(Array.isArray(tagsData) ? tagsData : tagsData.results || []);

        setLoading(false);
        setCurrentPage(1);
      } catch (err: any) {
        setError(err.message || "Failed to fetch challenge data");
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  // Helper functions
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

  const getCoverImage = (article: Article) => {
    // Use actual article cover image if available
    if (article.cover_image && article.cover_image.trim() !== "") {
      return article.cover_image;
    }
    // Fallback to kodekloud.png only if no cover image
    return "/kodekloud.png";
  };

  // Calculate challenge stats
  const totalArticles = articles.length;
  const totalViews = articles.reduce(
    (sum, article) => sum + (article.read_count || 0),
    0
  );
  const totalComments = articles.reduce(
    (sum, article) => sum + (article.comment_count || 0),
    0
  );
  const totalReactions = articles.reduce((sum, article) => {
    const reactions = article.reactions_summary || {};
    return (
      sum +
      (reactions.like || 0) +
      (reactions.love || 0) +
      (reactions.celebrate || 0) +
      (reactions.insightful || 0)
    );
  }, 0);

  // Progress calculations
  const completedCount = progress.completedDays.length;
  const completionPercentage =
    totalArticles > 0 ? Math.round((completedCount / 100) * 100) : 0;
  const currentDay = Math.max(...progress.completedDays, 0) + 1;

  // Pagination logic
  const totalPages = Math.ceil(totalArticles / pageSize);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <MinimalHeader />
        <main className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Cloud className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
              Challenge Not Found
            </h1>
            <p className="text-lg text-black dark:text-gray-300 mb-8 max-w-md mx-auto">
              {error}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Return Home
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
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <MinimalHeader />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-12">
            {/* Challenge Header Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-8">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-slate-200 dark:bg-gray-700 rounded-2xl"></div>
                <div className="space-y-4 flex-1">
                  <div className="h-8 bg-slate-200 dark:bg-gray-700 rounded-full w-64"></div>
                  <div className="h-6 bg-slate-200 dark:bg-gray-700 rounded-full w-48"></div>
                  <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded-full w-36"></div>
                </div>
              </div>
            </div>
            {/* Articles Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-6"
                >
                  <div className="h-48 bg-slate-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded-full w-3/4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-gray-700 rounded-full w-1/2"></div>
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
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] relative overflow-hidden transition-colors duration-300">
      <MinimalHeader />

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 relative z-10">
        {/* Challenge Header - Premium Design */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full mb-16"
        >
          {/* Simple Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Kodekloud's Cloud Challenge
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
              {/* KodeKloud Logo */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-2xl border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-white p-1">
                  <div className="w-full h-full rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <img
                      src="/kodekloud.webp"
                      alt="KodeKloud"
                      className="w-20 h-20 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <div className="flex-1">
                <h1 className="text-6xl md:text-7xl font-light text-black dark:text-white mb-6 tracking-tight">
                  100 Days of Cloud Challenge
                </h1>
                <p className="text-xl text-black dark:text-gray-300 leading-relaxed mb-8 max-w-3xl">
                  Master cloud technologies with KodeKloud's structured learning
                  path. One concept per day, hands-on labs, and real-world
                  projects to transform your cloud skills in 100 days.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-4xl mx-auto py-12">
            {/* Article Count */}
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-light text-black dark:text-white mb-1">
                {totalArticles}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Articles
              </div>
            </div>

            {/* Total Views */}
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-light text-black dark:text-white mb-1">
                {totalViews.toLocaleString()}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                Total Views
              </div>
            </div>

            {/* Total Comments */}
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-light text-black dark:text-white mb-1">
                {totalComments}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide text-pink-600 dark:text-pink-400">
                Total Comments
              </div>
            </div>

            {/* Total Reactions */}
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-4xl font-light text-black dark:text-white mb-1">
                {totalReactions}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                Total Reactions
              </div>
            </div>
          </div>
        </motion.section>

        {/* Challenge Days Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl border border-slate-200/60 dark:border-gray-700/60 shadow-2xl overflow-hidden mb-16"
        >
          <div className="px-8 py-6 border-b border-slate-200/50 dark:border-gray-700/50 bg-gradient-to-r from-white to-slate-50/50 dark:from-gray-800 dark:to-gray-700/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                  Latest Articles
                </h2>
                <p className="text-slate-600 dark:text-gray-400 font-medium">
                  {totalArticles} articles published
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-500 dark:text-gray-500 font-medium">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                Challenge Starting Soon!
              </h3>
              <p className="text-slate-600 dark:text-gray-400 mb-8 text-lg font-medium max-w-md mx-auto">
                The 100 Days of Cloud Challenge is being prepared. Check back
                soon for the first day!
              </p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-slate-200/50 dark:divide-gray-700/50">
                {paginatedArticles.map((article, index) => {
                  const dayNumber = (article as any).day_number;
                  const isCompleted =
                    progress.completedDays.includes(dayNumber);

                  // Use excerpt if available, otherwise strip markdown from content and truncate
                  const previewText =
                    article.excerpt?.trim() ||
                    truncate(stripMarkdown(article.content || ""), 150) ||
                    "Join this day of the cloud challenge to learn new skills...";

                  const author = getAuthor(article.author);
                  const coverImage = getCoverImage(article);
                  const readTime = calculateReadTime(article.content);
                  const reactions = article.reactions_summary || {};

                  return (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-8 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 group border-b border-slate-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* Day Badge and Cover */}
                        <div className="flex-shrink-0 flex flex-col items-center gap-4">
                          {/* KodeKloud Cover Image */}
                          <div className="w-32 h-32 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-gray-600/50 shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <img
                              src={coverImage}
                              alt={`Day ${dayNumber}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </div>

                        {/* Article Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-4 mb-3">
                            <span className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 font-medium text-sm">
                              <Calendar className="w-4 h-4 text-slate-500 dark:text-gray-500" />
                              {formatDate(article.published_at)}
                            </span>
                            <span className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 font-medium text-sm">
                              <Clock className="w-4 h-4 text-slate-500 dark:text-gray-500" />
                              {readTime} min read
                            </span>
                            <span className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 font-medium text-sm">
                              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              {article.read_count?.toLocaleString() || "0"}{" "}
                              views
                            </span>
                            <span className="inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 font-medium text-sm">
                              <MessageSquare className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                              {article.comment_count || 0} comments
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                            <Link href={`/articles/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>

                          {/* Reactions */}
                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            {(reactions.like ?? 0) > 0 && (
                              <span className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 font-medium">
                                <ThumbsUp className="w-4 h-4" />
                                {reactions.like}
                              </span>
                            )}
                            {(reactions.love ?? 0) > 0 && (
                              <span className="inline-flex items-center gap-1 text-sm text-red-500 dark:text-red-400 font-medium">
                                <Heart className="w-4 h-4" />
                                {reactions.love}
                              </span>
                            )}
                            {(reactions.celebrate ?? 0) > 0 && (
                              <span className="inline-flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                                <Sparkles className="w-4 h-4" />
                                {reactions.celebrate}
                              </span>
                            )}
                            {(reactions.insightful ?? 0) > 0 && (
                              <span className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium">
                                <Lightbulb className="w-4 h-4" />
                                {reactions.insightful}
                              </span>
                            )}
                          </div>

                          {/* Article Excerpt/Content Preview */}
                          <div className="mb-4">
                            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed line-clamp-3 font-medium">
                              {previewText}
                            </p>
                          </div>

                          {/* Author Info */}
                          {author && (
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300 font-medium">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                                  <img
                                    src={author.avatar || "/placeholder.svg"}
                                    alt={author.name}
                                    className="w-full h-full rounded-full object-cover border border-white dark:border-gray-800"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "/placeholder.svg";
                                    }}
                                  />
                                </div>
                                <Link
                                  href={`/authors/${author.slug}`}
                                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                                >
                                  {author.name}
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Read More Button */}
                        <div className="flex items-center">
                          <Link
                            href={`/articles/${article.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md hover:scale-105 group/btn"
                          >
                            Read Article
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="px-8 py-6 border-t border-slate-200/50 dark:border-gray-700/50 bg-gradient-to-r from-white to-slate-50/50 dark:from-gray-800 dark:to-gray-700/50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 dark:text-gray-400 font-medium">
                      Showing {paginatedArticles.length} of {totalArticles} days
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-gray-700 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md text-slate-700 dark:text-gray-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
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
                                className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all shadow-sm ${
                                  currentPage === pageNum
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                    : "border border-slate-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700 backdrop-blur-sm"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-gray-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-gray-700 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md text-slate-700 dark:text-gray-300"
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
