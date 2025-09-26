"use client";
import { useEffect, useState, useRef } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, X, Menu, Pencil, Search, Sparkles } from "lucide-react";
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
        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-inner"
        : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-inner"
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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-2xl shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,100,100,0.1)_50%,transparent_75%)] bg-[length:4px_4px]" />

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden py-3 gap-3 relative z-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-start group flex-shrink-0"
          >
            <img
              src="/newlogo.png"
              alt="Logo"
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 relative min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full text-sm pl-10 pr-8 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                autoComplete="off"
                spellCheck={false}
              />
              {searchQuery && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleClear}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700 w-6 h-6"
                  aria-label="Clear"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>

            {searchQuery && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                {searchResults.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="block px-4 py-3 text-sm text-white hover:bg-gray-700 border-b border-gray-600 last:border-b-0 transition-all"
                    onClick={() => {
                      handleClear();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="font-medium">{article.title}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Write Button - Mobile */}
          <Link
            href="/admin/new-article"
            className="inline-flex items-center justify-center p-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-amber-500/25 flex-shrink-0 ml-2"
          >
            <Pencil className="w-4 h-4" />
          </Link>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-all flex-shrink-0 ml-1"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 space-y-1 pb-4 text-sm z-10 relative bg-gray-800 border border-gray-600 rounded-xl shadow-2xl p-3">
            <Link
              href="/"
              className={`${navLinkStyle("/")} text-white bg-gray-700`}
            >
              Home
            </Link>

            {/* Articles Dropdown */}
            <div className="bg-gray-750 rounded-lg">
              <button
                onClick={() => setIsArticlesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-md hover:bg-gray-700 transition-all text-white"
              >
                Articles
                <ChevronDown
                  className={`${
                    isArticlesOpen ? "rotate-180" : ""
                  } w-4 h-4 transition-transform`}
                />
              </button>
              {isArticlesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-blue-500/30 pl-3 pb-2">
                  <Link
                    href="/articles"
                    className={`${navLinkStyle("/articles")} text-gray-200`}
                  >
                    All Articles
                  </Link>
                  <Link
                    href="/categories"
                    className={`${navLinkStyle("/categories")} text-gray-200`}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/authors"
                    className={`${navLinkStyle("/authors")} text-gray-200`}
                  >
                    Authors
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="bg-gray-750 rounded-lg">
              <button
                onClick={() => setIsLearningOpen((prev) => !prev)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-md hover:bg-gray-700 transition-all text-white"
              >
                Resources
                <ChevronDown
                  className={`${
                    isLearningOpen ? "rotate-180" : ""
                  } w-4 h-4 transition-transform`}
                />
              </button>
              {isLearningOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-green-500/30 pl-3 pb-2">
                  <Link
                    href="/learn-devops-on-youtube"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-md transition-all"
                  >
                    YouTube
                  </Link>
                  <Link
                    href="/learn-devops-on-udemy"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-md transition-all"
                  >
                    Udemy Free Course
                  </Link>
                  <Link
                    href="/free-labs"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-md transition-all"
                  >
                    Free Labs
                  </Link>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="bg-gray-750 rounded-lg">
              <button
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-md hover:bg-gray-700 transition-all text-white"
              >
                Services
                <ChevronDown
                  className={`${
                    isServicesOpen ? "rotate-180" : ""
                  } w-4 h-4 transition-transform`}
                />
              </button>
              {isServicesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-purple-500/30 pl-3 pb-2">
                  <Link
                    href="/services/cloud-migration"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-md transition-all"
                  >
                    Cloud Migration
                  </Link>
                  <Link
                    href="/services/infrastructure-automation"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-md transition-all"
                  >
                    Infrastructure as Code
                  </Link>
                  <Link
                    href="/services/part-time-devops-support"
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-md transition-all"
                  >
                    DevOps Support
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`${navLinkStyle("/about")} text-white bg-gray-700`}
            >
              About Me
            </Link>
          </div>
        )}

        {/* Desktop Header - Completely Redesigned */}
        <div className="hidden md:flex items-center justify-between h-20 relative z-10">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <img
                src="/newlogo.png"
                alt="Logo"
                className="h-32 w-32 relative z-10 transition-transform group-hover:scale-105"
              />
            </div>
            <div className="h-8 w-px bg-gray-600"></div>
          </Link>

          {/* Navigation - Centered */}
          <nav className="flex items-center space-x-1 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 px-2 py-1">
            <Link
              href="/"
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 relative group ${
                pathname === "/"
                  ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <span className="relative z-10">Home</span>
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
              <button
                className={`flex items-center px-5 py-2.5 rounded-xl font-medium transition-all duration-200 relative group ${
                  pathname.includes("/articles") ||
                  pathname.includes("/categories") ||
                  pathname.includes("/authors")
                    ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <span className="relative z-10">Articles</span>
                <ChevronDown className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:rotate-180" />
              </button>
              {isArticlesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-48 bg-gray-800/95 backdrop-blur-xl border border-gray-600 rounded-xl shadow-2xl z-50 py-2"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsArticlesOpen, articlesTimeout)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsArticlesOpen, articlesTimeout)
                  }
                >
                  <Link
                    href="/articles"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 border-b border-gray-600 transition-all"
                  >
                    All Articles
                  </Link>
                  <Link
                    href="/categories"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 border-b border-gray-600 transition-all"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/authors"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                  >
                    Authors
                  </Link>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() =>
                handleMouseEnter(setIsLearningOpen, learningTimeout)
              }
              onMouseLeave={() =>
                handleMouseLeave(setIsLearningOpen, learningTimeout)
              }
            >
              <button
                className={`flex items-center px-5 py-2.5 rounded-xl font-medium transition-all duration-200 relative group ${
                  pathname.includes("/learn") || pathname.includes("/free-labs")
                    ? "text-white bg-gradient-to-r from-green-500/20 to-emerald-500/20 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <span className="relative z-10">Resources</span>
                <ChevronDown className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:rotate-180" />
              </button>
              {isLearningOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-56 bg-gray-800/95 backdrop-blur-xl border border-gray-600 rounded-xl shadow-2xl z-50 py-2"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsLearningOpen, learningTimeout)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsLearningOpen, learningTimeout)
                  }
                >
                  <Link
                    href="/learn-devops-on-youtube"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 border-b border-gray-600 transition-all"
                  >
                    YouTube Tutorials
                  </Link>
                  <Link
                    href="/free-online-courses"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 border-b border-gray-600 transition-all"
                  >
                    Free Online Courses
                  </Link>
                  <Link
                    href="/recommended-paid-courses"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 border-b border-gray-600 transition-all"
                  >
                    Recommended Paid Courses
                  </Link>
                  <Link
                    href="/free-labs"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                  >
                    Free DevOps Playgrounds
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
              <button
                className={`flex items-center px-5 py-2.5 rounded-xl font-medium transition-all duration-200 relative group ${
                  pathname.includes("/services")
                    ? "text-white bg-gradient-to-r from-orange-500/20 to-red-500/20 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <span className="relative z-10">Services</span>
                <ChevronDown className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:rotate-180" />
              </button>
              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-64 bg-gray-800/95 backdrop-blur-xl border border-gray-600 rounded-xl shadow-2xl z-50 py-2"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsServicesOpen, servicesTimeout)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsServicesOpen, servicesTimeout)
                  }
                >
                  <Link
                    href="/services/cloud-migration"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 border-b border-gray-600 transition-all"
                  >
                    Cloud Migration
                  </Link>
                  <Link
                    href="/services/infrastructure-automation"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 border-b border-gray-600 transition-all"
                  >
                    Infrastructure as Code
                  </Link>
                  <Link
                    href="/services/part-time-devops-support"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                  >
                    DevOps Support
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 relative group ${
                pathname === "/about"
                  ? "text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <span className="relative z-10">About</span>
            </Link>
          </nav>

          {/* Right Section - Search + Write Button */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative w-64">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full pl-10 pr-8 bg-gray-800 border-gray-600 text-white placeholder-gray-400 transition-all group-hover:border-gray-500"
                />
                {searchQuery && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleClear}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white hover:bg-gray-700 w-6 h-6"
                    aria-label="Clear"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {searchQuery && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl max-h-72 overflow-y-auto">
                  {searchResults.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="block px-4 py-3 text-white hover:bg-gray-700 border-b border-gray-600 last:border-b-0 transition-all group"
                      onClick={handleClear}
                    >
                      <div className="font-medium group-hover:text-blue-300 transition-colors">
                        {article.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Write Button - Completely Redesigned */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              <Link
                href="/admin/new-article"
                className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/25 border border-amber-400/30"
              >
                <Sparkles className="w-4 h-4" />
                Publish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
