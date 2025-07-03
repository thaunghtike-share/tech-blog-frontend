"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Server, Code, Brain, Cloud, Cog, BarChart3, Shield, Database, Globe, Zap,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Category {
  id: number
  name: string
}

interface Tag {
  id: number
  name: string
}

interface FeaturedAuthor {
  id: number
  name: string
  bio: string
  avatar: string
  featured: boolean
  job_title?: string
  company?: string
}

const getCategoryIconWithColor = (categoryName: string): [React.ComponentType<React.SVGProps<SVGSVGElement>>, string] => {
  const name = categoryName.toLowerCase()
  if (name.includes("devops")) return [Server, "text-emerald-500"]
  if (name.includes("python")) return [Code, "text-yellow-500"]
  if (name.includes("ai") || name.includes("ml")) return [Brain, "text-purple-600"]
  if (name.includes("cloud")) return [Cloud, "text-sky-400"]
  if (name.includes("automation")) return [Cog, "text-orange-500"]
  if (name.includes("monitoring")) return [BarChart3, "text-pink-500"]
  if (name.includes("security")) return [Shield, "text-red-500"]
  if (name.includes("database")) return [Database, "text-indigo-600"]
  if (name.includes("web")) return [Globe, "text-cyan-600"]
  return [Zap, "text-gray-400"]
}

export function MinimalSidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)

  const [tags, setTags] = useState<Tag[]>([])
  const [tagsLoading, setTagsLoading] = useState(true)
  const [tagsError, setTagsError] = useState<string | null>(null)

  const [featuredAuthors, setFeaturedAuthors] = useState<FeaturedAuthor[]>([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [featuredError, setFeaturedError] = useState<string | null>(null)

  const [showAllCategories, setShowAllCategories] = useState(false)

  const API_BASE_URL = "http://192.168.1.131:8000/api"

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        const res = await fetch(`${API_BASE_URL}/categories`)
        const data = await res.json()
        if (Array.isArray(data)) setCategories(data)
        else if (data?.results) setCategories(data.results)
        else setCategories([])
      } catch {
        setCategoriesError("Failed to fetch categories")
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }

    const fetchTags = async () => {
      try {
        setTagsLoading(true)
        const res = await fetch(`${API_BASE_URL}/tags`)
        const data = await res.json()
        if (Array.isArray(data)) setTags(data)
        else if (data?.results) setTags(data.results)
        else setTags([])
      } catch {
        setTagsError("Failed to fetch tags")
        setTags([])
      } finally {
        setTagsLoading(false)
      }
    }

    const fetchFeaturedAuthors = async () => {
      try {
        setFeaturedLoading(true)
        const res = await fetch(`${API_BASE_URL}/authors/?featured=true`)
        const data = await res.json()
        if (Array.isArray(data)) setFeaturedAuthors(data)
        else if (data?.results) setFeaturedAuthors(data.results)
        else setFeaturedAuthors([])
      } catch {
        setFeaturedError("Failed to fetch featured authors")
        setFeaturedAuthors([])
      } finally {
        setFeaturedLoading(false)
      }
    }

    fetchCategories()
    fetchTags()
    fetchFeaturedAuthors()
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
        <h3 className="text-xl font-light mb-6 text-gray-900 border-b border-gray-300 pb-2">Categories</h3>
        {categoriesLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-200 rounded" />
                  <div className="w-28 h-4 bg-blue-200 rounded" />
                </div>
                <div className="w-5 h-5 bg-blue-200 rounded" />
              </div>
            ))}
          </div>
        ) : categoriesError ? (
          <div className="text-center py-4">
            <p className="text-red-500 text-sm mb-2">{categoriesError}</p>
            <button onClick={() => window.location.reload()} className="text-xs text-red-600 hover:text-red-700 underline">
              Try again
            </button>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-100">
              {(showAllCategories ? categories : categories.slice(0, 5)).map((category) => {
                const [Icon, colorClass] = getCategoryIconWithColor(category.name)
                return (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.id}`}
                      className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`${colorClass} h-5 w-5 group-hover:text-blue-600 transition-colors`} />
                        <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-blue-400 group-hover:text-blue-600 text-lg leading-none">→</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
            {categories.length > 5 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="mt-4 w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {showAllCategories ? "Show less ▲" : "Show more ▼"}
              </button>
            )}
          </>
        )}
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-light mb-6 text-gray-900 border-b border-gray-300 pb-2">Tags</h3>
        {tagsLoading ? (
          <div className="flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-16 h-6 bg-blue-200 rounded-full animate-pulse" />
            ))}
          </div>
        ) : tagsError ? (
          <div className="text-center py-4">
            <p className="text-red-500 text-sm mb-2">{tagsError}</p>
            <button onClick={() => window.location.reload()} className="text-xs text-red-600 hover:text-red-700 underline">
              Try again
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tag/${tag.id}`}
                className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 hover:bg-blue-200 transition"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Featured Authors */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-light mb-6 text-gray-900 border-b border-gray-300 pb-2">Featured Authors</h3>
        {featuredLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-5 w-full bg-gray-300 rounded" />
            ))}
          </div>
        ) : featuredError ? (
          <div className="text-center py-4">
            <p className="text-red-500 text-sm mb-2">{featuredError}</p>
            <button onClick={() => window.location.reload()} className="text-xs text-red-600 hover:text-red-700 underline">
              Try again
            </button>
          </div>
        ) : featuredAuthors.length === 0 ? (
          <p className="text-gray-500 text-sm">No featured authors found.</p>
        ) : (
          <div className="space-y-4">
            {featuredAuthors.map((author) => (
              <div
                key={author.id}
                className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white hover:shadow transition duration-200"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-10 h-10 rounded-full border object-cover shadow-sm"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">
                    {author.name}
                  </p>
                  {(author.job_title || author.company) && (
                    <p className="text-xs text-gray-500 font-light">
                      {author.job_title}
                      {author.company ? ` at ${author.company}` : ""}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}