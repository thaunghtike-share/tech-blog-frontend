import { MinimalHeader } from "@/components/minimal-header"
import { MinimalFooter } from "@/components/minimal-footer"
import { ArticleContent } from "@/components/article-content"

interface Article {
  id: number
  title: string
  content: string
  published_at: string
  category: number
  tags: number[]
  author: number
  featured: boolean
  read_count?: number
}

interface Author {
  id: number
  name: string
  bio?: string
  avatar?: string
  linkedin?: string
}

interface Tag {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

interface ArticlePageProps {
  params: { id: string }
}

const API_BASE_URL = "http://192.168.1.131:8000/api"

async function fetchJSON<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url, { cache: "no-store" })
    const data = await res.json()
    return Array.isArray(data) ? data : data.results || []
  } catch {
    return []
  }
}

async function fetchAuthor(id: number): Promise<Author | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/authors/${id}`, {
      cache: "no-store",
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

function extractHeadings(markdown: string): { text: string; level: number; id: string }[] {
  const idCounts: Record<string, number> = {}
  return markdown
    .split("\n")
    .map((line) => {
      const match = line.match(/^(#{1,6})\s+(.*)/)
      if (!match) return null
      const [, hashes, rawText] = match
      const level = hashes.length
      let baseId = rawText
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-+|-+$/g, "")
      if (idCounts[baseId]) {
        idCounts[baseId] += 1
        baseId = `${baseId}-${idCounts[baseId]}`
      } else {
        idCounts[baseId] = 1
      }
      return { text: rawText, level, id: baseId }
    })
    .filter(Boolean) as { text: string; level: number; id: string }[]
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const id = Number.parseInt(params.id)
  const res = await fetch(`${API_BASE_URL}/articles/${id}`, { cache: "no-store" })
  if (!res.ok) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Article not found or failed to load.</p>
      </div>
    )
  }
  const article: Article = await res.json()

  const [author, allArticles, tags, categories, authors] = await Promise.all([
    fetchAuthor(article.author),
    fetchJSON<Article>(`${API_BASE_URL}/articles/`),
    fetchJSON<Tag>(`${API_BASE_URL}/tags/`),
    fetchJSON<Category>(`${API_BASE_URL}/categories/`),
    fetchJSON<Author>(`${API_BASE_URL}/authors/`),
  ])

  const headings = extractHeadings(article.content)
  const sorted = allArticles.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
  const currentIndex = sorted.findIndex((a) => a.id === article.id)
  const prevArticle = sorted[currentIndex + 1] || null
  const nextArticle = sorted[currentIndex - 1] || null
  const recentArticles = sorted.filter((a) => a.id !== article.id).slice(0, 5)
  const sameCategoryArticles = sorted.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 5)

  const publishDate = new Date(article.published_at).toLocaleDateString()
  const categoryName = categories.find((c) => c.id === article.category)?.name || "General"
  const tagNames = article.tags.map((id) => tags.find((t) => t.id === id)?.name).filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 34v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zM36 10v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM12 10v-4h-2v4H6v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4H6v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      {/* Messenger Support Floating Button */}
      <a
        href="https://m.me/learndevopsnowbytho"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with me on Messenger"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white rounded-full shadow-lg px-3 py-2 cursor-pointer transition-transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 240 240"
          fill="none"
          className="w-8 h-8 rounded-full"
        >
          <defs>
            <linearGradient
              id="messengerGradient"
              x1="0"
              y1="0"
              x2="240"
              y2="240"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E1306C" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="120" fill="url(#messengerGradient)" />
          <path
            fill="#fff"
            d="M158.8 80.2l-37.8 44.3-19.2-22.6-41 44.4 56.2-58.7 21 23.7 41-44.3z"
          />
        </svg>
        <span className="font-medium text-gray-900 select-none text-sm whitespace-nowrap">
          Chat?
        </span>
      </a>
      <MinimalHeader />
      <ArticleContent
        article={article}
        author={author}
        headings={headings}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
        recentArticles={recentArticles}
        sameCategoryArticles={sameCategoryArticles}
        publishDate={publishDate}
        categoryName={categoryName}
        tagNames={tagNames}
        authors={authors}
        categories={categories}
        readCount={article.read_count || 0}
      />
      <MinimalFooter />
    </div>
  );
}