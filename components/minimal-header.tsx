"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, X, Menu, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MinimalHeader() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLearningOpen, setIsLearningOpen] = useState(false);
  const [articlesTimeout, setArticlesTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [servicesTimeout, setServicesTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [learningTimeout, setLearningTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const API_BASE_URL = "http://192.168.1.131:8000/api";
  const MAILCHIMP_SIGNUP_URL = "http://eepurl.com/jjolCI";

  useEffect(() => {
    return () => {
      if (articlesTimeout) clearTimeout(articlesTimeout);
      if (servicesTimeout) clearTimeout(servicesTimeout);
      if (learningTimeout) clearTimeout(learningTimeout);
    };
  }, [articlesTimeout, servicesTimeout, learningTimeout]);

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

  return (
    <header className="bg-gray-50 sticky top-0 z-50 md:border-b md:border-gray-200 md:shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm36 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden py-2 gap-2 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-start">
            <img src="/logo.png" alt="Logo" className="h-28 w-auto" />
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
            {/* Show search results dropdown on mobile */}
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                {searchResults.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
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
            {/* No clear (X) button on mobile as requested */}
          </div>

          {/* Bell */}
          <button
            className="p-2 rounded-full hover:bg-blue-50 text-blue-600 hover:shadow-md"
            onClick={() =>
              window.open(
                MAILCHIMP_SIGNUP_URL,
                "_blank",
                "width=500,height=600"
              )
            }
          >
            <Bell className="w-5 h-5" />
          </button>

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
          <div className="md:hidden mt-3 space-y-4 pb-6 border-t pt-4 text-sm">
            <Link href="/" className={navLinkStyle("/")}>
              Home
            </Link>
            <div>
              <button
                onClick={() => setIsArticlesOpen(!isArticlesOpen)}
                className="flex items-center justify-between w-full font-medium text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100 hover:shadow-inner"
              >
                Articles{" "}
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isArticlesOpen ? "rotate-180" : ""
                  }`}
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
            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between w-full font-medium text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100 hover:shadow-inner"
              >
                Services{" "}
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isServicesOpen && (
                <div className="ml-4 mt-2 space-y-1 text-gray-600 border-l border-indigo-200 pl-3">
                  <Link
                    href="/services/monolithic-to-cloud-native-migration"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Cloud-Native Migration
                  </Link>
                  <Link
                    href="/services/infra-as-code"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Infrastructure as Code
                  </Link>
                  <Link
                    href="/services/website"
                    className="block px-4 py-2 hover:bg-blue-50"
                  >
                    Website Development
                  </Link>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setIsLearningOpen(!isLearningOpen)}
                className="flex items-center justify-between w-full font-medium text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100 hover:shadow-inner"
              >
                Learning{" "}
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isLearningOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isLearningOpen && (
                <div className="ml-4 mt-2 space-y-1 text-gray-600 border-l border-blue-200 pl-3">
                  <Link
                    href="/learn-devops-on-utube"
                    className={navLinkStyle("/learn-devops-on-utube")}
                  >
                    YouTube
                  </Link>
                  <Link
                    href="/learn-free-udemy"
                    className={navLinkStyle("/learn-free-udemy")}
                  >
                    Udemy Free Course
                  </Link>
                  <Link
                    href="/learn-paid-courses"
                    className={navLinkStyle("/learn-paid-courses")}
                  >
                    Recommended Paid Course
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
        <div className="hidden md:flex items-center justify-between h-26 relative">
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
              onMouseEnter={() => {
                if (articlesTimeout) clearTimeout(articlesTimeout);
                setIsArticlesOpen(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => setIsArticlesOpen(false), 200);
                setArticlesTimeout(timeout);
              }}
            >
              <button className="flex items-center hover:text-blue-600">
                Articles <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isArticlesOpen && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg z-50 py-2">
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
              onMouseEnter={() => {
                if (learningTimeout) clearTimeout(learningTimeout);
                setIsLearningOpen(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => setIsLearningOpen(false), 200);
                setLearningTimeout(timeout);
              }}
            >
              <button className="flex items-center hover:text-blue-600">
                Resources <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isLearningOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 py-2">
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
              onMouseEnter={() => {
                if (servicesTimeout) clearTimeout(servicesTimeout);
                setIsServicesOpen(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => setIsServicesOpen(false), 200);
                setServicesTimeout(timeout);
              }}
            >
              <button className="flex items-center hover:text-blue-600">
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50 py-2">
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

          {/* Desktop Search + Bell Icon replaces Subscribe button */}
          <div className="flex items-center space-x-3">
            <div className="relative w-56">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              {searchQuery && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleClear}
                  className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
                  aria-label="Clear"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                  {searchResults.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.id}`}
                      className="block px-4 py-2 text-sm hover:bg-blue-50"
                      onClick={handleClear}
                    >
                      {article.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Bell Icon with Mailchimp popup */}
            <button
              className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-blue-50 transition-shadow"
              onClick={() =>
                window.open(
                  MAILCHIMP_SIGNUP_URL,
                  "_blank",
                  "width=500,height=600"
                )
              }
            >
              <Bell className="w-6 h-7" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}