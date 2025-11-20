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
  TrendingUp,
  Plus,
  ArrowRight,
  Calendar,
  Folder,
  Tag as TagIcon,
  BarChart3,
  Edit,
  Crown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Loader,
  AlertTriangle,
  Clock,
  Users,
  Award,
  Zap,
  Target,
  BookOpen,
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
  const articlesPerPage = 8;

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

  // Calculate read time function
  const calculateReadTime = (content?: string) => {
    if (!content) return 5;
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

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

        const res = await fetch(`${API_BASE_URL}/authors/me/dashboard/`, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
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

        if (data.slug !== slug) {
          router.push(`/admin/author/${data.slug}`);
          return;
        }

        // Add read time to articles and sort by latest
        const articlesWithReadTime = data.articles
          ?.map((article: Article) => ({
            ...article,
            read_time: calculateReadTime(article.content),
          }))
          .sort(
            (a: Article, b: Article) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          );

        setAuthor({
          ...data,
          articles: articlesWithReadTime,
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

      setDeleteModal({ isOpen: false, article: null, isLoading: false });
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

  const totalReadTime =
    author?.articles?.reduce(
      (sum, article) => sum + calculateReadTime(article.content),
      0
    ) || 0;
  const avgReadTime =
    totalArticles > 0 ? Math.round(totalReadTime / totalArticles) : 0;

  // Get author performance tier (same as author detail page)
  const getAuthorTier = () => {
    if (totalViews > 100000)
      return {
        name: "Elite",
        color: "from-purple-600 to-pink-600",
        icon: Award,
      };
    if (totalViews > 50000)
      return {
        name: "Expert",
        color: "from-amber-500 to-orange-600",
        icon: Zap,
      };
    if (totalViews > 10000)
      return {
        name: "Pro",
        color: "from-emerald-500 to-green-600",
        icon: TrendingUp,
      };
    return { name: "Rising", color: "from-blue-500 to-cyan-600", icon: Users };
  };

  const authorTier = getAuthorTier();
  const TierIcon = authorTier.icon;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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

  // Strip markdown for excerpt
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

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 relative z-10">
        {/* Show error message if not authenticated */}
        {!isAuthenticated && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-black mb-4">
              Access Required
            </h1>
            <p className="text-lg text-black mb-8 max-w-md mx-auto">
              Please login to access your admin dashboard
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg"
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
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-black mb-4">
                {error.includes("permission") || error.includes("403")
                  ? "Access Denied"
                  : "Error Loading Dashboard"}
              </h1>
              <p className="text-lg text-black mb-8 max-w-md mx-auto">
                {error}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg"
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
            {/* Author Header - Premium Design */}
            <section className="w-full mb-16">
              {/* Simple Header */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-16 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Author Dashboard
                  </span>
                </div>
                <h1 className="text-6xl md:text-7xl font-light text-black mb-6 tracking-tight">
                  Welcome back, {author?.name}
                </h1>
              </div>

              {/* Author Profile */}
              <div className="flex flex-col lg:flex-row items-start gap-12 mb-16">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                      <img
                        src={author?.avatar || "/placeholder.svg"}
                        alt={author?.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-600 p-3 rounded-full shadow-2xl border-2 border-white">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  {/* Title & Company - Only show if both are set */}
                  {author?.job_title && author?.company && (
                    <p className="text-xl text-blue-600 font-medium mb-6">
                      {author.job_title} at {author.company}
                    </p>
                  )}

                  {/* Bio */}
                  <p className="text-lg text-black leading-relaxed mb-8 max-w-2xl">
                    {author?.bio}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/admin/new-article"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 shadow-lg"
                      >
                        <Plus className="w-5 h-5" />
                        Write New Article
                      </Link>
                    </motion.div>
                    <Link
                      href={`/authors/${author?.slug}`}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 shadow-md"
                    >
                      View Public Profile
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Stats - Premium Design */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-4xl mx-auto text-center py-12">
                <div className="space-y-3">
                  <div className="text-5xl font-light text-black">
                    {totalArticles}
                  </div>
                  <div className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                    Articles
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-5xl font-light text-black">
                    {totalViews.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-600 font-semibold uppercase tracking-wider">
                    Total Views
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-5xl font-light text-black">
                    {avgViews}
                  </div>
                  <div className="text-sm text-purple-600 font-semibold uppercase tracking-wider">
                    Avg Views
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-5xl font-light text-black">
                    {avgReadTime}m
                  </div>
                  <div className="text-sm text-orange-600 font-semibold uppercase tracking-wider">
                    Read Time
                  </div>
                </div>
              </div>
            </section>

            {/* Articles Section - Premium Design */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-2xl overflow-hidden mb-16"
            >
              <div className="px-8 py-6 border-b border-slate-200/50 bg-gradient-to-r from-white to-slate-50/50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                      Your Articles
                    </h2>
                    <p className="text-slate-600 font-medium">
                      {totalArticles} articles published •{" "}
                      {totalViews.toLocaleString()} total reads
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-slate-500 font-medium">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                </div>
              </div>

              {author?.articles && author.articles.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    Ready to Share Your Knowledge?
                  </h3>
                  <p className="text-slate-600 mb-8 text-lg font-medium max-w-md mx-auto">
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
                  <div className="divide-y divide-slate-200/50">
                    {paginatedArticles.map((article, index) => {
                      const previewText =
                        article.excerpt?.trim() ||
                        truncate(stripMarkdown(article.content), 120) ||
                        "Read the full article to learn more...";

                      const coverImage = getCoverImage(article);
                      const readTime = calculateReadTime(article.content);

                      return (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-8 hover:bg-white/50 transition-all duration-300 group border-b border-slate-100 last:border-b-0"
                        >
                          <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Article Cover */}
                            <div className="flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden border border-slate-200/50 shadow-lg group-hover:shadow-xl transition-all duration-300 relative">
                              <img
                                src={coverImage}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-3 left-3">
                                {article.category && (
                                  <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-semibold">
                                    <Folder className="w-3 h-3" />
                                    {article.category.name}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Article Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-4 mb-3">
                                <span className="inline-flex items-center gap-2 text-slate-600 font-medium text-sm">
                                  <Calendar className="w-4 h-4 text-slate-500" />
                                  {formatDate(article.published_at)}
                                </span>
                                <span className="inline-flex items-center gap-2 text-slate-600 font-medium text-sm">
                                  <Clock className="w-4 h-4 text-slate-500" />
                                  {readTime} min read
                                </span>
                                <span className="inline-flex items-center gap-2 text-slate-600 font-medium text-sm">
                                  <Eye className="w-4 h-4 text-sky-600" />
                                  {article.read_count?.toLocaleString()} views
                                </span>
                              </div>

                              <h3 className="text-2xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-sky-700 transition-colors">
                                <Link href={`/articles/${article.slug}`}>
                                  {article.title}
                                </Link>
                              </h3>

                              {article.excerpt && (
                                <p className="text-slate-600 text-lg line-clamp-2 mb-4 font-medium leading-relaxed">
                                  {article.excerpt}
                                </p>
                              )}

                              {/* Tags */}
                              {article.tags && article.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {article.tags.slice(0, 4).map((tag) => (
                                    <span
                                      key={tag.id}
                                      className="inline-flex items-center gap-1.5 bg-slate-100/80 text-slate-700 px-3 py-1.5 rounded-xl text-sm font-medium border border-slate-200/50"
                                    >
                                      <TagIcon className="w-3.5 h-3.5" />
                                      {tag.name}
                                    </span>
                                  ))}
                                  {article.tags.length > 4 && (
                                    <span className="inline-flex items-center bg-slate-100/80 text-slate-600 px-3 py-1.5 rounded-xl text-sm font-medium border border-slate-200/50">
                                      +{article.tags.length - 4} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                              <Link
                                href={`/articles/${article.slug}`}
                                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md hover:scale-105"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Link>
                              <Link
                                href={`/admin/edit-article/${article.slug}`}
                                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md hover:scale-105"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Link>
                              <button
                                onClick={() => openDeleteModal(article)}
                                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold shadow-md hover:scale-105"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="px-8 py-6 border-t border-slate-200/50 bg-gradient-to-r from-white to-slate-50/50">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600 font-medium">
                          Showing {paginatedArticles.length} of {totalArticles}{" "}
                          articles
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
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
                                        ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md"
                                        : "border border-slate-300 bg-white/80 text-slate-700 hover:bg-slate-50 backdrop-blur-sm"
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
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
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
          </>
        )}
      </main>

      <MinimalFooter />
    </div>
  );
}
