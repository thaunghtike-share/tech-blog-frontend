"use client"
import React, { useState, useEffect, useRef } from "react"
import { Calendar, Clock, User, ArrowRight, TagIcon, Folder, Sparkles } from 'lucide-react'
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

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
  avatar?: string
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

const PAGE_SIZE = 5

export function MinimalBlogList({ searchQuery = "" }: MinimalBlogListProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Create a ref for the top heading section
  const topRef = useRef<HTMLDivElement>(null)

  const API_BASE_URL = "http://192.168.100.7:8000/api"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        let url = `${API_BASE_URL}/articles/`
        if (searchQuery.trim()) {
          url += `?search=${encodeURIComponent(searchQuery.trim())}`
        }

        const articlesResponse = await fetch(url)
        const articlesData = await articlesResponse.json()
        setArticles(Array.isArray(articlesData) ? articlesData : articlesData.results || [])
        setLoading(false)

        const authorsResponse = await fetch(`${API_BASE_URL}/authors/`)
        const authorsData = await authorsResponse.json()
        setAuthors(Array.isArray(authorsData) ? authorsData : authorsData.results || [])

        const tagsResponse = await fetch(`${API_BASE_URL}/tags/`)
        const tagsData = await tagsResponse.json()
        setTags(Array.isArray(tagsData) ? tagsData : tagsData.results || [])

        const categoriesResponse = await fetch(`${API_BASE_URL}/categories/`)
        const categoriesData = await categoriesResponse.json()
        setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.results || [])
      } catch (err: any) {
        console.error("Error fetching data:", err)
        setError(err.message || "Failed to fetch data")
        setLoading(false)
      }
    }

    fetchData()
    setCurrentPage(1)
  }, [searchQuery])

  // Scroll to the top heading when page changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [currentPage])

  const totalPages = Math.ceil(articles.length / PAGE_SIZE)
  const paginatedArticles = articles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const getAuthor = (id: number) => authors.find((a) => a.id === id)
  const getAuthorName = (id: number) => getAuthor(id)?.name || `Author ${id}`
  const getTagNames = (ids: number[]) => ids.map((id) => tags.find((t) => t.id === id)?.name || `Tag ${id}`)
  const getCategoryName = (id: number | null) => categories.find((c) => c.id === id)?.name || "General"

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const calculateReadTime = (text: string) => `${Math.ceil((text.split(" ").length || 1) / 200)} min`

  const stripMarkdown = (md: string) =>
    md
      .replace(/<[^>]+>/g, "")
      .replace(/[#_*>!\[\]$$$$~\-]/g, "")
      .trim()

  const truncate = (str: string, max = 150) => (str.length <= max ? str : str.slice(0, max) + "...")

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2
              ref={topRef} // attach ref here for loading also
              className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Latest Articles
            </h2>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full md:max-w-4xl mx-auto px-2 sm:px-4">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2
            ref={topRef} // attach ref here as well for normal render
            className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Latest Articles
          </h2>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
      </div>

      <div className="grid gap-8">
        <AnimatePresence mode="wait">
          {paginatedArticles.map((article, index) => {
            const author = getAuthor(article.author)
            return (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex justify-between flex-wrap mb-4 gap-2">
                  <div className="flex items-center gap-1 text-yellow-600 bg-gradient-to-r from-gray-50 to-black-50 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-100">
                    <Folder className="w-4 h-4" />
                    {getCategoryName(article.category)}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getTagNames(article.tags)
                      .slice(0, 2)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 text-sm bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 px-2.5 py-1 rounded-full hover:from-gray-100 hover:to-slate-100 transition-all border border-gray-200"
                        >
                          <TagIcon className="w-3.5 h-3.5" />
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                <Link href={`/articles/${article.id}`} className="group/link block">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover/link:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-2 text-[15px] leading-relaxed">
                    {truncate(stripMarkdown(article.content), 200)}
                  </p>
                  <div className="text-sm text-blue-600 flex items-center gap-1 group-hover/link:gap-2 font-medium transition-all">
                    Read more <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    {author?.avatar ? (
                      <img
                        src={author.avatar || "/placeholder.svg"}
                        alt={author.name}
                        className="w-5 h-5 rounded-full object-cover border border-gray-200"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <span className="font-medium">{getAuthorName(article.author)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{calculateReadTime(article.content)} read</span>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <nav className="mt-10 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-full border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-full border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  )
}