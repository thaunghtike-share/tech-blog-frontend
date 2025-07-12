"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MinimalHeader } from "@/components/minimal-header"
import { MinimalFooter } from "@/components/minimal-footer"
import { MinimalSidebar } from "@/components/minimal-sidebar"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface Category {
  id: number
  name: string
}

interface Article {
  id: number
  title: string
  content: string
  published_at: string
}

interface Props {
  id: string
}

const API_BASE_URL = "http://192.168.100.7:8000/api"

export default function CategoryPageClient({ id }: Props) {
  const [category, setCategory] = useState<Category | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [loadingCategory, setLoadingCategory] = useState(true)
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [errorCategory, setErrorCategory] = useState<string | null>(null)
  const [errorArticles, setErrorArticles] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategory() {
      setLoadingCategory(true)
      setErrorCategory(null)
      try {
        const res = await fetch(`${API_BASE_URL}/categories/${id}/`)
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        const data = await res.json()
        setCategory(data)
      } catch (err) {
        setErrorCategory(err instanceof Error ? err.message : "Failed to fetch category")
      } finally {
        setLoadingCategory(false)
      }
    }

    async function fetchArticles() {
      setLoadingArticles(true)
      setErrorArticles(null)
      try {
        const res = await fetch(`${API_BASE_URL}/articles/?category=${id}`)
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        const data = await res.json()
        setArticles(data.results)
      } catch (err) {
        setErrorArticles(err instanceof Error ? err.message : "Failed to fetch articles")
      } finally {
        setLoadingArticles(false)
      }
    }

    fetchCategory()
    fetchArticles()
  }, [id])

  const stripMarkdown = (md: string) =>
    md
      .replace(/<[^>]+>/g, "")
      .replace(/[#_*>![\]$$$$~-]/g, "")
      .trim()

  const truncate = (str: string, max = 150) => (str.length <= max ? str : str.slice(0, max) + "...")

  const calculateReadTime = (text: string) => `${Math.ceil((text.split(" ").length || 1) / 200)} min read`

  if (loadingCategory) return <div className="p-8 text-center">Loading category...</div>
  if (errorCategory) return <div className="p-8 text-center text-red-500">Error: {errorCategory}</div>
  if (!category) return <div className="p-8 text-center">Category not found</div>

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden flex flex-col">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      <MinimalHeader />
      <div className="max-w-7xl mx-auto px-4 py-8 w-full relative z-10">
        {/* Category Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-slate-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            {category.name}
          </h1>
          <div className="w-16 h-1 bg-blue-500 rounded-full mb-3"></div>
          <p className="text-gray-600 text-base">
            Explore the latest articles and tutorials in {category.name.toLowerCase()}.
          </p>
        </div>
        {/* Main content & sidebar aligned together */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Articles */}
          <main className="w-full md:flex-1 space-y-6">
            {loadingArticles && <p>Loading articles...</p>}
            {errorArticles && <p className="text-red-500">Error: {errorArticles}</p>}
            {!loadingArticles && articles.length === 0 && (
              <p className="text-gray-500">No articles found in this category.</p>
            )}
            {articles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-lg overflow-hidden"
              >
                <CardContent className="p-5 hover:bg-gray-50 transition-colors duration-200">
                  <Link href={`/articles/${article.id}`} className="group block">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {truncate(stripMarkdown(article.content), 200)}
                    </p>
                    <div className="text-sm text-blue-600 flex items-center gap-1 group-hover:underline">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="text-gray-400 w-3 h-3" />
                      <span>
                        {new Date(article.published_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="text-gray-400 w-3 h-3" />
                      <span>{calculateReadTime(article.content)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </main>
          {/* Sidebar - hidden on mobile, shown on desktop */}
          <aside className="hidden md:block md:w-80">
            <MinimalSidebar />
          </aside>
        </div>
      </div>
      <MinimalFooter />
    </div>
  )
}
