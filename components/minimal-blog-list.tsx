"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Article {
  id: number
  title: string
  content: string
  published_at: string
  category: number | null
  tags: number[]
  author: number
}

interface Author {
  id: number
  name: string
  username?: string
}

interface Tag {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

interface MinimalBlogListProps {
  searchQuery?: string
}

export function MinimalBlogList({ searchQuery = "" }: MinimalBlogListProps) {
 const [articles, setArticles] = useState<Article[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Your Django API URL
  const API_BASE_URL = "http://192.168.1.131:8000/api"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        let url = `${API_BASE_URL}/articles/`
        if (searchQuery && searchQuery.trim() !== "") {
          url += `?search=${encodeURIComponent(searchQuery.trim())}`
        }
        console.log("Fetching articles from:", url)

        const articlesResponse = await fetch(url)
        if (!articlesResponse.ok) {
          throw new Error(`Articles API returned ${articlesResponse.status}: ${articlesResponse.statusText}`)
        }
        const articlesData = await articlesResponse.json()

        if (Array.isArray(articlesData)) {
          setArticles(articlesData)
        } else if (articlesData && Array.isArray(articlesData.results)) {
          setArticles(articlesData.results)
        } else {
          setArticles([])
        }
        setLoading(false)

        // Then fetch supporting data (authors, tags, categories) - optional
        try {
          const authorsResponse = await fetch(`${API_BASE_URL}/authors/`)
          if (authorsResponse.ok) {
            const authorsData = await authorsResponse.json()
            if (Array.isArray(authorsData)) {
              setAuthors(authorsData)
            } else if (authorsData && Array.isArray(authorsData.results)) {
              setAuthors(authorsData.results)
            } else {
              setAuthors([])
            }
          }
        } catch {
          setAuthors([])
        }

        try {
          const tagsResponse = await fetch(`${API_BASE_URL}/tags/`)
          if (tagsResponse.ok) {
            const tagsData = await tagsResponse.json()
            if (Array.isArray(tagsData)) {
              setTags(tagsData)
            } else if (tagsData && Array.isArray(tagsData.results)) {
              setTags(tagsData.results)
            } else {
              setTags([])
            }
          }
        } catch {
          setTags([])
        }

        try {
          const categoriesResponse = await fetch(`${API_BASE_URL}/categories/`)
          if (categoriesResponse.ok) {
            const categoriesData = await categoriesResponse.json()
            if (Array.isArray(categoriesData)) {
              setCategories(categoriesData)
            } else if (categoriesData && Array.isArray(categoriesData.results)) {
              setCategories(categoriesData.results)
            } else {
              setCategories([])
            }
          }
        } catch {
          setCategories([])
        }
      } catch (err) {
        console.error("Error fetching articles:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch articles")
        setLoading(false)
      }
    }

    fetchData()
  }, [searchQuery])

  // Helper functions with array safety checks
  const getAuthorName = (authorId: number) => {
    if (!Array.isArray(authors) || authors.length === 0) {
      return `Author ${authorId}`
    }
    const author = authors.find((a) => a.id === authorId)
    return author?.name || author?.username || `Author ${authorId}`
  }

  const getTagNames = (tagIds: number[]) => {
    if (!Array.isArray(tags) || tags.length === 0 || !Array.isArray(tagIds)) {
      return []
    }
    return tagIds.map((id) => {
      const tag = tags.find((t) => t.id === id)
      return tag?.name || `Tag ${id}`
    })
  }

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "General"
    if (!Array.isArray(categories) || categories.length === 0) {
      return "General"
    }
    const category = categories.find((c) => c.id === categoryId)
    return category?.name || "General"
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return "Unknown date"
    }
  }

  const calculateReadTime = (content: string) => {
    if (!content || typeof content !== "string") {
      return "1 min"
    }
    const wordsPerMinute = 200
    const wordCount = content.split(" ").length
    const readTime = Math.ceil(wordCount / wordsPerMinute)
    return `${readTime} min`
  }

  const truncateContent = (content: string, maxLength = 150) => {
    if (!content || typeof content !== "string") {
      return "No content available"
    }
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
          <div className="h-1 w-24 bg-gray-200 rounded-full"></div>
        </div>
        <div className="grid gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex gap-3 mb-4">
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-red-50 rounded-xl border border-red-200 text-center">
        <div className="text-red-500 mb-4 text-4xl">⚠️</div>
        <h3 className="text-xl font-semibold text-red-700 mb-2">Loading Error</h3>
        <p className="text-red-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Retry Loading
        </button>
      </div>
    )
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="text-gray-400 mb-6 text-5xl">📝</div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {searchQuery ? "No matches for your search." : "Check back soon for new articles!"}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Articles</h2>
        <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
        <p className="mt-4 text-gray-500">
          {searchQuery 
            ? `${articles.length} search results` 
            : "Recent publications from our team"}
        </p>
      </div>

      <div className="grid gap-8">
        {articles.map((article, index) => (
          <article 
            key={article.id} 
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {getCategoryName(article.category)}
              </Badge>
              {getTagNames(article.tags).slice(0, 2).map((tagName, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="bg-gray-100 text-gray-700">
                  {tagName}
                </Badge>
              ))}
            </div>

            <Link href={`/articles/${article.id}`} className="group block">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {article.title || "Untitled Article"}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-2">
                {truncateContent(article.content, 200)}
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                <span className="text-sm font-medium">Read more</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-400" />
                <span>{getAuthorName(article.author)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>{formatDate(article.published_at)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>{calculateReadTime(article.content)} read</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}