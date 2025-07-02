"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Clock, Server, Brain, Cloud, Cog, BarChart3, Shield, Code, Database, Globe, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

// Types for your API data
interface Category {
  id: number
  name: string
}

const featuredAuthors = [
  { name: "Sarah Chen", posts: 24, specialty: "Kubernetes & DevOps" },
  { name: "Marcus Johnson", posts: 18, specialty: "Machine Learning" },
  { name: "Dr. Emily Watson", posts: 12, specialty: "MLOps & Data Science" },
  { name: "Alex Rodriguez", posts: 15, specialty: "Cloud Architecture" },
]

const readingStats = {
  totalArticles: 247,
  totalReaders: "12.5k",
  avgReadTime: "8 min",
}

// Icon mapping for different categories
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes("devops")) return Server
  if (name.includes("python")) return Code
  if (name.includes("ai") || name.includes("ml")) return Brain
  if (name.includes("cloud")) return Cloud
  if (name.includes("automation")) return Cog
  if (name.includes("monitoring")) return BarChart3
  if (name.includes("security")) return Shield
  if (name.includes("database")) return Database
  if (name.includes("web")) return Globe
  return Zap // Default icon
}

export function MinimalSidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)

  // Your Django API URL
  const API_BASE_URL = "http://localhost:8000/api"

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        console.log("Fetching categories for sidebar from:", `${API_BASE_URL}/categories`)

        const response = await fetch(`${API_BASE_URL}/categories`)
        if (!response.ok) {
          throw new Error(`Categories API returned ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Sidebar categories fetched successfully:", data)

        // Ensure data is an array
        if (Array.isArray(data)) {
          setCategories(data)
        } else if (data && Array.isArray(data.results)) {
          // Handle paginated response
          setCategories(data.results)
        } else {
          console.error("Unexpected categories data format:", data)
          setCategories([])
        }
        setCategoriesError(null)
      } catch (err) {
        console.error("Error fetching sidebar categories:", err)
        setCategoriesError(err instanceof Error ? err.message : "Failed to fetch categories")
        // Fallback to empty array instead of hardcoded data
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="space-y-12">
      {/* Reading Stats */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 shadow-sm">
        <h3 className="text-xl font-light mb-6 flex items-center text-gray-900">
          <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
          Reading Stats
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-light text-gray-900">{readingStats.totalArticles}</div>
            <div className="text-xs text-blue-600 font-light">Articles</div>
          </div>
          <div>
            <div className="text-2xl font-light text-gray-900">{readingStats.totalReaders}</div>
            <div className="text-xs text-blue-600 font-light">Readers</div>
          </div>
          <div>
            <div className="text-2xl font-light text-gray-900 flex items-center justify-center">
              <Clock className="h-4 w-4 mr-1" />
              {readingStats.avgReadTime}
            </div>
            <div className="text-xs text-blue-600 font-light">Avg Read</div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
        <CardContent className="p-8">
          <h3 className="text-xl font-light mb-4">Weekly Insights</h3>
          <p className="text-blue-100 mb-6 font-light leading-relaxed">
            Join 2,500+ developers getting curated articles on programming, design, and career growth.
          </p>
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="your@email.com"
              className="border-0 bg-white/20 text-white placeholder-blue-200 focus:bg-white/30 backdrop-blur-sm"
            />
            <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium">Subscribe</Button>
          </div>
          <p className="text-xs text-blue-200 mt-4 font-light">No spam. Unsubscribe anytime.</p>
        </CardContent>
      </Card>

      {/* Categories - Clean white theme */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-light mb-6 text-gray-900">Categories</h3>

        {categoriesLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-200 rounded mr-3"></div>
                  <div className="w-20 h-4 bg-blue-200 rounded"></div>
                </div>
                <div className="w-4 h-4 bg-blue-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : categoriesError ? (
          <div className="text-center py-4">
            <p className="text-red-500 text-sm mb-2">Failed to load categories</p>
            <button
              onClick={() => window.location.reload()}
              className="text-xs text-red-600 hover:text-red-700 underline"
            >
              Try again
            </button>
          </div>
        ) : !Array.isArray(categories) || categories.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">No categories available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.name)
              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 rounded-lg px-2 transition-colors group"
                >
                  <div className="flex items-center">
                    <Icon className="h-4 w-4 mr-3 text-gray-500 group-hover:text-blue-600 transition-colors" />
                    <span className="text-gray-700 font-light group-hover:text-blue-600 transition-colors">
                      {category.name || "Unknown Category"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-blue-600 transition-colors">→</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Featured Authors */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-light mb-6 text-gray-900">Featured Authors</h3>
        <div className="space-y-6">
          {featuredAuthors.map((author) => (
            <div key={author.name} className="group cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700 font-light group-hover:text-blue-600 transition-colors">
                  {author.name}
                </span>
                <span className="text-xs text-blue-600">{author.posts}</span>
              </div>
              <p className="text-xs text-gray-500 font-light">{author.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
