import { useState } from "react";
import { Users, FileText, LogIn, Sparkles } from "lucide-react";

interface Author {
  id: number;
  name: string;
  slug: string;
  avatar: string;
  articles_count: number;
  featured: boolean;
  job_title: string;
  company: string;
}

interface AuthorsListProps {
  authors: Author[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function AuthorsList({ authors }: AuthorsListProps) {
  const [impersonating, setImpersonating] = useState<string | null>(null);

  const handleImpersonate = async (authorSlug: string) => {
    if (!confirm(`Impersonate ${authorSlug}? You will be logged in as them.`)) {
      return;
    }

    try {
      setImpersonating(authorSlug);
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/super/impersonate/${authorSlug}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to impersonate author");
      }

      const data = await response.json();
      localStorage.setItem("original_token", token!);
      localStorage.setItem("token", data.impersonation_token);
      localStorage.setItem("is_impersonating", "true");
      localStorage.setItem("impersonated_author", authorSlug);
      window.location.href = `/admin/author/${authorSlug}`;
    } catch (error) {
      console.error("Impersonation failed:", error);
      alert("Impersonation failed. Please try again.");
    } finally {
      setImpersonating(null);
    }
  };

  return (
    <div className="relative group">
      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 dark:from-gray-800/40 dark:to-gray-900/20 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl" />
      
      <div className="relative">
        {/* Header */}
        <div className="p-6 border-b border-white/20 dark:border-gray-700/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Authors
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {authors.length} authors with completed profiles
              </p>
            </div>
          </div>
        </div>

        {/* Authors List */}
        <div className="p-6">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {authors.map((author) => (
              <div
                key={author.id}
                className="group/item relative p-4 rounded-2xl border border-white/20 dark:border-gray-700/30 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Avatar with glow effect */}
                    <div className="relative">
                      <img
                        src={author.avatar || "/placeholder-avatar.jpg"}
                        alt={author.name}
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-white/50 shadow-lg"
                      />
                      {author.featured && (
                        <div className="absolute -top-1 -right-1">
                          <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {author.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {author.job_title} {author.company && `at ${author.company}`}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <FileText className="w-3 h-3" />
                          {author.articles_count} articles
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          @{author.slug}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Impersonate Button */}
                  <button
                    onClick={() => handleImpersonate(author.slug)}
                    disabled={impersonating === author.slug}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium hover:scale-105 shadow-md"
                  >
                    {impersonating === author.slug ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Switching...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        Impersonate
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {authors.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No authors found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}