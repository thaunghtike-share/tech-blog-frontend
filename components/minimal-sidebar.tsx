"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Server, Code, Brain, Cloud, Cog, BarChart3, Shield, Database, Globe, Zap,
  ChevronDown, ChevronUp, ArrowRight, User, Tag, Folder, Star
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Category {
  id: number
  name: string
  post_count?: number
}

interface Tag {
  id: number
  name: string
  post_count?: number
}

interface FeaturedAuthor {
  id: number
  name: string
  bio: string
  avatar: string
  featured: boolean
  job_title?: string
  company?: string
  post_count?: number
}

const getCategoryIconWithColor = (categoryName: string): [React.ComponentType<React.SVGProps<SVGSVGElement>>, string] => {
  const name = categoryName.toLowerCase()
  if (name.includes("devops")) return [Server, "bg-emerald-100 text-emerald-600"]
  if (name.includes("python")) return [Code, "bg-yellow-100 text-yellow-600"]
  if (name.includes("ai") || name.includes("ml")) return [Brain, "bg-purple-100 text-purple-600"]
  if (name.includes("cloud")) return [Cloud, "bg-sky-100 text-sky-600"]
  if (name.includes("automation")) return [Cog, "bg-orange-100 text-orange-600"]
  if (name.includes("monitoring")) return [BarChart3, "bg-pink-100 text-pink-600"]
  if (name.includes("security")) return [Shield, "bg-red-100 text-red-600"]
  if (name.includes("database")) return [Database, "bg-indigo-100 text-indigo-600"]
  if (name.includes("web")) return [Globe, "bg-cyan-100 text-cyan-600"]
  return [Zap, "bg-gray-100 text-gray-600"]
}

export function MinimalSidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [featuredAuthors, setFeaturedAuthors] = useState<FeaturedAuthor[]>([])
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [loading, setLoading] = useState({
    categories: true,
    tags: true,
    authors: true
  })
  const [error, setError] = useState({
    categories: null as string | null,
    tags: null as string | null,
    authors: null as string | null
  })

  const API_BASE_URL = "http://192.168.1.131:8000/api"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes, authorRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories?count_posts=true`),
          fetch(`${API_BASE_URL}/tags?count_posts=true`),
          fetch(`${API_BASE_URL}/authors/?featured=true&count_posts=true`),
        ])

        const catData = await catRes.json()
        const tagData = await tagRes.json()
        const authorData = await authorRes.json()

        setCategories(Array.isArray(catData) ? catData : catData?.results || [])
        setTags(Array.isArray(tagData) ? tagData : tagData?.results || [])
        setFeaturedAuthors(Array.isArray(authorData) ? authorData : authorData?.results || [])
      } catch (err) {
        setError({
          categories: "Failed to load categories",
          tags: "Failed to load tags",
          authors: "Failed to load authors"
        })
      } finally {
        setLoading({
          categories: false,
          tags: false,
          authors: false
        })
      }
    }

    fetchData()
  }, [])

  return (
    <aside className="space-y-6">
      {/* Services Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">DevOps Services</h3>
          </div>
          
          <ul className="space-y-4">
            {[
              {
                title: "Cloud Migration",
                desc: "Modernize with Kubernetes & GitOps",
                icon: <Cloud className="h-5 w-5 text-sky-600" />
              },
              {
                title: "Infra Automation",
                desc: "Terraform, Ansible, Pulumi",
                icon: <Cog className="h-5 w-5 text-orange-600" />
              },
              {
                title: "CI/CD Pipelines",
                desc: "End-to-end automation",
                icon: <BarChart3 className="h-5 w-5 text-pink-600" />
              },
              {
                title: "Web Deployment",
                desc: "Scalable cloud-native apps",
                icon: <Globe className="h-5 w-5 text-cyan-600" />
              }
            ].map((service, index) => (
              <li key={index}>
                <Link
                  href={`/services#${service.title.toLowerCase().replace(' ', '-')}`}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-white hover:shadow transition-all"
                >
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{service.title}</h4>
                    <p className="text-sm text-gray-600">{service.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/services"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Explore Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Folder className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Categories</h3>
          </div>

          {loading.categories ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse h-12 rounded-lg bg-gray-100" />
              ))}
            </div>
          ) : error.categories ? (
            <div className="text-center py-4 text-red-500 text-sm">
              Failed to load categories
            </div>
          ) : (
            <>
              <ul className="space-y-2">
                {(showAllCategories ? categories : categories.slice(0, 5)).map((category) => {
                  const [Icon, colorClass] = getCategoryIconWithColor(category.name)
                  return (
                    <li key={category.id}>
                      <Link
                        href={`/category/${category.id}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${colorClass.split(' ')[0]}`}>
                            <Icon className={`h-5 w-5 ${colorClass.split(' ')[1]}`} />
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-blue-600">
                            {category.name}
                          </span>
                        </div>
                        {category.post_count && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {category.post_count}
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              {categories.length > 5 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="mt-4 w-full flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showAllCategories ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Show More
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Tags Section */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Tag className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Popular Tags</h3>
          </div>

          {loading.tags ? (
            <div className="flex flex-wrap gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-8 w-20 rounded-full bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : error.tags ? (
            <div className="text-center py-4 text-red-500 text-sm">
              Failed to load tags
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 15).map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.id}`}
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    tag.post_count && tag.post_count > 5 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Featured Authors */}
      <Card className="border border-gray-200 rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Star className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Featured Experts</h3>
          </div>

          {loading.authors ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3">
                  <div className="h-12 w-12 rounded-full bg-gray-100 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : error.authors ? (
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
              <p className="text-red-500 text-sm">Failed to load experts</p>
            </div>
          ) : featuredAuthors.length === 0 ? (
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">No featured experts available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {featuredAuthors.map((author) => (
                <div 
                  key={author.id} 
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="relative">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-12 w-12 rounded-full object-cover border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/default-avatar.png'
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
                      <Star className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{author.name}</h4>
                    <p className="text-sm text-gray-600 truncate">
                      {author.job_title || 'DevOps Engineer'}
                    </p>
                    {author.post_count && (
                      <p className="text-xs text-gray-400 mt-1">
                        {author.post_count} {author.post_count === 1 ? 'article' : 'articles'}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  )
}