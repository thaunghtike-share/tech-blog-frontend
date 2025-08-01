"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalBlogList } from "@/components/minimal-blog-list";
import { MinimalSidebar } from "@/components/minimal-sidebar";
import { MinimalFooter } from "@/components/minimal-footer";

export default function ArticlesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") || "";
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const tagFromUrl = searchParams.get("tags__slug");
    setSelectedTag(tagFromUrl);
  }, [searchParams]);

  const updateTagFilter = (tagSlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tagSlug) {
      params.set("tags__slug", tagSlug);
    } else {
      params.delete("tags__slug");
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    const newUrl = `/articles?${params.toString()}`;
    router.push(newUrl);
    setSelectedTag(tagSlug);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      {/* Enhanced Visibility Messenger Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Messenger Support"
        className="fixed top-[70%] right-1 z-50 group"
      >
        <div className="flex items-center gap-2 relative">
          {/* Glow effect (more subtle) */}
          <div className="absolute -inset-1 bg-[#5e2ced]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Main button container */}
          <div className="flex items-center gap-3 bg-white/75 border border-gray-200 shadow-[0_5px_20px_-5px_rgba(94,44,237,0.3)] px-4 py-2.5 rounded-full cursor-pointer transition-all duration-400 hover:scale-[1.03] hover:shadow-[0_8px_25px_-5px_rgba(94,44,237,0.4)]">
            {/* Enhanced icon container */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Halo effect */}
              <div className="absolute w-full h-full bg-[#5e2ced] rounded-full opacity-10 group-hover:opacity-15 group-hover:scale-110 transition-all duration-500"></div>

              {/* Larger, clearer icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 240 240"
                className="w-8 h-8 relative z-10" // Increased from w-7 h-7
              >
                {/* Solid purple circle with better contrast */}
                <circle cx="120" cy="120" r="120" fill="#5e2ced" />
                {/* Larger white message icon */}
                <path
                  fill="#fff"
                  d="M158.8 80.2l-37.8 44.3-19.2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z"
                  transform="scale(1.05)" // Slightly larger message icon
                />
              </svg>
            </div>

            {/* Text label */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#5e2ced] font-medium text-sm tracking-wider">
              Chat?
            </span>

            {/* Arrow indicator */}
            <div className="ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Animated dots - now more visible */}
          <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#5e2ced] rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: "0 0 4px rgba(94,44,237,0.5)",
                }}
              />
            ))}
          </div>
        </div>
      </a>

      <MinimalHeader />

      <main className="md:-mt-1 -mt-10 max-w-7xl mx-auto px-4 pt-6 pb-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-4 rounded-xl p-4 sm:p-6">
            <MinimalBlogList
              searchQuery={searchQuery}
              filterTagSlug={selectedTag}
            />
          </div>

          {/* Sidebar hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-2 mt-30">
            <MinimalSidebar onTagClick={updateTagFilter} />
          </aside>
        </div>
      </main>
      <div className="-mt-4 md:-mt-5">
        <MinimalFooter />
      </div>
    </div>
  );
}