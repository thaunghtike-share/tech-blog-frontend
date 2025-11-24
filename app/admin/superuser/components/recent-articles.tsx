import { FileText, Eye, Calendar, User, ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  read_count: number;
  author_name: string;
  cover_image?: string;
  excerpt?: string;
}

interface RecentArticlesProps {
  articles: Article[];
}

export default function RecentArticles({ articles }: RecentArticlesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="relative group">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 dark:from-gray-800/40 dark:to-gray-900/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl" />
      
      <div className="relative">
        {/* Header */}
        <div className="p-6 border-b border-white/20 dark:border-gray-700/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Recent Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Latest published content
              </p>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="p-6">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group/item block"
              >
                <div className="p-4 rounded-2xl border border-white/20 dark:border-gray-700/30 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <div className="flex gap-3">
                    {article.cover_image && (
                      <div className="relative flex-shrink-0">
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          className="w-16 h-16 rounded-xl object-cover border border-white/50 shadow-md"
                        />
                        <div className="absolute inset-0 bg-black/0 rounded-xl transition-colors" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors line-clamp-2 mb-2 flex-1">
                          {article.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover/item:text-blue-500 transition-colors flex-shrink-0 mt-1" />
                      </div>

                      {article.excerpt && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.author_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.published_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.read_count.toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No articles found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}