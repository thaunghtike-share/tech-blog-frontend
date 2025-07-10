"use client"

import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
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

  const API_BASE_URL = "http://192.168.1.131:8000/api"

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

  const totalPages = Math.ceil(articles.length / PAGE_SIZE)
  const paginatedArticles = articles.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const getAuthor = (id: number) => authors.find((a) => a.id === id)
  const getAuthorName = (id: number) => getAuthor(id)?.name || `Author ${id}`

  const getTagNames = (ids: number[]) =>
    ids.map((id) => tags.find((t) => t.id === id)?.name || `Tag ${id}`)

  const getCategoryName = (id: number | null) =>
    categories.find((c) => c.id === id)?.name || "General"

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  const calculateReadTime = (text: string) =>
    `${Math.ceil((text.split(" ").length || 1) / 200)} min`

  const stripMarkdown = (md: string) =>
    md.replace(/<[^>]+>/g, "").replace(/[#_*`>!\[\]\(\)~\-]/g, "").trim()

  const truncate = (str: string, max = 150) =>
    str.length <= max ? str : str.slice(0, max) + "..."

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse p-4 bg-white rounded-xl shadow" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center text-red-600 p-6 bg-red-50 rounded-xl">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Latest Articles</h2>
        <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid gap-8">
        <AnimatePresence mode="wait">
          {paginatedArticles.map((article) => {
            const author = getAuthor(article.author)
            return (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 rounded-xl border border-gray-100 shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between flex-wrap mb-4 gap-2">
                  <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
                    {getCategoryName(article.category)}
                  </Badge>
                  <div className="flex flex-wrap gap-2">
                    {getTagNames(article.tags).slice(0, 2).map((tag, i) => (
                      <Badge key={i} className="bg-gray-100 text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href={`/articles/${article.id}`} className="group block">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                    {article.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-2 text-[15px] leading-relaxed">
                    {truncate(stripMarkdown(article.content), 200)}
                  </p>
                  <div className="text-sm text-blue-600 flex items-center gap-1 group-hover:underline">
                    Read more <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>

                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    {author?.avatar ? (
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-5 h-5 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <User className="text-gray-400" style={{ width: "14px", height: "14px" }} />
                    )}
                    <span>{getAuthorName(article.author)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="text-gray-400" style={{ width: "14px", height: "14px" }} />
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="text-gray-400" style={{ width: "14px", height: "14px" }} />
                    <span>{calculateReadTime(article.content)} read</span>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <nav className="mt-10 flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-full border text-sm disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-full text-sm ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "border bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-full border text-sm disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  )
}