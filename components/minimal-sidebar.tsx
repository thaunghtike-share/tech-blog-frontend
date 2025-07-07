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
    const fetchData = async () => {
      try {
        const [catRes, tagRes, authorRes] = await Promise.all([
          fetch(`${API_BASE_URL}/categories`),
          fetch(`${API_BASE_URL}/tags`),
          fetch(`${API_BASE_URL}/authors/?featured=true`),
        ])

        const catData = await catRes.json()
        const tagData = await tagRes.json()
        const authorData = await authorRes.json()

        setCategories(Array.isArray(catData) ? catData : catData?.results || [])
        setTags(Array.isArray(tagData) ? tagData : tagData?.results || [])
        setFeaturedAuthors(Array.isArray(authorData) ? authorData : authorData?.results || [])
      } catch {
        setCategoriesError("Failed to fetch categories")
        setTagsError("Failed to fetch tags")
        setFeaturedError("Failed to fetch featured authors")
      } finally {
        setCategoriesLoading(false)
        setTagsLoading(false)
        setFeaturedLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-12">
      {/* 🚀 Freelance DevOps Services */}
      <Card className="bg-white border border-gray-200 rounded-2xl shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">🚀 Freelance DevOps Services</h3>
          <div className="space-y-4">
            {[
              {
                title: "Cloud-Native Migration",
                desc: "Modernize your apps with Kubernetes, GitOps, containers.",
                href: "/services/cloud-native-migration",
              },
              {
                title: "Infrastructure Automation",
                desc: "Terraform, Pulumi, Ansible — automate from dev to prod.",
                href: "/services/infrastructure-automation",
              },
              {
                title: "DevOps as a Service",
                desc: "Ongoing support for infra, CI/CD, monitoring & security.",
                href: "/services/devops-as-a-service",
              },
              {
                title: "Business Web + API Deployment",
                desc: "Launch and scale your site or SaaS with cloud-native infra.",
                href: "/services/web-api-deployment",
              },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="block border-l-4 border-blue-600 pl-4 py-2 hover:bg-blue-50 rounded-md transition"
              >
                <p className="font-semibold text-gray-800">{service.title}</p>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </Link>
            ))}
          </div>

          <Link
            href="/services"
            className="mt-6 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
          >
            View All Services →
          </Link>
        </CardContent>
      </Card>

      {/* 📂 Categories */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-light mb-6 text-gray-900 border-b border-gray-300 pb-2">Categories</h3>
        {categoriesLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
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
          <div className="text-red-500 text-sm text-center">{categoriesError}</div>
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
                        <span className="text-gray-700 font-medium group-hover:text-blue-600">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-blue-400 group-hover:text-blue-600 text-lg">→</span>
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

      {/* 🏷️ Tags */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-light mb-6 text-gray-900 border-b border-gray-300 pb-2">Tags</h3>
        {tagsLoading ? (
          <div className="flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-16 h-6 bg-blue-200 rounded-full animate-pulse" />
            ))}
          </div>
        ) : tagsError ? (
          <div className="text-red-500 text-sm text-center">{tagsError}</div>
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

      {/* ✨ Featured Authors */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-light mb-6 text-gray-900 border-b border-gray-300 pb-2">Featured Authors</h3>
        {featuredLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-5 w-full bg-gray-300 rounded" />
            ))}
          </div>
        ) : featuredError ? (
          <div className="text-red-500 text-sm text-center">{featuredError}</div>
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
                  <p className="text-sm font-medium text-gray-800 group-hover:text-blue-600">{author.name}</p>
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