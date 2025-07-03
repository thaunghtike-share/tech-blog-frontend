"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Link from "next/link"

export function MinimalHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const API_BASE_URL = "http://192.168.1.131:8000/api"

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([])
        return
      }

      setLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/articles/?search=${encodeURIComponent(searchQuery)}`)
        const data = await res.json()
        setSearchResults(Array.isArray(data.results) ? data.results : data)
      } catch (err) {
        console.error("Search error:", err)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }

    const delayDebounce = setTimeout(() => {
      fetchResults()
    }, 300) // debounce

    return () => clearTimeout(delayDebounce)
  }, [searchQuery])

  const handleClear = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20 relative">
          <Link href="/" className="text-2xl font-light tracking-wide text-gray-900">
            Learn<span className="font-semibold text-green-600">DevOps</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-light">Home</Link>
            <Link href="/articles" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">Articles</Link>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors font-light">Categories</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-light">Contact</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-light">About</Link>
          </nav>

          {/* Search Box */}
          <div className="relative w-64">
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
              >
                <X className="w-4 h-4" />
              </Button>
            )}

            {/* Dropdown */}
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                {searchResults.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    onClick={() => handleClear()}
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            )}

            {/* No matches */}
            {searchQuery && !loading && searchResults.length === 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white shadow-md border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-500">
                No articles found
              </div>
            )}
          </div>

          <Button
            variant="outline"
            className="hidden sm:inline-flex bg-white hover:bg-blue-50 border-blue-200 backdrop-blur-sm text-gray-700 hover:text-blue-600"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </header>
  )
}