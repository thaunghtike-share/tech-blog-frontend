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
  Server,
  Container,
  GitBranch,
  Terminal,
  Zap,
  Cloud,
  Box,
  Code,
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
  const [mounted, setMounted] = useState(false);

  const floatingIconPositions = [
    { left: 5, top: 10 },
    { left: 85, top: 15 },
    { left: 25, top: 25 },
    { left: 70, top: 35 },
    { left: 10, top: 50 },
    { left: 90, top: 45 },
    { left: 40, top: 60 },
    { left: 60, top: 75 },
    { left: 15, top: 80 },
    { left: 80, top: 85 },
    { left: 30, top: 90 },
    { left: 55, top: 20 },
    { left: 20, top: 40 },
    { left: 75, top: 55 },
    { left: 45, top: 30 },
    { left: 65, top: 65 },
    { left: 35, top: 70 },
    { left: 95, top: 25 },
  ];

  const floatingDotPositions = [
    { left: 8, top: 12 },
    { left: 92, top: 18 },
    { left: 22, top: 28 },
    { left: 78, top: 32 },
    { left: 12, top: 48 },
    { left: 88, top: 52 },
    { left: 35, top: 65 },
    { left: 65, top: 72 },
    { left: 18, top: 85 },
    { left: 82, top: 88 },
    { left: 28, top: 95 },
    { left: 58, top: 22 },
    { left: 38, top: 38 },
    { left: 72, top: 58 },
    { left: 48, top: 78 },
    { left: 15, top: 35 },
    { left: 85, top: 42 },
    { left: 32, top: 15 },
    { left: 68, top: 25 },
    { left: 52, top: 45 },
    { left: 25, top: 68 },
    { left: 75, top: 82 },
    { left: 42, top: 92 },
    { left: 62, top: 8 },
    { left: 95, top: 65 },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      setAuthorsLoading(true);
      // Fetch all authors first - this should be public
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

      // ✅ FIX: Sort authors by articles_count (descending) and take top 3
      const topAuthors = completeAuthors
        .sort((a: AuthorSummary, b: AuthorSummary) => {
          const countA = a.articles_count || 0;
          const countB = b.articles_count || 0;
          return countB - countA; // Descending order - most articles first
        })
        .slice(0, 3) // Take only top 3 authors
        .map((author: AuthorSummary) => ({
          ...author,
          // Keep the actual articles_count from API
          articles_count: author.articles_count || 0,
        }));

      setAuthors(topAuthors);
    } catch (err) {
      console.error("Error fetching authors:", err);
      // Fallback to dummy data if API fails
      setAuthors([
        {
          id: 1,
          name: "Thaung Htike Oo",
          bio: "DevOps engineer with expertise in cloud infrastructure and automation. Passionate about sharing knowledge and helping others grow in the DevOps field.",
          avatar: "/api/placeholder/80/80",
          slug: "thaung-htike-oo",
          featured: true,
          job_title: "Senior DevOps Engineer",
          company: "Tech Solutions Inc",
          linkedin: "https://linkedin.com/in/thaunghtikeoo",
          articles_count: 3,
        },
        {
          id: 2,
          name: "Sandar Win",
          bio: "Cloud specialist focused on AWS and Kubernetes. Enjoys writing about real-world challenges and solutions in cloud-native technologies.",
          avatar: "/api/placeholder/80/80",
          slug: "sandar-win",
          featured: true,
          job_title: "Cloud Architect",
          company: "Cloud Innovations",
          linkedin: "https://linkedin.com/in/sandarwin",
          articles_count: 2,
        },
        {
          id: 3,
          name: "Aung Myint Myat",
          bio: "Infrastructure as Code enthusiast with deep Terraform knowledge. Believes in automating everything and sharing best practices with the community.",
          avatar: "/api/placeholder/80/80",
          slug: "aung-myint-myat",
          featured: true,
          job_title: "DevOps Lead",
          company: "InfraTech",
          linkedin: "https://linkedin.com/in/aungmyintmyat",
          articles_count: 4,
        },
      ]);
    } finally {
      setAuthorsLoading(false);
    }
  };

  // Loading state
  if (authorsLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300 relative overflow-x-hidden">
        <MinimalHeader />
        <main className="max-w-7xl mx-auto px-4 py-20">
          {/* Simple Elegant Loading */}
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {/* Animated Logo Container */}
            <div className="relative">
              {/* Outer Ring Animation */}
              <div className="w-32 h-32 rounded-full border-4 border-blue-200/50 dark:border-blue-800/30 animate-spin">
                {/* Logo Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-blue-200/50 dark:border-blue-800/30 border-t-blue-500 dark:border-t-blue-400 animate-spin">
                    <img
                      src="/logo.png"
                      alt="KodeKloud"
                      className="w-16 h-16 object-contain animate-pulse"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <MinimalFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] relative overflow-x-hidden transition-colors duration-300">
      <div className="relative z-10">
        <MinimalHeader />

        <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 relative z-10">
          <section className="w-full mb-20">
            {/* Header - Keeping your original text exactly as you had it */}
            <div className="max-w-3xl mb-16">
              <div className="h-1 w-24 bg-gradient-to-r from-sky-600 to-blue-600 rounded-full mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-gray-100 mb-6 leading-tight">
                This Week's
                <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  Featured Authors
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Get insights from professionals who work with cutting-edge
                technologies daily. Real-world experience, practical knowledge,
                and proven methodologies.
              </p>
            </div>

            {/* Authors Grid */}
            {authors.length > 0 ? (
              <div className="space-y-12">
                {authors.map((author) => (
                  <div
                    key={author.id}
                    className="group cursor-pointer transition-all duration-300 hover:translate-x-2"
                    onClick={() => router.push(`/authors/${author.slug}`)}
                  >
                    <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                      {/* Author Avatar */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:scale-105">
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
                            <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100 mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                              {author.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 px-4 py-2 rounded-full border border-sky-100 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-medium text-sm">
                                <TrendingUp className="w-4 h-4" />
                                {author.articles_count} article
                                {author.articles_count !== 1 ? "s" : ""}
                              </span>
                              <span className="text-sky-600 dark:text-sky-400 font-medium text-base">
                                {author.job_title} at {author.company}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                            <span>View Profile</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Full Bio */}
                        <div className="mb-4">
                          <p className="text-black-400 dark:text-gray-300 leading-relaxed text-lg">
                            {author.bio}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent group-last-of-type:via-transparent"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=""></div>
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

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
          }
          50% {
            transform: translateY(-10px) translateX(-10px) rotate(180deg);
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(270deg);
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
      `}</style>
    </div>
  );
}
