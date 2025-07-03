"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Server, Code, Brain, Cloud, Cog, BarChart3, Shield, Database, Globe, Zap } from "lucide-react"
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
  return Zap
}

export function MinimalSidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)

  const API_BASE_URL = "http://192.168.1.131:8000/api"

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        const response = await fetch(`${API_BASE_URL}/categories`)
        if (!response.ok) throw new Error(`Error: ${response.statusText}`)
        const data = await response.json()
        if (Array.isArray(data)) setCategories(data)
        else if (data && Array.isArray(data.results)) setCategories(data.results)
        else setCategories([])
        setCategoriesError(null)
      } catch (err) {
        setCategoriesError("Failed to fetch categories")
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="space-y-12">
      {/* Freelance Services */}
      <Card className="border-0 bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">🚀 Freelance DevOps Services</h3>
          <ul className="list-disc list-inside text-sm font-light space-y-2">
            <li>Monolithic to Cloud-Native Migration</li>
            <li>Infrastructure Automation</li>
            <li>DevOps Consulting</li>
            <li>Part-Time DevOps Support</li>
            <li>DevOps as a Service (DaaS)</li>
          </ul>
          <Link
            href="/services"
            className="mt-6 inline-block text-center bg-white text-blue-700 hover:bg-blue-100 font-medium py-2 px-4 rounded transition-colors"
          >
            See Full Services →
          </Link>
        </CardContent>
      </Card>

      {/* Categories */}
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