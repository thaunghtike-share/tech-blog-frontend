"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MinimalHeader } from "@/components/minimal-header";
import { MinimalBlogList } from "@/components/minimal-blog-list";
import { MinimalFooter } from "@/components/minimal-footer";
import { Search, Filter, X } from "lucide-react";

export default function ArticlesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") || "";
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (localSearch) {
      params.set("search", localSearch);
    } else {
      params.delete("search");
    }

    if (selectedTag) {
      params.set("tags__slug", selectedTag);
    }

    const newUrl = `/articles?${params.toString()}`;
    router.push(newUrl);
  };

  const clearFilters = () => {
    setLocalSearch("");
    setSelectedTag(null);
    router.push("/articles");
  };

  const popularTags = [
    "docker", "kubernetes", "aws", "terraform", "ansible", 
    "jenkins", "git", "linux", "devops", "cicd", "monitoring"
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <MinimalHeader />

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 relative z-10">
        {/* Main Content */}
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