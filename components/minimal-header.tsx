"use client";
import { useEffect, useState, useRef } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, X, Menu, Pencil } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MinimalHeader() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dropdown states
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Timeout refs for delayed closing
  const articlesTimeout = useRef<NodeJS.Timeout | null>(null);
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);
  const learningTimeout = useRef<NodeJS.Timeout | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    return () => {
      if (articlesTimeout.current) clearTimeout(articlesTimeout.current);
      if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
      if (learningTimeout.current) clearTimeout(learningTimeout.current);
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE_URL}/articles/?search=${encodeURIComponent(searchQuery)}`
        );
        if (!res.ok)
          throw new Error(`Error fetching results: ${res.statusText}`);
        const data = await res.json();
        setSearchResults(Array.isArray(data.results) ? data.results : data);
      } catch {
        setSearchResults([]);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    const delayDebounce = setTimeout(() => {
      fetchResults();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError(null);
  };

  const navLinkStyle = (href: string) =>
    `block font-medium text-gray-800 px-3 py-2 rounded-md ${
      pathname === href
        ? "bg-gray-100 shadow-inner"
        : "hover:bg-gray-100 hover:shadow-inner"
    }`;

  // Helper to handle hover open/close with delay and cancellation
  function handleMouseEnter(
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(true);
  }

  function handleMouseLeave(
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      timeoutRef.current = null;
    }, 200);
  }

  return (
    <header className="bg-gray-50 md:bg-white/30 sticky top-0 z-50 md:border-b md:border-gray-200 md:shadow-sm">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden py-2 gap-2 relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-start">
            <img src="/logo.png" alt="Logo" className="h-22 w-auto" />
          </Link>
          {/* Search */}
          <div className="flex-1 px-1 relative">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full text-sm"
              autoComplete="off"
              spellCheck={false}
            />
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                {searchResults.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`} // changed here to slug
                    className="block px-4 py-2 text-sm hover:bg-blue-50"
                    onClick={() => {
                      handleClear();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* Write Button */}
          <Link
            href="/admin/new-article"
            className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Pencil className="w-5 h-5" />
          </Link>
          {/* Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-3 pb-4 text-sm z-10 relative">
            <Link href="/" className={navLinkStyle("/")}>
              Home
            </Link>
            {/* Articles Dropdown */}
            <div>
              <button
                onClick={() => setIsArticlesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 hover:shadow-inner"
              >
                Articles{" "}
                <ChevronDown
                  className={`${isArticlesOpen ? "rotate-180" : ""} w-4 h-4`}
                />
              </button>
              {isArticlesOpen && (
                <div className="ml-4 mt-2 space-y-1 text-gray-600 border-l border-blue-200 pl-3">
                  <Link href="/articles" className={navLinkStyle("/articles")}>
                    All Articles
                  </Link>
                  <Link
                    href="/categories"
                    className={navLinkStyle("/categories")}
                  >
                    Categories
                  </Link>
                  <Link href="/authors" className={navLinkStyle("/authors")}>
                    Authors
                  </Link>
                </div>
              )}
            </div>
            {/* Services Dropdown */}
            <div>
              <button
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 hover:shadow-inner"
              >
                Services{" "}
                <ChevronDown
                  className={`${isServicesOpen ? "rotate-180" : ""} w-4 h-4`}
                />
              </button>
              {isServicesOpen && (
                <div className="ml-4 mt-2 space-y-1 text-gray-600 border-l border-indigo-200 pl-3">
                  <Link
                    href="/services/cloud-migration"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Cloud-Native Migration
                  </Link>
                  <Link
                    href="/services/infrastructure-automation"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Infrastructure as Code
                  </Link>
                  <Link
                    href="/services/part-time-devops-support"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Part Time DevOps Support
                  </Link>
                  <Link
                    href="/services/web-development"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Website Development
                  </Link>
                </div>
              )}
            </div>
            <Link href="/about" className={navLinkStyle("/about")}>
              About
            </Link>
          </div>
        )}
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-26 relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-38 w-auto" />
          </Link>
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {/* Articles Dropdown */}
            <div
              className="relative"
              onMouseEnter={() =>
                handleMouseEnter(setIsArticlesOpen, articlesTimeout)
              }
              onMouseLeave={() =>
                handleMouseLeave(setIsArticlesOpen, articlesTimeout)
              }
            >
              <button className="flex items-center hover:text-blue-600 cursor-pointer select-none">
                Articles <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isArticlesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50 py-2"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsArticlesOpen, articlesTimeout)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsArticlesOpen, articlesTimeout)
                  }
                >
                  <Link
                    href="/articles"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    All Articles
                  </Link>
                  <Link
                    href="/categories"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/authors"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Authors
                  </Link>
                </div>
              )}
            </div>
            {/* Learning Dropdown */}
            <div
              className="relative"
              onMouseEnter={() =>
                handleMouseEnter(setIsLearningOpen, learningTimeout)
              }
              onMouseLeave={() =>
                handleMouseLeave(setIsLearningOpen, learningTimeout)
              }
            >
              <button className="flex items-center hover:text-blue-600 cursor-pointer select-none">
                Resources <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isLearningOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 py-2"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsLearningOpen, learningTimeout)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsLearningOpen, learningTimeout)
                  }
                >
                  <Link
                    href="/learn-devops-on-youtube"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    YouTube
                  </Link>
                  <Link
                    href="/learn-devops-on-udemy"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Udemy Free Course
                  </Link>
                  <Link
                    href="/recommended-paid-courses"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Recommended Paid Course
                  </Link>
                  <Link
                    href="/free-labs"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Free Labs
                  </Link>
                </div>
              )}
            </div>
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() =>
                handleMouseEnter(setIsServicesOpen, servicesTimeout)
              }
              onMouseLeave={() =>
                handleMouseLeave(setIsServicesOpen, servicesTimeout)
              }
            >
              <button className="flex items-center hover:text-blue-600 cursor-pointer select-none">
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50 py-2"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsServicesOpen, servicesTimeout)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsServicesOpen, servicesTimeout)
                  }
                >
                  <Link
                    href="/services/cloud-migration"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Cloud-Native Migration
                  </Link>
                  <Link
                    href="/services/infrastructure-automation"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Infrastructure as Code
                  </Link>
                  <Link
                    href="/services/part-time-devops-support"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Part Time DevOps Support
                  </Link>
                  <Link
                    href="/services/web-development"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Website Development
                  </Link>
                </div>
              )}
            </div>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
          </nav>
          {/* Desktop Search + Write Button */}
          <div className="flex items-center space-x-3">
            <div className="relative w-56">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 border-2 md:border-2 border-gray-600 md:border-gray-400 rounded-full text-sm"
              />
              {searchQuery && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleClear}
                  className="absolute top-0 right-1 text-gray-700 hover:bg-transparent hover:text-red-700"
                  aria-label="Clear"
                >
                  <X className="w-2 h-2" />
                </Button>
              )}
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                  {searchResults.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="block px-4 py-2 text-sm hover:bg-blue-50"
                      onClick={handleClear}
                    >
                      {article.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/admin/new-article"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
            >
              <Pencil className="w-4 h-4" />
              Write
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}