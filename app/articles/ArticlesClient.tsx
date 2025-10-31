"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalBlogList } from "@/components/minimal-blog-list";
import { MinimalFooter } from "@/components/minimal-footer";
import {
  Users,
  Linkedin,
  BookOpen,
  ArrowRight,
  Star,
  BookText,
  TrendingUp,
} from "lucide-react";

interface AuthorSummary {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  slug: string;
  featured: boolean;
  job_title: string;
  company: string;
  linkedin?: string;
  articles_count?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function ArticlesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") || "";
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [authors, setAuthors] = useState<AuthorSummary[]>([]);
  const [authorsLoading, setAuthorsLoading] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setAuthorsLoading(true);
      // Fetch all authors first
      const res = await fetch(`${API_BASE_URL}/authors/`);
      if (!res.ok) throw new Error("Failed to fetch authors");
      const data = await res.json();

      const rawAuthors = Array.isArray(data)
        ? data
        : Array.isArray(data.results)
        ? data.results
        : [];

      const completeAuthors = rawAuthors.filter((author: AuthorSummary) => {
        return (
          author.name?.trim() &&
          author.bio?.trim() &&
          author.avatar?.trim() &&
          author.avatar !== "/placeholder.svg" &&
          author.job_title?.trim() &&
          author.company?.trim() &&
          author.slug?.trim()
        );
      });

      // Fetch article counts for each author and filter those with at least 1 article
      const authorsWithCounts = await Promise.all(
        completeAuthors.slice(0, 6).map(async (author: AuthorSummary) => {
          try {
            const authorRes = await fetch(
              `${API_BASE_URL}/authors/${author.slug}/details`
            );
            if (authorRes.ok) {
              const authorData = await authorRes.json();
              return {
                ...author,
                articles_count: authorData.articles?.length || 0,
              };
            }
          } catch (err) {
            console.error(
              `Error fetching details for author ${author.slug}:`,
              err
            );
          }
          return {
            ...author,
            articles_count: 0,
          };
        })
      );

      // Filter authors to only show those with at least 1 article
      const authorsWithArticles = authorsWithCounts.filter(
        (author) => author.articles_count && author.articles_count > 0
      );

      setAuthors(authorsWithArticles);
    } catch (err) {
      console.error("Error fetching authors:", err);
    } finally {
      setAuthorsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <MinimalHeader />

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 relative z-10">
        {/* Featured Authors Section - Moved to Top */}
        <section className="w-full mb-20">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-50 to-blue-50 px-6 py-3 rounded-full border border-sky-100 mb-6">
              <Star className="w-5 h-5 text-sky-600" />
              <span className="text-sky-700 font-semibold text-sm uppercase tracking-wide">
                Meet Our Authors
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              This Week's
              <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Featured Authors
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Get insights from professionals who work with cutting-edge
              technologies daily. Real-world experience, practical knowledge,
              and proven methodologies.
            </p>
          </div>

          {/* Authors Grid */}
          {authorsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : authors.length > 0 ? (
            <div className="space-y-12">
              {authors
                .sort(
                  (a, b) => (b.articles_count || 0) - (a.articles_count || 0)
                ) // Sort by articles_count descending
                .slice(0, 3) // Take only top 3 authors
                .map((author) => (
                  <div
                    key={author.id}
                    className="group cursor-pointer transition-all duration-300 hover:translate-x-2"
                    onClick={() => router.push(`/authors/${author.slug}`)}
                  >
                    <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                      {/* Author Avatar */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:scale-105">
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/placeholder.svg";
                              }}
                            />
                          </div>
                          {author.linkedin && (
                            <a
                              href={author.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="absolute -bottom-2 -right-2 bg-sky-600 p-2 rounded-full shadow-lg hover:bg-sky-700 transition-all duration-300 hover:scale-110 z-10"
                            >
                              <Linkedin className="w-4 h-4 text-white" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Author Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-2xl text-gray-900 mb-2 group-hover:text-sky-600 transition-colors duration-300">
                              {author.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-50 to-blue-50 px-4 py-2 rounded-full border border-sky-100 text-sky-700 font-medium text-sm">
                                <TrendingUp className="w-4 h-4" />
                                {author.articles_count} article
                                {author.articles_count !== 1 ? "s" : ""}
                              </span>
                              <span className="text-sky-600 font-medium text-base">
                                {author.job_title} at {author.company}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sky-600 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                            <span>View Profile</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Full Bio */}
                        <div className="mb-4">
                          <p className="text-black-400 leading-relaxed text-lg">
                            {author.bio}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent group-last-of-type:via-transparent"></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-100">
              <div className="inline-flex items-center justify-center bg-white rounded-full p-6 mb-6 shadow-lg">
                <Users className="w-12 h-12 text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Expert Authors Coming Soon
              </h3>
              <p className="text-gray-600 max-w-md mx-auto text-lg">
                We're bringing industry experts to share their DevOps knowledge
                and real-world experiences with you.
              </p>
            </div>
          )}
        </section>

        {/* Articles Section */}
        <div className="w-full">
          <div className="rounded-xl">
            <MinimalBlogList
              searchQuery={searchQuery}
              filterTagSlug={selectedTag}
            />
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
