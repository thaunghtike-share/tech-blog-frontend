"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalFooter } from "@/components/minimal-footer";
import { useAuth } from "@/app/auth/hooks/use-auth";
import AuthModal from "@/app/auth/auth-modal";
import {
  FileText,
  Eye,
  Heart,
  TrendingUp,
  Plus,
  ArrowRight,
  Calendar,
  Folder,
  Tag as TagIcon,
  BarChart3,
  Users,
  MessageCircle,
  Edit,
  Crown,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Loader,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

interface Article {
  id: number;
  slug: string;
  title: string;
  published_at: string;
  read_count: number;
  excerpt?: string;
  content?: string;
  cover_image?: string;
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
  reactions?: {
    likes: number;
    loves: number;
    claps: number;
    total: number;
  };
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

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  article,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  article: Article | null;
  isLoading: boolean;
}) {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200/80"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Delete Article</h3>
            <p className="text-slate-500 text-sm">
              This action cannot be undone
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-slate-700 font-medium mb-2">
            Delete &ldquo;{article.title}&rdquo;?
          </p>
          <p className="text-slate-500 text-sm">
            This article has {article.read_count?.toLocaleString()} views and
            will be permanently removed from your blog.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all duration-200 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all duration-200 font-medium disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthorAdminDashboard() {
  const { slug } = useParams();
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  // Delete confirmation modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    article: Article | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    article: null,
    isLoading: false,
  });

  // 🔐 AUTHENTICATION CHECK - Show modal if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowLoginModal(true);
      setError("Please login to access your dashboard");
      setLoading(false);
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    async function fetchAuthorData() {
      // 🔐 Check authentication before making API call
      if (!isAuthenticated || isLoading) return;

      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found");
        }

        // 🔐 SECURITY FIX: Use the secure endpoint that returns only current user's data
        const res = await fetch(`${API_BASE_URL}/authors/me/dashboard/`, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("token");
          setShowLoginModal(true);
          return;
        }

        if (res.status === 403) {
          throw new Error("You don't have permission to access this dashboard");
        }

        if (!res.ok) {
          throw new Error(`Failed to load author data: ${res.status}`);
        }

        const data = await res.json();

        // 🔐 SECURITY FIX: Verify the returned data belongs to the URL slug
        // This prevents URL manipulation attacks
        if (data.slug !== slug) {
          // If URL doesn't match user's actual slug, redirect to correct URL
          router.push(`/admin/author/${data.slug}`);
          return;
        }

        // Add dummy reaction data to articles and sort by latest (newest first)
        const articlesWithReactions = data.articles
          ?.map((article: Article) => ({
            ...article,
            reactions: {
              likes: Math.floor(Math.random() * 50) + 10,
              loves: Math.floor(Math.random() * 30) + 5,
              claps: Math.floor(Math.random() * 100) + 20,
              total: 0,
            },
          }))
          .map((article: Article) => ({
            ...article,
            reactions: {
              ...article.reactions!,
              total:
                article.reactions!.likes +
                article.reactions!.loves +
                article.reactions!.claps,
            },
          }))
          // Sort articles by published_at in descending order (newest first)
          .sort(
            (a: Article, b: Article) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          );

        setAuthor({
          ...data,
          articles: articlesWithReactions,
        });
      } catch (err) {
        console.error("Error fetching author data:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    if (slug && isAuthenticated && !isLoading) {
      fetchAuthorData();
    }
  }, [slug, isAuthenticated, isLoading, router]);

  // Delete Article Function
  const handleDeleteArticle = async (articleSlug: string) => {
    setDeleteModal((prev) => ({ ...prev, isLoading: true }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/articles/${articleSlug}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        throw new Error("Authentication failed. Please login again.");
      }

      if (response.status === 403) {
        throw new Error("You don't have permission to delete this article");
      }

      if (!response.ok) {
        throw new Error(`Failed to delete article: ${response.status}`);
      }

      // Remove the article from the local state
      setAuthor((prev) =>
        prev
          ? {
              ...prev,
              articles: prev.articles.filter(
                (article) => article.slug !== articleSlug
              ),
            }
          : null
      );

      // Close the modal
      setDeleteModal({ isOpen: false, article: null, isLoading: false });

      // Show success message (you could add a toast notification here)
      console.log("Article deleted successfully");
    } catch (err) {
      console.error("Error deleting article:", err);
      setError((err as Error).message);
      setDeleteModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (article: Article) => {
    setDeleteModal({
      isOpen: true,
      article,
      isLoading: false,
    });
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    if (!deleteModal.isLoading) {
      setDeleteModal({
        isOpen: false,
        article: null,
        isLoading: false,
      });
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setError(null);
    // Refresh the page to load dashboard data with new auth state
    window.location.reload();
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  // Calculate stats
  const totalArticles = author?.articles?.length || 0;
  const totalViews =
    author?.articles?.reduce(
      (sum, article) => sum + (article.read_count || 0),
      0
    ) || 0;
  const avgViews =
    totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0;
  const totalReactions =
    author?.articles?.reduce(
      (sum, article) => sum + (article.reactions?.total || 0),
      0
    ) || 0;
  const avgReactions =
    totalArticles > 0 ? Math.round(totalReactions / totalArticles) : 0;

  const topArticle = author?.articles?.reduce((top, article) => {
    return !top || (article.read_count || 0) > (top.read_count || 0)
      ? article
      : top;
  }, null as Article | null);

  const mostLovedArticle = author?.articles?.reduce((top, article) => {
    return !top || (article.reactions?.total || 0) > (top.reactions?.total || 0)
      ? article
      : top;
  }, null as Article | null);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getCoverImage = (article: Article) => {
    if (article.cover_image && article.cover_image.trim() !== "") {
      return article.cover_image;
    }
    const category = article.category?.name?.toLowerCase() || "";
    if (category.includes("cloud")) return "/cloud.webp";
    if (category.includes("automation")) return "/automation.webp";
    if (category.includes("terraform")) return "/terraform.webp";
    if (category.includes("devsecops") || category.includes("security"))
      return "/security.webp";
    return "/devops.webp";
  };

  // Pagination logic
  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const paginatedArticles =
    author?.articles?.slice(
      (currentPage - 1) * articlesPerPage,
      currentPage * articlesPerPage
    ) || [];

  // 🔐 Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <MinimalHeader />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-6"></div>
              <p className="text-slate-700 text-lg font-medium">
                Checking authentication...
              </p>
            </div>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <MinimalHeader />

      {/* Login Modal Overlay */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full">
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold"
            >
              ×
            </button>
            <AuthModal onSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDeleteArticle(deleteModal.article?.slug || "")}
        article={deleteModal.article}
        isLoading={deleteModal.isLoading}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Show error message if not authenticated */}
        {!isAuthenticated && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Access Required
            </h2>
            <p className="text-slate-700 mb-8 text-lg font-medium">
              Please login to access your admin dashboard
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold shadow-lg"
            >
              Open Login
            </button>
          </div>
        )}

        {/* Show loading while fetching data */}
        {isAuthenticated && loading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600 mx-auto mb-6"></div>
              <p className="text-slate-700 text-lg font-medium">
                Loading your dashboard...
              </p>
            </div>
          </div>
        )}

        {/* Show error if data fetch fails */}
        {isAuthenticated && error && !loading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {error.includes("permission") ||
                error.includes("denied") ||
                error.includes("403")
                  ? "Access Denied"
                  : "Error Loading Dashboard"}
              </h2>
              <p className="text-slate-700 mb-8 text-lg font-medium max-w-md">
                {error}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold shadow-lg"
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold shadow-lg"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Show dashboard content only if authenticated and data loaded */}
        {isAuthenticated && author && !loading && !error && (
          <>
            {/* Premium Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16"
            >
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-purple-600 p-1.5 shadow-2xl">
                    <img
                      src={author?.avatar || "/placeholder.svg"}
                      alt={author?.name}
                      className="w-full h-full rounded-2xl object-cover border-4 border-white"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-600 p-3 rounded-2xl shadow-2xl">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white px-6 py-2 rounded-2xl text-sm font-semibold mb-4 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Author Dashboard
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                    Welcome back, {author?.name}!
                  </h1>
                  {author?.job_title || author?.company ? (
                    <p className="text-xl text-sky-700 font-medium">
                      {author.job_title && author.company
                        ? `${author.job_title} at ${author.company}`
                        : author.job_title || author.company}
                    </p>
                  ) : (
                    <p className="text-xl text-sky-700 font-medium">
                      Welcome to your author dashboard
                    </p>
                  )}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl blur opacity-75"></div>
                <Link
                  href="/admin/new-article"
                  className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  Write New Article
                </Link>
              </motion.div>
            </motion.div>

            {/* Premium Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            >
              {/* Total Articles */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:border-sky-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {totalArticles}
                </h3>
                <p className="text-slate-700 font-semibold text-lg">
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
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {totalViews.toLocaleString()}
                </h3>
                <p className="text-slate-700 font-semibold text-lg">
                  Total Views
                </p>
              </div>

              {/* Average Views */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:border-purple-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {avgViews.toLocaleString()}
                </h3>
                <p className="text-slate-700 font-semibold text-lg">
                  Avg Views
                </p>
              </div>

              {/* Total Reactions */}
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:border-rose-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                  {totalReactions.toLocaleString()}
                </h3>
                <p className="text-slate-700 font-semibold text-lg">
                  Total Reactions
                </p>
              </div>
            </motion.div>

            {/* Top Performing Articles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
              {/* Most Viewed Article */}
              {topArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Most Viewed
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="w-full h-32 rounded-xl overflow-hidden">
                      <img
                        src={getCoverImage(topArticle)}
                        alt={topArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                      {topArticle.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-slate-700 font-semibold">
                        <Eye className="w-4 h-4 text-sky-600" />
                        {topArticle.read_count?.toLocaleString()} views
                      </span>
                      <span className="flex items-center gap-1 text-slate-700 font-semibold">
                        <Heart className="w-4 h-4 text-rose-600" />
                        {topArticle.reactions?.total} reactions
                      </span>
                    </div>

                    <Link
                      href={`/articles/${topArticle.slug}`}
                      className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold transition-colors"
                    >
                      View Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Most Loved Article */}
              {mostLovedArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Most Loved
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="w-full h-32 rounded-xl overflow-hidden">
                      <img
                        src={getCoverImage(mostLovedArticle)}
                        alt={mostLovedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                      {mostLovedArticle.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-slate-700 font-semibold">
                        <Heart className="w-4 h-4 text-rose-600" />
                        {mostLovedArticle.reactions?.total} reactions
                      </span>
                      <span className="flex items-center gap-1 text-slate-700 font-semibold">
                        <Eye className="w-4 h-4 text-sky-600" />
                        {mostLovedArticle.read_count?.toLocaleString()} views
                      </span>
                    </div>

                    <Link
                      href={`/articles/${mostLovedArticle.slug}`}
                      className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                    >
                      View Article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* All Articles Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Your Articles
                  </h2>
                  <p className="text-slate-600">
                    Showing {paginatedArticles.length} of {totalArticles}{" "}
                    articles
                  </p>
                </div>
                <Link
                  href={`/authors/${author?.slug}`}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md"
                >
                  View Public Profile
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {author?.articles && author.articles.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    Ready to Share Your Knowledge?
                  </h3>
                  <p className="text-slate-700 mb-8 text-xl font-medium max-w-md mx-auto">
                    Create your first article and start building your audience.
                  </p>
                  <Link
                    href="/admin/new-article"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Article
                  </Link>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-slate-200">
                    {paginatedArticles.map((article, index) => (
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
                              src={getCoverImage(article)}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Article Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              {article.category && (
                                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md">
                                  <Folder className="w-4 h-4" />
                                  {article.category.name}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-2 text-slate-700 font-semibold">
                                <Calendar className="w-4 h-4 text-slate-600" />
                                {formatDate(article.published_at)}
                              </span>
                            </div>

                            <h3 className="text-2xl font-bold text-sky-700 mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors">
                              <Link href={`/articles/${article.slug}`}>
                                {article.title}
                              </Link>
                            </h3>

                            {article.excerpt && (
                              <p className="text-slate-700 text-lg line-clamp-2 mb-4 font-medium">
                                {article.excerpt}
                              </p>
                            )}

                            {/* Engagement Metrics */}
                            <div className="flex flex-wrap items-center gap-8 mb-4">
                              <span className="inline-flex items-center gap-2 text-slate-700 font-semibold">
                                <Eye className="w-5 h-5 text-sky-600" />
                                {article.read_count?.toLocaleString()} views
                              </span>
                              <span className="inline-flex items-center gap-2 text-slate-700 font-semibold">
                                <Heart className="w-5 h-5 text-rose-600" />
                                {article.reactions?.total} reactions
                              </span>
                            </div>

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                              <div className="flex flex-wrap gap-3">
                                {article.tags.slice(0, 4).map((tag) => (
                                  <span
                                    key={tag.id}
                                    className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-2 rounded-xl text-sm font-semibold"
                                  >
                                    <TagIcon className="w-4 h-4" />
                                    {tag.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Actions - Now with 3 buttons */}
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/articles/${article.slug}`}
                              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Link>
                            <Link
                              href={`/admin/edit-article/${article.slug}`}
                              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Link>
                            <button
                              onClick={() => openDeleteModal(article)}
                              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="px-8 py-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-300 bg-white"
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
                                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                                      currentPage === pageNum
                                        ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md"
                                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
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
            </motion.div>
          </>
        )}
      </main>

      <MinimalFooter />
    </div>
  );
}
