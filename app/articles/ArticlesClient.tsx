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
          <aside className="hidden lg:block lg:col-span-2">
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