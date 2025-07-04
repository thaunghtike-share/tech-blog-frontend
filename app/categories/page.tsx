"use client"

import { MinimalHeader } from "@/components/minimal-header"
import { MinimalFooter } from "@/components/minimal-footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  Server,
  Brain,
  Cloud,
  Cog,
  BarChart3,
  Shield,
  Code,
  Database,
  Globe,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Types for your API data
interface Category {
  id: number
  name: string
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

// Color mapping for different categories
const getCategoryColors = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes("devops")) return { color: "from-blue-500 to-cyan-500", bgColor: "from-blue-50 to-cyan-50" }
  if (name.includes("python")) return { color: "from-green-500 to-emerald-500", bgColor: "from-green-50 to-emerald-50" }
  if (name.includes("ai") || name.includes("ml")) return { color: "from-purple-500 to-pink-500", bgColor: "from-purple-50 to-pink-50" }
  if (name.includes("cloud")) return { color: "from-orange-500 to-red-500", bgColor: "from-orange-50 to-red-50" }
  if (name.includes("automation")) return { color: "from-indigo-500 to-blue-500", bgColor: "from-indigo-50 to-blue-50" }
  if (name.includes("monitoring")) return { color: "from-yellow-500 to-orange-500", bgColor: "from-yellow-50 to-orange-50" }
  if (name.includes("security")) return { color: "from-red-500 to-pink-500", bgColor: "from-red-50 to-pink-50" }
  if (name.includes("database")) return { color: "from-teal-500 to-cyan-500", bgColor: "from-teal-50 to-cyan-50" }
  if (name.includes("web")) return { color: "from-violet-500 to-purple-500", bgColor: "from-violet-50 to-purple-50" }
  return { color: "from-slate-500 to-gray-500", bgColor: "from-slate-50 to-gray-50" } // Default colors
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = "http://192.168.100.7:8000/api"

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/categories/`)
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        const data = await response.json()
        setCategories(data.results)  // 👈 Important if using DRF pagination
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return <div className="p-10 text-center">Loading categories...</div>
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <MinimalHeader />

      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 py-14 border-b border-white/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-xl md:text-3xl font-light text-slate-900 mb-3 tracking-wide">
            <span className="font-tight text-black-700">Explore </span><span className="font-medium text-blue-600">Categories</span>
          </h1>
          <p className="text-slate-600">Found {categories.length} categories</p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.name)
            const colors = getCategoryColors(category.name)

            return (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${colors.color}`}></div>
                  <CardContent
                    className={`p-8 bg-gradient-to-br ${colors.bgColor} group-hover:scale-[1.02] transition-transform`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${colors.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      Explore articles and tutorials related to {category.name.toLowerCase()}.
                    </p>
                    <div className="text-blue-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                      View articles →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>

      <MinimalFooter />
    </div>
  )
}