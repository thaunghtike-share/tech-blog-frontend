"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalBlogList } from "@/components/minimal-blog-list";
import { MinimalFooter } from "@/components/minimal-footer";
import { Users, Linkedin, BookOpen, ArrowRight } from "lucide-react";

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

      setAuthors(completeAuthors.slice(0, 6));
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
        {/* Articles Section */}
        <div className="w-full">
          <div className="rounded-xl">
            <MinimalBlogList
              searchQuery={searchQuery}
              filterTagSlug={selectedTag}
            />
          </div>
        </div>

        {/* Featured Authors Section */}
        <section className="w-full mt-20">
          {/* Header - Right Aligned like CareerPath */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16">
            {/* Empty space on left */}
            <div className="hidden lg:block lg:w-1/2"></div>

            {/* Header content on right */}
            <div className="w-full lg:w-1/2 lg:text-right">
              <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full mb-6 ml-auto"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
                Featured Authors
                <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Experts & Contributors
                </span>
              </h2>
              <p className="text-lg text-black max-w-2xl lg:ml-auto leading-relaxed">
                Learn directly from industry professionals and DevOps experts who share their 
                real-world experience and technical expertise through comprehensive guides and tutorials.
              </p>
            </div>
          </div>

          {/* Authors Grid */}
          {authorsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-lg border border-gray-300 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
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
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-9 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : authors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authors.map((author) => (
                <div
                  key={author.id}
                  className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-md transition-shadow duration-300 group"
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Author Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 rounded-full border-2 border-white shadow-sm overflow-hidden group-hover:border-sky-50 transition-colors">
                          <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
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
                            className="absolute -bottom-1 -right-1 bg-sky-600 p-1.5 rounded-full shadow-sm hover:bg-sky-700 transition-colors"
                          >
                            <Linkedin className="w-3 h-3 text-white" />
                          </a>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-black text-lg leading-tight mb-1 group-hover:text-sky-600 transition-colors">
                          <a 
                            href={`/authors/${author.slug}`} 
                            className="hover:underline decoration-sky-600"
                          >
                            {author.name}
                          </a>
                        </h3>
                        <p className="text-sm text-sky-600 font-medium line-clamp-1">
                          {author.job_title} at {author.company}
                        </p>
                      </div>
                    </div>

                    {/* Full Bio */}
                    <div className="mb-4 flex-grow">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {author.bio}
                      </p>
                    </div>

                    {/* Stats & Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BookOpen className="w-4 h-4 text-sky-500" />
                        <span className="font-medium text-sky-600">
                          {author.articles_count || 0} articles
                        </span>
                      </div>
                      <a
                        href={`/authors/${author.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-sm group/btn"
                      >
                        View Profile
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
              <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-4 mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                Authors Coming Soon
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Our expert authors are preparing their content. Check back soon to learn from industry professionals.
              </p>
            </div>
          )}
        </section>
      </main>

      <MinimalFooter />
    </div>
  );
}