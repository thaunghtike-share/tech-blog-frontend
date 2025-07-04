"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export function MinimalHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isArticlesOpen, setIsArticlesOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const { theme, setTheme } = useTheme()
  const API_BASE_URL = "http://192.168.100.7:8000/api"

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([])
        setError(null)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`${API_BASE_URL}/articles/?search=${encodeURIComponent(searchQuery)}`)
        if (!res.ok) throw new Error(`Error fetching results: ${res.statusText}`)
        const data = await res.json()
        setSearchResults(Array.isArray(data.results) ? data.results : data)
      } catch (err: any) {
        setSearchResults([])
        setError("Failed to fetch results. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    const delayDebounce = setTimeout(() => {
      fetchResults()
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchQuery])

  const handleClear = () => {
    setSearchQuery("")
    setSearchResults([])
    setError(null)
  }

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-blue-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-37 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-gray-800 dark:text-gray-100 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>

            {/* Articles Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsArticlesOpen(true)}
              onMouseLeave={() => setIsArticlesOpen(false)}
            >
              <button
                className="flex items-center hover:text-blue-600"
                aria-expanded={isArticlesOpen}
              >
                Articles <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isArticlesOpen && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50 py-2">
                  <Link href="/articles" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">All Articles</Link>
                  <Link href="/categories" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">Categories</Link>
                  <Link href="/tags" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">Tags</Link>
                  <Link href="/authors" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">Authors</Link>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="flex items-center hover:text-blue-600"
                aria-expanded={isServicesOpen}
              >
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50 py-2">
                  <Link href="/services/devops-as-a-service" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">DevOps as a Service</Link>
                  <Link href="/services/cloud-migration" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">Cloud-Native Migration</Link>
                  <Link href="/services/infra-as-code" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">Infrastructure as Code</Link>
                  <Link href="/services/consulting" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">DevOps Consulting</Link>
                  <Link href="/services/website" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700">Website Development</Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
          </nav>

          {/* Search + Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative w-56">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 dark:bg-gray-800 dark:text-gray-100"
              />
              {loading && (
                <div className="absolute top-2 right-8 animate-spin">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </div>
              )}
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
              {/* Search Results */}
              {searchQuery && searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 rounded-lg max-h-60 overflow-y-auto">
                  {searchResults.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.id}`}
                      className="block px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-gray-700"
                      onClick={handleClear}
                    >
                      {article.title}
                    </Link>
                  ))}
                </div>
              )}
              {searchQuery && !loading && searchResults.length === 0 && !error && (
                <div className="absolute z-50 w-full mt-2 px-4 py-2 text-sm text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded">
                  No articles found
                </div>
              )}
              {error && (
                <div className="absolute z-50 w-full mt-2 bg-red-100 text-red-700 dark:bg-red-200 shadow-md border border-red-300 rounded-lg px-4 py-2 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Subscribe */}
            <Button className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-sm px-4 py-2 rounded-md shadow-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}