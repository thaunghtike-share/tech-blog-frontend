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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Timeout refs for delayed closing
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);
  const resourcesTimeout = useRef<NodeJS.Timeout | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  useEffect(() => {
    return () => {
      if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
      if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
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
    `block text-black px-3 py-2 rounded-md font-medium ${
      pathname === href
        ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-inner"
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden py-3 gap-3 relative z-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-start group flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-16 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 relative min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full text-sm pl-10 pr-8 bg-white border-gray-200 text-black placeholder-gray-500 font-medium"
                autoComplete="off"
                spellCheck={false}
              />
              {searchQuery && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleClear}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black hover:bg-gray-100 w-6 h-6"
                  aria-label="Clear"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>

            {searchQuery && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                {searchResults.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="block px-4 py-3 text-sm text-black hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-all font-medium"
                    onClick={() => {
                      handleClear();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div>{article.title}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Write Button - Mobile */}
          <Link
            href="/admin/new-article"
            className="inline-flex items-center justify-center p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-blue-500/25 flex-shrink-0 ml-2 font-medium"
          >
            <Pencil className="w-4 h-4" />
          </Link>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-black hover:text-black hover:bg-gray-100 rounded-full transition-all flex-shrink-0 ml-1 font-medium"
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
          <div className="md:hidden mt-3 space-y-1 pb-4 text-sm z-10 relative bg-white border border-gray-200 rounded-xl shadow-lg p-3">
            <Link
              href="/"
              className={`${navLinkStyle("/")} text-black bg-gray-50`}
            >
              Home
            </Link>

            {/* Articles Link - Direct */}
            <Link
              href="/articles"
              className={`${navLinkStyle("/articles")} text-black bg-gray-50`}
            >
              Articles
            </Link>

            {/* DevOps Playground Link */}
            <Link
              href="/devops-playground"
              className={`${navLinkStyle(
                "/devops-playground"
              )} text-black bg-gray-50`}
            >
              DevOps Playground
            </Link>

            {/* Resources Dropdown */}
            <div className="bg-gray-50 rounded-lg">
              <button
                onClick={() => setIsResourcesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-md hover:bg-gray-100 transition-all text-black font-medium"
              >
                Resources
                <ChevronDown
                  className={`${
                    isResourcesOpen ? "rotate-180" : ""
                  } w-4 h-4 transition-transform`}
                />
              </button>
              {isResourcesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-green-500 pl-3 pb-2">
                  <Link
                    href="/learn-devops-on-youtube"
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-all font-medium"
                  >
                    Learn DevOps on YouTube
                  </Link>
                  <Link
                    href="/online-free-courses"
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-all font-medium"
                  >
                    Online Free Courses
                  </Link>
                  <Link
                    href="/free-labs"
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-all font-medium"
                  >
                    Free Labs
                  </Link>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="bg-gray-50 rounded-lg">
              <button
                onClick={() => setIsServicesOpen((prev) => !prev)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-md hover:bg-gray-100 transition-all text-black font-medium"
              >
                Services
                <ChevronDown
                  className={`${
                    isServicesOpen ? "rotate-180" : ""
                  } w-4 h-4 transition-transform`}
                />
              </button>
              {isServicesOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-purple-500 pl-3 pb-2">
                  <Link
                    href="/services/cloud-migration"
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-all font-medium"
                  >
                    Cloud Migration
                  </Link>
                  <Link
                    href="/services/infrastructure-automation"
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-all font-medium"
                  >
                    Infrastructure as Code
                  </Link>
                  <Link
                    href="/services/part-time-devops-support"
                    className="block px-4 py-2 text-black hover:bg-gray-100 rounded-md transition-all font-medium"
                  >
                    DevOps Support
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`${navLinkStyle("/about")} text-black bg-gray-50`}
            >
              About Me
            </Link>
          </div>
        )}

        {/* Desktop Header - Updated with medium font weight */}
        <div className="hidden md:flex items-center justify-between h-25 relative z-10">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-200 to-purple-200 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <img
                src="/logo.png"
                alt="Logo"
                className="h-37 w-35 relative z-10 transition-transform group-hover:scale-105"
              />
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
          </Link>

          {/* Navigation - Centered */}
          <nav className="flex items-center space-x-1 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-400/50 px-2 py-1 shadow-sm">
            <Link
              href="/"
              className={`px-5 py-2.5 rounded-xl transition-all duration-200 relative group font-medium ${
                pathname === "/"
                  ? "text-black bg-gradient-to-r from-blue-100 to-purple-100 shadow-md"
                  : "text-black hover:text-black hover:bg-gray-100"
              }`}
            >
              <span className="relative z-10">Home</span>
            </Link>

            {/* Articles Link - Direct */}
            <Link
              href="/articles"
              className={`px-5 py-2.5 rounded-xl transition-all duration-200 relative group font-medium ${
                pathname.includes("/articles")
                  ? "text-black bg-gradient-to-r from-blue-100 to-purple-100 shadow-md"
                  : "text-black hover:text-black hover:bg-gray-100"
              }`}
            >
              <span className="relative z-10">Articles</span>
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() =>
                handleMouseEnter(setIsResourcesOpen, resourcesTimeout)
              }
              onMouseLeave={() =>
                handleMouseLeave(setIsResourcesOpen, resourcesTimeout)
              }
            >
              <button
                className={`flex items-center px-5 py-2.5 rounded-xl transition-all duration-200 relative group font-medium ${
                  pathname.includes("/learn-devops-on-youtube") ||
                  pathname.includes("/free-courses") ||
                  pathname.includes("/free-labs")
                    ? "text-black bg-gradient-to-r from-blue-100 to-purple-100 shadow-md"
                    : "text-black hover:text-black hover:bg-gray-100"
                }`}
              >
                <span className="relative z-10">Resources</span>
                <ChevronDown className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:rotate-180" />
              </button>
              {isResourcesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg z-50 py-2"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsResourcesOpen, resourcesTimeout)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsResourcesOpen, resourcesTimeout)
                  }
                >
                  <Link
                    href="/learn-devops-on-youtube"
                    className="block px-4 py-3 text-black hover:text-black hover:bg-gray-50 border-b border-gray-100 transition-all font-medium"
                  >
                    Learn DevOps on YouTube
                  </Link>
                  <Link
                    href="/free-courses"
                    className="block px-4 py-3 text-black hover:text-black hover:bg-gray-50 border-b border-gray-100 transition-all font-medium"
                  >
                    Free Courses
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
                className={`flex items-center px-5 py-2.5 rounded-xl transition-all duration-200 relative group font-medium ${
                  pathname.includes("/services")
                    ? "text-black bg-gradient-to-r from-blue-100 to-purple-100 shadow-md"
                    : "text-black hover:text-black hover:bg-gray-100"
                }`}
              >
                <span className="relative z-10">Services</span>
                <ChevronDown className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:rotate-180" />
              </button>
              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg z-50 py-2"
                  onMouseEnter={() =>
                    handleMouseEnter(setIsServicesOpen, servicesTimeout)
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(setIsServicesOpen, servicesTimeout)
                  }
                >
                  <Link
                    href="/services/cloud-migration"
                    className="block px-4 py-3 text-black hover:text-black hover:bg-gray-50 border-b border-gray-100 transition-all font-medium"
                  >
                    Cloud Migration
                  </Link>
                  <Link
                    href="/services/infrastructure-automation"
                    className="block px-4 py-3 text-black hover:text-black hover:bg-gray-50 border-b border-gray-100 transition-all font-medium"
                  >
                    Infrastructure as Code
                  </Link>
                  <Link
                    href="/services/part-time-devops-support"
                    className="block px-4 py-3 text-black hover:text-black hover:bg-gray-50 transition-all font-medium"
                  >
                    DevOps Support
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-5 py-2.5 rounded-xl transition-all duration-200 relative group font-medium ${
                pathname === "/about"
                  ? "text-black bg-gradient-to-r from-blue-100 to-purple-100 shadow-md"
                  : "text-black hover:text-black hover:bg-gray-100"
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-4 h-4 z-10" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full pl-10 pr-8 bg-white border-gray-400 text-black placeholder-gray-500 transition-all group-hover:border-gray-300 font-medium"
                />
                {searchQuery && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleClear}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black hover:bg-gray-100 w-6 h-6"
                    aria-label="Clear"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {searchQuery && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
                  {searchResults.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="block px-4 py-3 text-black hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-all group font-medium"
                      onClick={handleClear}
                    >
                      <div className="group-hover:text-blue-700 transition-colors">
                        {article.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Write Button */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
              <Link
                href="/admin/new-article"
                className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-700 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/25 border border-blue-500/30 font-medium"
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