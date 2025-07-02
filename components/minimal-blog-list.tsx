"use client"

import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Types for your API data
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

export function MinimalBlogList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Your Django API URL
  const API_BASE_URL = "http://localhost:8000/api"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log("Fetching articles from:", `${API_BASE_URL}/articles/`)

        // First, fetch articles (most important)
        const articlesResponse = await fetch(`${API_BASE_URL}/articles/`)
        if (!articlesResponse.ok) {
          throw new Error(`Articles API returned ${articlesResponse.status}: ${articlesResponse.statusText}`)
        }
        const articlesData = await articlesResponse.json()
        console.log("Articles fetched successfully:", articlesData)

        // Ensure articlesData is an array
        if (Array.isArray(articlesData)) {
          setArticles(articlesData)
        } else if (articlesData && Array.isArray(articlesData.results)) {
          // Handle paginated response
          setArticles(articlesData.results)
        } else {
          console.error("Unexpected articles data format:", articlesData)
          setArticles([])
        }
        setLoading(false)

        // Then fetch supporting data (optional - won't break if they fail)
        try {
          const authorsResponse = await fetch(`${API_BASE_URL}/authors/`)
          if (authorsResponse.ok) {
            const authorsData = await authorsResponse.json()
            console.log("Authors fetched:", authorsData)
            // Ensure authorsData is an array
            if (Array.isArray(authorsData)) {
              setAuthors(authorsData)
            } else if (authorsData && Array.isArray(authorsData.results)) {
              setAuthors(authorsData.results)
            } else {
              console.log("Authors data is not an array:", authorsData)
              setAuthors([])
            }
          }
        } catch (err) {
          console.log("Authors API not available:", err)
          setAuthors([])
        }

        try {
          const tagsResponse = await fetch(`${API_BASE_URL}/tags/`)
          if (tagsResponse.ok) {
            const tagsData = await tagsResponse.json()
            console.log("Tags fetched:", tagsData)
            // Ensure tagsData is an array
            if (Array.isArray(tagsData)) {
              setTags(tagsData)
            } else if (tagsData && Array.isArray(tagsData.results)) {
              setTags(tagsData.results)
            } else {
              console.log("Tags data is not an array:", tagsData)
              setTags([])
            }
          }
        } catch (err) {
          console.log("Tags API not available:", err)
          setTags([])
        }

        try {
          const categoriesResponse = await fetch(`${API_BASE_URL}/categories/`)
          if (categoriesResponse.ok) {
            const categoriesData = await categoriesResponse.json()
            console.log("Categories fetched:", categoriesData)
            // Ensure categoriesData is an array
            if (Array.isArray(categoriesData)) {
              setCategories(categoriesData)
            } else if (categoriesData && Array.isArray(categoriesData.results)) {
              setCategories(categoriesData.results)
            } else {
              console.log("Categories data is not an array:", categoriesData)
              setCategories([])
            }
          }
        } catch (err) {
          console.log("Categories API not available:", err)
          setCategories([])
        }
      } catch (err) {
        console.error("Error fetching articles:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch articles")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
      <div className="space-y-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-light text-slate-900">Latest Articles</h2>
        </div>
        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-8 h-4 bg-slate-200 rounded"></div>
                <div className="w-20 h-6 bg-slate-200 rounded"></div>
              </div>
              <div className="w-3/4 h-8 bg-slate-200 rounded mb-4"></div>
              <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
              <div className="w-2/3 h-4 bg-slate-200 rounded mb-6"></div>
              <div className="flex space-x-6">
                <div className="w-24 h-4 bg-slate-200 rounded"></div>
                <div className="w-32 h-4 bg-slate-200 rounded"></div>
                <div className="w-16 h-4 bg-slate-200 rounded"></div>
              </div>
              <div className="mt-8 h-px bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-light text-slate-900">Latest Articles</h2>
        </div>
        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
          <div className="text-red-500 mb-4 text-2xl">⚠️</div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Unable to load articles</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="text-sm text-red-500 mb-4">
            <p>
              Make sure your Django server is running on:{" "}
              <code className="bg-red-100 px-2 py-1 rounded">http://localhost:8000</code>
            </p>
            <p>
              And CORS is configured to allow:{" "}
              <code className="bg-red-100 px-2 py-1 rounded">http://localhost:3000</code>
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!Array.isArray(articles) || articles.length === 0) {
    return (
      <div className="space-y-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-light text-slate-900">Latest Articles</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4 text-4xl">📝</div>
          <p className="text-slate-600">No articles found. Check back soon!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-16">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-light text-slate-900">Latest Articles</h2>
        <span className="text-sm text-gray-500">{articles.length} articles</span>
      </div>

      <div className="space-y-12">
        {articles.map((article, index) => (
          <article key={article.id} className="group">
            <div className="flex items-start space-x-4 mb-4">
              <span className="text-sm text-stone-400 font-mono mt-1">{String(index + 1).padStart(2, "0")}</span>
              <Badge variant="outline" className="text-xs">
                {getCategoryName(article.category)}
              </Badge>
              {getTagNames(article.tags)
                .slice(0, 2)
                .map((tagName, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tagName}
                  </Badge>
                ))}
            </div>

            <Link href={`/articles/${article.id}`} className="block">
              <h3 className="text-2xl font-light text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                {article.title || "Untitled Article"}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                {truncateContent(article.content)}
              </p>
            </Link>

            <div className="flex items-center text-sm text-stone-400 space-x-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span className="font-light">{getAuthorName(article.author)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(article.published_at)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {calculateReadTime(article.content)}
              </div>
            </div>

            <div className="mt-8 h-px bg-slate-200"></div>
          </article>
        ))}
      </div>
    </div>
  )
}

// Make sure to export as default as well
export default MinimalBlogList