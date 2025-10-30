"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalBlogList } from "@/components/minimal-blog-list";
import { MinimalFooter } from "@/components/minimal-footer";
import { Users, Linkedin, BookOpen, ArrowRight, Star } from "lucide-react";

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
            const authorRes = await fetch(`${API_BASE_URL}/authors/${author.slug}/details`);
            if (authorRes.ok) {
              const authorData = await authorRes.json();
              return {
                ...author,
                articles_count: authorData.articles?.length || 0
              };
            }
          } catch (err) {
            console.error(`Error fetching details for author ${author.slug}:`, err);
          }
          return {
            ...author,
            articles_count: 0
          };
        })
      );

      // Filter authors to only show those with at least 1 article
      const authorsWithArticles = authorsWithCounts.filter(author => 
        author.articles_count && author.articles_count > 0
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
                Meet Our Experts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              Learn from Industry
              <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                DevOps Experts
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Get insights from professionals who work with cutting-edge technologies daily. 
              Real-world experience, practical knowledge, and proven methodologies.
            </p>
          </div>

          {/* Authors Grid */}
          {authorsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-2xl border border-gray-200 overflow-hidden p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-10 bg-gray-200 rounded w-28"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : authors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authors.map((author) => (
                <div
                  key={author.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group hover:border-sky-200"
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Author Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden group-hover:border-sky-50 transition-colors duration-300">
                          <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        {author.linkedin && (
                          <a
                            href={author.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute -bottom-1 -right-1 bg-sky-600 p-2 rounded-full shadow-lg hover:bg-sky-700 transition-all duration-300 hover:scale-110"
                          >
                            <Linkedin className="w-4 h-4 text-white" />
                          </a>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-black text-xl leading-tight mb-2 group-hover:text-sky-600 transition-colors duration-300">
                          <a 
                            href={`/authors/${author.slug}`} 
                            className="hover:underline decoration-2 decoration-sky-600"
                          >
                            {author.name}
                          </a>
                        </h3>
                        <p className="text-sm text-sky-600 font-semibold line-clamp-1 bg-sky-50 px-3 py-1 rounded-full inline-block">
                          {author.job_title} at {author.company}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="mb-6 flex-grow">
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {author.bio}
                      </p>
                    </div>

                    {/* Stats & Action */}
                    <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm font-semibold text-sky-700">
                        <span>
                          {author.articles_count || 0} {author.articles_count === 1 ? 'Article Published' : 'Articles Published'}
                        </span>
                      </div>
                      <a
                        href={`/authors/${author.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm group/btn hover:from-sky-700 hover:to-blue-700"
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
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
                We're bringing industry experts to share their DevOps knowledge and real-world experiences with you.
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